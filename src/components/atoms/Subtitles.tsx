import React from "react";

const Subtitle = ({ title }: { title: string }) => {
  return (
    <h4 className="uppercase font-extrabold text-base sm:text-lg text-white">
      {title}
    </h4>
  );
};

export default Subtitle;
