import { TiAdjustBrightness } from "react-icons/ti";
import { HiMenuAlt4 } from "react-icons/hi";

export const ButtonThemeSwitcher = () => {
  const isDark = true;
  return (
    <button className="bg-gray-100 hover:bg-slate-200 px-2 h-[38px] rounded-lg border border-gray-200">
      <span
        className={
          isDark ? "text-[24px] text-amber-500" : "text-[24px] text-gray-100"
        }
      >
        <TiAdjustBrightness />
      </span>
    </button>
  );
};

export const HamburgerMenu = () => {
  return (
    <button className="px-2 h-[38px] rounded-lg bg-primaryGreen800">
      <span className="text-[24px] text-gray-100">
        <HiMenuAlt4 />
      </span>
    </button>
  );
};

interface ButtonPrimaryType {
  label?: string;
  children?: JSX.Element | JSX.Element[];
}
export const ButtonPrimary = ({
  label = "Label",
  children,
}: ButtonPrimaryType) => {
  return (
    <button className="btn-primary bg-gray-100 border border-gray-200 text-primaryGreen800 font-bold hover:bg-slate-200">
      {label}
      {children}
    </button>
  );
};
