import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import CreateGroupModal from "@/components/ModalCreateGroup";
import prisma from "@/libs/prisma";

import GroupDashboard from "@/components/GroupDashboard";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // Check if user is authenticated
    const session = await getSession(ctx);
    // const homes = await prisma.home.findMany();
    const groups = await prisma.group.findMany();
    // If not, redirect to the homepage

    if (!session) {
        return {
            redirect: {
                destination: "/authentication",
                permanent: false,
            },
        };
    }

    console.log("current session", session);
    // console.log("current groups", groups);

    return {
        props: {
            session,
            groups: JSON.parse(JSON.stringify(groups)),
        },
    };
};

const Home: NextPage = ({ groups = [] }) => {
    // const router = useRouter();
    // const isAuthenticated = false;

    // const { data: session, status } = useSession();
    // const user = session?.user;
    // console.log("user", user);

    return (
        <div className="py-10">
            <MetaHead />

            <main className="max-w-[90%] 2xl:max-w-[1400px] w-full mx-auto">
                <div className="flex justify-between mt-6">
                    {!groups ? (
                        <div className="flex flex-col justify-center items-center text-center">
                            <h4 className="text-2xl text-primaryGreen800 font-semibold">
                                Create a group
                            </h4>
                            <p className="text-slate-400 mt-2 mb-6 w-2/3">
                                A group can easily allow you to categorize items
                                and invite others to manage them effectively.
                            </p>
                            {/* <CreateGroupBtn /> */}
                            <CreateGroupModal />
                        </div>
                    ) : (
                        <GroupDashboard groups={groups} />
                    )}
                </div>
            </main>
        </div>
    );
};

export default Home;

const MetaHead = () => {
    return (
        <Head>
            <title>Stoore</title>
            <meta name="description" content="Take control of your item now" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
};
