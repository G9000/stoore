import type { NextPage } from "next";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useState } from "react";

const Home: NextPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="h-screen flex justify-center">
            <AlertDialog.Root open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialog.Trigger
                    onClick={(event) => {
                        setIsLoading(true);
                        // your async request
                        setTimeout(() => {
                            setIsLoading(false);
                            setIsOpen(true);
                        }, 1000);
                        event.preventDefault();
                    }}
                >
                    {isLoading ? "Logging in..." : "Log in"}
                </AlertDialog.Trigger>
                <AlertDialog.Portal>
                    <AlertDialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
                    <AlertDialog.Content className="fixed max-h-screen h-auto max-w-[450px] w-[90vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white py-6 px-4">
                        <AlertDialog.Title className="mb-5">
                            There was a problem logging in
                        </AlertDialog.Title>
                        <AlertDialog.Cancel className="border">
                            Ok
                        </AlertDialog.Cancel>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        </div>
    );
};

export default Home;
