import React from "react";
import { X } from "lucide-react";

interface QuickActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuickActionsModal: React.FC<QuickActionsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const actions = [
    { label: "Create Ticket", onClick: () => console.log("Create Ticket") },
    { label: "Start Incident", onClick: () => console.log("Start Incident") },
    { label: "Run Diagnostics", onClick: () => console.log("Run Diagnostics") },
    {
      label: "Request Approval.",
      onClick: () => console.log("Request Approval"),
    },
  ];

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-[#0a1628]/40 backdrop-blur-[2px]"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-[14px] w-full max-w-[750px] p-8 md:p-10 relative shadow-2xl animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-[#1E1E1E] hover:opacity-70 transition-opacity"
        >
          <X size={28} className="stroke-2" />
        </button>

        <div className="mb-10">
          <h2 className="md:text-2xl text-xl font-bold text-[#000000CC]  leading-tight mb-2 font-[poppins]">
            Quick Action
          </h2>
          <p className="md:text-base text-sm text-[#717182] font-normal ">
            Frequently Used Actions
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-6 gap-y-5">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => {
                action.onClick();
                onClose();
              }}
              className="bg-[#0E1E38] text-white md:text-base text-xs font-normal py-2.5 md:px-4 px-2 rounded-[8px] hover:bg-[#152945] transition-all cursor-pointer  text-center"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActionsModal;
