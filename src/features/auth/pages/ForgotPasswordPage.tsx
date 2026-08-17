import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaForgetPassword } from "../types/schema";

interface ForgotPasswordFormValues {
  email: string;
}

function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: yupResolver(schemaForgetPassword),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    console.log(data);
  };

  return (
    <div className="relative z-10 flex h-screen w-3/4 flex-col items-center justify-center dark">
      <div className="w-full max-w-md rounded-lg border-2 bg-white/10 p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-gray-200">
          Enter Your Registered Email
        </h2>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email")}
            placeholder="example@gmail.com"
            className="focus:border-orange w-full border-b-2 py-2 text-white duration-300 focus:border-b-2 focus:transition-colors focus:duration-300 focus:outline-none"
            type="email"
            required
            autoComplete="off"
          />
          <small className="min-h-5 text-red-500">
            {errors.email?.message}
          </small>
          <button
            className="from-orange-500 to-orange-700 mt-4 rounded-md bg-linear-to-r px-4 py-2 font-bold text-white transition duration-150 ease-in-out active:scale-99"
            type="submit"
          >
            Send
          </button>
        </form>
        <div className="mt-4 flex justify-center">
          <p className="text-sm text-gray-400">
            We will send you a link to reset your password. If you don't receive
            it, check your spam folder.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
