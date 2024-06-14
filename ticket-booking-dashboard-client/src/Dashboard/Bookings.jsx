import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProviders";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch(
      `https://ticket-booking-dashboard-server.vercel.app/allBookedEvents/${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEvents(data);
      });
  }, [user]);

  const handleSearch = () => {
    fetch(
      `https://ticket-booking-dashboard-server.vercel.app/searchText/${searchText}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEvents(data);
      });
  };

  const handleDelete = (_id) => {
    console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover it!",
      textColor: "#0000",
      icon: "warning",
      iconColor: "red",
      background: "black",
      Color: "#545454",
      showCancelButton: true,
      confirmButtonColor: "#F40D0D",
      cancelButtonColor: "#gray",
      // cancelButtonAriaLabel:'white',
      confirmButtonText: "Yes, delete it!",
      confirmButtonTextColor: "black",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://ticket-booking-dashboard-server.vercel.app/allBookedEvents/${_id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your event has been deleted.", "success");
              const remaining = events.filter((event) => event._id !== _id);
              setEvents(remaining);
            }
          });
      }
    });
  };

  return (
    <div className="my-jobs-container w-full lg:-mt-96">
      <h1 className="text-center m-2 bg-black text-green-400 p-4 font-black text-4xl rounded-full">
        My Booking Event{"'"}s
      </h1>
      <div className="search-box  text-center">
        <input
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          className="p-1 rounded-lg bg-green-200 text-black"
          placeholder="Event Name "
        />{" "}
        <button
          onClick={handleSearch}
          className="btn btn-sm bg-green-500 m-4 text-black hover:text-white"
        >
          Search
        </button>
        <table className="table w-full">
          {/* head */}
          <thead className="">
            <tr>
              <th className="bg-black border rounded text-center text-white">
                #
              </th>
              <th className="bg-black border rounded text-center text-white">
                Image
              </th>
              <th className="bg-black border rounded text-center text-white">
                Event Name
              </th>
              <th className="bg-black border rounded text-center text-white">
                Price
              </th>
              <th className="bg-black border rounded text-center text-white">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="text-black text-center bg-black">
            {events.map((event, index) => (
              <tr key={event}>
                <td className="text-center border-black text-black bg-green-300">
                  {index + 1}
                </td>
                <td className="flex justify-center text-center border-black text-black bg-green-200">
                  <img
                    className="rounded-full w-12 h-12"
                    src={event?.image}
                    alt=""
                  />
                </td>
                <td className="text-xl text-center border-black text-black bg-green-300 font-bold">
                  {event.name}
                </td>
                <td className="text-center border-black text-black bg-green-200">
                  {event.price}
                </td>
                <td className="text-center border-black text-black bg-green-300">
                  {" "}
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="btn btn-sm bg-red-500 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
