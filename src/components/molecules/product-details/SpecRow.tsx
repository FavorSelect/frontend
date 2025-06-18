const SpecRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between py-2">
    <span className="font-medium text-eerie-black">{label}</span>
    <span>{value}</span>
  </div>
);
export default SpecRow;
