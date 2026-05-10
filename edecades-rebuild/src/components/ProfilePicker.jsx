import { useState, useRef } from 'react';

const PRESET_AVATARS = [
  { id: 'av1',  emoji: '🎩', label: '1900s Gent',    bg: '#8B7355' },
  { id: 'av2',  emoji: '💃', label: 'Flapper',        bg: '#D4AF37' },
  { id: 'av3',  emoji: '🎷', label: 'Jazz Cat',       bg: '#4A5C6B' },
  { id: 'av4',  emoji: '🎬', label: 'Hollywood Star', bg: '#7C6D6D' },
  { id: 'av5',  emoji: '✈️', label: 'WWII Ace',       bg: '#3D5A80' },
  { id: 'av6',  emoji: '🎸', label: 'Rock \'n\' Roller',bg: '#E8A87C' },
  { id: 'av7',  emoji: '☮️', label: 'Peace Child',    bg: '#9B59B6' },
  { id: 'av8',  emoji: '🕺', label: 'Disco King',     bg: '#D4956E' },
  { id: 'av9',  emoji: '📼', label: 'VHS Kid',        bg: '#FF6B9D' },
  { id: 'av10', emoji: '💿', label: 'Mixtape Maker',  bg: '#00BCD4' },
  { id: 'av11', emoji: '📱', label: 'Y2K Digital',    bg: '#7CB9E8' },
  { id: 'av12', emoji: '📸', label: 'Selfie Pro',     bg: '#A8E6CF' },
  { id: 'av13', emoji: '🌐', label: 'AI Native',      bg: '#B39DDB' },
  { id: 'av14', emoji: '🎮', label: 'Gamer',          bg: '#F97316' },
  { id: 'av15', emoji: '🎨', label: 'Artist',         bg: '#EC4899' },
  { id: 'av16', emoji: '🦁', label: 'Lion',           bg: '#EAB308' },
];

export default function ProfilePicker({ onSave, initialValue }) {
  const [mode, setMode] = useState(initialValue?.mode || 'avatar'); // 'photo' | 'avatar' | 'anonymous'
  const [selectedAvatar, setSelectedAvatar] = useState(initialValue?.avatarId || 'av8');
  const [photoPreview, setPhotoPreview] = useState(initialValue?.photoUrl || null);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef();

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const result = {
      mode,
      avatarId: selectedAvatar,
      photoUrl: photoPreview,
      avatar: PRESET_AVATARS.find(a => a.id === selectedAvatar),
    };
    if (onSave) onSave(result);
    localStorage.setItem('edecades_profile', JSON.stringify(result));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const currentAvatar = PRESET_AVATARS.find(a => a.id === selectedAvatar);

  return (
    <div className="max-w-lg mx-auto">
      {/* Preview */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          {mode === 'photo' && photoPreview ? (
            <img src={photoPreview} alt="Profile" className="w-24 h-24 rounded-full object-cover ring-4 ring-rose-gold shadow-xl" />
          ) : mode === 'avatar' ? (
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-5xl ring-4 ring-rose-gold shadow-xl"
              style={{ background: currentAvatar?.bg || '#333d4d' }}>
              {currentAvatar?.emoji}
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center ring-4 ring-gray-600 shadow-xl">
              <span className="text-4xl">👤</span>
            </div>
          )}
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-rose-gold rounded-full flex items-center justify-center text-sm shadow">✏️</div>
        </div>
        <p className="text-gray-400 text-sm mt-4">
          {mode === 'anonymous' ? 'You\'ll appear as Anonymous' : mode === 'photo' ? 'Your photo' : currentAvatar?.label}
        </p>
      </div>

      {/* Mode Tabs */}
      <div className="flex gap-2 bg-gray-800/60 rounded-2xl p-1.5 mb-6">
        {[
          { key: 'photo', icon: '📷', label: 'Photo' },
          { key: 'avatar', icon: '🎭', label: 'Avatar' },
          { key: 'anonymous', icon: '👤', label: 'Anonymous' },
        ].map(tab => (
          <button key={tab.key} onClick={() => setMode(tab.key)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              mode === tab.key ? 'bg-rose-gold text-white shadow' : 'text-gray-400 hover:text-white'
            }`}>
            <span>{tab.icon}</span>{tab.label}
          </button>
        ))}
      </div>

      {/* Content per mode */}
      {mode === 'photo' && (
        <div className="text-center space-y-4">
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-rose-gold/40 rounded-2xl p-8 cursor-pointer hover:border-rose-gold/80 hover:bg-rose-gold/5 transition-all">
            {photoPreview ? (
              <div>
                <img src={photoPreview} alt="Preview" className="w-20 h-20 rounded-full object-cover mx-auto mb-3" />
                <p className="text-gray-400 text-sm">Click to change photo</p>
              </div>
            ) : (
              <div>
                <div className="text-5xl mb-3">📷</div>
                <p className="text-white font-semibold mb-1">Upload your photo</p>
                <p className="text-gray-500 text-xs">JPG, PNG, WebP — max 5MB</p>
              </div>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
          {photoPreview && (
            <button onClick={() => setPhotoPreview(null)} className="text-gray-500 text-xs hover:text-red-400 transition">
              Remove photo
            </button>
          )}
        </div>
      )}

      {mode === 'avatar' && (
        <div>
          <p className="text-gray-400 text-sm mb-4 text-center">Pick your decade persona</p>
          <div className="grid grid-cols-4 gap-3">
            {PRESET_AVATARS.map(av => (
              <button key={av.id} onClick={() => setSelectedAvatar(av.id)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border transition-all ${
                  selectedAvatar === av.id
                    ? 'border-rose-gold bg-rose-gold/10 scale-105 shadow-lg'
                    : 'border-white/10 hover:border-rose-gold/40 bg-charcoal'
                }`}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                  style={{ background: av.bg }}>
                  {av.emoji}
                </div>
                <span className="text-gray-300 text-xs text-center leading-tight">{av.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {mode === 'anonymous' && (
        <div className="text-center py-8 bg-charcoal rounded-2xl border border-white/10">
          <div className="text-6xl mb-4">👤</div>
          <h3 className="text-white font-semibold mb-2">Stay Anonymous</h3>
          <p className="text-gray-400 text-sm max-w-xs mx-auto">
            Your identity stays private. You'll appear as "Anonymous Member" throughout eDecades.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs text-gray-500">
            <span>✓ No photo required</span>
            <span>✓ Full access to all features</span>
            <span>✓ Change anytime</span>
          </div>
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        className={`w-full mt-6 py-3.5 rounded-2xl font-bold text-sm transition-all ${
          saved ? 'bg-green-600 text-white' : 'bg-rose-gold text-white hover:opacity-90 shadow-lg shadow-rose-gold/20'
        }`}>
        {saved ? '✓ Profile Saved!' : 'Save Profile Picture'}
      </button>
    </div>
  );
}
