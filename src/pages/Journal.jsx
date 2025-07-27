import { useState } from 'react';

export default function Journal() {
  const [entry, setEntry] = useState('');
  const today = new Date().toLocaleDateString();

  const handleSave = () => {
    localStorage.setItem(`journal-${today}`, entry);
    alert('Entry saved!');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Journal for {today}</h2>
      <textarea className="w-full h-40 p-2 border" value={entry} onChange={(e) => setEntry(e.target.value)} />
      <button className="mt-2 bg-green-500 text-white px-4 py-2" onClick={handleSave}>Save</button>
    </div>
  );
}