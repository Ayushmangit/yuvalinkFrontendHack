import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StepVerification() {
  const navigate = useNavigate();

  const [certificate, setCertificate] = useState(null);
  const [livePhoto, setLivePhoto] = useState(null);
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!consent) {
      alert("Please confirm consent to proceed");
      return;
    }

    // 🔐 BACKEND READY PAYLOAD
    // POST /api/volunteer/onboarding/verify
    // body: FormData
    // certificate, livePhoto, consent

    navigate("/onboarding/pending");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Skill / Training Certificate */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Skill / Training Certificate (if any)
        </label>

        <div className="flex items-center gap-4">
          <input
            type="file"
            id="certificate"
            onChange={(e) => setCertificate(e.target.files[0])}
            className="hidden"
          />

          <label
            htmlFor="certificate"
            className="cursor-pointer px-5 py-2.5 rounded-lg border
                       border-gray-300 bg-white text-gray-700
                       hover:bg-gray-50 transition font-medium"
          >
            📄 Upload Certificate
          </label>

          {certificate && (
            <span className="text-sm text-gray-600 truncate max-w-xs">
              {certificate.name}
            </span>
          )}
        </div>

        <p className="text-xs text-gray-500 mt-1">
          Optional — helps admin assign higher tier faster
        </p>
      </div>

      {/* Live Photo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Live Photo (for identity confirmation)
        </label>

        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            id="livePhoto"
            onChange={(e) => setLivePhoto(e.target.files[0])}
            className="hidden"
          />

          <label
            htmlFor="livePhoto"
            className="cursor-pointer px-5 py-2.5 rounded-lg border
                       border-gray-300 bg-white text-gray-700
                       hover:bg-gray-50 transition font-medium"
          >
            📸 Capture / Upload Photo
          </label>

          {livePhoto && (
            <span className="text-sm text-gray-600 truncate max-w-xs">
              {livePhoto.name}
            </span>
          )}
        </div>

        <p className="text-xs text-gray-500 mt-1">
          Used only to prevent duplicate accounts. Not shared publicly.
        </p>
      </div>

      {/* Consent */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 accent-blue-600"
        />
        <p className="text-sm text-gray-700">
          I confirm that the information provided is true and I consent to
          identity verification for safety purposes.
        </p>
      </div>

      {/* Submit */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg
                     font-semibold hover:bg-blue-700 transition"
        >
          Submit for Verification
        </button>
      </div>

    </form>
  );
}
