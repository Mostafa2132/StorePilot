import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

// Validation
const validationSchema = Yup.object({
  name: Yup.string().min(3, "Name too short").required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      "Password must be at least 6 chars and contain letters & numbers"
    )
    .required("Password is required"),
});

export default function Signup() {
  const [showPwd, setShowPwd] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ========== UPLOAD TO IMGBB ==========
  async function uploadToImgBB(file) {
    const apiKey = "83659e704c72b79f644bce5245656b3b";

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.data.url; // Image URL
  }

  // Handle file change
  async function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setAvatarPreview(URL.createObjectURL(file));

    const url = await uploadToImgBB(file);
    setAvatarURL(url);
  }

  // Submit Form
  async function SendData(values) {
    try {
      setLoading(true);

      toast.info("Creating your account...", {
        autoClose: false,
        toastId: "loadingToast",
      });

      const response = await fetch("https://api.escuelajs.co/api/v1/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          avatar: avatarURL || "https://picsum.photos/800",
        }),
      });

      const data = await response.json();

      // ========== IMPORTANT ==========
      // HANDLE UNIQUE EMAIL ERROR FROM API
      if (!response.ok) {
        if (data?.message?.includes("email must be unique")) {
          toast.error("Email already exists!");
        } else {
          toast.error(data.message || "Failed to create account");
        }
        return;
      }

      // Success
      toast.dismiss("loadingToast");
      toast.success("Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      toast.error("Network error");
    } finally {
      setLoading(false);
      toast.dismiss("loadingToast");
    }
  }

  // Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => SendData(values),
  });

  return (
    <>
      <Helmet>
        <title>StorePilot – Sign up</title>
      </Helmet>
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-text-primary px-4">
        {/* Floating Blobs */}
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

        {/* Card */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md space-y-8 p-8 rounded-2xl border border-border 
                   bg-surface backdrop-blur-xl shadow-xl relative z-10"
        >
          {/* Title */}
          <div className="text-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Join our community now
            </p>
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="text-sm text-text-secondary">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 w-full px-4 py-3 rounded-xl bg-background/50 backdrop-blur-sm
                         border border-border text-text-primary placeholder:text-text-secondary
                         focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-xs text-error mt-1">
                  {formik.errors.name}
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-text-secondary">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 w-full px-4 py-3 rounded-xl bg-background/50 backdrop-blur-sm
                         border border-border text-text-primary placeholder:text-text-secondary
                         focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-xs text-error mt-1">
                  {formik.errors.email}
                </div>
              )}
            </div>

            {/* Avatar Upload */}
            <div>
              <label className="text-sm text-text-secondary">Avatar</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="mt-1 w-full px-4 py-3 rounded-xl bg-background/50 backdrop-blur-sm 
                         border border-border text-text-primary file:text-text-secondary
                         focus:outline-none focus:ring-2 focus:ring-primary"
              />

              {avatarPreview && (
                <img
                  src={avatarPreview}
                  alt="preview"
                  className="w-16 h-16 rounded-xl mt-3 border border-border object-cover"
                />
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-text-secondary">Password</label>
              <div className="mt-1 relative">
                <input
                  type={showPwd ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-3 rounded-xl bg-background/50 backdrop-blur-sm
                           border border-border text-text-primary placeholder:text-text-secondary
                           focus:outline-none focus:ring-2 focus:ring-primary pr-12"
                />

                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute inset-y-0 right-3 flex items-center text-text-secondary hover:text-primary transition"
                >
                  {showPwd ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {formik.touched.password && formik.errors.password && (
                <div className="text-xs text-error mt-1">
                  {formik.errors.password}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark
                       text-white font-semibold shadow-lg shadow-primary/20"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </>
  );
}
