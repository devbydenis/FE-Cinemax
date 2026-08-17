import { useState } from "react";
import {
  useForm,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import { schemaEditProfile } from "../types/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateProfileAction } from "@/features/auth/store/userSlice";
import ModalProfile from "../components/ModalProfile";
import { useOutletContext } from "react-router-dom";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import type { ProfileLayoutContext } from "@/shared/layouts/ProfileLayout";

interface FormInput {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string | undefined;
}

interface FormOutput {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword?: string;
}

function ProfileAccountPage() {
  const { showEditProfile, setShowEditProfile } =
    useOutletContext<ProfileLayoutContext>();
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput, unknown, FormOutput>({
    resolver: yupResolver(schemaEditProfile),
    mode: "onChange",
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
    },
  });

  const handleShowPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowPassword(e.target.checked);
  };

  const onSubmit = (data: FormOutput) => {
    dispatch(
      updateProfileAction({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
      }),
    );

    reset({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: "",
      confirmPassword: "",
    });

    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <>
      <div className={`${showAlert ? "flex" : "hidden"} justify-center`}>
        <ModalProfile onClose={() => setShowAlert(false)} />
      </div>
      <div
        className={`bg-white-primary/90 col-span-2 ${
          showEditProfile ? "absolute top-5 right-10 left-10 z-20" : "hidden"
        } shadow-orange rounded-2xl shadow-lg md:mr-10 md:block`}
      >
        <form
          className="relative rounded-2xl p-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          {showEditProfile && (
            <button
              className="absolute top-5 right-5 font-bold text-black"
              type="button"
              onClick={() => setShowEditProfile(false)}
            >
              X
            </button>
          )}
          <h1 className="mb-9 text-2xl font-bold tracking-wider">
            Account Settings
          </h1>
          <p className="border-b-2 border-gray-300 pb-2 text-base font-normal tracking-wider">
            Detail Information
          </p>
          <section className="gap-5 md:grid md:grid-cols-2">
            <InputField
              register={register}
              nameInput={"firstName"}
              labelInput="First Name"
              typeInput="text"
              idInput="firstName"
              forInput="firstName"
              errors={errors}
            />
            <InputField
              register={register}
              nameInput={"lastName"}
              labelInput="Last Name"
              typeInput="text"
              idInput="lastName"
              forInput="lastName"
              errors={errors}
            />
            <InputField
              register={register}
              nameInput={"email"}
              labelInput="Email"
              typeInput="email"
              idInput="email"
              forInput="email"
              errors={errors}
            />
            <InputField
              register={register}
              nameInput={"phoneNumber"}
              labelInput="Phone Number"
              typeInput="text"
              idInput="phone"
              forInput="phone"
              errors={errors}
            />
          </section>
          <p className="mt-10 border-b-2 border-gray-300 pb-2 text-base font-normal tracking-wider">
            Change Password
          </p>
          <section className="grid grid-cols-2 gap-5">
            <InputField
              register={register}
              nameInput={"password"}
              labelInput="Password"
              typeInput={showPassword ? "text" : "password"}
              idInput="password"
              forInput="password"
              errors={errors}
            />
            <InputField
              register={register}
              nameInput={"confirmPassword"}
              labelInput="Confirm Password"
              typeInput={showPassword ? "text" : "password"}
              idInput="confirmPassword"
              forInput="confirmPassword"
              errors={errors}
            />
            <label htmlFor="showPassword" className="flex cursor-pointer gap-2">
              <input
                type="checkbox"
                name="showPassword"
                id="showPassword"
                checked={showPassword}
                onChange={handleShowPassword}
              />
              Show Password
            </label>
          </section>
          <button
            className="bg-orange active:border-orange active:text-orange mt-10 w-full rounded-lg px-6 py-3 font-bold text-white transition-all duration-300 active:scale-98 active:border-2 active:bg-white"
            type="submit"
          >
            Update Change
          </button>
        </form>
      </div>
    </>
  );
}

interface InputFieldProps {
  labelInput: string;
  nameInput: keyof FormInput;
  typeInput: string;
  forInput: string;
  idInput: string;
  register: UseFormRegister<FormInput>;
  errors: FieldErrors<FormInput>;
}

function InputField({
  labelInput,
  nameInput,
  typeInput,
  forInput,
  idInput,
  register,
  errors,
}: InputFieldProps) {
  const errorMessage = errors[nameInput]?.message as string | undefined;
  return (
    <div>
      <label
        className="text-title-info-first block pt-6 pb-3 text-base font-normal"
        htmlFor={forInput}
      >
        {labelInput}
      </label>
      <input
        className="border-gray w-full rounded border px-6 py-3 focus:outline-none"
        type={typeInput}
        {...register(nameInput)}
        id={idInput}
      />
      <p className="min-h-5 text-red-500">{errorMessage}</p>
    </div>
  );
}

export default ProfileAccountPage;
