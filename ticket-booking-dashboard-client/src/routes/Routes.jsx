import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import AddEvent from "../Dashboard/AddEvent";
import AllEvents from "../Dashboard/AllEvents";
import Home from "../Dashboard/Home";
import EventDetails from "../Dashboard/EventDetails";
import Bookings from "../Dashboard/Bookings";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/addEvent",
        element: <PrivateRoute><AddEvent></AddEvent></PrivateRoute>,
      },
      {
        path: "/allEvents",
        element: <AllEvents></AllEvents>,
      },
      {
        path: "/allEvents/:id",
        element: <EventDetails></EventDetails>,
        loader: ({ params }) =>
          fetch(
            `https://ticket-booking-dashboard-server.vercel.app/allEvents/${params.id}`
          ),
      },
      {
        path: "/bookings",
        element: <PrivateRoute><Bookings></Bookings></PrivateRoute>,
      },
    ],
  },
]);

export default router;
