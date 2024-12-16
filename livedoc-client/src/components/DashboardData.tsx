import { useAuth, useUser } from "@clerk/clerk-react";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type DocData = {
  id: string;
  title: string;
};
export const DashboardData = () => {
  const [docData, setdocData] = useState<AxiosResponse<DocData[]>>();
  const { getToken } = useAuth();
  const { user } = useUser();
  const userData = {
    email: user?.primaryEmailAddress?.emailAddress ?? "",
    user_id: user?.id ?? "",
  };
  useEffect(() => {
    const handleGetDocs = async () => {
      const token = await getToken();
      const getDocs = await axios.post(
        "/get-docs",
        { data: userData, Credential: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (getDocs) {
        setdocData(getDocs.data);
      }
    };
    handleGetDocs();
  }, [getToken]);

  if (!docData) {
    return <div>loading....</div>;
  }

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {docData?.data?.map((data) => {
        return (
          <Link
            to={`/document/${data.id}`}
            key={data.id}
            className="border border-gray-500 w-60 h-40 cursor-pointer"
          >
            <h1>{data.title}</h1>
          </Link>
        );
      })}
    </div>
  );
};
