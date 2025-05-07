import Paragraph from "@/components/atoms/Paragraph";
import Span from "@/components/atoms/Span";
import Link from "next/link";
import React from "react";

const ProductDescription = () => {
  return (
    <div className="text-gray-800 space-y-6">
      {/* Description */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <Paragraph>
          See it through. Feel glam in our cape, with sparkling beaded detailing
          and a statement fringe feature which creates enchanting movement.
          Style it with denim shorts and cowboy boots for a stellar festival
          look.
        </Paragraph>
        <Paragraph className="mt-2">
          Beaded Tassel Hem Cape Sparkling Beaded Design Statement Tassel
          Hemline High Neckline Hook and Eye Front Fastening.
        </Paragraph>
        <Paragraph className="mt-2 text-sm text-gray-600">
          Model wears a size M (US size 6/UK size 10).
        </Paragraph>
        <Paragraph className="text-sm text-gray-500 mt-1">
          SKU: BGG16345-163-33
        </Paragraph>
      </div>

      {/* Product Details & Care */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Product Details & Care</h2>
        <Paragraph>100% Polyester</Paragraph>
      </div>

      {/* Delivery */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Delivery</h2>
        <ul className="space-y-1">
          <li className="flex justify-between">
            <Span>Standard Delivery (Up To 4 Working Days)</Span>
            <Span>$3.99</Span>
          </li>
          <li className="flex justify-between">
            <Span>Next Day Delivery (Order by 11pm or 9pm On Saturday)</Span>
            <Span>$5.99</Span>
          </li>
          <li className="flex justify-between">
            <Span>
              Premium DPD Next Day Delivery (Order before 5pm Mon-Fri and 3pm
              Sat-Sun)
            </Span>
            <Span>$7.99</Span>
          </li>
          <li className="flex justify-between">
            <Span>
              Northern Ireland Standard Delivery (Up to 6 Working Days)
            </Span>
            <Span>$6.99</Span>
          </li>
          <li className="mt-2 text-sm text-gray-700">
            Premier - unlimited free delivery for a year with Premier Delivery
            for $14.99
          </li>
        </ul>

        <Paragraph className="text-sm text-gray-600 mt-2">
          Please note, some delivery methods are not available for products
          delivered by our brand partners & they may have longer delivery times.
        </Paragraph>
      </div>

      {/* Returns */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Returns</h2>
        <Paragraph>
          You have 28 days from the day you receive it, to send something back.
        </Paragraph>
        <Paragraph className="mt-2 text-sm text-gray-700">
          Please note, we cannot offer refunds on fashion face masks, cosmetics,
          pierced jewellery, adult toys and swimwear or lingerie if the hygiene
          seal is not in place or has been broken.
        </Paragraph>
        <Paragraph className="mt-2 text-sm text-gray-700">
          Items of footwear and/or clothing must be unworn and unwashed with the
          original labels attached. Also, footwear must be tried on indoors.
        </Paragraph>
        <Paragraph className="mt-2 text-sm text-gray-700">
          Items of homeware including bedlinen, mattresses and toppers, and
          pillows must be unused and in their original unopened packaging. This
          does not affect your statutory rights.
        </Paragraph>
        <Link href="#" className="text-scarlet-red underline mt-2 block">
          Click here to view our full Returns Policy
        </Link>
      </div>
    </div>
  );
};

export default ProductDescription;
