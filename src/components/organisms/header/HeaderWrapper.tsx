import React from "react";
import TopHeader from "@/components/organisms/header/TopHeader";
import MainHeader from "@/components/organisms/header/MainHeader";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import ContainerBox from "@/components/layout/ContainerBox";
import CategoryList from "@/components/molecules/header/CategoryList";

const HeaderWrapper = () => {
  return (
    <header className="py-2 space-y-2">
      <MaxWidthWrapper>
        <ContainerBox className="space-y-3 py-1.5">
          {/* Top Header*/}
          <TopHeader />
          {/* Main Header*/}
          <MainHeader />
        </ContainerBox>
      </MaxWidthWrapper>
      <div className="border border-t border-b border-[#F9060659]">
        <MaxWidthWrapper>
          <ContainerBox className="py-4">
            {/*Category List*/}
            <CategoryList />
          </ContainerBox>
        </MaxWidthWrapper>
      </div>
    </header>
  );
};

export default HeaderWrapper;
