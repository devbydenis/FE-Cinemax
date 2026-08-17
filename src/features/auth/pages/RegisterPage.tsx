import { useForm, type SubmitHandler } from "react-hook-form";
import tickitzLogo from "@/assets/cinemax-logo-transparent.png";
import { schemaRegister } from "../types/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "@/shared/components/Loader";
import { InputField } from "../components/InputField";
import { Button } from "../components/Button";
import { useRegister } from "../hooks/useRegister";
import type { RegisterFormValues } from "../types/auth.types";

function RegisterPage() {
  const navigate = useNavigate();
  const [loaderAuth, setLoaderAuth] = useState(false);
  const loaderTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(schemaRegister),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    setLoaderAuth(true);
    const startTime = Date.now();

    try {
      await registerMutation.mutateAsync({ email: data.email, password: data.password });
      navigate("/auth/login", { replace: true });
    } catch (err) {
      console.error(err);
    } finally {
      const elapsedTime = Date.now() - startTime;
      const minDuration = 2000;
      const remainingTime =
        elapsedTime < minDuration ? minDuration - elapsedTime : 0;
      loaderTimeoutRef.current = setTimeout(() => {
        setLoaderAuth(false);
      }, remainingTime);
    }
  };

  useEffect(() => {
    return () => {
      if (loaderTimeoutRef.current) {
        clearTimeout(loaderTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative z-10 flex flex-col gap-7 rounded-xl bg-white/10 p-16 text-white md:mx-auto md:w-xl"
    >
      <div className="flex flex-col items-start justify-center">
        <img
          className="tickitz relative z-10 mx-auto w-32 md:w-80"
          src={tickitzLogo}
          alt="tickitz-logo"
        />
        <h1 className="mt-10 text-3xl font-bold">Welcome 👋</h1>
        <p className="font-normal text-gray-300">
          Entered your valid data. make sure your data is correct
        </p>
      </div>

      <InputField
        type="email"
        htmlFor="email"
        name="email"
        placeholder="example@gmail.com"
        register={register("email")}
        errors={errors}
      />

      <InputField
        type="password"
        htmlFor="password"
        name="password"
        placeholder="Enter Your Password"
        register={register("password")}
        errors={errors}
      />

      <InputField
        type="password"
        htmlFor="confirm-password"
        name="confirmPassword"
        placeholder="Confirm Your Password"
        register={register("confirmPassword")}
        errors={errors}
      />

      <Button type="submit" disabled={loaderAuth}>
        {loaderAuth ? "Loading..." : "Register"}
      </Button>

      <section className="flex justify-center">
        <p className="text-title-info-first">
          Already have an account?{" "}
          <Link className="text-primary font-bold" to="/auth/login">
            Login
          </Link>
        </p>
      </section>
      {loaderAuth && <Loader overlay={true} />}
    </form>
  );
}

export default RegisterPage;
