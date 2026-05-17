import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from '@monaco-editor/react';
import {
  RiCodeSSlashLine, RiSendPlaneLine, RiDeleteBin6Line,
  RiInformationLine,
} from 'react-icons/ri';
import api from '../utils/api';
import { LANGUAGES, getError } from '../utils/helpers';
import toast from 'react-hot-toast';

export default function ReviewPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const handleEditorChange = useCallback((value) => {
    setCode(value || '');
    setCharCount((value || '').length);
  }, []);

  const handleSubmit = async () => {
    if (!code.trim()) return toast.error('Please enter some code to review');
    if (code.length > 50000) return toast.error('Code exceeds 50,000 character limit');

    setLoading(true);
    try {
      const { data } = await api.post('/reviews', { code, language });
      toast.success('Review complete!');
      navigate(`/review/${data.data._id}`);
    } catch (err) {
      toast.error(getError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setCode('');
    setCharCount(0);
  };

  const SAMPLE_CODE = {
    javascript: `// Sample JavaScript code — paste your own below
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
    python: `# Sample Python code — paste your own below
def calculate_average(numbers):
  sum = 0
  for i in range(len(numbers)):
    sum = sum + numbers[i]
  average = sum / len(numbers)
  return average

data = [1, 2, 3, 4, 5]
print(calculate_average(data))`,
  };

  const loadSample = () => {
    const sample = SAMPLE_CODE[language] || SAMPLE_CODE.javascript;
    setCode(sample);
    setCharCount(sample.length);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-display text-3xl font-bold text-white mb-1">
          <span className="glow-text">AI</span> Code Review
        </h1>
        <p className="text-[var(--color-text-muted)]">
          Paste your code, select the language, and get an instant AI review.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Editor panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          {/* Toolbar */}
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="input w-auto text-sm py-2 px-3"
            >
              {LANGUAGES.map((l) => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>

            <button onClick={loadSample} className="btn-secondary text-xs py-2 px-3">
              Load Sample
            </button>

            <button onClick={handleClear} className="btn-secondary text-xs py-2 px-3">
              <RiDeleteBin6Line size={13} /> Clear
            </button>

            <span className="ml-auto text-xs text-[var(--color-text-muted)]">
              {charCount.toLocaleString()} / 50,000 chars
            </span>
          </div>

          {/* Monaco Editor */}
          <div className="rounded-2xl overflow-hidden border border-white/7"
            style={{ height: '520px', background: '#080c10' }}>
            <Editor
              height="100%"
              language={language}
              value={code}
              onChange={handleEditorChange}
              theme="vs-dark"
              options={{
                fontSize: 14,
                fontFamily: 'JetBrains Mono, Fira Code, monospace',
                fontLigatures: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                padding: { top: 16, bottom: 16 },
                renderLineHighlight: 'line',
                smoothScrolling: true,
                cursorBlinking: 'smooth',
                wordWrap: 'on',
              }}
            />
          </div>
        </motion.div>

        {/* Side panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-4"
        >
          {/* Language info */}
          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <RiCodeSSlashLine size={16} className="text-brand-400" />
              <span className="text-sm font-semibold text-white">Selected Language</span>
            </div>
            <div className="px-3 py-2 rounded-lg text-sm font-medium capitalize text-brand-400"
              style={{ background: 'rgba(26,174,157,0.08)', border: '1px solid rgba(26,174,157,0.15)' }}>
              {LANGUAGES.find((l) => l.value === language)?.label || language}
            </div>
          </div>

          {/* What the AI checks */}
          <div className="card flex-1">
            <div className="flex items-center gap-2 mb-4">
              <RiInformationLine size={16} className="text-blue-400" />
              <span className="text-sm font-semibold text-white">AI Checks For</span>
            </div>
            <ul className="space-y-2.5">
              {[
                ['🐛', 'Bug Detection',           'Line-level bugs & errors'],
                ['🔒', 'Security Issues',         'OWASP vulnerabilities'],
                ['⚡', 'Performance',             'Bottlenecks & optimization'],
                ['📐', 'Code Complexity',         'Cyclomatic complexity'],
                ['✨', 'Best Practices',          'Language-specific standards'],
                ['🔄', 'Refactored Version',      'Improved code output'],
              ].map(([emoji, title, sub]) => (
                <li key={title} className="flex items-start gap-2.5">
                  <span className="text-base flex-shrink-0 mt-0.5">{emoji}</span>
                  <div>
                    <p className="text-sm text-white font-medium">{title}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{sub}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Submit button */}
          <AnimatePresence>
            <motion.button
              onClick={handleSubmit}
              disabled={loading || !code.trim()}
              className="btn-primary w-full justify-center py-3.5 text-base"
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing…
                </>
              ) : (
                <>
                  <RiSendPlaneLine size={18} />
                  Review Code
                </>
              )}
            </motion.button>
          </AnimatePresence>

          {loading && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-xs text-[var(--color-text-muted)]"
            >
              AI is analyzing your code… this takes a few seconds.
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
}