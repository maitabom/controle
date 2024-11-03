import { InputHTMLAttributes } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

export default interface InputFieldProperties
  extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
}
