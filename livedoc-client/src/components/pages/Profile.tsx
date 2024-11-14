import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

function Profile() {

    const {isSignedIn, isLoaded} = useUser();

    if(!isLoaded){
        return <div>loading...</div>
    }
    if(!isSignedIn){
        return <Navigate to="/login" />
    }
   return (
    <div>profile</div>
  )
}

export default Profile


