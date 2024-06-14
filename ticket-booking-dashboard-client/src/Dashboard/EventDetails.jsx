import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import { useLoaderData } from "react-router-dom";

const EventDetails = () => {
  const event = useLoaderData();
  const user = useContext(AuthContext);
  const { name, image, price, eventDetails } = event;
  const email = user?.user?.email;

  //   console.log(user.user)
  //   console.log(user?.user?.email)

  const [bookingStatus, setBookingStatus] = useState(null);

  const handleBookNow = async () => {
    try {
      const response = await fetch(
        "https://ticket-booking-dashboard-server.vercel.app/bookEvent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            image,
            price,
            eventDetails,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to book event");
      }

      await response.json();
      setBookingStatus("Booking successful!");
    } catch (error) {
      setBookingStatus("Booking failed. Please try again.");
    }
  };

  return (
    <div className=" p-4">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6">
        <div className="">
          <img className="h-[500px]" src={image} alt="event image" />
        </div>
        <div className="text-left items-start">
          <h1 className="text-5xl font-bold my-12">{name}</h1>
          <h3 className="text-2xl font-semibold my-2">Price: ${price}</h3>
          <p className="text-xl text-gray-400 mt-6 font-medium my-2">
            {eventDetails}
          </p>
          <button
            onClick={handleBookNow}
            className="btn bg-green-700 text-white text-xl font-semibold my-12 px-4 py-2"
          >
            Book Now
          </button>
          {bookingStatus && (
            <p
              className={`mt-4 text-lg ${
                bookingStatus.includes("successful")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {bookingStatus}
            </p>
          )}
        </div>
      </div>
      <p className="text-lg font-medium text-gray-500 mt-12 p-6">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam corrupti
        dolore laudantium rerum ex vitae voluptas iste dolores praesentium dolor
        omnis sed illum quae nesciunt cumque autem, odio sunt ea perspiciatis
        earum possimus! Vitae quisquam earum magni voluptatum iusto impedit,
        veritatis delectus rem, quas assumenda enim eum est suscipit, quis
        perspiciatis ut repellat doloremque expedita facere? Saepe similique
        possimus perferendis repellendus, cum suscipit laudantium modi nesciunt
        odio consectetur iusto ullam totam iste eius rerum unde esse ipsa minus
        repudiandae minima? Officia, beatae ducimus! Atque sit recusandae id sed
        nihil perferendis veritatis possimus animi totam quasi. Eligendi in ipsa
        dolorem deleniti.
      </p>
    </div>
  );
};

export default EventDetails;
