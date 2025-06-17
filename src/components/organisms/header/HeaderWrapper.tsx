"use client";
import React from "react";
import TopHeader from "@/components/organisms/header/TopHeader";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import ContainerBox from "@/components/layout/ContainerBox";
import CategoryList from "@/components/molecules/header/CategoryList";
import MainHeaderSearchBar from "@/components/molecules/header/MainHeaderSearchBar";
import MainHeaderNavbar from "@/components/molecules/header/MainHeaderNavbar";
import Logo from "@/components/molecules/header/Logo";
import MobileMenu from "@/components/molecules/header/MobileMenu";
import { Category } from "@/types/category";

const HeaderWrapper = ({ categories }: { categories: Category[] }) => {
  return (
    <header className="space-y-3 xl:space-y-2 mb-4 xl:mb-8">
      <MaxWidthWrapper>
        <ContainerBox
          className="space-y-3 px-0 py-0 xl:py-1.5 xl:px-0
        "
        >
          {/* Top Header*/}
          <TopHeader />
          {/* Main Header*/}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex gap-x-3 items-center">
              <MobileMenu categories={categories} />
              <Logo />
            </div>
            {/* Search Bar */}
            <div className="w-full max-w-lg hidden xl:block">
              <MainHeaderSearchBar mode="desktop" />
            </div>
            {/* Main Nav */}
            <MainHeaderNavbar className="justify-center" />
          </div>
        </ContainerBox>
      </MaxWidthWrapper>
      <div className="xl:border-t-2 xl:border-t-scarlet-red xl:shadow-sm xl:border-b-gray-50">
        <MaxWidthWrapper>
          <ContainerBox className="xl:px-0 px-0 py-0 xl:py-4">
            <div className="hidden xl:block">
              <CategoryList categories={categories} />
            </div>
            <div className="block xl:hidden">
              <MainHeaderSearchBar mode="mobile" />
            </div>
          </ContainerBox>
        </MaxWidthWrapper>
      </div>
    </header>
  );
};

export default HeaderWrapper;
