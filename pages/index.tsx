import type { NextPage } from "next";
import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { HiPlus } from "react-icons/hi";
import CreateGroupModal from "@/components/ModalCreateGroup";

export async function getServerSideProps(ctx) {
  // Check if user is authenticated
  const session = await getSession(ctx);
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

  return {
    props: {
      session,
    },
  };
}

const Home: NextPage = () => {
  const router = useRouter();
  const isAuthenticated = false;

  const { data: session, status } = useSession();
  const user = session?.user;
  // console.log("user", user);

  return (
    <div className="py-10">
      <MetaHead />

      <main className="max-w-[90%] 2xl:max-w-[1400px] w-full mx-auto">
        <div className="flex justify-center items-center h-[550px] mt-6 px-4 bg-slate-50">
          <div className="flex flex-col justify-center items-center text-center">
            <h4 className="text-2xl text-primaryGreen800 font-semibold">
              Create a group
            </h4>
            <p className="text-slate-400 mt-2 mb-6 w-2/3">
              A group can easily allow you to categorize items and invite others
              to manage them effectively.
            </p>
            {/* <CreateGroupBtn /> */}
            <CreateGroupModal />
          </div>
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

const CreateGroupBtn = () => {
  return (
    <button className="px-6 h-[40px] flex items-center gap-x-4 rounded-lg bg-gray-100 border border-gray-200 text-primaryGreen800 font-bold hover:bg-slate-200">
      <span className="text-xl">
        <HiPlus />
      </span>
      Create a new Group
    </button>
  );
};
