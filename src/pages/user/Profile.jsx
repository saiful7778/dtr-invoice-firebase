import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import useAuth from "../../hooks/useAuth";
import { Avatar, Spinner } from "keep-react";
import { FaUserAstronaut } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const { userData } = useAuth();
  const { data: user, isLoading } = useQuery({
    queryKey: [userData.displayName, "profile"],
    queryFn: async () => {
      const data = await getDoc(doc(db, "users", userData.uid));
      if (data.exists()) return data.data();
      return {};
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner color="info" size="xl" />
      </div>
    );
  }

  if (Object.keys(user).length === 0) {
    return <div className="text-center text-3xl font-bold">No Data Found!</div>;
  }

  const { userPhoto, userName, userEmail, userRole } = user;
  return (
    <div className="mx-auto w-fit text-center">
      <Avatar
        className="mx-auto mb-6 w-fit cursor-pointer"
        shape="circle"
        size="2xl"
        bordered={true}
        img={userPhoto}
      />
      <h3 className="text-3xl font-bold">{userName}</h3>
      <p className="text-gray-500">{userEmail}</p>
      <div className="mt-4 flex items-center justify-center gap-2 font-medium">
        <div className="con-bg border-color rounded border px-2 py-1.5">
          <FaUserAstronaut />
        </div>
        <span>:</span>
        <div className="capitalize">{userRole}</div>
      </div>
    </div>
  );
};

export default Profile;
