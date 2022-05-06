import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";
import AuthView from "../modules/authentication";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthChange(event, session);
        if (event === "SIGNED_IN") {
          console.log("we are sign in");
          setAuthenticated(true);
          router.push("/");
        }
        if (event === "SIGNED_OUT") {
          console.log("we are sigining out");
          setAuthenticated(false);
          router.push("/authentication");
        }
      }
    );
    checkUser();
    return () => {
      authListener.unsubscribe();
    };
  }, []);

  async function checkUser() {
    const user = await supabase.auth.user();
    if (user) {
      console.log("user authenticated");
    }
  }

  async function handleAuthChange(event, session) {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  }

  console.log("authenticated", authenticated);

  return <>{authenticated ? <Component {...pageProps} /> : <AuthView />}</>;
}

export default MyApp;
