import { FC } from "react";
import { DualRangeSlider } from "../slider/DualRangeSlider";

type RangeSliderProps = {
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
  min: number;
  max: number;
  valueType?: string;
};

const ProductPriceRangeFilter: FC<RangeSliderProps> = ({
  value,
  onValueChange,
  min,
  max,
  valueType = "$",
}) => {
  return (
    <div>
      <div className="transform translate-y-5">
        <DualRangeSlider
          label={(value) => (
            <span className="relative px-2 py-1 rounded-md bg-white shadow-md inline-block after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-t-[6px] after:border-t-white after:border-l-[6px] after:border-l-transparent after:border-r-[6px] after:border-r-transparent">
              {value}
              {valueType}
            </span>
          )}
          value={value}
          onValueChange={onValueChange}
          min={min}
          max={max}
          step={1}
        />
      </div>
    </div>
  );
};

export default ProductPriceRangeFilter;
