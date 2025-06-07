import { useState } from 'react';

const horses = [
  "シックスペンス", "ダディーズビビッド", "$マッドクール", "ウインマーベル", "レッドモンレーヴ",
  "グレナディアガーズ", "ガイアフォース", "エエヤン", "エコロヴァルツ", "ジャンタルマンタル",
  "サクラトゥジュール", "ソウルラッシュ", "ウォーターナビレラ", "ホウオウアマゾン",
  "トウシンマカオ", "ジュビリーヘッド", "ジュンブロッサム", "ブレイディヴェーグ"
];

export default function Home() {
  const [selected, setSelected] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [votes, setVotes] = useState(Object.fromEntries(horses.map(h => [h, 0])));

  const toggleHorse = (horse) => {
    if (submitted) return;
    setSelected(prev =>
      prev.includes(horse)
        ? prev.filter(h => h !== horse)
        : prev.length < 5
        ? [...prev, horse]
        : prev
    );
  };

  const handleSubmit = () => {
    if (selected.length !== 5) return;
    const newVotes = { ...votes };
    selected.forEach(h => newVotes[h]++);
    setVotes(newVotes);
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '1rem' }}>
      <h1>安田記念2025｜5頭人気投票</h1>
      <p>出走馬から最大5頭を選んで投票してください。投票後、人気ランキングが表示されます。</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
        {horses.map(horse => (
          <button
            key={horse}
            onClick={() => toggleHorse(horse)}
            style={{
              padding: '0.5rem',
              border: selected.includes(horse) ? '2px solid blue' : '1px solid gray',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {horse}
          </button>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={selected.length !== 5 || submitted}
        style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
      >
        {submitted ? '投票完了' : '投票する（5頭選択）'}
      </button>
      {submitted && (
        <div style={{ marginTop: '2rem' }}>
          <h2>📊 人気ランキング</h2>
          {Object.entries(votes)
            .sort((a, b) => b[1] - a[1])
            .map(([horse, count]) => (
              <div key={horse}>
                <span>{horse}</span>: <strong>{count}票</strong>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
