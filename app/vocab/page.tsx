'use client';
import { useState, useEffect } from 'react';
import data from '../../data/vocabulary.json';

export default function VocabPage() {
  const [current, setCurrent] = useState<typeof data.words>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function loadQuestion() {
    const shuffled = [...data.words].sort(() => Math.random() - 0.5);
    setCurrent(shuffled.slice(0, 6));
    setSelected([]);
    setSubmitted(false);
  }

  useEffect(() => { loadQuestion(); }, []);

  function toggle(word: string) {
    if (submitted) return;
    setSelected(prev =>
      prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]
    );
  }

  function getColor(word: typeof data.words[0]) {
    if (!submitted) return selected.includes(word.word)
      ? 'bg-blue-100 border-blue-400'
      : 'bg-white border-gray-200';
    if (word.type === 'real') return 'bg-green-100 border-green-400';
    if (selected.includes(word.word)) return 'bg-red-100 border-red-400';
    return 'bg-white border-gray-200';
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-semibold mb-2">Vocabulary</h1>
      <p className="text-gray-500 mb-8">選出所有真實英文單字</p>
      <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-8">
        {current.map(w => (
          <button
            key={w.id}
            onClick={() => toggle(w.word)}
            className={`border-2 rounded-xl py-4 text-lg font-medium transition-all ${getColor(w)}`}
          >
            {w.word}
          </button>
        ))}
      </div>
      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          className="bg-black text-white px-8 py-3 rounded-xl font-medium"
        >
          確認送出
        </button>
      ) : (
        <button
          onClick={loadQuestion}
          className="bg-black text-white px-8 py-3 rounded-xl font-medium"
        >
          下一題 →
        </button>
      )}
    </div>
  );
}