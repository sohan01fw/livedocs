import { SignIn } from "@clerk/clerk-react"

function Login() {

  return (
    <div className="flex justify-center mt-10">
    <SignIn fallbackRedirectUrl={"/dashboard"}  />
    </div>
  )
}

export default Login