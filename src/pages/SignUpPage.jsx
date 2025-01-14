import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser, updateProfile } from "@/services/apiBlog";
import SmallSpinner from "@/ui_components/SmallSpinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff, UserPlus, UserCog } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";

const SignupPage = ({ userInfo, updateForm, toggleModal }) => {
  console.log(userInfo)
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState, reset, watch } = useForm({
    defaultValues: userInfo ? userInfo : {},
  });
  const { errors } = formState;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const password = watch("password");

  const updateProfileMutation = useMutation({
    mutationFn: (data) => updateProfile(data),
    onSuccess: () => {
      toast.success("Profile updated successfully");
      toggleModal();
      queryClient.invalidateQueries({
        queryKey: ["users", userInfo?.username],
      });
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const mutation = useMutation({
    mutationFn: (data) => registerUser(data),
    onSuccess: () => {
      toast.success("You have successfully created an account!");
      reset();
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  function onSubmit(data) {
    if (updateForm) {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      formData.append("job_title", data.job_title);
      formData.append("bio", data.bio);

      if (data.profile_picture && data.profile_picture[0]) {
        if (data.profile_picture[0] != "/") {
          formData.append("profile_picture", data.profile_picture[0]);
        }
      }

      updateProfileMutation.mutate(formData);
    } else {
      mutation.mutate(data);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:text-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <form
        className={`${
          updateForm ? "max-h-[90vh] overflow-y-auto" : ""
        } w-full max-w-2xl bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 space-y-8`}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Header Section */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            {updateForm ? (
              <UserCog className="h-12 w-12 text-blue-500" />
            ) : (
              <UserPlus className="h-12 w-12 text-blue-500" />
            )}
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {updateForm ? "Update Profile" : "Create Account"}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {updateForm
              ? "Customize your profile information"
              : "Join our community today"}
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">First Name</Label>
              <Input
                type="text"
                {...register("first_name", {
                  required: "First name is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters",
                  },
                })}
                className="h-12 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="John"
                disabled={mutation.isPending}
              />
              {errors?.first_name?.message && (
                <p className="text-red-500 text-sm">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Last Name</Label>
              <Input
                type="text"
                {...register("last_name", {
                  required: "Last name is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters",
                  },
                })}
                className="h-12 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Doe"
                disabled={mutation.isPending}
              />
              {errors?.last_name?.message && (
                <p className="text-red-500 text-sm">
                  {errors.last_name.message}
                </p>
              )}
            </div>
          </div>
          {/* Username Field */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Username</Label>
            <Input
              type="text"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters",
                },
              })}
              className="h-12 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="johndoe"
              disabled={mutation.isPending}
            />
            {errors?.username?.message && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>
          {/* Conditional Fields for Update Form */}
          {updateForm && (
            <>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Job Title</Label>
                <Input
                  type="text"
                  {...register("job_title", {
                    required: "Job title is required",
                  })}
                  className="h-12 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Software Engineer"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Bio</Label>
                <Textarea
                  {...register("bio", {
                    required: "Bio is required",
                    minLength: {
                      value: 10,
                      message: "Minimum 10 characters",
                    },
                  })}
                  className="min-h-[150px] rounded-lg border-2 focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Tell us about yourself..."
                />
              </div>

              {updateForm && (
                <div className="w-full">
                  <Label htmlFor="profile_picture">Profile Picture</Label>
                  <Input
                    type="file"
                    id="picture"
                    {...register("profile_picture", {
                      required: false,
                    })}
                    className="h-12 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              )}
            </>
          )}
          {/* Password Fields (Only for Registration) */}
          {!updateForm && (
            <>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Minimum 8 characters",
                      },
                    })}
                    className="h-12 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 transition-all pr-10"
                    placeholder="••••••••"
                    disabled={mutation.isPending}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors?.password?.message && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    className="h-12 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 transition-all pr-10"
                    placeholder="••••••••"
                    disabled={mutation.isPending}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {errors?.confirmPassword?.message && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg py-3 px-4 font-medium text-lg hover:opacity-90 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {updateProfileMutation.isPending ? (
            <div className="flex items-center justify-center gap-2">
              <SmallSpinner />
              <span>{updateForm ? "Updating..." : "Creating account..."}</span>
            </div>
          ) : (
            <span>{updateForm ? "Update Profile" : "Create Account"}</span>
          )}
        </button>

        {/* Sign In Link */}
        {!updateForm && (
          <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              Sign in
            </Link>
          </p>
        )}
      </form>
    </div>
  );
};

export default SignupPage;
