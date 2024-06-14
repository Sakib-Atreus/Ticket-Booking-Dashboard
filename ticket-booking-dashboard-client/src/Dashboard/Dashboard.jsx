import { FaBars } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import {
  FaExternalLinkAlt,
  FaQrcode,
} from "react-icons/fa";
import { MdLogin, MdEventAvailable,MdAddComment  } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { toast } from "react-toastify";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logout Successful!");
        navigate("/");
      })
      .catch((error) => toast.error(error.message));
  };
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-white flex flex-col items-center justify-center">
        {/* lg navbar */}

        <Outlet className="h-screen overflow-y-scroll"></Outlet>

        <div className="h-20 lg:hidden bg-gray-600 top-0 left-0 right-0 absolute border-b-[1px] border-gray-400"></div>
        <div>
          <div className=" md:w-64 w-40 absolute z-30 top-5 md:top-2 md:left-5 left-4 lg:hidden block">
            <Link to="/" className="flex justify-center items-center gap-4">
              <img className="w-12 rounded-full" src={user?.photoURL} alt="" />
              <h2 className="text-2xl font-semibold rounded-full text-white text-center">{user?.displayName}</h2>
              <div
                className="w-14 cursor-pointer rounded-full text-white"
                title={user?.displayName}
              ></div>
            </Link>
            
          </div>

          <label
            htmlFor="my-drawer-2"
            className="btn text-2xl bg-gray-600 border-none rounded-lg text-white absolute right-5 top-5 drawer-button lg:hidden"
          >
            <FaBars />
          </label>
        </div>
      </div>

      {/* for nothing  */}

      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <ul className="bg-green-300 text-black overflow-hidden menu p-4 w-80 h-full mt-20 lg:mt-0">
          {/* Sidebar content here */}
          <Link to="/" className="hidden lg:block">
            <div className="flex items-center gap-6">
            <img src={user?.photoURL} className=" w-14 text-black rounded-full border-2 border-black" alt="" />
            <h2 className="text-3xl font-bold rounded-full text-black text-center">{user?.displayName}</h2>
            </div>
          </Link>

          {/* Sidebar content here */}
          {/* <div className="avatar">
            <div
              className="w-14 cursor-pointer text-black rounded-full border-2 border-black"
              title={user?.displayName}
            >
              <img src={user?.photoURL} className="" />
              
            </div>
          </div> */}

          <div className="mt-10 ml-5 text-xl flex flex-col gap-2 flex-grow active">
            <NavLink
              to="/"
              className="flex flex-row items-center hover:bg-gray-600 hover:rounded-lg hover:text-white rounded-none p-3 nav"
            >
              <FaQrcode />
              <span className="ml-2">Dashboard</span>
            </NavLink>
            <NavLink
              to="/allEvents"
              className="flex flex-row items-center hover:bg-gray-600 hover:text-white hover:rounded-lg rounded-none p-3 nav"
            >
              <MdEventAvailable />
              <span className="ml-2">All Events</span>
            </NavLink>
            <NavLink
              to="/addEvent"
              className="flex flex-row items-center hover:bg-gray-600 hover:text-white hover:rounded-lg rounded-none p-3 nav"
            >
              <MdAddComment />
              <span className="ml-2">Add Event</span>
            </NavLink>
            <NavLink
              to="/bookings"
              className="flex flex-row items-center hover:bg-gray-600 hover:text-white hover:rounded-lg rounded-none p-3 nav"
            >
              <TbBrandBooking />
              <span className="ml-2">Bookings</span>
            </NavLink>

            {user ? (
              <div className="flex flex-col items-center rounded-none mt-auto">
                <p className="text-gray-600 text-sm">{user?.email}</p>
                <NavLink
                  onClick={handleLogout}
                  className="flex items-center justify-center mt-2 py-2 px-4 hover:bg-gray-600 hover:text-white hover:rounded-lg"
                >
                  <FaExternalLinkAlt />
                  <span className="ml-2">Log Out</span>
                </NavLink>
              </div>
            ) : (
              <div className="flex flex-cols-2 items-center rounded-none mt-auto">
                <Link
                  to="/login"
                  className="flex items-center justify-center mt-2 py-2 px-4 hover:bg-gray-600 hover:text-white hover:rounded-lg"
                >
                  <MdLogin />
                  <span className="ml-2">Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center justify-center mt-2 py-2 px-4 hover:bg-gray-600 hover:text-white hover:rounded-lg"
                >
                  <MdLogin />
                  <span className="ml-2">SignUp</span>
                </Link>
              </div>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
