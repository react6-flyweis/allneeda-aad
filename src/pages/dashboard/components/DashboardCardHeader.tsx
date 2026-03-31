import React from "react";

interface DashboardCardHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
  subtitleColor?: string;
}

const DashboardCardHeader: React.FC<DashboardCardHeaderProps> = ({
  title,
  subtitle,
  actions,
  className = "",
  subtitleColor = "text-[#717182]",
}) => {
  return (
    <div
      className={`flex justify-between items-start flex-wrap gap-2 mb-1 ${className}`}
    >
      <div>
        <h4 className="md:text-xl text-lg font-normal text-[#0A0A0A]">
          {title}
        </h4>
        {subtitle && (
          <p className={`md:text-base text-xs ${subtitleColor} sm:mb-4 mb-2`}>
            {subtitle}
          </p>
        )}
      </div>

      {actions && <div className="ml-auto flex items-center">{actions}</div>}
    </div>
  );
};

export default DashboardCardHeader;
