import { user, users } from "@/apptypes/types";
import { UserComp } from "./UserComp";

export const UserDisplay = ({ users }: { users: users }) => {
  return (
    <div className="w-full h-fit py-2.5  rounded-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 mt-5">
      {users && users.length > 0 ? (
        users.map((user: user) => <UserComp user={user} key={user._id} />)
      ) : (
        <div className="w-full h-fit grid grid-cols-1 items-center justify-center p-2.5 border-b-2 border-white">
          <h2 className="text-white font-medium text-xl capitalize">
            There is no use to show!
          </h2>
        </div>
      )}
    </div>
  );
};
