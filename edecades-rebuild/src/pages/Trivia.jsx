import { useState } from 'react';
import { TRIVIA } from '../data/trivia';

const DECADE_PHOTOS = {
  '1900s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/1900s_decade_montage.png/330px-1900s_decade_montage.png',
  '1910s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/World_war_one_poster.jpg/330px-World_war_one_poster.jpg',
  '1920s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flappers-1920s.jpg/330px-Flappers-1920s.jpg',
  '1930s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Dust_Bowl_-_Dallas%2C_South_Dakota_1936.jpg/330px-Dust_Bowl_-_Dallas%2C_South_Dakota_1936.jpg',
  '1940s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Into_the_Jaws_of_Death_23-0455M_edit.jpg/330px-Into_the_Jaws_of_Death_23-0455M_edit.jpg',
  '1950s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Elvis_Presley_promoting_Jailhouse_Rock.jpg/330px-Elvis_Presley_promoting_Jailhouse_Rock.jpg',
  '1960s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/March_on_Washington_edit.jpg/330px-March_on_Washington_edit.jpg',
  '1970s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Wembley_Stadium_Live_Aid.jpg/330px-Wembley_Stadium_Live_Aid.jpg',
  '1980s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Berlinermauer.jpg/330px-Berlinermauer.jpg',
  '1990s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Nirvana_around_1992_%28cropped%29.jpg/330px-Nirvana_around_1992_%28cropped%29.jpg',
  '2000s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/National_Park_Service_9-11_Statue_of_Liberty_and_WTC_fire.jpg/330px-National_Park_Service_9-11_Statue_of_Liberty_and_WTC_fire.jpg',
  '2010s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/330px-President_Barack_Obama.jpg',
  '2020s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Syringe_and_vaccine.jpg/330px-Syringe_and_vaccine.jpg',
};

export default function Trivia() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState([]);

  const q = TRIVIA[current];

  function handleAnswer(idx) {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === q.answer;
    if (correct) setScore(s => s + q.points);
    setAnswers(a => [...a, { correct, question: q.question }]);
  }

  function next() {
    if (current + 1 >= TRIVIA.length) { setDone(true); return; }
    setCurrent(c => c + 1);
    setSelected(null);
  }

  function restart() {
    setCurrent(0); setSelected(null); setScore(0); setDone(false); setAnswers([]);
  }

  const pct = Math.round((score / (TRIVIA.length * 10)) * 100);

  if (done) return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-rose-gold">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Sputnik_asm.jpg/330px-Sputnik_asm.jpg"
          alt="Quiz complete" className="w-full h-full object-cover" />
      </div>
      <h1 className="font-retro text-4xl font-bold text-white mb-2">Quiz Complete!</h1>
      <p className="text-gray-400 mb-2">You scored <span className="text-rose-gold font-bold text-2xl">{score}</span> points</p>
      <p className="text-gray-500 text-sm mb-6">{pct >= 80 ? '🏆 History Expert!' : pct >= 60 ? '⭐ Well done!' : '📚 Keep exploring!'}</p>
      <div className="bg-charcoal rounded-2xl p-6 mb-6 text-left max-h-64 overflow-y-auto">
        {answers.map((a, i) => (
          <div key={i} className="flex items-start gap-2 py-2 border-b border-white/10 last:border-0">
            <span className="shrink-0">{a.correct ? '✅' : '❌'}</span>
            <span className="text-sm text-gray-300">{a.question}</span>
          </div>
        ))}
      </div>
      <button onClick={restart} className="bg-rose-gold hover:bg-rose-gold-light text-white font-semibold px-8 py-3 rounded-xl transition-colors">
        Play Again
      </button>
    </div>
  );

  const heroPhoto = DECADE_PHOTOS[q.decade];

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="font-retro text-4xl font-bold text-white text-center mb-2">🎯 Decade Trivia</h1>
      <p className="text-gray-400 text-center mb-6">Test your knowledge across history, music, film and culture</p>

      <div className="flex items-center justify-between mb-3 text-sm text-gray-400">
        <span>Question {current + 1} of {TRIVIA.length}</span>
        <span>Score: <span className="text-rose-gold font-bold">{score}</span></span>
      </div>
      <div className="w-full bg-charcoal rounded-full h-2 mb-6">
        <div className="bg-rose-gold h-2 rounded-full transition-all" style={{ width: `${((current) / TRIVIA.length) * 100}%` }} />
      </div>

      <div className="bg-charcoal rounded-2xl overflow-hidden border border-white/10">
        {/* Decade hero photo */}
        {heroPhoto && (
          <div className="relative h-44 overflow-hidden">
            <img src={heroPhoto} alt={q.decade}
              loading="lazy"
              onError={e => { e.target.style.display='none'; }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
            <div className="absolute bottom-3 left-5">
              <span className="font-retro text-rose-gold font-black text-2xl">{q.decade}</span>
            </div>
          </div>
        )}
        <div className="p-8">
          <div className="flex gap-2 mb-4">
            <span className="text-xs bg-rose-gold/20 text-rose-gold px-2 py-1 rounded-full">{q.decade}</span>
            <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full">{q.category}</span>
            <span className="text-xs bg-white/10 text-gray-400 px-2 py-1 rounded-full">{q.points} pts</span>
          </div>
          <h2 className="font-retro text-xl font-bold text-white mb-6">{q.question}</h2>
          <div className="grid grid-cols-1 gap-3">
            {q.options.map((opt, i) => {
              let cls = 'border border-white/20 text-gray-300 hover:border-rose-gold/50 hover:text-white';
              if (selected !== null) {
                if (i === q.answer) cls = 'border-green-500 bg-green-500/20 text-green-300';
                else if (i === selected) cls = 'border-red-500 bg-red-500/20 text-red-300';
                else cls = 'border-white/10 text-gray-500';
              }
              return (
                <button key={i} onClick={() => handleAnswer(i)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all ${cls} ${selected === null ? 'cursor-pointer' : 'cursor-default'}`}>
                  <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>{opt}
                </button>
              );
            })}
          </div>
          {selected !== null && (
            <div className="mt-6 flex justify-end">
              <button onClick={next} className="bg-rose-gold hover:bg-rose-gold-light text-white font-semibold px-6 py-2 rounded-xl transition-colors">
                {current + 1 >= TRIVIA.length ? 'See Results' : 'Next Question →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
