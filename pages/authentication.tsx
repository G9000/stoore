import { useState, useEffect } from "react";
import { signIn, getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession(ctx);

    if (session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return { props: {} };
};

const SignInSchema = Yup.object().shape({
    email: Yup.string()
        .trim()
        .email("Invalid email")
        .required("This field is required"),
});

interface FormType {
    email: string;
}

const AuthView = () => {
    const [disabled, setDisabled] = useState<boolean>(false);
    const [isSignup, setIsSignup] = useState<boolean>(true);
    // const [isOpen, setIsOpen] = useState<boolean>(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormType>({
        resolver: yupResolver(SignInSchema),
    });

    const signInWithEmail = async ({ email }: FormType) => {
        let toastId;
        try {
            toastId = toast.loading("Loading...");
            setDisabled(true);
            const { error }: any = await signIn("email", {
                redirect: false,
                callbackUrl: window.location.href,
                email,
            });
            if (error) {
                throw new Error(error);
            }
            toast.dismiss(toastId);
        } catch (err) {
            toast.error("Sign up failed", { id: toastId });
        } finally {
            toast.success("Sign up successful", { id: toastId });
            setDisabled(false);
            // setIsOpen(true);
        }
    };

    const signInWithGoogle = () => {
        toast.loading("Redirecting...");
        setDisabled(true);
        signIn("google", {
            callbackUrl: window.location.href,
        });
    };

    // clear toast
    useEffect(() => {
        toast.dismiss();
    }, []);

    return (
        <div className="flex justify-center items-center w-full h-screen px-4">
            <div className="max-w-[325px] w-full">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Create your account</h1>
                    <p className="mt-2">Take control of your item now</p>
                </div>
                <button
                    disabled={disabled}
                    onClick={() => signInWithGoogle()}
                    className="h-[45px] w-full mt-8 mx-auto border rounded-md p-2 flex justify-center items-center space-x-2 text-gray-500 hover:text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100 focus:ring-opacity-25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-gray-500 disabled:hover:bg-transparent disabled:hover:border-gray-200 transition-colors"
                >
                    <Image
                        src="/google.svg"
                        alt="Google"
                        width={32}
                        height={32}
                    />
                    <span>Sign {isSignup ? "up" : "in"} with Google</span>
                </button>

                <form onSubmit={handleSubmit(signInWithEmail)} className="mt-2">
                    <input
                        id="email"
                        {...register("email", { required: true })}
                        type="text"
                        aria-invalid={errors.email ? "true" : "false"}
                        placeholder="sign in with email"
                        className={
                            errors.email
                                ? "pl-4 w-full h-[45px] rounded-md border border-red-600 outline outline-offset outline-4 outline-red-100"
                                : "pl-4 w-full h-[45px] rounded-md border focus:ring-4 focus:outline-none focus:ring-gray-300 focus:ring-opacity-25"
                        }
                    />
                    {errors.email && (
                        <span role="alert" className="text-sm mt">
                            {errors.email?.message}
                        </span>
                    )}

                    <button
                        type="submit"
                        className="h-[45px] bg-primaryGreen800 rounded-md text-white w-full disabled:cursor-not-allowed mt-6"
                        aria-label="Close"
                        disabled={disabled}
                    >
                        {isSignup ? "Sign up" : "Sign in"}
                    </button>
                </form>
                {isSignup ? (
                    <div className="mt-4 text-sm text-gray-500 text-center">
                        Already have an account?{" "}
                        <button
                            type="button"
                            disabled={disabled}
                            className="text-purple-700 font-semibold disabled:cursor-not-allowed"
                            onClick={() => setIsSignup(false)}
                        >
                            Log in
                        </button>
                    </div>
                ) : (
                    <div className="mt-4 text-sm text-gray-500 text-center">
                        Don&#39;t have an account yet?{" "}
                        <button
                            type="button"
                            disabled={disabled}
                            className="text-purple-700 font-semibold disabled:cursor-not-allowed"
                            onClick={() => setIsSignup(true)}
                        >
                            Sign up
                        </button>
                    </div>
                )}
            </div>

            {/* <AlertDialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
          <Content>
            <div className="flex justify-between">
              <AlertDialog.Title className="font-bold text-gray-600 text-md">
                Create Group
              </AlertDialog.Title>
            </div>
          </Content>
        </AlertDialog.Portal>
      </AlertDialog.Root> */}
        </div>
    );
};

export default AuthView;

const Overlay = () => {
    return (
        <AlertDialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
    );
};

const Content = ({ children }: { children: React.ReactNode }) => {
    return (
        <AlertDialog.Content className="fixed max-h-screen h-auto max-w-[450px] w-[90vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white py-6 px-4">
            {children}
        </AlertDialog.Content>
    );
};
