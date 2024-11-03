"use client";

import InputFieldProperties from "./properties";

export default function InputField(properties: InputFieldProperties) {
  return (
    <>
      <input
        className="w-full border-2 rounded-md h-11 px-2"
        {...properties.register(properties.name || "", properties.rules)}
        {...properties}
      />
      {properties.error && (
        <p className="my-1 text-red-500">{properties.error}</p>
      )}
    </>
  );
}
