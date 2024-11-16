import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { isSignedIn,isLoaded } = useUser();
  const navigate = useNavigate();

  const handleStarted = () => {
    if (!isSignedIn) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  };
  if(!isLoaded){
    return <div>loading...</div>
  }
  return (
    <div>
      <div>
        <h1 className="text-[25px] font-bold">
          Welcome to live doc Edit like a pro <h2 className="text-[30px]">with your friends</h2>
        </h1>
      </div>
      <div className="btn" onClick={handleStarted}>
        {isSignedIn ? <h1>Dashboard</h1> : <h1>Get Started</h1>}
      </div>
    </div>
  );
};

export default Home;
