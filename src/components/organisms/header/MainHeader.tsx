import React from "react";
import Logo from "@/components/molecules/header/Logo";
import MainHeaderNavbar from "@/components/molecules/header/MainHeaderNavbar";
import MainHeaderSearchBar from "@/components/molecules/header/MainHeaderSearchBar";

const MainHeader = () => {
  return (
    <div className="flex items-center justify-between sticky top-0">
      {/* Logo */}
      <Logo />
      {/* Search Bar */}
      <MainHeaderSearchBar />
      {/* Main Nav */}
      <MainHeaderNavbar className="justify-center" />
    </div>
  );
};

export default MainHeader;
