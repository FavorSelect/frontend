import ContainerBox from "@/components/layout/ContainerBox";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import FooterLogo from "@/components/molecules/footer/FooterLogo";
import BrandInfo from "@/components/molecules/footer/BrandInfo";
import React from "react";
import FooterColumn from "@/components/molecules/footer/FooterColumn";
import DownloadApp from "@/components/molecules/footer/DownloadApp";
import Copyright from "@/components/molecules/footer/Copyright";

const FooterWrapper = () => {
  return (
    <footer className="bg-[#161616] mt-4 xl:mt-8">
      <div className="border h-auto py-4 md:py-0 md:h-[340px] flex items-center">
        <MaxWidthWrapper>
          <ContainerBox>
            <div className="flex flex-col md:flex-row justify-center gap-y-2 sm:gap-y-3 md:gap-x-4">
              <FooterLogo className="flex-1 pr-3 pt-3" />
              <BrandInfo className="flex-1 py-3" />
              <FooterColumn
                title="Account"
                links={[
                  { name: "My Account", href: "/account" },
                  { name: "Login / Register", href: "/login" },
                  { name: "Cart", href: "/cart" },
                  { name: "Shop", href: "/shop" },
                ]}
                className="flex-1 px-3  py-3.5"
              />
              <FooterColumn
                title="Quick Link"
                links={[
                  { name: "Privacy Policy", href: "/privacy" },
                  { name: "Terms Of Use", href: "/terms" },
                  { name: "Blog", href: "/blog" },
                  { name: "Contact", href: "/contact" },
                ]}
                className="flex-1 px-3 py-3"
              />
              <DownloadApp className="flex-1 px-10 py-3" />
            </div>
          </ContainerBox>
        </MaxWidthWrapper>
      </div>
      <div className="border-t border-gray-600 flex items-center justify-center py-5 px-4 sm:px-0">
        <Copyright />
      </div>
    </footer>
  );
};

export default FooterWrapper;
