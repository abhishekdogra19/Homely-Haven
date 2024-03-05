import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const SharedLayout: React.FC = () => {
  return (
    <div className="py-4 px-8 flex flex-col min-h-screen max-w-6xl mx-auto ">
      <Header />
      <div className="grow">
        <Outlet />
      </div>
    </div>
  );
};

export default SharedLayout;
// Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et ab repellendus molestiae quis ut, facere possimus, vel labore exercitationem cumque saepe! Tenetur a animi quos doloribus iusto cum voluptate aliquam!
