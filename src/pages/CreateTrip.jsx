import React, { useState } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { travelList, budgetOptions } from "../constant/options.js";
import { generateTripItinerary } from "../service/model.js";
import { db } from "../service/firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";
import Alert from "../components/Alert";

const CreateTrip = () => {
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({
    days: "",
    budget: "",
    travelType: "",
  });

  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [alert, setAlert] = useState({ message: "", visible: false });
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const fetchDestinations = async (query, setSuggestions) => {
    if (query.length > 2) {
      const res = await fetch(
        `https://photon.komoot.io/api/?q=${query}&limit=5`
      );
      const data = await res.json();
      const suggestions = data.features.map((item) => ({
        label: item.properties.name,
        value: item.geometry.coordinates,
      }));
      setSuggestions(suggestions);
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );

        const user = {
          id: userInfo.data.sub,
          email: userInfo.data.email,
          name: userInfo.data.name,
          picture: userInfo.data.picture,
        };

        localStorage.setItem("user", JSON.stringify(user));
        setShowDialog(false);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    },
    onError: () => console.error("Login Failed"),
  });

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setShowDialog(true);
      return;
    }

    const tripData = {
      destination: place?.label || "",
      ...formData,
      userId: user.id,
      email: user.email,
      name: user.name,
    };

    if (
      !tripData.destination ||
      !tripData.days ||
      !tripData.budget ||
      !tripData.travelType
    ) {
      setAlert({ message: "Please fill all fields.", visible: true });
      return;
    }

    setLoading(true);

    try {
      const itinerary = await generateTripItinerary(
        tripData.destination,
        tripData.days,
        tripData.budget,
        tripData.travelType
      );

      const docRef = await addDoc(collection(db, "trips"), {
        ...tripData,
        itinerary: itinerary,
        createdAt: new Date(),
      });

      const tripId = docRef.id;

      setTimeout(() => navigate(`/trip/${tripId}`), 1000);
    } catch (error) {
      console.error("Error generating", error);
      setAlert({ message: "Failed to generate.", visible: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-38 px-58 bg-green-500 mx-auto pb-40 min-h-screen">
      <h1 className="text-5xl font-bold text-white mb-4">
        Tell us your travel preferences
      </h1>
      <p className="text-green-100 mb-10">
        Just provide some basic information and our trip planner will generate a
        customized itinerary based on your preferences.
      </p>

      <div className="space-y-8">
        {/* Destination */}

        <div>
          <h2 className="text-2xl font-semibold text-blue-50 mb-2">
            What is your destination?
          </h2>
          <input
            type="text"
            name="destination"
            value={place?.label || ""}
            onChange={(e) => {
              const query = e.target.value;
              setPlace({ label: query });
              fetchDestinations(query, setSuggestions); // Call the function
            }}
            placeholder="Enter destination..."
            className="w-full p-3 border rounded-lg bg-green-100 text-black-800 focus:ring-4 focus:ring-blue-400 hover:bg-green-200 transition-all"
          />
        </div>

        {/* Trip Days */}
        <div>
          <h2 className="text-2xl font-semibold text-blue-50 mb-2">
            How many days are you planning for the trip?
          </h2>
          <input
            type="number"
            name="days"
            value={formData.days}
            onChange={handleChange}
            placeholder="Enter number of days"
            className="w-full p-3 border rounded-lg bg-green-100 text-black-800 focus:ring-4 focus:ring-blue-400 hover:bg-green-200 transition-all"
          />
        </div>

        {/* Budget Options */}
        <div>
          <h2 className="text-2xl font-semibold text-blue-50 mb-4">
            What is your budget?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {budgetOptions.map((option) => (
              <div
                key={option.id}
                className={`p-6 border rounded-lg cursor-pointer transition-all shadow-md 
                  ${
                    formData.budget === option.title
                      ? "bg-blue-500 text-white"
                      : "bg-green-100 hover:bg-blue-200"
                  }`}
                onClick={() =>
                  setFormData({ ...formData, budget: option.title })
                }
              >
                <h3 className="text-xl font-semibold">{option.title}</h3>
                <p className="text-black-700">{option.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Type */}
        <div>
          <h2 className="text-2xl font-semibold text-blue-50 mb-4">
            What is your travel type?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {travelList.map((item) => (
              <div
                key={item.id}
                className={`p-6 border rounded-lg cursor-pointer transition-all shadow-md 
                  ${
                    formData.travelType === item.title
                      ? "bg-blue-500 text-white"
                      : "bg-green-100 hover:bg-blue-200"
                  }`}
                onClick={() =>
                  setFormData({ ...formData, travelType: item.title })
                }
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-black-700">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-10">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-400 transition-all"
          >
            {loading ? "Generating..." : "Submit Trip"}
          </button>
        </div>
      </div>

      {/* Alert */}
      {alert.visible && (
        <Alert
          message={alert.message}
          onClose={() => setAlert({ ...alert, visible: false })}
        />
      )}

      {/* Dialog Box */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Login Required</h2>
            <div className="flex justify-end">
              <button
                onClick={login}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                Sign in with Google
              </button>
              <button
                onClick={() => setShowDialog(false)}
                className="bg-black-300 text-black-800 px-6 py-2 rounded-lg hover:bg-black-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTrip;
