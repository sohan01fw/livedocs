import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect } from "react";

type User = {
  name?: string;
  email: string;
  user_id: string;
  imageUrl?: string;
  isLoggedIn: boolean;
  fullname: string;
};
type UserLogout = {
  name: string;
  email: string;
  isLoggedIn: boolean;
};
const Navbar = () => {
  const { signOut } = useClerk();
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();
  useEffect(() => {
    const userData: User = {
      email: user?.primaryEmailAddress?.emailAddress ?? "",
      name: "",
      fullname: user?.fullName ?? "",
      user_id: user?.id ?? "",
      imageUrl: user?.imageUrl,
      isLoggedIn: isSignedIn ?? true,
    };
    async function sendUserData() {
      const token = await getToken();

      try {
        await axios.post(
          "/user",
          {
            Credential: true,
            data: userData,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } catch (error) {
        console.log(error);
      }
    }

    sendUserData();
  }, [user]);

  const handleLogout = async () => {
    const token = await getToken();
    const logoutData: UserLogout = {
      email: user?.primaryEmailAddress?.emailAddress ?? "",
      name: user?.firstName ?? "",
      isLoggedIn: false,
    };
    await axios.post(
      "/logout-user",
      {
        Credential: true,
        data: logoutData,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    signOut({ redirectUrl: "/" });
  };

  return (
    <div className="navbar bg-base-100 p-3">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">
          Welcome, <span>{user?.firstName}</span>
        </a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={user?.imageUrl} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <h4 onClick={handleLogout}>Logout</h4>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
