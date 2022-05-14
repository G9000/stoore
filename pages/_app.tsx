import "styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider as AuthProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import Layout from "@/components/Layouts";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <AuthProvider session={session}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
            <Toaster />
        </AuthProvider>
    );
}

export default MyApp;
