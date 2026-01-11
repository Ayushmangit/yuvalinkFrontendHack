import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StepBasicInfo() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    dob: "",
    gender: "",
    phone: "",
    occupation: "",
    currentAddress: "",
    permanentAddress: "",
    liveLocation: null,
    liveLocationText: "",
  });

  const [locationError, setLocationError] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchLiveLocation = () => {
  if (!navigator.geolocation) {
    setLocationError("Geolocation not supported by this browser");
    return;
  }

  setLoadingLocation(true);

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();

        setForm({
          ...form,
          liveLocation: { latitude, longitude },
          liveLocationText: data.display_name || `${latitude}, ${longitude}`,
        });

        setLocationError("");
      } catch {
        setForm({
          ...form,
          liveLocation: { latitude, longitude },
          liveLocationText: `${latitude}, ${longitude}`,
        });
      }

      setLoadingLocation(false);
    },
    () => {
      setLocationError("Location permission denied");
      setLoadingLocation(false);
    }
  );
};


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.liveLocation) {
      alert("Please allow live location to continue");
      return;
    }

    // 🔐 BACKEND READY PAYLOAD
    /*
      POST /api/volunteer/onboarding/basic-info
      BODY: form
    */

    navigate("/onboarding/experience");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your full name"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
          placeholder="example@gmail.com"
        />
      </div>

      {/* Date of Birth */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date of Birth
        </label>
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          Age must be 20 years or above
        </p>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gender
        </label>
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          maxLength={10}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
          placeholder="10 digit mobile number"
        />
      </div>

      {/* Occupation */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Occupation
        </label>
        <input
          type="text"
          name="occupation"
          value={form.occupation}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
          placeholder="Student / Professional / Other"
        />
      </div>

      {/* Current Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Current Address
        </label>
        <textarea
          name="currentAddress"
          value={form.currentAddress}
          onChange={handleChange}
          rows={3}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Permanent Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Permanent Address
        </label>
        <textarea
          name="permanentAddress"
          value={form.permanentAddress}
          onChange={handleChange}
          rows={3}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Live Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Live Location (Required)
        </label>
        <button
          type="button"
          onClick={fetchLiveLocation}
          disabled={loadingLocation}
          className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50"
        >
          {loadingLocation ? "Fetching Location..." : "Fetch Live Location"}
        </button>

        {form.liveLocation && (
          <div className="mt-3 p-3 rounded-lg bg-green-50 border border-green-200 text-sm">
            <p className="text-green-700 font-medium">
              ✔ Live location captured
            </p>
            <p className="text-gray-700 mt-1">
              {form.liveLocationText}
            </p>
          </div>
        )}


        {locationError && (
          <p className="text-sm text-red-600 mt-2">
            {locationError}
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="pt-6">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Continue
        </button>
      </div>

    </form>
  );
}
