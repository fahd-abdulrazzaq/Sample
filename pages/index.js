import { useState } from 'react';
import { fakeVerifyText } from '../lib/mira';

export default function Home() {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [verified, setVerified] = useState(false);
  const [evidence, setEvidence] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await fakeVerifyText(comment);
    setVerified(result.verified);
    setEvidence(result.evidence);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">🧠 Mira Truth Check</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Enter a comment to verify"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>

        {submitted && (
          <div className="mt-6 border-t pt-4">
            <p className="text-lg"><strong>{name}</strong>: {comment}</p>
            {verified ? (
              <div className="mt-2 text-green-600 font-semibold">
                ✅ Verified by Mira
                <p className="text-sm text-gray-500">{evidence}</p>
              </div>
            ) : (
              <div className="mt-2 text-red-600 font-semibold">
                ❌ Could not verify this comment
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
