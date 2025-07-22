"use client";
import React from "react";
import Section from "@/components/atoms/Section";
import ContainerBox from "@/components/layout/ContainerBox";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import AccountHeading from "@/components/molecules/dashboard/AccountHeading";
import Sidebar from "@/components/molecules/dashboard/Sidebar";
import UserProfile from "@/components/molecules/dashboard/UserProfile";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setMenu } from "@/store/slices/humburger/hamburgerSlice";
import { RootState } from "@/store/store";
import {
  CreditCard,
  Heart,
  HelpCircle,
  Menu,
  Settings,
  ShoppingBag,
  StarHalf,
  Truck,
  User,
} from "lucide-react";
import { Drawer } from "vaul";

const tabs = [
  {
    label: "My Orders",
    icon: <ShoppingBag className="w-5 h-5" />,
    href: "/dashboard/orders",
  },
  {
    label: "My Reviews",
    icon: <StarHalf className="w-5 h-5" />,
    href: "/dashboard/reviews",
  },
  {
    label: "Wishlist",
    icon: <Heart className="w-5 h-5" />,
    href: "/dashboard/wishlist",
  },
  {
    label: "Personal Information",
    icon: <User className="w-5 h-5" />,
    href: "/dashboard/personal-information",
  },
  {
    label: "Shipping Address",
    icon: <Truck className="w-5 h-5" />,
    href: "/dashboard/shipping-address",
  },
  {
    label: "Payment Methods",
    icon: <CreditCard className="w-5 h-5" />,
    href: "/dashboard/payment-method",
  },
  {
    label: "Account Settings",
    icon: <Settings className="w-5 h-5" />,
    href: "/dashboard/account-setting",
  },
  {
    label: "Need help and Questions?",
    icon: <HelpCircle className="w-5 h-5" />,
    href: "/dashboard/support",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAppSelector((state: RootState) => state.user.userInfo);
  const dispatch = useAppDispatch();
  const userPanelOpen = useAppSelector(
    (state: RootState) => state.hamburger.isOpen
  );

  const handleOpenChange = (open: boolean) => {
    dispatch(setMenu(open));
  };

  return (
    <Section className="py-8">
      <MaxWidthWrapper>
        {/* Mobile: Drawer Trigger */}
        <Drawer.Root
          dismissible
          open={userPanelOpen}
          onOpenChange={handleOpenChange}
          direction="left"
        >
          <Drawer.Trigger asChild>
            <button className="inline-flex xl:hidden items-center cursor-pointer gap-x-1.5 pl-4 font-semibold text-sm">
              <Menu /> User Menu
            </button>
          </Drawer.Trigger>

          {/* Drawer Content */}
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
            <Drawer.Content className="fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-lg flex flex-col p-4 space-y-4">
              <Drawer.Title className="sr-only" />
              <AccountHeading />
              <UserProfile
                name={user?.name || "Guest User"}
                membership="FavorSelect Member"
                profileImage={user?.profileImage || "/user.jpg"}
                verified={true}
              />
              <Sidebar tabs={tabs} defaultTab="/dashboard/orders" />
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>

        {/* Desktop: Static Sidebar */}
        <ContainerBox className="font-montserrat">
          <div className="flex gap-4 relative">
            <div className="hidden xl:block bg-white shadow-sm px-4 py-2.5 rounded-lg space-y-4 w-64">
              <AccountHeading />
              <UserProfile
                name={user?.name || "Guest User"}
                membership="FavorSelect Member"
                profileImage={user?.profileImage}
                verified={true}
              />
              <Sidebar tabs={tabs} defaultTab="/dashboard/orders" />
            </div>
            <div className="bg-white shadow-sm px-5 py-2.5 flex-1 rounded-lg">
              {children}
            </div>
          </div>
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
}
