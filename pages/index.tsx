import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { getSession, useSession, signIn, signOut } from "next-auth/react";
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

  // Pass the data to the Homes component
  return {
    props: {},
  };
}

const Home: NextPage = () => {
  const router = useRouter();
  const isAuthenticated = false;
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push("/authentication");
  //   } else router.push("/");
  // });

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
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
      </main>
    </div>
  );
};

export default Home;
