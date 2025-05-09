import useScreenWidth from "@/app/hooks/useScreenWidth";
import { GoogleJwtPayload, GoogleLoginButtonProps } from "@/interfaces/account";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ setApplicationStep, setEmail, setGoogleUser, setConsent }) => {
  const screenWidth = useScreenWidth();

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <GoogleLogin
        onSuccess={(response) => {
          const userData = jwtDecode<GoogleJwtPayload>(response.credential!);
          setConsent("SE");
          setGoogleUser(userData);
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