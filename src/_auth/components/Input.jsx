import React, { forwardRef } from "react";

function Input({ title, type, ...rest }, ref) {
  return (
    <div className="w-full flex flex-col gap-2">
      <p className="text-white">{title}</p>
      <input
        ref={ref}
        className="bg-Cgray py-3 px-4 w-full rounded-md text-white"
        type={type}
        {...rest}
      />
    </div>
  );
}

export default forwardRef(Input);
