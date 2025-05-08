import React from "react";
import TopHeader from "@/components/organisms/header/TopHeader";
import MainHeader from "@/components/organisms/header/MainHeader";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import ContainerBox from "@/components/layout/ContainerBox";
import CategoryList from "@/components/molecules/header/CategoryList";

const HeaderWrapper = () => {
  return (
    <header className="space-y-2">
      <MaxWidthWrapper>
        <ContainerBox className="space-y-3 py-1.5">
          {/* Top Header*/}
          <TopHeader />
          {/* Main Header*/}
          <MainHeader />
        </ContainerBox>
      </MaxWidthWrapper>
      <div className="border-t-2 border-t-scarlet-red shadow-sm border-b-gray-50 z-[-]">
        <MaxWidthWrapper>
          <ContainerBox className="py-4">
            <CategoryList />
          </ContainerBox>
        </MaxWidthWrapper>
      </div>
    </header>
  );
};

export default HeaderWrapper;
