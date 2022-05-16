import Image from "next/image";

type AvatarType = {
    src?: string;
};

export const Avatar = ({ src }: AvatarType) => {
    return (
        <Image
            src={src ? src : "/no-avatar.png"}
            alt="avatar"
            width={40}
            height={40}
            className="rounded-full"
        />
    );
};
