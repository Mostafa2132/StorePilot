import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import SubNav from "./SubNav";
import { navLinks } from "../../Data/Data";
import { Menu, User, X, LogOut } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { userContext } from "../../Context/UserContext/UserContext";
import ProfileEditModal from "../ProfileEditModal/ProfileEditModal";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [updateProfile, setUpdatedProfile] = useState(false);
  const { token, setToken } = useContext(userContext);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () =>
      fetch("https://api.escuelajs.co/api/v1/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
    enabled: !!token,
  });
  useEffect(() => {
    setProfileOpen(false);
  }, [token]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading profile</div>;
  }

  const handelLogout = () => {
    setToken(null);
    localStorage.setItem("accessToken", null);
    toast.success("Loged out Succ !!!!", { icon: "😢" });
  };
  return (
    <>
      {/* ========== HEADER ========== */}
      <header className="flex fixed top-0 left-0 flex-wrap bg-background z-50 w-full py-2 border-b border-border">
        <nav className="relative max-w-7xl w-full flex items-center justify-between px-4 md:px-6 lg:px-8 mx-auto">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-semibold text-text-primary hover:text-primary transition"
          >
<span className="text-primary">S</span>tore<span className="text-primary">P</span>ilot
          </Link>

          {/* Center Nav (Desktop Only) */}
          <div className="hidden lg:flex gap-x-7">
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className={({ isActive }) =>
                  `text-base transition ${
                    isActive
                      ? "font-bold text-primary"
                      : "text-text-secondary hover:text-primary"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right side: Burger + Profile */}
          {token ? (
            <div className="flex items-center gap-3">
              {/* Profile Avatar */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="size-10 bg-accent text-white font-bold rounded-full flex items-center justify-center overflow-hidden"
                >
                  {data.avatar ? (
                    <img
                      src={data.avatar}
                      alt="profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    data?.name?.charAt(0)
                  )}
                </button>

                {/* Dropdown */}
                {profileOpen && token && (
                  <div className="absolute right-0 top-12 bg-surface w-60 rounded-xl shadow-xl p-4 border border-border animate-[fadeIn_0.2s_ease-out]">
                    {/* User Info */}
                    <div className="flex items-center gap-3 pb-3 border-b border-border">
                      <div className="size-12 rounded-full overflow-hidden bg-primary text-white flex items-center justify-center font-bold">
                        {data?.avatar ? (
                          <img
                            src={data?.avatar}
                            alt="avatar"
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          data?.name?.charAt(0)
                        )}
                      </div>

                      <div>
                        <p className="font-semibold text-sm text-text-primary">
                          {data?.name}
                        </p>
                        <p className="text-sm text-text-secondary">
                          {data?.email}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <ul className="flex flex-col gap-3 mt-3">
                      <li
                        onClick={() => setUpdatedProfile(!updateProfile)}
                        className="flex gap-2 border-b border-gray-200 py-1 dark:border-gray-700 items-center cursor-pointer hover:text-primary transition"
                      >
                        <User className="w-4" /> Profile
                      </li>
                      <li
                        onClick={handelLogout}
                        className="flex gap-2 py-1 items-center cursor-pointer hover:text-red-500 transition"
                      >
                        <LogOut className="w-4" /> Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Burger Menu (Mobile Only) */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="size-9.5 flex lg:hidden justify-center items-center rounded-xl border border-border text-text-primary hover:bg-surface transition"
              >
                {menuOpen ? <X className="w-4" /> : <Menu className="w-4" />}
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="group relative px-8 py-2 bg-gradient-primary text-text-primary rounded-xl font-semibold text-sm shadow-lg dark:shadow-[0_10px_30px_rgba(129,140,248,0.4)] hover:shadow-xl dark:hover:shadow-[0_15px_40px_rgba(129,140,248,0.5)] transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Log in
            </Link>
          )}
        </nav>

        {/* update profile modal */}
        <ProfileEditModal
          isOpen={updateProfile}
          onClose={() => setUpdatedProfile(false)}
          user={data}
          refetch={refetch}
        />
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-background border-t border-border px-4 py-3">
            <div className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-base transition ${
                      isActive
                        ? "font-bold text-primary"
                        : "text-text-secondary hover:text-primary"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>

      <SubNav />
    </>
  );
}
