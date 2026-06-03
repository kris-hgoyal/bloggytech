import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { loginAction } from "../../redux/slices/users/userSlices";

import LoadingComponent from "../Alert/LoadingComponent";
import ErrorMsg from "../Alert/ErrorMsg";
import SuccessMsg from "../Alert/SuccessMsg";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { userAuth, loading, error, success } = useSelector(
    (state) => state.users
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      loginAction({
        username: formData.username,
        password: formData.password,
      })
    );

    setFormData({
      username: "",
      password: "",
    });
  };

  useEffect(() => {
    if (userAuth?.userInfo?.token) {
      navigate("/user-profile");
    }
  }, [userAuth?.userInfo?.token, navigate]);

  return (
    <section className="min-h-screen bg-[#fafafa] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Side */}
        <div className="hidden lg:block">

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">
            Welcome Back
          </p>

          <h1 className="text-6xl font-black leading-tight tracking-tight text-slate-900">
            Continue Your
            <br />
            Publishing Journey.
          </h1>

          <p className="mt-8 text-xl text-slate-500 leading-relaxed max-w-xl">
            Sign in to manage your articles, engage with readers,
            and continue building your presence on BloggyTech.
          </p>

          <div className="mt-12 space-y-5">

            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              <p className="text-slate-600">
                Publish articles and tutorials
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              <p className="text-slate-600">
                Build your personal audience
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              <p className="text-slate-600">
                Connect with other creators
              </p>
            </div>

          </div>
        </div>

        {/* Right Side */}
        <div
          className="
            bg-white
            border
            border-slate-200
            rounded-3xl
            p-8
            md:p-10
            shadow-sm
          "
        >
          <div className="mb-8">

            <h2 className="text-4xl font-black text-slate-900">
              Sign In
            </h2>

            <p className="mt-3 text-slate-500">
              Enter your credentials to access your account.
            </p>

          </div>

          {error && (
            <div className="mb-6">
              <ErrorMsg message={error?.message} />
            </div>
          )}

          {success && (
            <div className="mb-6">
              <SuccessMsg message="Login Successful" />
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Username */}
            <div className="mb-6">

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Username
              </label>

              <input
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                className="
                  w-full
                  rounded-2xl
                  border
                  border-slate-200
                  px-5
                  py-4
                  text-slate-900
                  placeholder:text-slate-400
                  focus:outline-none
                  focus:border-slate-400
                "
              />
            </div>

            {/* Password */}
            <div className="mb-8">

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="
                  w-full
                  rounded-2xl
                  border
                  border-slate-200
                  px-5
                  py-4
                  text-slate-900
                  placeholder:text-slate-400
                  focus:outline-none
                  focus:border-slate-400
                "
              />
            </div>

            {/* Button */}
            {loading ? (
              <LoadingComponent />
            ) : (
              <button
                type="submit"
                className="
                  w-full
                  rounded-2xl
                  bg-slate-900
                  py-4
                  text-white
                  font-semibold
                  transition
                  hover:bg-slate-800
                "
              >
                Sign In
              </button>
            )}

            <div className="mt-8 text-center">

              <Link
                to="/forgot-password"
                className="
                  text-sm
                  font-medium
                  text-emerald-600
                  hover:text-emerald-700
                "
              >
                Forgot Password?
              </Link>

            </div>

            <div className="mt-8 border-t border-slate-100 pt-6 text-center">

              <p className="text-slate-500">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="
                    font-semibold
                    text-slate-900
                    hover:text-emerald-600
                  "
                >
                  Create Account
                </Link>
              </p>

            </div>

          </form>
        </div>

      </div>
    </section>
  );
};

export default Login;