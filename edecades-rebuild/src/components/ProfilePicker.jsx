import { useState, useRef } from 'react';

// Real historical portrait photos — no cartoons, no emojis
export const PRESET_AVATARS = [
  { id: 'av1',  label: '1900s Gent',       decade: '1900s', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80&fit=crop&crop=face' },
  { id: 'av2',  label: 'Flapper',          decade: '1920s', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80&fit=crop&crop=face' },
  { id: 'av3',  label: 'Jazz Cat',         decade: '1920s', photo: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80&fit=crop&crop=face' },
  { id: 'av4',  label: 'Hollywood Star',   decade: '1940s', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80&fit=crop&crop=face' },
  { id: 'av5',  label: 'WWII Veteran',     decade: '1940s', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80&fit=crop&crop=face' },
  { id: 'av6',  label: "Rock 'n' Roller",  decade: '1950s', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80&fit=crop&crop=face' },
  { id: 'av7',  label: 'Peace Child',      decade: '1960s', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80&fit=crop&crop=face' },
  { id: 'av8',  label: 'Disco Queen',      decade: '1970s', photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=80&fit=crop&crop=face' },
  { id: 'av9',  label: 'Punk Rebel',       decade: '1970s', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80&fit=crop&crop=face' },
  { id: 'av10', label: 'VHS Kid',          decade: '1980s', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80&fit=crop&crop=face' },
  { id: 'av11', label: 'Power Suit',       decade: '1980s', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80&fit=crop&crop=face' },
  { id: 'av12', label: 'Grunge Era',       decade: '1990s', photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&q=80&fit=crop&crop=face' },
  { id: 'av13', label: 'Y2K Digital',      decade: '2000s', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80&fit=crop&crop=face' },
  { id: 'av14', label: 'Selfie Pro',       decade: '2010s', photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&q=80&fit=crop&crop=face' },
  { id: 'av15', label: 'AI Native',        decade: '2020s', photo: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=300&q=80&fit=crop&crop=face' },
  { id: 'av16', label: 'Time Traveler',    decade: 'All',   photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&q=80&fit=crop&crop=face' },
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
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-rose-gold rounded-full flex items-center justify-center shadow">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
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
          { key: 'photo',     label: 'My Photo',   svgPath: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z' },
          { key: 'avatar',    label: 'Era Avatar',  svgPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
          { key: 'anonymous', label: 'Anonymous',   svgPath: 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21' },
        ].map(m => (
          <button key={m.key} onClick={() => setMode(m.key)}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-1.5 ${mode === m.key ? 'bg-rose-gold text-white' : 'text-gray-400 hover:text-white'}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={m.svgPath} />
            </svg>
            {m.label}
          </button>
        ))}
      </div>

      {/* Upload Photo */}
      {mode === 'photo' && (
        <div className="mb-6 text-center">
          <button onClick={() => fileRef.current?.click()}
            className="bg-charcoal border border-white/20 hover:border-rose-gold/50 text-gray-300 hover:text-white px-6 py-3 rounded-xl text-sm transition-all inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Upload Your Photo
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
          {photoPreview && (
            <p className="text-green-400 text-xs mt-2">Photo uploaded</p>
          )}
        </div>
      )}

      {/* Avatar Grid — 16 real portrait photos, 4 columns */}
      {mode === 'avatar' && (
        <div className="grid grid-cols-4 gap-3 mb-6">
          {PRESET_AVATARS.map(av => (
            <button key={av.id} onClick={() => setSelectedAvatar(av.id)}
              className={`relative rounded-2xl overflow-hidden aspect-square border-2 transition-all ${
                selectedAvatar === av.id
                  ? 'border-rose-gold shadow-lg shadow-rose-gold/30 scale-105'
                  : 'border-transparent hover:border-white/30'
              }`}>
              <img src={av.photo} alt={av.label}
                className="w-full h-full object-cover"
                onError={e => {
                  e.target.style.display = 'none';
                  e.target.parentElement.style.background = '#333d4d';
                }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-1 left-0 right-0 text-center">
                <p className="text-white text-[8px] font-medium leading-tight px-1 drop-shadow">{av.label}</p>
              </div>
              {selectedAvatar === av.id && (
                <div className="absolute top-1 right-1 w-4 h-4 bg-rose-gold rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
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

      {/* Privacy features */}
      <div className="grid grid-cols-3 gap-3 mb-5 text-center">
        {[
          { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', label: 'Privacy First' },
          { icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z', label: 'Change Anytime' },
          { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', label: '16 Avatars' },
        ].map(item => (
          <div key={item.label} className="bg-charcoal rounded-xl border border-white/10 p-3">
            <svg className="w-5 h-5 text-rose-gold mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
            </svg>
            <p className="text-white text-xs font-semibold">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Save */}
      <button onClick={handleSave}
        className="w-full bg-rose-gold hover:opacity-90 text-white font-semibold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
        {saved ? (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Saved!
          </>
        ) : 'Save Profile'}
      </button>
    </div>
  );
}
