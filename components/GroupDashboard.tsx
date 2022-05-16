import GroupGrid from "@/components/GroupsGrid";
import CreateGroupModal from "@/components/ModalCreateGroup";
import { HiPlus } from "react-icons/hi";

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

const GroupDashboard = ({ groups }: { groups: groupType[] }) => {
    function createGroup() {
        console.log("create group");
    }

    return (
        <div>
            <div className="flex justify-between items-center py-4 mb-10">
                <span className="text-2xl font-bold text-teal-900">
                    Group Dashboard
                </span>
                {/* <button
                    onClick={createGroup}
                    className="flex items-center gap-x-4 py-2 px-4 border rounded-lg bg-slate-50 text-teal-900 font-semibold hover:border hover:border-teal-900 hover:ring-4 hover:ring-gray-400 hover:ring-opacity-25"
                >
                    <HiPlus />
                    Add group
                </button> */}
                <CreateGroupModal />
            </div>
            <GroupGrid groups={groups} />
        </div>
    );
};

export default GroupDashboard;
