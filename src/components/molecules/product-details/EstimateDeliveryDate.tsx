import { DeliverDate } from "@/types/deliveryDate";
import React from "react";

interface EstimateDeliveryProps {
  estimate: DeliverDate;
}

const EstimateDeliveryDate: React.FC<EstimateDeliveryProps> = ({
  estimate,
}) => {
  return (
    <div className="border border-scarlet-red p-2 rounded-md bg-light-gray">
      <h4 className="font-semibold mb-1">Estimated Delivery</h4>
      <p>
        <strong>ETA:</strong> {estimate.eta}
      </p>
      <p>
        <strong>Distance:</strong> {estimate.distance}
      </p>
      <p>
        <strong>Delivery Date:</strong> {estimate.deliveryDate}
      </p>
    </div>
  );
};

export default EstimateDeliveryDate;
