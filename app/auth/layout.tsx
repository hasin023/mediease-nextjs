import type React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="h-full flex items-center justify-center bg-cover z-50 bg-center min-h-screen bg-no-repeat"
      style={{ backgroundImage: `url('/iutmedical.jpg')` }}
    >
      {children}
    </div>
  );
};

export default AuthLayout;
