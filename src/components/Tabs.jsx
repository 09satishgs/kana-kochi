import React, { useState } from "react";

export const Tab = ({ label, className = "", children }) => {
  // Validation: label is required
  if (!label) {
    console.error("❌ Tab component is missing the required 'label' prop.");

    return (
      <div className="p-4 text-red-400 bg-red-900/20 border border-red-800 rounded-lg">
        Tab Error: Missing required <strong>label</strong> prop.
      </div>
    );
  }

  return <div className={className}>{children}</div>;
};

export const Tabs = ({ children }) => {
  const tabsArray = React.Children.toArray(children);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full text-gray-200">
      {/* Tab Buttons */}
      <div className="flex border-b border-gray-800 pb-2">
        {tabsArray.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`
              flex-1 text-center px-4 py-2 text-sm rounded-md transition-all
              ${
                activeIndex === index
                  ? "bg-gray-800 text-white border border-gray-600"
                  : "bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 border border-transparent"
              }
            `}
          >
            {tab.props.label ?? "No Label"}
          </button>
        ))}
      </div>

      {/* Active Content */}
      <div className="mt-4 p-4 bg-gray-900 rounded-xl border border-gray-800 shadow-inner">
        {tabsArray[activeIndex]}
      </div>
    </div>
  );
};
