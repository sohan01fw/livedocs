import { SignIn } from "@clerk/clerk-react"

function Login() {

  return (
    <SignIn fallbackRedirectUrl={"/dashboard"} />
  )
}

export default Login