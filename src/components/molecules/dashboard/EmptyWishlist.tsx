import Link from "next/link";
import React from "react";

const EmptyWishlist = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      {/* Illustration */}
      <div
        className="bg-center bg-no-repeat aspect-video bg-cover rounded-xl w-full max-w-[260px] mb-6"
        style={{
          backgroundImage:
            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD0Y1hv_gFoKtQFy8FDLwDFN-ywqiyoqDrpeGAB07rbUOY_Jc0yKOgdoo9iBEFIaBJyZ4EOJPX_31ubi3HKSI2YrzoaYQLHoqKdwZlNIIi_BJvKS5vs466dKrYPBjql0Y-wpZ7LyGowwGhv4rjb4j_tzVcFTXtu55IrZmGOT6UEUWW9m7KbFryx7KgDKCp0YrnNTeO1id7CkklaOg5Mn8pmTuC1vOdjNd1rl3mLLT5tO1a_9GmRfwJhu6DhG3tieegjJ-gbTgxd0WE")',
        }}
      ></div>

      {/* Text */}
      <div className="flex max-w-[480px] flex-col items-center gap-2 mb-4">
        <p className="text-[#181113] text-lg font-bold tracking-[-0.015em]">
          Your wishlist is empty
        </p>
        <p className="text-[#181113] text-sm font-normal">
          Explore our collections and add your favorite items to your wishlist.
        </p>
      </div>

      {/* CTA Button */}
      <Link
        href="/shop/all"
        className="flex min-w-[84px] max-w-[480px] items-center justify-center h-10 px-4 bg-scarlet-red hover:bg-red-500 transition text-white text-sm font-bold rounded-md"
      >
        <span className="truncate">Start Shopping</span>
      </Link>
    </div>
  );
};

export default EmptyWishlist;
