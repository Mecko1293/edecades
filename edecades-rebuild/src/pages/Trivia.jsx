import { useState } from 'react';
import { TRIVIA } from '../data/trivia';

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

  if (done) return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="text-6xl mb-4">🎯</div>
      <h1 className="font-retro text-4xl font-bold text-white mb-2">Quiz Complete!</h1>
      <p className="text-gray-400 mb-6">You scored <span className="text-rose-gold font-bold text-2xl">{score}</span> out of {TRIVIA.length * 10} points</p>
      <div className="bg-charcoal rounded-2xl p-6 mb-6 text-left">
        {answers.map((a, i) => (
          <div key={i} className="flex items-center gap-2 py-2 border-b border-white/10 last:border-0">
            <span>{a.correct ? '✅' : '❌'}</span>
            <span className="text-sm text-gray-300">{a.question}</span>
          </div>
        ))}
      </div>
      <button onClick={restart} className="bg-rose-gold hover:bg-rose-gold-light text-white font-semibold px-8 py-3 rounded-xl transition-colors">
        Play Again
      </button>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="font-retro text-4xl font-bold text-white text-center mb-2">🎯 Decade Trivia</h1>
      <p className="text-gray-400 text-center mb-8">Test your knowledge across history, music, film and culture</p>

      {/* Progress */}
      <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
        <span>Question {current + 1} of {TRIVIA.length}</span>
        <span>Score: <span className="text-rose-gold font-bold">{score}</span></span>
      </div>
      <div className="w-full bg-charcoal rounded-full h-2 mb-8">
        <div className="bg-rose-gold h-2 rounded-full transition-all" style={{ width: `${((current + 1) / TRIVIA.length) * 100}%` }} />
      </div>

      <div className="bg-charcoal rounded-2xl p-8 border border-white/10">
        <div className="flex gap-2 mb-4">
          <span className="text-xs bg-rose-gold/20 text-rose-gold px-2 py-1 rounded-full">{q.decade}</span>
          <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full">{q.category}</span>
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
  );
}
