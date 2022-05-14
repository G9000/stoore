import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import * as LabelPrimitive from "@radix-ui/react-label";
import { useState, useEffect } from "react";
import { HiX, HiPlus } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { toast } from "react-hot-toast";

const CreateGroupModal = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const setModalStatus = (data: boolean) => {
        setIsOpen(data);
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className="px-6 h-[40px] flex items-center gap-x-4 rounded-lg bg-gray-100 border border-gray-200 text-primaryGreen800 font-bold hover:bg-slate-200">
                    <span className="text-xl">
                        <HiPlus />
                    </span>
                    Create a new Group
                </button>
            </Dialog.Trigger>
            {isOpen && (
                <Dialog.Portal>
                    <Overlay />
                    <Content>
                        <div className="flex justify-between">
                            <Dialog.Title className="font-bold text-gray-600 text-md">
                                Create Group
                            </Dialog.Title>
                            <Dialog.Close>
                                <button className="text-xl" aria-label="Close">
                                    <HiX />
                                </button>
                            </Dialog.Close>
                        </div>

                        <Dialog.Description className="mt-4 mb-6">
                            Give your group a name and a description that is
                            appropriate for the use case.
                        </Dialog.Description>
                        <ModalField modalStatus={setModalStatus} />
                    </Content>
                </Dialog.Portal>
            )}
        </Dialog.Root>
    );
};

export default CreateGroupModal;

const Overlay = () => {
    return <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />;
};

const Content = ({ children }: { children: React.ReactNode }) => {
    return (
        <Dialog.Content className="fixed max-h-screen h-auto max-w-[450px] w-[90vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white py-6 px-4">
            {children}
        </Dialog.Content>
    );
};

let groupSchema = object({
    name: string()
        .required("Group name is required")
        .min(3, "Too short. No one going to remember that")
        .max(30, "Too long, make it short and memorable"),
    description: string(),
});

interface FieldType {
    name: string;
    description?: string;
    maxLength?: number;
}

const ModalField = ({
    modalStatus,
}: {
    modalStatus: (arg0: boolean) => void;
}) => {
    const [disabled, setDisabled] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldType>({
        resolver: yupResolver(groupSchema),
    });

    const onSubmit = async (data: FieldType) => {
        let toastId;
        toastId = toast.loading("Loading...");
        setDisabled(true);
        const res = await axios.post("/api/group", data);

        if (res.status === 200) {
            toast.success("Group Created", { id: toastId });
            setDisabled(false);
        } else {
            toast.error(res.statusText, { id: toastId });
            setDisabled(false);
        }
        modalStatus(false);
    };

    // clear toast
    useEffect(() => {
        toast.dismiss();
    }, []);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
        >
            <fieldset className="flex flex-col gap-y-2">
                <LabelPrimitive.Root htmlFor="group-name" className="text-sm">
                    Group name
                </LabelPrimitive.Root>

                <input
                    id="group-name"
                    {...register("name", { required: true })}
                    type="text"
                    aria-invalid={errors.name ? "true" : "false"}
                    placeholder="give it some name"
                    className={
                        errors.name
                            ? "pl-4 w-full h-[45px] rounded-md border border-red-600 outline outline-offset outline-4 outline-red-100"
                            : "pl-4 w-full h-[45px] rounded-md border focus:ring-4 focus:outline-none focus:ring-gray-300 focus:ring-opacity-25"
                    }
                />
                {errors.name && (
                    <InputErrorMessage>
                        {errors.name?.message}
                    </InputErrorMessage>
                )}
            </fieldset>

            <button
                type="submit"
                className="h-[45px] bg-primaryGreen800 rounded-md text-white w-full disabled:cursor-not-allowed mt-4"
                aria-label="Close"
                disabled={disabled}
            >
                Create Group
            </button>
        </form>
    );
};

const InputErrorMessage = ({ children }: { children: React.ReactNode }) => {
    return (
        <span role="alert" className="text-sm mt">
            {children}
        </span>
    );
};
