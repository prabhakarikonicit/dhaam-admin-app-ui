
interface StatCardProps {
  value: string;
  description: string;
  descriptionFirst?: boolean; // Optional prop to control layout
  icon?: React.ReactNode; // New prop for optional icon
}

const StatCard = ({ value, description, descriptionFirst = false, icon }: StatCardProps) => (
  <div className="bg-white rounded-custom p-4 border border-grey-border">
    {icon ? (
      // Layout with icon
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0 border border-custom4px p-4 bg-background-grey">
          {icon}
        </div>
        <div>
          {descriptionFirst ? (
            <>
              <div className="text-[12px] font-inter font-[400] text-headding-color">{description}</div>
              <div className="text-[16px] font-inter font-[600] text-cardValue">{value}</div>
            </>
          ) : (
            <>
              <div className="text-[16px] font-inter font-[600] text-cardValue">{value}</div>
              <div className="text-[12px] font-inter font-[400] text-headding-color">{description}</div>
            </>
          )}
        </div>
      </div>
    ) : (
      // Original centered layout without icon
      <div className="text-center">
        {descriptionFirst ? (
          <>
            <div className="text-[12px] font-inter font-[400] text-headding-color">{description}</div>
            <div className="text-[16px] font-inter font-[600] text-cardValue">{value}</div>
          </>
        ) : (
          <>
            <div className="text-[16px] font-inter font-[600] text-cardValue">{value}</div>
            <div className="text-[12px] font-inter font-[400] text-headding-color">{description}</div>
          </>
        )}
      </div>
    )}
  </div>
);

export default StatCard;


