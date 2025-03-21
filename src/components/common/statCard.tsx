
const StatCard = ({value,description}: {value: string; description: string;}) => (
    <div className="bg-white rounded-custom p-4 border border-grey-border">
      <div className="text-center">
        <div className="text-[16px] font-inter font-[600] text-cardValue">{value}</div>
        <div className="text-[12px] font-inter font-[400] text-headding-color">{description}</div>
      </div>
    </div>
  );

  export default StatCard;