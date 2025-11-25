import React, { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userContext } from "../../../Context/UserContext/UserContext";
import { Helmet } from "react-helmet";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      "Password must be at least 6 characters and contain both letters and numbers"
    )
    .required("Password is required"),
});
export default function Login() {
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setToken } = useContext(userContext);
  const navigate = useNavigate();

  async function SendData(values) {
    try {
      setLoading(true);
      toast.info("Logging in...", {
        toastId: "loadingToast",
        autoClose: false,
      });
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setToken(data.access_token);
        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("refreshToken", data.refresh_token);
        toast.info("navigating to home...", {
          toastId: "loadingToast",
          autoClose: false,
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      toast.dismiss("loadingToast");
      toast.success("Logged in successfully!");
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      SendData(values);
    },
  });

  return (
    <>
      <Helmet>
        <title>StorePilot – Log in</title>
      </Helmet>
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-text-primary px-4">
        {/* Floating Animated Blobs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 0.25, scale: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          className="absolute w-[28rem] h-[28rem] bg-primary rounded-full blur-[110px] -top-32 -left-32"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
          className="absolute w-[30rem] h-[30rem] bg-primary-dark rounded-full blur-[120px] bottom-[-12rem] right-[-12rem]"
        />

        {/* Card Container */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md space-y-8 p-8 rounded-2xl border border-border bg-surface backdrop-blur-xl shadow-xl relative z-10"
        >
          {/* Title */}
          <div className="text-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Sign in to continue your journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="text-sm text-text-secondary">Email</label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={-formik.handleBlur}
                placeholder="you@example.com"
                className="mt-1 w-full px-4 py-3 rounded-xl bg-background/50 backdrop-blur-sm
                         border border-border text-text-primary placeholder:text-text-secondary
                         focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="text-xs text-error mt-1">
                {formik.errors.email}
              </div>
            ) : null}

            {/* Password */}
            <div>
              <label className="text-sm text-text-secondary">Password</label>
              <div className="mt-1 relative">
                <input
                  type={showPwd ? "text" : "password"}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-xl bg-background/50 backdrop-blur-sm
                           border border-border text-text-primary placeholder:text-text-secondary
                           focus:outline-none focus:ring-2 focus:ring-primary pr-12"
                />

                <button
                  type="button"
                  onClick={() => setShowPwd((p) => !p)}
                  className="absolute inset-y-0 right-3 flex items-center text-text-secondary hover:text-primary transition"
                >
                  {showPwd ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-xs text-error mt-1">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark
                       text-white font-semibold shadow-lg shadow-primary/20"
            >
              {loading ? "Logging in... " : "Log In"}
            </motion.button>
            <p className="text-xs">
              Don't have an account{" "}
              <Link className="text-primary-dark hover:underline" to="/signup">
                Sign up
              </Link>{" "}
            </p>
          </form>
        </motion.div>
      </div>
    </>
  );
}
