import { Outlet, useLocation } from "react-router-dom";

export default function OnboardingLayout() {
  const location = useLocation();

  const stepIndex = location.pathname.includes("experience")
    ? 1
    : location.pathname.includes("verify")
    ? 2
    : 0;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        
        <h1 className="text-3xl font-bold text-gray-800">
          Volunteer Onboarding
        </h1>
        <p className="text-gray-500 mt-1">
          Please complete all steps to proceed
        </p>

        {/* Progress bar */}
        <div className="flex gap-2 mt-6 mb-8">
          {[0,1,2].map(i => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full ${
                i <= stepIndex ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* FORM CONTENT */}
        <Outlet />

      </div>
    </div>
  );
}
