import { useFormik } from "formik";
import * as Yup from "yup";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ProfileEditModal({ isOpen, onClose, user, refetch }) {
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");

  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      avatar: user?.avatar || "", // هنا هنخزن Base64
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),

    onSubmit: async (values) => {
      try {
        const res = await fetch(
          `https://api.escuelajs.co/api/v1/users/${user.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        const data = await res.json();

        if (res.ok) {
          toast.success("Profile updated successfully!");
          refetch();
          onClose();
        } else {
          toast.error(data.message || "Something went wrong");
        }
      } catch (err) {
        toast.error("Network error");
      }
    },
  });

  // Handle File Upload as URL
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // عرض preview مؤقت
    setAvatarPreview(URL.createObjectURL(file));

    try {
      // رفع الصورة على imgbb (أو أي سيرفر عندك)
      const formData = new FormData();
      formData.append("image", file);

      const apiKey = "83659e704c72b79f644bce5245656b3b"; // حط مفتاحك هنا
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        // حفظ رابط الصورة في formik
        formik.setFieldValue("avatar", data.data.url);
      } else {
        toast.error("Failed to upload image");
      }
    } catch (err) {
      toast.error("Image upload error");
    }
  };

  useEffect(() => {}, [refetch]);

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-surface dark:bg-background border border-border rounded-2xl w-[90%] max-w-lg p-6 shadow-xl animate-[scaleIn_0.2s_ease]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-text-primary">
            Edit Profile
          </h2>
          <button onClick={onClose}>
            <X className="text-text-secondary hover:text-red-500 transition" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm text-text-secondary">Name</label>
            <input
              type="text"
              name="name"
              className="mt-1 w-full px-4 py-3 rounded-lg bg-background dark:bg-transparent border border-border text-text-primary"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.errors.name && (
              <p className="text-xs text-red-500 mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-text-secondary">Email</label>
            <input
              type="email"
              name="email"
              className="mt-1 w-full px-4 py-3 rounded-lg bg-background dark:bg-transparent border border-border text-text-primary"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email && (
              <p className="text-xs text-red-500 mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Avatar File Upload */}
          <div>
            <label className="text-sm text-text-secondary">
              Avatar (Upload Image)
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="mt-1 w-full"
            />

            {avatarPreview && (
              <img
                src={avatarPreview}
                alt="Preview"
                className="w-24 h-24 rounded-full mt-3 object-cover border border-border"
              />
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-xl hover:opacity-90 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
