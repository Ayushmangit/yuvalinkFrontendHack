export default function SettingAdmin({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm
                    z-[999] flex items-center justify-center">

      <div className="w-[420px] bg-white rounded-2xl p-6 shadow-2xl relative">
        
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-6 text-center">
          Settings
        </h2>

        {/* SETTINGS OPTIONS */}
        <div className="space-y-4 text-sm">

          <div className="flex justify-between items-center">
            <span>Dark Mode</span>
            <input type="checkbox" className="accent-blue-600" />
          </div>

          <div className="flex justify-between items-center">
            <span>Notifications</span>
            <input type="checkbox" className="accent-blue-600" defaultChecked />
          </div>

          <div className="flex justify-between items-center">
            <span>Email Alerts</span>
            <input type="checkbox" className="accent-blue-600" />
          </div>

          <div className="border-t pt-4">
            <label className="block mb-1 text-gray-600">
              Language
            </label>
            <select className="w-full border rounded-lg px-3 py-2">
              <option>English</option>
              <option>Hindi</option>
            </select>
          </div>

        </div>

        <button
          className="mt-6 w-full px-4 py-2 rounded-full
                     bg-gradient-to-r
                     from-blue-600 to-green-700
                     text-white text-sm"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
