import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode; // Specify that children can be any valid React node
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="md:w-1/2 flex flex-col justify-center items-center p-6 bg-gradient-to-br from-purple-500 to-indigo-500 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Welcome to Dhaam</h1>
        <p className="text-lg text-center">Your Gateway to Effortless Business.</p>
        <div className="w-3/4 mt-6">
          <img 
            src="/illustration.png" 
            alt="Welcome Illustration" 
            className="w-full h-auto"
          />
        </div>
      </div>
      {/* <div className="md:w-1/2 flex justify-center items-center p-6 bg-white">
     

        {children} 
      </div> */}
    </div>
  );
};

export default AuthLayout;