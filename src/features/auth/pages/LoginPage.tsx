import { Link, useNavigate } from "react-router-dom";
import tickitzLogo from "@/assets/cinemax-logo-transparent.png";
import { FaFacebook, FaGoogle } from "react-icons/fa6";
import { useForm, type SubmitHandler } from "react-hook-form";
import { schemaLogin } from "../types/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { addInfoLoginAction } from "../store/userSlice";
import { useLogin } from "../hooks/useLogin";
import { Loader } from "@/shared/components/Loader";
import { ModalAuth } from "../components/ModalAuth";
import { InputField } from "../components/InputField";
import { Button } from "../components/Button";
import { MESSAGES } from "../constants/messages";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import type { UserLoginRequest } from "@/shared/types/user";
import type { LoginFormValues } from "../types/auth.types";

function LoginPage() {
  const [loaderAuth, setLoaderAuth] = useState(false);
  const [showModalAuth, setShowModalAuth] = useState(false);
  const loaderTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schemaLogin),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    return () => {
      if (loaderTimeoutRef.current) {
        clearTimeout(loaderTimeoutRef.current);
      }
    };
  }, []);

  const onSubmit: SubmitHandler<LoginFormValues> = async ({ email, password }) => {
    const userData: UserLoginRequest = { email, password };
    const startTime = Date.now();
    setLoaderAuth(true);

    try {
      const responseLogin = await loginMutation.mutateAsync(userData);
      dispatch(
        addInfoLoginAction({
          id: responseLogin.result.id,
          token: responseLogin.result.token,
          email: userData.email,
          createdAt: new Date().toISOString(),
        }),
      );
      navigate("/", { replace: true });
    } catch {
      setShowModalAuth(true);
    } finally {
      const elapsed = Date.now() - startTime;
      const minDuration = 2000;
      if (elapsed < minDuration) {
        loaderTimeoutRef.current = setTimeout(() => {
          setLoaderAuth(false);
        }, minDuration - elapsed);
      } else {
        setLoaderAuth(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative z-10 flex flex-col gap-5 rounded-xl bg-white/10 p-16 text-white md:mx-auto md:w-xl"
    >
      <div className="flex flex-col items-start justify-center">
        <img
          className="tickitz relative z-10 mx-auto w-32 md:w-80"
          src={tickitzLogo}
          alt="tickitz-logo"
        />
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

      <div className="flex justify-end">
        <Link
          className="text-sm font-semibold tracking-wider text-gray-300"
          to="/auth/forgot-password"
        >
          Forgot Password?
        </Link>
      </div>

      <Button type="submit">Login</Button>

      <section className="or">
        <div className="flex justify-center">
          <p className="text-title-info-first">
            Do not have an account?{" "}
            <Link className="text-primary font-bold" to="/auth/register">
              Register
            </Link>
          </p>
        </div>

        <section className="flex w-full items-center justify-center">
          <div className="w-full border border-gray-200 opacity-20"></div>
          <p className="text-secondary mx-3 my-5 opacity-50">Or</p>
          <div className="w-full border border-gray-200 opacity-20"></div>
        </section>

        <section className="flex justify-around">
          <Link
            to="#"
            className="flex items-center gap-3 rounded-xl p-5 shadow-md hover:bg-white/10"
          >
            <FaGoogle />
            <p className="text-title-info-second hidden md:block">Google</p>
          </Link>
          <Link
            to="#"
            className="flex items-center gap-3 rounded-xl p-5 shadow-md hover:bg-white/10"
          >
            <FaFacebook />
            <p className="text-title-info-second hidden md:block">Facebook</p>
          </Link>
        </section>
      </section>
      {showModalAuth && (
        <ModalAuth
          setShowModalAuth={() => setShowModalAuth(false)}
          message={MESSAGES.LOGIN_FAILED}
        />
      )}
      {loaderAuth && <Loader overlay={true} />}
    </form>
  );
}

export default LoginPage;
