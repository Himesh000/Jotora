import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      className="px-4 py-2 text-sm rounded-full bg-black/40 backdrop-blur-md border border-transparent hover:bg-white/6 text-slate-100 transition"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
