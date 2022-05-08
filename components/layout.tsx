import { useSession } from "next-auth/react";
import Image from "next/image";

const Layout = ({ children }: any) => {
  const { data: session, status } = useSession();
  const user = session?.user;

  if (user) {
    return (
      <div className="max-w-[90%] 2xl:max-w-[1400px] w-full mx-auto py-6">
        <Navbar data={user} />
        <div>{children}</div>
      </div>
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
  const { image } = props.data;
  return (
    <nav className="flex justify-between items-center">
      <div>Stoore</div>
      <ul>
        <button className="py-2 px-6 border border-primaryBrandRed rounded-md hover:bg-primaryBrandRed text-primaryBrandRed hover:text-white font-bold hover:ring-4 hover:ring-purple-100 transition-colors">
          Logout
        </button>
        {/* <Image
          src={image}
          alt="avatar"
          width={32}
          height={32}
          className="rounded-full"
        /> */}
      </ul>
    </nav>
  );
};
