import ProfilePicker from '../components/ProfilePicker';
import { useState, useEffect } from 'react';

export default function Profile() {
  const [saved, setSaved] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('edecades_profile');
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, []);

  const handleSave = (data) => setSaved(data);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="font-retro text-4xl font-bold text-white mb-2">Your Profile</h1>
        <p className="text-gray-400">Choose how you show up on eDecades — photo, era avatar, or anonymous</p>
      </div>

      <div className="bg-charcoal rounded-3xl border border-white/10 p-6 sm:p-8">
        <ProfilePicker onSave={handleSave} initialValue={saved} />
      </div>

      {saved && (
        <div className="mt-6 bg-green-900/20 border border-green-500/20 rounded-2xl p-4 text-center">
          <p className="text-green-400 text-sm">
            Profile set to: <strong className="text-white">
              {saved.mode === 'anonymous' ? 'Anonymous' : saved.mode === 'photo' ? 'Custom Photo' : saved.avatar?.label}
            </strong>
          </p>
        </div>
      )}
    </div>
  );
}
