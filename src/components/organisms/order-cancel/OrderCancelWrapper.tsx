import Section from "@/components/atoms/Section";
import ContainerBox from "@/components/layout/ContainerBox";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import OrderCancel from "@/components/molecules/order-cancel/OrderCancel";

const OrderCancelWrapper = () => {
  return (
    <Section>
      <MaxWidthWrapper>
        <ContainerBox hasBackground={true}>
          <OrderCancel />
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
};

export default OrderCancelWrapper;
