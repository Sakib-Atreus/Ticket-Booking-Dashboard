import {
    createBrowserRouter,
  } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import AddEvent from "../Dashboard/AddEvent";
import AllEvents from "../Dashboard/AllEvents";
import Home from "../Dashboard/Home";
import EventDetails from "../Dashboard/EventDetails";
import Bookings from "../Dashboard/Bookings";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard></Dashboard>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/signup',
          element: <SignUp></SignUp>
        },
        {
          path: '/addEvent',
          element: <AddEvent></AddEvent>
        },
        {
          path: '/allEvents',
          element: <AllEvents></AllEvents>
        },
        {
          path: "/allEvents/:id",
          element: <EventDetails></EventDetails>,
          loader: ({ params }) =>
            fetch(`http://localhost:5000/allEvents/${params.id}`),
        },
        {
          path: '/bookings',
          element: <Bookings></Bookings>
        },
      ]
    },
  ]);

  export default router;