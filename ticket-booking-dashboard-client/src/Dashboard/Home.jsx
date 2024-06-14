import useAuth from "../hooks/useAuth";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", events: 4000, revenue: 2400, profit: 2400 },
  { name: "Feb", events: 3000, revenue: 1398, profit: 2210 },
  { name: "Mar", events: 2000, revenue: 9800, profit: 2290 },
  { name: "Apr", events: 2780, revenue: 3908, profit: 2000 },
  { name: "May", events: 1890, revenue: 4800, profit: 2181 },
  { name: "Jun", events: 2390, revenue: 3800, profit: 2500 },
  { name: "Jul", events: 3490, revenue: 4300, profit: 2100 },
];

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

const eventsData = [
  { name: "Jan", events: 4000, returns: 240, revenue: 2400 },
  { name: "Feb", events: 3000, returns: 139, revenue: 2210 },
  { name: "Mar", events: 2000, returns: 980, revenue: 2290 },
  { name: "Apr", events: 2780, returns: 390, revenue: 2000 },
  { name: "May", events: 1890, returns: 480, revenue: 2181 },
  { name: "Jun", events: 2390, returns: 380, revenue: 2500 },
  { name: "Jul", events: 3490, returns: 430, revenue: 2100 },
];

const feedbackData = [
  { subject: "Quality", A: 120, B: 110, fullMark: 150 },
  { subject: "Price", A: 98, B: 130, fullMark: 150 },
  { subject: "Service", A: 86, B: 130, fullMark: 150 },
  { subject: "Variety", A: 99, B: 100, fullMark: 150 },
  { subject: "Availability", A: 85, B: 90, fullMark: 150 },
  { subject: "Shipping", A: 65, B: 85, fullMark: 150 },
];

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="w-full ms-4 pt-12 lg:pt-0 md:pt-0">
      {user ? 
      <h2 className="text-3xl mt-12 font-semibold">
      Hi,{" "}
      <span className="text-4xl text-green-600 me-2">{user?.displayName}</span>
      Welcome Back!
    </h2>
    :
    <h2 className="text-5xl text-green-600 me-2 font-bold mb-8 text-center">Welcome to Our <br /> Ticket Booking System Dashboard!</h2>
    }

      <div style={{ width: "100%", height: 300, marginTop: 20 }}>
        <h3 className="text-center">Event Feedback</h3>
        <ResponsiveContainer>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={feedbackData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar
              name="Feedback A"
              dataKey="A"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <Radar
              name="Feedback B"
              dataKey="B"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.6}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>


      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 className="mt-6">Events Dashboard</h1>
        <div className="hidden lg:block"
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          <div className="w-full lg:w-1/2 mt-4" style={{ height: 300 }}>
            <h3>Line Chart</h3>
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="events" stroke="#8884d8" />
                <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full lg:w-1/2" style={{ height: 300, marginTop: 20 }}>
            <h3>Events Overview</h3>
            <ResponsiveContainer>
              <LineChart data={eventsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="events" stroke="#8884d8" />
                <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
                <Line type="monotone" dataKey="returns" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          flexDirection: "column",
          alignItems: "center",
        }}
      ></div>


    </div>
  );
};

export default Home;
