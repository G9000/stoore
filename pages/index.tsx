import type { NextPage } from "next";
import Head from "next/head";
import { supabase } from "../utils/supabaseClient";
import { useState } from "react";

const Home: NextPage = () => {
  const [email, setEmail] = useState<string>();
  const [loading, setLoading] = useState<boolean>();

  const handleRegister = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

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
            handleRegister(email);
          }}
        >
          Register
        </button>
      </main>
    </div>
  );
};

export default Home;
