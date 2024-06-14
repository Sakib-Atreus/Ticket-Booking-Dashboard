import { Link } from "react-router-dom";

const SingleEvent = ({ event = {} }) => {
  const { _id, name, price, eventDetails, image } = event;

  return (
    <div className="card lg:w-96 md:96 w-86 shadow-xl">
      <figure>
        <img className="w-full h-64" src={image || "default-image.jpg"} alt="event" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name || "Event Name"}</h2>
        <h3 className="text-xl font-semibold">{price || "Price"}</h3>
        <p>{(eventDetails && eventDetails.slice(0, 60)) || "Event details not available"}</p>
        <div className="card-actions justify-end">
          <button className="">
            <Link to={`/allEvents/${_id || "#"}`} className="btn bg-green-700 text-white text-xl">See details</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleEvent;
