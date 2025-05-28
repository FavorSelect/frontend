"use client";
import Section from "@/components/atoms/Section";
import ContainerBox from "@/components/layout/ContainerBox";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import AccountHeading from "@/components/molecules/dashboard/AccountHeading";
import Sidebar from "@/components/molecules/dashboard/Sidebar";
import UserProfile from "@/components/molecules/dashboard/UserProfile";
import { RootState } from "@/store/store";
import {
  CreditCard,
  Heart,
  HelpCircle,
  Settings,
  ShoppingBag,
  StarHalf,
  Truck,
  User,
} from "lucide-react";
import { useSelector } from "react-redux";

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
    label: "Account Setting",
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
  const user = useSelector((state: RootState) => state.user.userInfo);

  return (
    <Section className="py-8">
      <MaxWidthWrapper>
        <ContainerBox className="font-montserrat">
          <div className="flex gap-4 h-full">
            <div className="bg-white shadow-sm px-4 py-2.5 rounded-lg space-y-4">
              <AccountHeading />
              <UserProfile
                name={user?.name || "Guest User"}
                membership="FavorSelect Member"
                profileImage={user?.profileImage || "/user.jpg"}
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
