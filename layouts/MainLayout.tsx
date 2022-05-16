import { useSession, signOut } from "next-auth/react";
import { SidebarNav } from "./SideNav";

interface authType {
    email: string;
    name: string;
    imageSrc?: string;
}

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { data: session } = useSession();
    const user = session?.user as authType;

    return (
        <div className="flex">
            <SidebarNav user={user} />
            <div>{children}</div>
        </div>
    );
};

export default Layout;
