import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../service/firebaseConfig";
import ReactStars from "react-stars";
import "react-vertical-timeline-component/style.min.css";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { FaHotel, FaCalendarDay } from "react-icons/fa";

const ViewTrip = () => {
  const { tripId } = useParams();
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTripData = async () => {
      if (!tripId) return;

      try {
        const docRef = doc(db, "trips", tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const itinerary = JSON.parse(data.itinerary);

          setTripData({
            ...data,
            itinerary: itinerary.response,
          });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTripData();
  }, [tripId]);

  if (loading) return <p>Loading...</p>;
  if (!tripData) return <p>No data found</p>;

  const getRandomImage = (index) =>
    `https://picsum.photos/400/300?random=${index}`;
  const { name, destination, days, travelType, budget, itinerary } = tripData;

  return (
    <div className="pt-24 pb-10 px-10 min-h-screen bg-gradient-to-b from-blue-200 to-blue-100 text-gray-800">
      <h1 className="text-5xl text-center uppercase tracking-widest font-bold text-blue-700 mb-8">
        Trip Details
      </h1>

      {/* User Info */}
      <section className="p-6">
        <div className="grid grid-cols-2 text-xl items-center justify-items-center md:grid-cols-4 gap-6 text-grey-500 tracking-normal">
          <p><strong className="text-black pr-2 uppercase tracking-widest">Destination:</strong> {destination}</p>
          <p><strong className="text-black pr-2 uppercase tracking-widest">Days:</strong> {days}</p>
          <p><strong className="text-black pr-2 uppercase tracking-widest">Travel Type:</strong> {travelType}</p>
          <p><strong className="text-black pr-2 uppercase tracking-widest">Budget:</strong> {budget}</p>
        </div>
      </section>

      {/* Hotels */}
      <section className="p-6 mb-8">
        <h2 className="text-4xl font-semibold text-blue-700 text-center mb-4">Hotels</h2>
        <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {itinerary.hotels.map((hotel, index) => (
            <div
              key={index}
              className="w-[330px] bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={getRandomImage(index)}
                alt={hotel.name}
                className="w-full h-40 object-cover"
              />

              <div className="p-4">
                <h3 className="text-xl font-bold">{hotel.name}</h3>
                <p className="text-gray-600">Price: ₹{hotel.price_per_night}</p>
                <ReactStars
                  value={hotel.review}
                  count={5}
                  size={24}
                  color2={"#ffd700"}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Itinerary with Vertical Timeline */}
      <section className=" p-6">
        <h2 className="text-4xl text-center font-semibold text-purple-600 mb-4">Day Schedule</h2>
        
        <VerticalTimeline>
          {itinerary.days.map((day, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              date={`Day ${day.day}`}
              iconStyle={{ background: "#4CAF50", color: "#fff" }}
              icon={<FaCalendarDay />}
            >
              <h3 className="text-xl font-bold text-purple-800">{day.title}</h3>
              <ul className="list-disc ml-5 mt-3 text-gray-700">
                {day.travel_tips.map((tip, tipIndex) => (
                  <li key={tipIndex}>{tip}</li>
                ))}
              </ul>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </section>
    </div>
  );
};

export default ViewTrip;
