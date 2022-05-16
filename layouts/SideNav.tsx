import { Avatar } from "@/primitives/Avatar";
import { HiHome, HiCog, HiCube, HiViewGrid } from "react-icons/hi";

interface authType {
    email: string;
    name: string;
    image?: string;
}

export const SidebarNav = ({ user }: { user: authType }) => {
    const sideLinkStyle =
        "flex items-center gap-x-4 py-2 px-4 cursor-pointer group font-semibold text-teal-900 text-opacity-60 hover:bg-teal-900 hover:bg-opacity-5";
    const sideIconStyle =
        "bg-slate-200 h-10 w-10 flex items-center justify-center rounded-lg group-hover:bg-teal-900 group-hover:text-white";

    return (
        <div className="max-w-[225px] w-full h-screen bg-gray-50 py-16">
            <div className="flex items-center gap-x-4 px-4">
                <Avatar src={user.image} />
                <span className="text-teal-800 font-bold text-lg">
                    {user.name}
                </span>
            </div>

            <ul className="flex flex-col mt-8">
                <a className={sideLinkStyle}>
                    <div className={sideIconStyle}>
                        <HiHome className="text-xl" />
                    </div>
                    <span>Everything</span>
                </a>
                <a className={sideLinkStyle}>
                    <div className={sideIconStyle}>
                        <HiViewGrid className="text-xl" />
                    </div>
                    <span>Groups</span>
                </a>
                <a className={sideLinkStyle}>
                    <div className={sideIconStyle}>
                        <HiCube className="text-xl" />
                    </div>
                    <span>Items</span>
                </a>
                <a className={sideLinkStyle}>
                    <div className={sideIconStyle}>
                        <HiCog className="text-xl" />
                    </div>
                    <span>Settings</span>
                </a>
            </ul>
        </div>
    );
};
