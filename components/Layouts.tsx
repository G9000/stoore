import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useWindowSize } from "react-use";
import { currentScreen } from "libs/breakpoints";
import { ButtonThemeSwitcher, HamburgerMenu } from "components/BaseButton";
import { HiHeart } from "react-icons/hi";

const Layout = ({ children }: any) => {
    const { data: session, status } = useSession();
    const user = session?.user;

    if (user) {
        return (
            <>
                <div className="w-full py-4 px-2 bg-primaryGreen800 text-center text-white text-sm">
                    Stoore still under active development. Your data might lost
                    and we try our best to recover and prevent it from
                    happening.
                </div>
                <Navbar data={user} />
                <div>{children}</div>
            </>
        );
    }

    return (
        <>
            <div>{children}</div>
        </>
    );
};

export default Layout;

const Navbar = (props) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const { image } = props.data;
    const { width } = useWindowSize();

    useEffect(() => {
        if (width < currentScreen.phablet) {
            return setIsMobile(true);
        }
        return setIsMobile(false);
    }, [width]);

    return (
        <nav className="max-w-[90%] 2xl:max-w-[1400px] w-full mx-auto py-6 flex justify-between items-center">
            <div className="flex item-center gap-x-16">
                <a className="text-3xl font-bold text-primaryGreen800">
                    Stoore
                </a>
                {!isMobile && (
                    <ul className="flex items-center gap-x-4">
                        <NavLink>Group</NavLink>
                        <NavLink>Inventory</NavLink>
                    </ul>
                )}
            </div>

            {isMobile ? (
                <div>
                    <HamburgerMenu />
                </div>
            ) : (
                <ul className="flex items-center gap-x-2">
                    <SupportBtn />
                    <ButtonThemeSwitcher />
                    <LogoutBtn />
                    <AvatarBtn imgSrc={image} />
                </ul>
            )}
        </nav>
    );
};

const SupportBtn = () => {
    return (
        <button className=" px-6 h-[40px] flex items-center gap-x-2 rounded-lg bg-primaryGreen800 text-white hover:ring-4 hover:ring-gray-400 hover:ring-opacity-25">
            Buy me a coffee
            <span className="text-rose-500 text-lg">
                <HiHeart />
            </span>
        </button>
    );
};

const LogoutBtn = () => {
    return (
        <button
            onClick={() => signOut()}
            className=" px-6 h-[40px] rounded-lg bg-gray-100 border border-gray-200 text-primaryGreen800 font-bold hover:bg-slate-200"
        >
            Logout
        </button>
    );
};

const NavLink = ({ children }: { children: string }) => {
    return <a className="cursor-pointer">{children}</a>;
};

const AvatarBtn = ({ imgSrc }: { imgSrc: string }) => {
    return (
        <button className="flex items-center">
            <Image
                src={imgSrc ? imgSrc : "/no-avatar.png"}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-lg"
            />
        </button>
    );
};
