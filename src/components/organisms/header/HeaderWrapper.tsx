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
import { useScrollDirection } from "@/utils/useScrollDirection";
import { cn } from "@/utils/cn";

const HeaderWrapper = ({ categories }: { categories: Category[] }) => {
  const scrollDirection = useScrollDirection();
  return (
    <header className="space-y-1 xl:space-y-2 mb-4 backdrop-blur-sm xl:mb-8 fixed w-full top-0 no-scrollbar z-30 bg-white  xl:shadow-sm">
      <MaxWidthWrapper>
        <ContainerBox
          className="space-y-3 px-0 py-0 sm:py-0 sm:px-0 xl:py-1.5 xl:px-0
        "
        >
          <TopHeader scrollDirection={scrollDirection} />
          {/* Main Header*/}
          <div className="relative z-30">
            <div
              className={cn(
                "flex items-center justify-between transform transition-transform duration-300 ease-in-out",
                scrollDirection === "down"
                  ? "-translate-y-full xs:translate-y-0"
                  : "translate-y-0"
              )}
            >
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
          </div>
        </ContainerBox>
      </MaxWidthWrapper>
      <div className="xl:border-t-2 xl:border-t-scarlet-red">
        <MaxWidthWrapper>
          <ContainerBox className="xl:px-0 px-0 py-0 xl:py-4">
            <div className="hidden xl:block">
              <CategoryList categories={categories} />
            </div>
            <div
              className={cn(
                "block xl:hidden transform transition-transform duration-300",
                scrollDirection === "down"
                  ? " -translate-y-5 xs:translate-y-0"
                  : "-translate-y-0 mt-2 xs:mt-0"
              )}
            >
              <MainHeaderSearchBar mode="mobile" />
            </div>
          </ContainerBox>
        </MaxWidthWrapper>
      </div>
    </header>
  );
};

export default HeaderWrapper;
