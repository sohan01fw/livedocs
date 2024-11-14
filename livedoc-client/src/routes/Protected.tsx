import { useAuth } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Protected() {
  const { isLoaded, isSignedIn } = useAuth()
  const navigate = useNavigate();

  if (!isLoaded) {
    // Handle loading state however you like
    return <div>Loading...</div>
  }

  if (!isSignedIn) {
    navigate("/login")
  }
   
  return (
    <Outlet />
  )
}