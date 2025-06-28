"use client";
import ContainerBox from "@/components/layout/ContainerBox";

import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import FooterLogo from "@/components/molecules/footer/FooterLogo";
import BrandInfo from "@/components/molecules/footer/BrandInfo";
import React from "react";
import FooterColumn from "@/components/molecules/footer/FooterColumn";
import DownloadApp from "@/components/molecules/footer/DownloadApp";
import Copyright from "@/components/molecules/footer/Copyright";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { useLogoutMutation } from "@/store/api/authApi";
import { logout } from "@/store/slices/user/userSlice";
import { apiSlice } from "@/store/api/api";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
const FooterWrapper = () => {
  const [logoutApi] = useLogoutMutation();
  const user = useAppSelector((state: RootState) => state.user.userInfo);
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.user.isLoggedIn
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      dispatch(apiSlice.util.resetApiState());
      toast.success("You have been logged out.");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  const accountLinks =
    isLoggedIn && user
      ? [
          { name: "My Account", href: "/dashboard" },
          { name: "Logout", href: "#" },
          { name: "Cart", href: "/cart" },
          { name: "Shop", href: "/shop" },
        ]
      : [
          { name: "Sign Up", href: "/signup" },
          { name: "Login", href: "/login" },
          { name: "Cart", href: "/cart" },
          { name: "Shop", href: "/shop" },
        ];

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
                links={accountLinks}
                onLogout={handleLogout}
                className="flex-1 px-3  py-3.5"
              />
              <FooterColumn
                title="Quick Link"
                links={[
                  { name: "Privacy Policy", href: "/privacy-policy" },
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
