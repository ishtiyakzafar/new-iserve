"use client";
import useScreenWidth from "@/app/hooks/useScreenWidth";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

type GoogleJwtPayload = {
  email: string;
};

const GoogleLoginButton = ({ setApplicationStep, setEmail }: any) => {
  const screenWidth = useScreenWidth();

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <GoogleLogin
        onSuccess={(response) => {
          const userData = jwtDecode<GoogleJwtPayload>(response.credential!);
          console.log("Login Success:", userData);
          setApplicationStep("4");
          setEmail(userData.email);
        }}
        width={screenWidth > 768 ? "400px" : `${screenWidth - 80}px`}
        onError={() => console.log("Login Failed")}
      />
    </div>
  );
};

export default GoogleLoginButton;