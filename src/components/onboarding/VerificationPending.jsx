import { useNavigate } from "react-router-dom";

export default function VerificationPending() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">

        <div className="text-5xl mb-4">⏳</div>

        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Verification in Progress
        </h2>

        <p className="text-gray-600 mb-6">
          Thank you for registering with <strong>YuvaLink</strong>.
          <br />
          Your profile is currently under review by our verification team.
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 mb-4">
          <p className="text-sm text-yellow-800 font-medium">
            Current Status: Pending Approval
          </p>
        </div>

        <p className="text-xs text-gray-500 mb-6">
          You’ll be notified once your profile is approved.
          <br />
          Please do not create duplicate accounts.
        </p>

        {/* IMPORTANT: NO LOGOUT, NO AUTH CHECK */}
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
