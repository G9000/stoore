import * as Dialog from "@radix-ui/react-dialog";
import { HiX } from "react-icons/hi";

const CreateGroupModal = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button>Click here</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <div className="flex justify-between">
            <Dialog.Title className="font-bold text-gray-600 text-md">
              Create Group
            </Dialog.Title>
            <button className="text-xl">
              <HiX />
            </button>
          </div>

          <Dialog.Description className="mt-4">
            This is description
          </Dialog.Description>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateGroupModal;

const Overlay = () => {
  return <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />;
};

const Content = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <Dialog.Content className="fixed max-h-screen max-w-[450px] w-[90vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white py-6 px-4">
      {children}
    </Dialog.Content>
  );
};

const Field = () => {
  return (
    <fieldset>
      <label>Group name</label>
      <input id="group-name" type="text" />
    </fieldset>
  );
};
