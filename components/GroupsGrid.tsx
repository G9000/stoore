import PropTypes from "prop-types";
import { HiOutlineDotsHorizontal, HiPlus } from "react-icons/hi";

interface groupType {
    id: string;
    name: string;
    image?: string;
    description?: string;
    recipients: number;
    createdAt: string;
    updatedAt: string;
    creatorId: string;
}

const GroupGrid = ({ groups }: { groups: groupType[] }) => {
    console.log("group", groups);
    return (
        <div className="grid grid-cols-4 gap-4">
            {groups.map((group) => (
                <a
                    key={group.id}
                    className="py-4 px-6 flex cursor-pointer flex-col gap-y-4 shadow-sm rounded-md border border-gray-200"
                >
                    <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-gray-800">
                            {group.name}
                        </span>
                        <div></div>
                        <HiOutlineDotsHorizontal />
                    </div>

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <span className="bg-purple-200 text-purple-800 py-2 px-4 text-[12px] font-bold rounded-full">
                            Household
                        </span>
                        <span className="bg-purple-200 text-purple-800 py-2 px-4 text-[12px] font-bold rounded-full">
                            Living room
                        </span>
                        <span className="bg-purple-200 text-purple-800 py-2 px-4 text-[12px] font-bold rounded-full">
                            Kitchen
                        </span>
                    </div>
                </a>
            ))}
        </div>
    );
};

export default GroupGrid;

GroupGrid.propTypes = {
    groups: PropTypes.array,
};
