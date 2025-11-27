import React, { useState, useId } from "react";

const Switch = ({ value, onToggle }) => {
  const [isChecked, setIsChecked] = useState(value || false);
  const id = useId();

  const toggle = () => {
    setIsChecked(!isChecked);
    onToggle && onToggle(!isChecked);
  };

  return (
    <div
      className="relative h-[34px] w-[70px] rounded-[50px] bg-[#d6d6d6]
        shadow-[inset_-4px_-4px_8px_#ffffff,inset_4px_4px_8px_#b0b0b0]"
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={toggle}
        className="hidden"
        id={id}        
      />

      <label
        htmlFor={id}     
        className="group absolute left-0 top-1/2 h-full w-full -translate-y-1/2 cursor-pointer overflow-hidden rounded-[50px]"
      >
        <div
          className={`absolute top-[3px] flex h-7 w-[34px] items-center justify-start rounded-[50px]
            bg-[linear-gradient(145deg,_#d9d9d9,_#bfbfbf)]
            pl-1.5 shadow-[-4px_-4px_8px_#ffffff,4px_4px_8px_#b0b0b0]
            transition-all duration-300 ease-in-out
            ${isChecked ? "left-8" : "left-[3px]"}
          `}
        >
          <div
            className={`h-2 w-2 rounded-full bg-red-300 transition-all duration-300 
              ${isChecked ? "bg-yellow-300 shadow-[0_0_8px_2px_yellow]" : ""}
            `}
          />
        </div>
      </label>
    </div>
  );
};

export default Switch;
