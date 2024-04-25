import React from "react";

const DatePicker = ({ days, onChange }) => {
  return (
    <select className="bg-success px-3 py-3 rounded-md font-semibold">
      {days.map((item, index) => {
        return (
          <option key={index} value={item} onChange={onChange}>
            {item}
          </option>
        );
      })}
    </select>
  );
};

export default DatePicker;
