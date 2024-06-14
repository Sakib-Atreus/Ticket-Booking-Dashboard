import { useEffect, useState } from 'react';
import SingleEvent from './SingleEvent';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/allEvents');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSearch = () => {
    fetch(`https://dressify-server.vercel.app/searchText/${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEvents(data);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-5xl font-bold text-center text-green-500">All Event{"'"}s</h1>
      <div className="text-center mt-6">
        <input
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          className="p-1 rounded-lg bg-green-100 text-black"
          placeholder="Event Name "
        />{" "}
        <button
          onClick={handleSearch}
          className="btn btn-sm bg-green-400 text-black m-4 hover:text-white"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <SingleEvent key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventList;
