import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams, redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { passwordResetAction } from "../../redux/actions/authActions";
import { IoEye, IoEyeOff } from "react-icons/io5";

const ResetPasswordFromEmail = () => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const { passwordResetLoading } = useAppSelector((state) => state.auth);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!token) redirect("/login");
    if (passwordResetLoading) return;
    const isPasswordValid = password.trim().length >= 8;
    const isConfirmPassword = password.trim() === confirmPassword.trim();
    if (!isPasswordValid) {
      setPasswordError("Password should contain 8 characters!");
      return;
    }
    if (!isConfirmPassword) {
      setConfirmPasswordError("Passwords should match!");
      return;
    }

    dispatch(passwordResetAction({ password, token: token! }, navigate));
  };

  useEffect(() => {
    if (!token) redirect("/login");
  }, [token]);

  return (
    <div
      className={`h-screen w-screen flex flex-col items-center justify-center ${
        passwordResetLoading ? "opacity-65" : "opacity-100"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`p-8 shadow-lg flex flex-col items-center justify-center gap-2 w-96`}
      >
        <h2 className="mt-6 self-start text-3xl font-extrabold text-gray-900">
          Password Reset
        </h2>
        <div className="flex flex-col gap-y-2 w-full">
          <div className="flex flex-col items-start gap-1 w-full">
            {passwordError && (
              <p className="text-red-600 font-bold text-center">
                {passwordError}
              </p>
            )}
            <div className="relative w-full">
              <input
                className="pr-9 w-full outline-none bg-gray-300 py-3 p-4 placeholder:text-gray-600 text-lg placeholder:font-bold rounded-lg"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(event) => {
                  if (passwordResetLoading) return;
                  setPasswordError("");
                  setPassword(event.target.value);
                }}
              />
              {!showPassword ? (
                <IoEye
                  onClick={() => {
                    if (passwordResetLoading) return;
                    setShowPassword(true);
                  }}
                  className="cursor-pointer text-gray-600 text-2xl absolute right-2 top-1/2 -translate-y-[50%]"
                />
              ) : (
                <IoEyeOff
                  onClick={() => {
                    if (passwordResetLoading) return;
                    setShowPassword(false);
                  }}
                  className="cursor-pointer text-gray-600 text-2xl absolute right-2 top-1/2 -translate-y-[50%]"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col items-start gap-1 w-full">
            <div className="w-full relative">
              <input
                className="pr-9 w-full outline-none bg-gray-300 py-3 p-4 placeholder:text-gray-600 text-lg placeholder:font-bold rounded-lg"
                placeholder="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(event) => {
                  if (passwordResetLoading) return;
                  setConfirmPasswordError("");
                  setConfirmPassword(event.target.value);
                }}
              />
              {!showConfirmPassword ? (
                <IoEye
                  onClick={() => {
                    if (passwordResetLoading) return;
                    setShowConfirmPassword(true);
                  }}
                  className="cursor-pointer text-gray-600 text-2xl absolute right-2 top-1/2 -translate-y-[50%]"
                />
              ) : (
                <IoEyeOff
                  onClick={() => {
                    if (passwordResetLoading) return;
                    setShowConfirmPassword(false);
                  }}
                  className="cursor-pointer text-gray-600 text-2xl absolute right-2 top-1/2 -translate-y-[50%]"
                />
              )}
            </div>
            {confirmPasswordError && (
              <p className="text-red-600 font-bold text-center">
                {confirmPasswordError}
              </p>
            )}
          </div>
          <div className="flex items-center gap-x-2 self-end">
            <button
              type="button"
              className={`hover:opacity-70 ${
                passwordResetLoading ? "cursor-default" : "cursor-pointer"
              }`}
              onClick={() => {
                if (passwordResetLoading) return;
                navigate("/login");
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-slate-200 hover:opacity-70 ${
                passwordResetLoading ? "cursor-default" : "cursor-pointer"
              }`}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordFromEmail;

export const loader = () => {
  const user = Cookies.get("postIT-user");
  if (user) return redirect("/");
  return null;
};
