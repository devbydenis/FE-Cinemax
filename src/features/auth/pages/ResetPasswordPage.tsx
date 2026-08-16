import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaResetPassword } from "../types/schema";
import { InputField } from "../components/InputField";
import type { ResetPasswordFormValues } from "../types/auth.types";
import { useState } from "react";
import { Button } from "../components/Button";

function ResetPasswordPage() {
  const [loaderAuth, setLoaderAuth] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: yupResolver(schemaResetPassword),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ResetPasswordFormValues> = (data) => {
    console.log(data);
    setLoaderAuth(true);
  };

  return (
    <div className="relative z-10 flex h-screen w-3/4 flex-col items-center justify-center dark">
      <div className="w-full max-w-md rounded-lg border-2 bg-white/10 p-6 shadow-md">
        <h2 className="text-2xl font-bold text-gray-200">
          Enter Your New Password
        </h2>
        <form className="flex flex-col text-white" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            type="password"
            htmlFor="password"
            name="newPassword"
            placeholder="Enter Your New Password"
            register={register("newPassword")}
            errors={errors}
          />

          <InputField
            type="password"
            htmlFor="confirm-password"
            name="newConfirmPassword"
            placeholder="Confirm Your New Password"
            register={register("newConfirmPassword")}
            errors={errors}
          />
          <Button type="submit" disabled={loaderAuth}>
            {loaderAuth ? "Loading ..." : "Change Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
