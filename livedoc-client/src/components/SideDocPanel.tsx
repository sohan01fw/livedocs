import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SideDocPanel = () => {
  const { isSignedIn, getToken } = useAuth();
  const navigate = useNavigate();
  const handleDoc = async () => {
    if (!isSignedIn) {
      navigate(`/login`);
    }
    const token = await getToken();

    try {
      const response = await axios.get("/docId", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Now navigate to the profile page
      
       navigate(`/document/${response.data.docId}`);

    } catch (error) {
      console.error("Error fetching document ID:", error);
      // Handle error appropriately (e.g., show a message to the user)
    }
  };
  return (
    <div className="border border-black h-screen max-w-8xl p-2">
      <div className="">
        <h2 className=" m-2 bg-gradient-to-r from-cyan-500 to-blue-500 inline-block text-transparent bg-clip-text text-2xl font-semibold">
          LiveDocs
        </h2>
      </div>
      <div className="btn p-4 mt-3" onClick={handleDoc}>
        New doc
      </div>
    </div>
  );
};
