import type { NextPage } from "next";
import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

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
    <div>
      <Head>
        <title>Stoore</title>
        <meta name="description" content="Take control of your item now" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <main>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          Register
        </button>
      </main> */}
    </div>
  );
};

export default Home;
