import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import useAuth from "../../hooks/useAuth";
import { Alert, Avatar, Spinner } from "keep-react";
import { FaUserAstronaut } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { sendEmailVerification } from "firebase/auth";

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

  const handleEmailVerify = () => {
    sendEmailVerification(userData);
  };

  return (
    <>
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
      {!userData.emailVerified && (
        <div className="fixed bottom-0 right-0 z-10 p-4">
          <Alert
            color="warning"
            className="con-bg border-color rounded-md border"
            additionalContent={
              <p className="text-sm">
                Please verify your email address.
                <button
                  onClick={handleEmailVerify}
                  className="link mx-1"
                  type="button"
                >
                  click here
                </button>
                to send verification mail on your mail address.
              </p>
            }
            icon={<BsInfoCircle size={24} color="#D8A800" />}
            title="Verify email address!"
          />
        </div>
      )}
    </>
  );
};

export default Profile;
