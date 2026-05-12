import { useState } from 'react';
import { TRIVIA } from '../data/trivia';

// Question photos — real historical images paired with trivia topics
const QUESTION_PHOTOS = {
  'Which brothers made the first successful powered airplane flight in 1903?': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Wright_first_flight03.jpg/400px-Wright_first_flight03.jpg',
  'What famous ship sank on April 14, 1912?': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/RMS_Titanic_3.jpg/400px-RMS_Titanic_3.jpg',
  'What was Prohibition a ban on?': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Speakeasy_crowd.jpg/400px-Speakeasy_crowd.jpg',
  'What dance craze defined the Roaring Twenties?': 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80',
  'Which superhero debuted in Action Comics in 1938?': 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&q=80',
  'What major economic crisis defined the 1930s in America?': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Lange-MigrantMother02.jpg/400px-Lange-MigrantMother02.jpg',
  'In what year did WWII end?': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/VJ_day_woman_assault.jpg/400px-VJ_day_woman_assault.jpg',
  'Who recorded "Rock Around the Clock" in 1954?': 'https://images.unsplash.com/photo-1571013086264-17cf8c72f39f?w=400&q=80',
  'In what year did the Beatles appear on The Ed Sullivan Show?': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/The_Beatles_in_America.JPG/400px-The_Beatles_in_America.JPG',
  'In what year did humans first land on the Moon?': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Buzz_salutes_the_U.S._Flag.jpg/400px-Buzz_salutes_the_U.S._Flag.jpg',
  'Which film launched the modern blockbuster era in 1977?': 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&q=80',
  'What genre of music was born in New York\'s South Bronx in the 1970s?': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
  'What did MTV launch in 1981?': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80',
  'Which artist released "Thriller" in 1982?': 'https://images.unsplash.com/photo-1493515322954-4fa727e97985?w=400&q=80',
  'What year did the World Wide Web become publicly available?': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80',
  'Which Seattle band popularized the grunge movement?': 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80',
  'What year did the first iPhone launch?': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80',
  'Which social network launched in 2004 and changed communication forever?': 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80',
  'Which app launched in 2010 and changed photo sharing forever?': 'https://images.unsplash.com/photo-1611162616305-c69b3037c7bb?w=400&q=80',
  'What global event began in 2020 and changed everyday life worldwide?': 'https://images.unsplash.com/photo-1584118624012-df056829fbd0?w=400&q=80',
  'Which AI chatbot launched in late 2022 and sparked a worldwide AI revolution?': 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&q=80',
};

const DEFAULT_PHOTO = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80';

export default function Trivia() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState([]);

  const q = TRIVIA[current];
  const photo = QUESTION_PHOTOS[q?.question] || DEFAULT_PHOTO;

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

  if (done) return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="text-6xl mb-4">🎯</div>
      <h1 className="font-retro text-4xl font-bold text-white mb-2">Quiz Complete!</h1>
      <p className="text-gray-400 mb-6">
        You scored <span className="text-rose-gold font-bold text-2xl">{score}</span> out of {TRIVIA.length * 10} points
      </p>
      <div className="bg-charcoal rounded-2xl p-6 mb-6 text-left">
        {answers.map((a, i) => (
          <div key={i} className="flex items-center gap-2 py-2 border-b border-white/10 last:border-0">
            <span>{a.correct ? '✅' : '❌'}</span>
            <span className="text-sm text-gray-300">{a.question}</span>
          </div>
        ))}
      </div>
      <button onClick={restart}
        className="bg-rose-gold hover:opacity-90 text-white font-semibold px-8 py-3 rounded-xl transition-colors">
        Play Again
      </button>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="font-retro text-4xl font-bold text-white text-center mb-2">🎯 Decade Trivia</h1>
      <p className="text-gray-400 text-center mb-8">Test your knowledge across history, music, film and culture</p>

      {/* Progress */}
      <div className="flex items-center justify-between mb-3 text-sm text-gray-400">
        <span>Question {current + 1} of {TRIVIA.length}</span>
        <span>Score: <span className="text-rose-gold font-bold">{score}</span></span>
      </div>
      <div className="w-full bg-charcoal rounded-full h-2 mb-8">
        <div className="bg-rose-gold h-2 rounded-full transition-all duration-500"
          style={{ width: `${((current + 1) / TRIVIA.length) * 100}%` }} />
      </div>

      {/* Question Card with Photo */}
      <div className="bg-charcoal rounded-3xl border border-white/10 overflow-hidden mb-6">
        {/* Photo */}
        <div className="relative h-44 sm:h-52 overflow-hidden">
          <img src={photo} alt={q.decade}
            className="w-full h-full object-cover"
            onError={e => { e.target.src = DEFAULT_PHOTO; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
          <div className="absolute bottom-3 left-4 flex gap-2">
            <span className="bg-rose-gold text-white text-xs font-semibold px-2 py-1 rounded-full">{q.decade}</span>
            <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-full">{q.category}</span>
          </div>
        </div>

        {/* Question */}
        <div className="p-6">
          <h2 className="text-white text-lg font-semibold mb-4 leading-relaxed">{q.question}</h2>

          {/* Options */}
          <div className="grid grid-cols-1 gap-3">
            {q.options.map((opt, idx) => {
              let cls = 'w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ';
              if (selected === null) {
                cls += 'bg-charcoal-dark border-white/10 text-gray-200 hover:border-rose-gold/50 hover:text-white cursor-pointer';
              } else if (idx === q.answer) {
                cls += 'bg-green-900/30 border-green-500/60 text-green-400';
              } else if (idx === selected && selected !== q.answer) {
                cls += 'bg-red-900/30 border-red-500/60 text-red-400';
              } else {
                cls += 'bg-charcoal-dark border-white/5 text-gray-500';
              }
              return (
                <button key={idx} className={cls} onClick={() => handleAnswer(idx)}>
                  <span className="mr-2 text-gray-500">{String.fromCharCode(65 + idx)}.</span>
                  {opt}
                  {selected !== null && idx === q.answer && <span className="ml-2">✓</span>}
                  {selected === idx && selected !== q.answer && <span className="ml-2">✗</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Next button */}
      {selected !== null && (
        <div className="text-center">
          <div className={`mb-4 text-lg font-semibold ${selected === q.answer ? 'text-green-400' : 'text-red-400'}`}>
            {selected === q.answer ? '🎉 Correct! +10 points' : `❌ The answer was: ${q.options[q.answer]}`}
          </div>
          <button onClick={next}
            className="bg-rose-gold hover:opacity-90 text-white font-semibold px-8 py-3 rounded-xl transition-colors">
            {current + 1 < TRIVIA.length ? 'Next Question →' : 'See Results'}
          </button>
        </div>
      )}
    </div>
  );
}
