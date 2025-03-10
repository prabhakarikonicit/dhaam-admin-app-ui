
const StatCard = ({value,description}: {value: string; description: string;}) => (
    <div className="bg-white rounded-lg p-4 border border-grey-border">
      <div className="text-center">
        <div className="text-[16px] font-inter text-cardValue">{value}</div>
        <div className="text-[12px] font-inter text-headding-color">{description}</div>
      </div>
    </div>
  );

  export default StatCard;