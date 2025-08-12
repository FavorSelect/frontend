"use client";
import React, { useState } from "react";
import ContainerBox from "@/components/layout/ContainerBox";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import FooterLogo from "@/components/molecules/footer/FooterLogo";
import BrandInfo from "@/components/molecules/footer/BrandInfo";
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
import { ChevronDown } from "lucide-react";
import { Facebook, Instagram, Linkedin, X, Youtube } from "@/assets/icon";
import Link from "next/link";
import Image from "next/image";

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

  // Accordion state
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <footer className="bg-[#0d0d0d] mt-4 xl:mt-8 text-white">
      <MaxWidthWrapper>
        <ContainerBox>
          {/* Desktop View */}
          <div className="hidden md:flex justify-center gap-x-4 py-4">
            <FooterLogo className="flex-1 pr-3 pt-3" />
            <BrandInfo className="flex-1 py-3" />
            <FooterColumn
              title="Account"
              links={accountLinks}
              onLogout={handleLogout}
              className="flex-1 px-3 py-3.5"
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
      {/* Mobile View */}
      <div className="flex flex-col md:hidden divide-y divide-gray-700">
        <div className="py-6 border-b border-[#2a2a2a] flex flex-col items-center gap-y-6">
          <FooterLogo />
          <ul className="flex gap-x-3 items-center text-white justify-center">
            <li>
              <Link
                href="https://instagram.com/FavorSelect"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="hover:text-scarlet-red transition-colors duration-150 ease-in-out" />
              </Link>
            </li>
            <li>
              <Link
                href="https://youtube.com/@FavorSelect"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="hover:text-scarlet-red transition-colors duration-150 ease-in-out" />
              </Link>
            </li>
            <li>
              <Link
                href="https://facebook.com/favorselectofficial"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="hover:text-scarlet-red transition-colors duration-150 ease-in-out" />
              </Link>
            </li>
            <li>
              <Link
                href="https://x.com/@FavorSelect"
                target="_blank"
                rel="noopener noreferrer"
              >
                <X className="hover:text-scarlet-red transition-colors duration-150 ease-in-out" />
              </Link>
            </li>
            <li>
              <Link
                href="https://linkedin.com/company/favorselect"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="hover:text-scarlet-red transition-colors duration-150 ease-in-out" />
              </Link>
            </li>
          </ul>
        </div>

        {[
          {
            id: "support",
            title: "Support",
            content: <BrandInfo isTitle={false} className="pl-2 pb-2" />,
          },
          {
            id: "account",
            title: "Account",
            content: (
              <FooterColumn
                links={accountLinks}
                onLogout={handleLogout}
                className="pl-2 pb-2"
              />
            ),
          },
          {
            id: "quicklink",
            title: "Quick Link",
            content: (
              <FooterColumn
                links={[
                  { name: "Privacy Policy", href: "/privacy-policy" },
                  { name: "Terms Of Use", href: "/terms" },
                  { name: "Blog", href: "/blog" },
                  { name: "Contact", href: "/contact" },
                ]}
                className="pl-2 pb-2"
              />
            ),
          },
          {
            id: "favorselectBlog",
            title: "FavorSelect blog",
            content: (
              <FooterColumn
                links={[
                  { name: "Privacy Policy", href: "/privacy-policy" },
                  { name: "Terms Of Use", href: "/terms" },
                  { name: "Blog", href: "/blog" },
                  { name: "Contact", href: "/contact" },
                ]}
                className="pl-2 pb-2"
              />
            ),
          },
        ].map((section) => (
          <div key={section.id} className="px-[17px] border-b border-[#2a2a2a]">
            <button
              className="w-full flex justify-between items-center cursor-pointer py-4 text-sm uppercase"
              onClick={() => toggleSection(section.id)}
              aria-expanded={openSection === section.id}
            >
              <span className="font-semibold">{section.title}</span>
              <ChevronDown
                size={20}
                className={`transform transition-transform duration-300 ${
                  openSection === section.id ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`collapsible-content ${
                openSection === section.id ? "open" : ""
              }`}
            >
              <div className="py-3 px-2.5 bg-black">{section.content}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="block md:hidden text-white py-8 px-4 text-center">
        {/* Title */}
        <h2 className="text-sm font-bold uppercase mb-4 tracking-wide">
          Our Partners
        </h2>

        {/* Sponsors */}
        <div className="flex justify-center gap-6 mb-4 text-sm">
          <span>Sponsor 1</span>
          <span>Sponsor 2</span>
          <span>Sponsor 3</span>
        </div>

        {/* 18+ Badge with Name */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <div className="bg-scarlet-red text-white text-xs font-bold rounded-full px-2 py-0.5">
            18+
          </div>
          <span className="text-sm">John S</span>
        </div>

        {/* Logos */}
       <div className="flex justify-center items-center gap-8 flex-wrap">
 <Image
  src="/powered-by-favor.png"
  alt="Powered by Favor"
  width={120}
  height={60}
  className="object-contain"
  style={{
    filter: 'brightness(0) invert(1)',
    height: '60px',
    width: 'auto'
  }}
/>
  <Image
    src="/ssl-certificate.png"
    alt="SSL Secure"
    width={120}
    height={60}
    className="object-contain"
    style={{
      height: '60px',
      width: 'auto'
    }}
  />
</div>
</div>
      
      <div className="border-t border-[#2a2a2a] flex items-center justify-center py-5 px-4 sm:px-0">
        <Copyright />
      </div>
    </footer>
  );
};

export default FooterWrapper;
