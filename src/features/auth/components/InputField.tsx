import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import type { InputFieldsProps } from "../types/auth.types";
import type { FieldValues } from "react-hook-form";


export function InputField<T extends FieldValues>({
  htmlFor,
  name,
  type = "text",
  placeholder,
  errors,
  register,
}: InputFieldsProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const errorMessage = errors[name]?.message as string | undefined;
  const inputType = type === "password" ? (showPassword ? "text" : "password") : type
  
  return (
    <>
      <section className="mt-6">
        <label className="text-2xl font-semibold text-white" htmlFor={htmlFor}>
          {name === "email" && "Email"}
          {name === "password" && "Password"}
          {name === "confirmPassword" && "Confirm Password"}
        </label>
        
        <div className="relative mt-4">
          <input
            className="focus:border-orange w-full border-b-2 duration-300 focus:border-b-2 focus:transition-colors focus:duration-300 focus:outline-none"
            type={inputType}
            {...register}
            id={htmlFor}
            placeholder={placeholder}
            autoComplete="off"
          />
          
          {/* showPassword handling */}
          {type === "password" &&
            <button
              type="button"
              className="absolute right-2 cursor-pointer text-xl"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
            </button>
          }

          {/* Error message handling */}
          <div className="min-h-[25px]">
            <small
              className={
                `font-semibold text-red-600 transition-all duration-300
                  ${errorMessage ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`
              }
              >
                {errorMessage || ""}
              </small>
          </div>
        </div>
      </section>
    </>
  );
}
