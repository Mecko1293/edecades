import { useState, useRef } from 'react';

// Real historical/era-accurate avatar photos — no cartoons
export const PRESET_AVATARS = [
  { id: 'av1',  label: '1900s Gent',      decade: '1900s', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&fit=crop&crop=face' },
  { id: 'av2',  label: 'Flapper Girl',    decade: '1920s', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/1920s_woman_portrait.jpg/200px-1920s_woman_portrait.jpg' },
  { id: 'av3',  label: 'Jazz Cat',        decade: '1920s', photo: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&q=80&fit=crop&crop=face' },
  { id: 'av4',  label: 'Hollywood Star',  decade: '1940s', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80&fit=crop&crop=face' },
  { id: 'av5',  label: 'WWII Veteran',    decade: '1940s', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/USMC-03434.jpg/200px-USMC-03434.jpg' },
  { id: 'av6',  label: 'Rock \'n\' Roller', decade: '1950s', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&fit=crop&crop=face' },
  { id: 'av7',  label: 'Peace Child',     decade: '1960s', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&fit=crop&crop=face' },
  { id: 'av8',  label: 'Disco King',      decade: '1970s', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&fit=crop&crop=face' },
  { id: 'av9',  label: 'Punk Rebel',      decade: '1970s', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&fit=crop&crop=face' },
  { id: 'av10', label: 'VHS Kid',         decade: '1980s', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80&fit=crop&crop=face' },
  { id: 'av11', label: 'Power Suit',      decade: '1980s', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&fit=crop&crop=face' },
  { id: 'av12', label: 'Grunge Era',      decade: '1990s', photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80&fit=crop&crop=face' },
  { id: 'av13', label: 'Y2K Digital',     decade: '2000s', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80&fit=crop&crop=face' },
  { id: 'av14', label: 'Selfie Pro',      decade: '2010s', photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&q=80&fit=crop&crop=face' },
  { id: 'av15', label: 'AI Native',       decade: '2020s', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80&fit=crop&crop=face' },
  { id: 'av16', label: 'Time Traveler',   decade: 'All',   photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&q=80&fit=crop&crop=face' },
];

export default function ProfilePicker({ onSave, initialValue }) {
  const [mode, setMode] = useState(initialValue?.mode || 'avatar');
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
      photoUrl: mode === 'photo' ? photoPreview : null,
      avatar: PRESET_AVATARS.find(a => a.id === selectedAvatar),
    };
    if (onSave) onSave(result);
    localStorage.setItem('edecades_profile', JSON.stringify(result));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const currentAvatar = PRESET_AVATARS.find(a => a.id === selectedAvatar);
  const displayPhoto = mode === 'photo' ? photoPreview : (mode === 'avatar' ? currentAvatar?.photo : null);

  return (
    <div className="max-w-lg mx-auto">
      {/* Preview */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          {displayPhoto ? (
            <img src={displayPhoto} alt="Profile"
              className="w-24 h-24 rounded-full object-cover ring-4 ring-rose-gold shadow-xl" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center ring-4 ring-gray-600 shadow-xl">
              <span className="text-4xl">👤</span>
            </div>
          )}
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-rose-gold rounded-full flex items-center justify-center text-sm shadow">✏️</div>
        </div>
        <p className="text-white font-medium mt-4 text-sm">
          {mode === 'anonymous' ? 'Anonymous' : mode === 'photo' ? 'Your Photo' : currentAvatar?.label}
        </p>
        {mode === 'avatar' && currentAvatar && (
          <p className="text-gray-500 text-xs">{currentAvatar.decade} Era</p>
        )}
      </div>

      {/* Mode Tabs */}
      <div className="flex gap-2 bg-gray-800/60 rounded-2xl p-1.5 mb-6">
        {[
          { key: 'photo', icon: '📷', label: 'My Photo' },
          { key: 'avatar', icon: '🎭', label: 'Era Avatar' },
          { key: 'anonymous', icon: '👤', label: 'Anonymous' },
        ].map(m => (
          <button key={m.key} onClick={() => setMode(m.key)}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${mode === m.key ? 'bg-rose-gold text-white' : 'text-gray-400 hover:text-white'}`}>
            {m.icon} {m.label}
          </button>
        ))}
      </div>

      {/* Upload Photo */}
      {mode === 'photo' && (
        <div className="mb-6 text-center">
          <button onClick={() => fileRef.current?.click()}
            className="bg-charcoal border border-white/20 hover:border-rose-gold/50 text-gray-300 hover:text-white px-6 py-3 rounded-xl text-sm transition-all">
            📷 Upload Your Photo
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
          {photoPreview && (
            <p className="text-green-400 text-xs mt-2">✓ Photo uploaded</p>
          )}
        </div>
      )}

      {/* Avatar Grid — Real Photos */}
      {mode === 'avatar' && (
        <div className="grid grid-cols-4 gap-3 mb-6">
          {PRESET_AVATARS.map(av => (
            <button key={av.id} onClick={() => setSelectedAvatar(av.id)}
              className={`relative rounded-2xl overflow-hidden aspect-square border-2 transition-all ${
                selectedAvatar === av.id ? 'border-rose-gold shadow-lg shadow-rose-gold/30 scale-105' : 'border-transparent hover:border-white/30'
              }`}>
              <img src={av.photo} alt={av.label}
                className="w-full h-full object-cover"
                onError={e => {
                  e.target.style.display = 'none';
                  e.target.parentElement.style.background = '#333d4d';
                }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-1 left-0 right-0 text-center">
                <p className="text-white text-[9px] font-medium leading-tight px-1">{av.label}</p>
              </div>
              {selectedAvatar === av.id && (
                <div className="absolute top-1 right-1 w-4 h-4 bg-rose-gold rounded-full flex items-center justify-center">
                  <span className="text-white text-[8px]">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {mode === 'anonymous' && (
        <div className="bg-charcoal rounded-2xl p-4 mb-6 text-center border border-white/10">
          <p className="text-gray-400 text-sm">You'll appear as <strong className="text-white">Anonymous</strong> — your identity stays private.</p>
        </div>
      )}

      {/* Save */}
      <button onClick={handleSave}
        className="w-full bg-rose-gold hover:opacity-90 text-white font-semibold py-3 rounded-xl transition-all shadow-lg">
        {saved ? '✓ Saved!' : 'Save Profile'}
      </button>
    </div>
  );
}
