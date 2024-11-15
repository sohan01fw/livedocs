import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const handleStarted = () => {
    if (!isSignedIn) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  };
  return (
    <div>
      <div className="btn" onClick={handleStarted}>
        <h1>Get Started</h1>
      </div>
    </div>
  );
};

export default Home;
