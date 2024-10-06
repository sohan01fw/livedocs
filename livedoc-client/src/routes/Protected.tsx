import { useAuth } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";

export default function Protected() {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) {
    // Handle loading state however you like
    return <div>Loading...</div>
  }

  if (!isSignedIn) {
    // Handle signed out state however you like
    return <div>Sign in to view this page</div>
  }
   
  return (
    <Outlet />
  )
}