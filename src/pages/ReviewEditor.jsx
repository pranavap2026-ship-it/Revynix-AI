import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { RiSendPlaneLine, RiDeleteBin6Line } from 'react-icons/ri';
import toast from 'react-hot-toast';

import api from '../utils/api';
import { LANGUAGES, getError } from '../utils/helpers';

const MAX_CHARS = 50000;

const SAMPLE_CODE = {
  javascript: `// Sample JavaScript code. Paste your own instead.
function fetchUserData(userId) {
  const query = "SELECT * FROM users WHERE id = " + userId;
  db.query(query, function(err, result) {
    if (err) throw err;
    for (var i = 0; i < result.length; i++) {
      console.log(result[i]);
    }
    return result;
  });
}`,
  python: `# Sample Python code. Paste your own instead.
def calculate_average(numbers):
  sum = 0
  for i in range(len(numbers)):
    sum = sum + numbers[i]
  average = sum / len(numbers)
  return average

data = [1, 2, 3, 4, 5]
print(calculate_average(data))`,
};

const COVERS = [
  ['Bugs', 'Errors, with the line they are on'],
  ['Security', 'Common vulnerabilities such as injection'],
  ['Performance', 'Slow spots and wasted work'],
  ['Complexity', 'Time and space cost'],
  ['Best practices', 'Standards for the chosen language'],
  ['Refactored version', 'A cleaner copy of your code'],
];

const secondaryBtn =
  'flex items-center gap-2 rounded-lg border border-[#BFC5D6] px-3 py-2 text-sm font-semibold hover:bg-[#E6E9F2]';

export default function ReviewPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!code.trim()) return toast.error('Please enter some code to review');
    if (code.length > MAX_CHARS) return toast.error('Code is over the 50,000 character limit');

    setLoading(true);
    try {
      const { data } = await api.post('/reviews', { code, language });
      toast.success('Review complete');
      navigate(`/review/${data.data._id}`);
    } catch (err) {
      toast.error(getError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rv min-h-screen bg-[#F3F5F9] text-[#14182B]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">New review</h1>
        <p className="mt-3 text-[#4A5068]">Paste your code, choose the language and get a review in seconds.</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_20rem]">
          {/* EDITOR */}
          <section>
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <label htmlFor="language" className="sr-only">
                Language
              </label>
              <select
                id="language"
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="h-11 rounded-xl border border-[#BFC5D6] bg-white px-3 text-sm font-semibold outline-none focus:border-[#4B3FFF]"
              >
                {LANGUAGES.map(l => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </select>

              <button onClick={() => setCode(SAMPLE_CODE[language] || SAMPLE_CODE.javascript)} className={secondaryBtn}>
                Load sample
              </button>
              <button onClick={() => setCode('')} className={secondaryBtn}>
                <RiDeleteBin6Line size={15} />
                Clear
              </button>

              <span className="ml-auto text-sm text-[#5A6078]">
                {code.length.toLocaleString()} / {MAX_CHARS.toLocaleString()}
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#D9DDE8] bg-white">
              <Editor
                height="520px"
                language={language}
                value={code}
                onChange={value => setCode(value || '')}
                theme="vs"
                options={{
                  fontSize: 14,
                  fontFamily: 'JetBrains Mono, monospace',
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  padding: { top: 12, bottom: 12 },
                  wordWrap: 'on',
                  automaticLayout: true,
                }}
              />
            </div>
          </section>

          {/* SIDE */}
          <aside className="flex flex-col gap-4">
            <div className="rounded-2xl border border-[#D9DDE8] bg-white p-5">
              <h2 className="text-lg font-bold">What the review covers</h2>
              <ul className="mt-4 space-y-3">
                {COVERS.map(([title, sub]) => (
                  <li key={title}>
                    <p className="font-semibold">{title}</p>
                    <p className="text-sm text-[#5A6078]">{sub}</p>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || !code.trim()}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#4B3FFF] font-semibold text-white hover:bg-[#3A2FE0] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Reviewing...
                </>
              ) : (
                <>
                  <RiSendPlaneLine size={18} />
                  Review code
                </>
              )}
            </button>
            {loading && <p className="text-center text-sm text-[#5A6078]">This usually takes a few seconds.</p>}
          </aside>
        </div>
      </div>
    </div>
  );
}