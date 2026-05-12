import ProfilePicker from '../components/ProfilePicker';
import { PRESET_AVATARS } from '../components/ProfilePicker';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
        <p className="text-gray-400">Choose how you show up on eDecades — your photo, an era avatar, or stay anonymous</p>
      </div>

      <div className="bg-charcoal rounded-3xl border border-white/10 p-6 sm:p-8">
        <ProfilePicker onSave={handleSave} initialValue={saved} />
      </div>

      {saved && (
        <div className="mt-6 bg-green-900/20 border border-green-500/20 rounded-2xl p-4 text-center">
          <p className="text-green-400 text-sm">
            ✓ Profile set to: <strong className="text-white">
              {saved.mode === 'anonymous' ? 'Anonymous' : saved.mode === 'photo' ? 'Custom Photo' : saved.avatar?.label}
            </strong>
          </p>
        </div>
      )}

      {/* Feature callouts — clickable */}
      <div className="mt-8 grid grid-cols-3 gap-4 text-center">
        {[
          { icon: '🔒', title: 'Privacy First', desc: 'Your choice, always respected', to: '/profile' },
          { icon: '✏️', title: 'Change Anytime', desc: 'Update your look whenever', to: '/profile' },
          { icon: '🎭', title: '16 Avatars', desc: 'One for every era of history', to: '/profile' },
        ].map(item => (
          <Link key={item.title} to={item.to}
            className="bg-charcoal rounded-2xl border border-white/10 hover:border-rose-gold/40 p-4 transition-all hover:scale-105">
            <div className="text-2xl mb-2">{item.icon}</div>
            <p className="text-white text-sm font-semibold">{item.title}</p>
            <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
          </Link>
        ))}
      </div>

      {/* Era Avatars Preview Strip */}
      <div className="mt-8">
        <h2 className="text-white font-semibold mb-4 text-center">Choose Your Era</h2>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {PRESET_AVATARS.map(av => (
            <div key={av.id} className="relative rounded-xl overflow-hidden aspect-square border border-white/10 hover:border-rose-gold/50 transition-all cursor-pointer group"
              onClick={() => {
                const picker = document.querySelector('button[data-av="' + av.id + '"]');
                if (picker) picker.click();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}>
              <img src={av.photo} alt={av.label}
                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                onError={e => { e.target.style.display='none'; }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <p className="absolute bottom-1 left-0 right-0 text-center text-white text-[8px] px-0.5 leading-tight font-medium">{av.label}</p>
            </div>
          ))}
        </div>
        <p className="text-gray-500 text-xs text-center mt-3">Click any avatar above to select it</p>
      </div>
    </div>
  );
}
