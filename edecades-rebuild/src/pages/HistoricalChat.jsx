import { useState } from 'react';




const FIGURES = {
  '1920s': [
    { name: 'Louis Armstrong', role: 'Jazz Musician', photo: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&q=80&fit=crop', context: '1920s New Orleans and Chicago jazz scene, Prohibition era America', personality: 'Warm, joyful, innovative. Speaks with 1920s African-American vernacular. References speakeasies, jazz clubs, and the Great Migration.' },
    { name: 'Coco Chanel', role: 'Fashion Designer', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&fit=crop', context: '1920s Paris fashion world, post-WWI liberation of women\'s fashion', personality: 'Sharp, witty, confident. Speaks French-influenced English. References haute couture and Parisian society.' },
    { name: 'F. Scott Fitzgerald', role: 'Author', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&fit=crop', context: '1920s Jazz Age New York, the American Dream, literary circles', personality: 'Eloquent, melancholic, romantic. References Gatsby-era excess and disillusionment.' },
  ],
  '1930s': [
    { name: 'Franklin D. Roosevelt', role: 'US President', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&fit=crop', context: 'Great Depression America, the New Deal, radio fireside chats', personality: 'Confident, optimistic, patrician. Uses uplifting rhetoric. References economic crisis and national recovery.' },
    { name: 'Amelia Earhart', role: 'Aviation Pioneer', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80&fit=crop', context: '1930s aviation, women\'s liberation, world records', personality: 'Adventurous, determined, modest but proud. References flight records and women in aviation.' },
    { name: 'Langston Hughes', role: 'Poet & Author', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&fit=crop', context: 'Harlem Renaissance, 1930s Black America, jazz poetry', personality: 'Thoughtful, rhythmic speech. References the Blues and Black American experience.' },
  ],
  '1940s': [
    { name: 'Winston Churchill', role: 'British Prime Minister', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80&fit=crop', context: 'WWII Britain, the Blitz, Allied leadership', personality: 'Bombastic, eloquent. Uses wartime rhetoric. References duty to the Empire and victory over tyranny.' },
    { name: 'Ella Fitzgerald', role: 'Jazz Singer', photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80&fit=crop', context: '1940s New York jazz scene, bebop era', personality: 'Warm, gracious. Speaks of music with deep reverence. References Carnegie Hall and the jazz greats.' },
    { name: 'Albert Einstein', role: 'Physicist', photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80&fit=crop', context: '1940s atomic age, WWII physics, relativity theory', personality: 'Humble yet profound. German-accented English. Deeply troubled by atomic bomb use. Philosophical.' },
  ],
  '1950s': [
    { name: 'Elvis Presley', role: 'Rock & Roll Star', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80&fit=crop', context: '1950s Memphis, Sun Records, early rock & roll', personality: 'Humble, charming Southern drawl. References Tupelo Mississippi roots and the power of music.' },
    { name: 'Rosa Parks', role: 'Civil Rights Activist', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&fit=crop', context: '1955 Montgomery Alabama, Civil Rights Movement', personality: 'Dignified, calm but firm. References the injustice of segregation and the need for peaceful resistance.' },
    { name: 'Marilyn Monroe', role: 'Actress & Icon', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80&fit=crop', context: '1950s Hollywood golden age, fame and vulnerability', personality: 'Breathy, playful, deeper than her image. References the pressures of Hollywood and loneliness of fame.' },
  ],
  '1960s': [
    { name: 'Martin Luther King Jr.', role: 'Civil Rights Leader', photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&q=80&fit=crop', context: '1960s Civil Rights Movement, I Have a Dream speech, non-violent protest', personality: 'Eloquent, biblical cadence, profound moral conviction. References justice, brotherhood, and peaceful change.' },
    { name: 'John F. Kennedy', role: 'US President', photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&q=80&fit=crop', context: '1960s Camelot era, Cold War, space race, Cuban Missile Crisis', personality: 'Charismatic, Boston accent, idealistic. References American greatness and Cold War threats.' },
    { name: 'Jimi Hendrix', role: 'Rock Guitarist', photo: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80&fit=crop', context: '1960s psychedelic rock, Woodstock, counterculture', personality: 'Laid-back, poetic. References the spiritual power of music and psychedelic experience.' },
  ],
  '1970s': [
    { name: 'Muhammad Ali', role: 'Boxer & Activist', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&fit=crop&crop=face', context: '1970s heavyweight boxing, Vietnam War protest, Black pride', personality: 'Boastful, poetic, rhyming trash talk. Deep conviction about justice and identity. References "float like a butterfly".' },
    { name: 'Gloria Steinem', role: 'Feminist Activist', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&fit=crop&crop=face', context: '1970s women\'s liberation movement, Ms. Magazine', personality: 'Sharp, direct. References gender inequality and the fight for women\'s equal rights.' },
    { name: 'David Bowie', role: 'Rock Musician', photo: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&q=80&fit=crop&crop=face', context: '1970s glam rock, Ziggy Stardust era, artistic reinvention', personality: 'Theatrical, avant-garde. References alter egos and the freedom of artistic expression.' },
  ],
  '1980s': [
    { name: 'Michael Jackson', role: 'Pop Star', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&fit=crop&crop=face', context: '1980s pop music, Thriller era, MTV, moonwalk', personality: 'Soft-spoken. References the joy of performance and connecting with fans through music and dance.' },
    { name: 'Ronald Reagan', role: 'US President', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&fit=crop&crop=face', context: '1980s Cold War, Reaganomics, optimistic conservatism', personality: 'Folksy, optimistic. References morning in America and the fight against communism.' },
    { name: 'Madonna', role: 'Pop Icon', photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80&fit=crop&crop=face', context: '1980s pop music, MTV, Material Girl era', personality: 'Bold, provocative, unapologetic. References female empowerment and pushing cultural boundaries.' },
  ],
  '1990s': [
    { name: 'Kurt Cobain', role: 'Grunge Musician', photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80&fit=crop&crop=face', context: '1990s grunge, Seattle music scene, Nirvana, Gen X angst', personality: 'Anti-establishment, introspective. References corporate music industry and authentic self-expression.' },
    { name: 'Nelson Mandela', role: 'South African President', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80&fit=crop&crop=face', context: '1990s South Africa, end of Apartheid, reconciliation', personality: 'Dignified, forgiving. References 27 years in prison and the power of forgiveness over hatred.' },
    { name: 'Bill Gates', role: 'Tech Entrepreneur', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80&fit=crop&crop=face', context: '1990s Microsoft, Windows, personal computing revolution', personality: 'Cerebral, enthusiastic about technology. References the potential of computers to change the world.' },
  ],
  '2000s': [
    { name: 'Steve Jobs', role: 'Apple Co-founder', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80&fit=crop&crop=face', context: '2000s iPod, iPhone, Apple revolution', personality: 'Visionary, intense. Uses "one more thing". References making a dent in the universe and insanely great products.' },
    { name: 'Beyoncé', role: 'Pop Star', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&fit=crop&crop=face', context: '2000s pop/R&B, Destiny\'s Child, early solo career', personality: 'Confident, gracious. References hard work, female empowerment, and Houston Texas roots.' },
    { name: 'Barack Obama', role: 'US Senator/President', photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&q=80&fit=crop&crop=face', context: '2000s politics, 2008 election, hope and change', personality: 'Eloquent, measured, professorial yet accessible. References American values and the audacity of hope.' },
  ],
  '2010s': [
    { name: 'Elon Musk', role: 'Tech Entrepreneur', photo: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80&fit=crop&crop=face', context: '2010s Tesla, SpaceX, disruption culture', personality: 'Blunt, meme-aware. References making humanity multi-planetary and disrupting stale industries.' },
    { name: 'Taylor Swift', role: 'Pop Star', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&fit=crop&crop=face', context: '2010s pop music, Swifties fandom, reinvention', personality: 'Warm, storytelling-focused, witty. References songwriting as diary-keeping and genuine fan connections.' },
    { name: 'Malala Yousafzai', role: 'Education Activist', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80&fit=crop&crop=face', context: '2010s education rights, Taliban shooting survivor, Nobel Prize', personality: 'Brave, thoughtful. References the power of education and the importance of girls\' rights globally.' },
  ],
};

const DECADES = Object.keys(FIGURES);
const QUICK_QUESTIONS = [
  'What is your greatest achievement?',
  'What challenges do you face?',
  'What do you think of today\'s world?',
  'What advice would you give young people?',
  'What was life really like in your era?',
];

export default function HistoricalChat() {
  const [selectedDecade, setSelectedDecade] = useState('1960s');
  const [activeFigure, setActiveFigure] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const figures = FIGURES[selectedDecade] || [];

  const startChat = (figure) => {
    setActiveFigure(figure);
    setMessages([{
      role: 'assistant',
      text: getOpener(figure, selectedDecade),
    }]);
  };

  const getOpener = (fig, decade) => {
    const openers = {
      'Martin Luther King Jr.': `Greetings, my friend. I speak to you from the heart of the movement — from Montgomery, from Birmingham, from the steps of the Lincoln Memorial. We are at a crossroads in this nation. What is on your mind?`,
      'Elvis Presley': `Well, hey there! You know, they say music is the only thing that can speak straight to the soul. I\'m just a boy from Tupelo who loves to sing. What\'d you wanna talk about?`,
      'Muhammad Ali': `I am the greatest! I said that before I knew I was. Float like a butterfly, sting like a bee — now what\'s your question for me?`,
      'Michael Jackson': `Hi... I just want to say that music is something I feel, you know? It comes from a place inside that\'s real. Thank you for being here. What would you like to know?`,
    };
    return openers[fig.name] || `Hello. I am ${fig.name} — ${fig.role} in the ${decade}. It is a remarkable time to be alive. What would you like to discuss?`;
  };

  const sendMessage = async () => {
    if (!input.trim() || loading || !activeFigure) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('https://base44.app/api/functions/historicalChat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          figure: activeFigure.name,
          decade: selectedDecade,
          context: activeFigure.context,
          personality: activeFigure.personality,
          messages: [...messages, { role: 'user', text: userMsg }],
        }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', text: data.reply || 'I find myself at a loss for words.' }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', text: `I apologize — I seem to have lost my train of thought. Please ask me again.` }]);
    }
    setLoading(false);
  };

  if (activeFigure) return (
    <div className="flex flex-col h-screen bg-charcoal-dark">
      {/* Chat Header */}
      <div className="bg-charcoal border-b border-white/10 px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => { setActiveFigure(null); setMessages([]); }}
          className="text-gray-400 hover:text-rose-gold transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-rose-gold flex-shrink-0">
          <img src={activeFigure.photo} alt={activeFigure.name} className="w-full h-full object-cover object-top"
            onError={e => { e.target.style.display='none'; }} />
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{activeFigure.name}</p>
          <p className="text-gray-500 text-xs">{activeFigure.role} · {selectedDecade}</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 bg-green-900/30 border border-green-500/20 text-green-400 text-xs px-2.5 py-1 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          In Character
        </div>
      </div>

      {/* Context Banner */}
      <div className="bg-charcoal/50 border-b border-white/5 px-4 py-2 text-center">
        <p className="text-gray-500 text-xs">Speaking with <span className="text-rose-gold font-medium">{activeFigure.name}</span> as they existed in the <span className="text-rose-gold font-medium">{selectedDecade}</span></p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 max-w-2xl mx-auto w-full">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-rose-gold/30">
                <img src={activeFigure.photo} alt={activeFigure.name} className="w-full h-full object-cover object-top" />
              </div>
            )}
            <div className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-rose-gold text-white rounded-br-sm'
                : 'bg-charcoal text-gray-200 border border-white/10 rounded-bl-sm font-serif'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-end gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-rose-gold/30">
              <img src={activeFigure.photo} alt="" className="w-full h-full object-cover object-top" />
            </div>
            <div className="bg-charcoal border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
              {[0,1,2].map(i => <div key={i} className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: `${i*0.15}s` }} />)}
            </div>
          </div>
        )}
      </div>

      {/* Quick Questions */}
      <div className="px-4 pb-1 max-w-2xl mx-auto w-full">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {QUICK_QUESTIONS.map((q, i) => (
            <button key={i} onClick={() => setInput(q)}
              className="flex-shrink-0 text-xs bg-charcoal border border-white/10 hover:border-rose-gold/40 text-gray-400 hover:text-rose-gold px-3 py-1.5 rounded-full transition-colors">
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="bg-charcoal border-t border-white/10 px-4 py-3">
        <div className="max-w-2xl mx-auto flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder={`Ask ${activeFigure.name} something...`}
            className="flex-1 bg-charcoal-dark border border-white/20 focus:border-rose-gold/50 rounded-xl px-4 py-2.5 text-white text-sm outline-none placeholder-gray-600 transition-colors"
          />
          <button onClick={sendMessage} disabled={loading || !input.trim()}
            className="bg-rose-gold hover:opacity-90 disabled:opacity-40 text-white font-semibold px-4 py-2.5 rounded-xl transition-all text-sm">
            Send
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="font-retro text-4xl font-bold text-white mb-2">Ask a Historical Figure</h1>
        <p className="text-gray-400">Pick a decade and a legend — then have a real AI conversation in their authentic voice</p>
      </div>

      {/* Decade Selector */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {DECADES.map(d => (
          <button key={d} onClick={() => setSelectedDecade(d)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedDecade === d
                ? 'bg-rose-gold text-white shadow-lg shadow-rose-gold/20'
                : 'bg-charcoal text-gray-300 border border-white/10 hover:border-rose-gold/30 hover:text-rose-gold'
            }`}>
            {d}
          </button>
        ))}
      </div>

      {/* Figure Grid */}
      <h2 className="text-white font-semibold text-lg text-center mb-6">Choose a Figure from the {selectedDecade}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {figures.map((fig, i) => (
          <button key={i} onClick={() => startChat(fig)}
            className="group bg-charcoal rounded-2xl border border-white/10 hover:border-rose-gold/50 overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-gold/10 text-left">
            <div className="relative h-48 overflow-hidden">
              <img src={fig.photo} alt={fig.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                onError={e => { e.target.style.display='none'; e.target.parentElement.style.background='#1a1f2e'; }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-retro text-lg font-bold text-white">{fig.name}</p>
                <p className="text-rose-gold text-xs">{fig.role}</p>
              </div>
            </div>
            <div className="px-4 py-3">
              <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{fig.context}</p>
              <div className="mt-3 flex items-center gap-1.5 text-rose-gold text-xs font-semibold">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Start Conversation
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
