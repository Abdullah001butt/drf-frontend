import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, replace, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { getUsername, signin } from "@/services/apiBlog";
import toast from "react-hot-toast";
import SmallSpinner from "@/ui_components/SmallSpinner";

const LoginPage = ({ setIsAuthenticated, setUsername }) => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const location = useLocation();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data) => signin(data),
    onSuccess: (response) => {
      localStorage.setItem("access", response.access);
      localStorage.setItem("refresh", response.refresh);
      setIsAuthenticated(true);
      getUsername().then((res) => setUsername(res.username));
      toast.success("You have successfully signed in");
      const from = location?.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onSubmit(data) {
    console.log(data);
    mutation.mutate(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:px-20 px-8 py-10 flex flex-col mx-auto my-12 items-center gap-6 w-[450px] rounded-2xl bg-white shadow-2xl dark:text-white dark:bg-[#141624] transition-all duration-300"
    >
      <div className="flex flex-col gap-3 justify-center items-center mb-4">
        <h3 className="font-bold text-3xl bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
          Welcome Back!
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Log in to continue your journey
        </p>
      </div>

      <div className="space-y-2 w-full">
        <Label
          htmlFor="username"
          className="text-sm font-medium dark:text-[97989F]"
        >
          Username
        </Label>
        <Input
          type="text"
          id="username"
          disabled={mutation.isPending}
          placeholder="Enter username"
          {...register("username", { required: "Username is required" })}
          className="border-2 border-gray-200 dark:border-[#3B3C4A] focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200 rounded-lg h-12 w-full"
        />
        {errors?.username?.message && (
          <small className="text-red-700">{errors.username.message}</small>
        )}
      </div>

      <div className="space-y-2 w-full">
        <Label htmlFor="password" className="text-sm font-medium">
          Password
        </Label>
        <Input
          type="password"
          id="password"
          disabled={mutation.isPending}
          placeholder="Enter password"
          {...register("password", { required: "Password is required" })}
          className="border-2 border-gray-200 dark:border-[#3B3C4A] focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200 rounded-lg h-12 w-full"
        />
        {errors?.password?.message && (
          <small className="text-red-700">{errors.password.message}</small>
        )}
      </div>

      <div className="w-full flex items-center justify-between mb-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember"
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor="remember"
            className="ml-2 text-sm text-gray-600 dark:text-gray-300"
          >
            Remember me
          </label>
        </div>
        <a
          href="#"
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          Forgot password?
        </a>
      </div>

      <div className="w-full space-y-4">
        <button
          disabled={mutation.isPending}
          className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2"
        >
          {mutation.isPending ? (
            <>
              {" "}
              <SmallSpinner />{" "}
              <small className="text-[16px]">Signing up...</small>{" "}
            </>
          ) : (
            <small className="text-[16px]">Signin</small>
          )}
        </button>
        <p className="text-center text-gray-600 dark:text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginPage;
