import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StepExperience() {
  const navigate = useNavigate();

  const [hasExperience, setHasExperience] = useState(null);
  const [experienceDesc, setExperienceDesc] = useState("");
  const [skills, setSkills] = useState([]);
  const [otherSkill, setOtherSkill] = useState("");
  const [proofFile, setProofFile] = useState(null);

  const skillOptions = [
    { key: "medical", label: "Medical Support" },
    { key: "rescue", label: "Rescue & Evacuation" },
    { key: "logistics", label: "Logistics & Supply" },
    { key: "crowd", label: "Crowd Assistance" },
    { key: "cleanup", label: "Cleaning & Recovery" },
    { key: "data", label: "Data Collection" },
  ];

  const toggleSkill = (skill) => {
    setSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      hasExperience,
      experienceDesc: hasExperience ? experienceDesc : "",
      skills,
      otherSkill,
      proofUploaded: !!proofFile,
      tier: hasExperience ? "UNDER_REVIEW" : "TIER_0",
    };

    // 🔐 BACKEND READY
    /*
      POST /api/volunteer/onboarding/experience
      BODY: payload (FormData if file upload)
    */

    navigate("/onboarding/verify");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Experience Question */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Have you helped in any disaster or emergency before?
        </label>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setHasExperience(true)}
            className={`flex-1 py-3 rounded-lg border font-medium transition
              ${
                hasExperience === true
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white border-gray-300 hover:bg-gray-50"
              }`}
          >
            Yes
          </button>

          <button
            type="button"
            onClick={() => setHasExperience(false)}
            className={`flex-1 py-3 rounded-lg border font-medium transition
              ${
                hasExperience === false
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white border-gray-300 hover:bg-gray-50"
              }`}
          >
            No
          </button>
        </div>
      </div>

      {/* Short Description (Only if Yes) */}
      {hasExperience === true && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Briefly describe your experience (max 200 characters)
          </label>
          <textarea
            maxLength={200}
            value={experienceDesc}
            onChange={(e) => setExperienceDesc(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Example: Assisted flood victims with food distribution"
          />
        </div>
      )}

      {/* Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select areas you can help with
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skillOptions.map((skill) => (
            <label
              key={skill.key}
              className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer transition
                ${
                  skills.includes(skill.key)
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
            >
              <input
                type="checkbox"
                checked={skills.includes(skill.key)}
                onChange={() => toggleSkill(skill.key)}
                className="h-4 w-4 accent-blue-600"
              />
              <span className="text-sm text-gray-800">{skill.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Other Skill */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Other (optional)
        </label>
        <input
          type="text"
          value={otherSkill}
          onChange={(e) => setOtherSkill(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
          placeholder="Any other skill"
        />
      </div>

      {/* Proof Upload (Optional) */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Upload certificate / ID (optional)
  </label>

  <div className="flex items-center gap-4">
    {/* Hidden file input */}
    <input
      type="file"
      id="proofUpload"
      onChange={(e) => setProofFile(e.target.files[0])}
      className="hidden"
    />

    {/* Custom button */}
    <label
      htmlFor="proofUpload"
      className="cursor-pointer inline-flex items-center px-5 py-2.5
                 rounded-lg border border-gray-300
                 bg-white text-gray-700 font-medium
                 hover:bg-gray-50 transition"
    >
      📎 Choose File
    </label>

    {/* File name */}
    {proofFile && (
      <span className="text-sm text-gray-600 truncate max-w-xs">
        {proofFile.name}
      </span>
    )}
  </div>

  <p className="text-xs text-gray-500 mt-1">
    Proof is optional — only for context
  </p>
</div>


      {/* Submit */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={hasExperience === null || skills.length === 0}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold
                     hover:bg-blue-700 transition disabled:opacity-50"
        >
          Continue
        </button>

        <p className="text-xs text-gray-500 mt-2 text-center">
          If no experience → assigned to Tier-0 (General Helper)
        </p>
      </div>

    </form>
  );
}
