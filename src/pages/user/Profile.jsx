import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import useAuth from "../../hooks/useAuth";
import { Avatar, Spinner } from "keep-react";

const Profile = () => {
  const { userData } = useAuth();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        if (userData) {
          const docRef = userData?.uid.toString();
          const data = await getDoc(doc(db, "users", userData.uid));
          if (data.exists()) {
            setUser(data.data());
          } else {
            setUser({});
          }
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    })();
  }, [userData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner color="info" size="xl" />
      </div>
    );
  }
  console.log(user);
  return (
    <div>
      <Avatar
        className="cursor-pointer"
        shape="circle"
        size="md"
        bordered={true}
        img={user?.photoURL}
      />
    </div>
  );
};

export default Profile;
