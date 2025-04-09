"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";

const AuthProvider = ({ children }: any) => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      {children}
    </GoogleOAuthProvider>
  )
};

export default AuthProvider;