import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { useSnackbar } from "notistack";

/**
 * LoggedInNavbar component displays the navigation bar for logged-in users,
 * including a profile picture, search bar, and logout functionality.
 *
 * @component
 * @returns {JSX.Element} A React component that renders the logged-in user's navigation bar.
 */
const LoggedInNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state) => state.auth);

  /**
   * Handles the logout process, including dispatching the logout action,
   * removing user information from localStorage, and displaying notifications.
   */
  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      localStorage.removeItem("userInfo");
      enqueueSnackbar("Successfully logged out", { variant: "success" });
      navigate(`/`);
    } catch (error) {
      console.error("Logout failed:", error);
      enqueueSnackbar("Logout failed. Please try again.", { variant: "error" });
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost p-0">
          <img
            src="https://www.merillife.com/assets/images/home/new/meril_logo_new.png"
            alt="home"
            className="max-w-full max-h-full object-contain"
          />
        </a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://avatar.iran.liara.run/public/boy"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li className="text-center text-xl">
              <span className="text-center">Hi, {user.fullName}</span>
            </li>
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              {/* Open the modal using document.getElementById('ID').showModal() method */}
              <button
                className="btn hover:bg-red-400 hover:text-white"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                Logout
              </button>
              <dialog
                id="my_modal_1"
                className="modal fixed inset-0 flex items-center justify-center z-50 p-4"
              >
                <div className="modal-box border border-gray-300 rounded-lg shadow-lg max-w-sm w-full p-6">
                  <h3 className="font-bold text-lg">Logging Out?</h3>
                  <p className="py-4">Are you sure you want to logout?</p>
                  <div className="modal-action">
                    <form method="dialog" className="flex space-x-4">
                      {/* if there is a button in form, it will close the modal */}
                      <button
                        className="btn hover:bg-red-400 hover:text-white"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                      <button className="btn hover:bg-blue-500 hover:text-white">
                        Close
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoggedInNavbar;
