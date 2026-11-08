import { useState } from 'react';
import Editor from '@monaco-editor/react';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import {
  RiSparklingLine,
  RiShieldCheckLine,
  RiFileCopyLine,
  RiCheckLine,
  RiShareLine,
  RiDownloadLine,
} from 'react-icons/ri';

import api from '../utils/api';

const LANGS = [
  ['javascript', 'JavaScript'],
  ['typescript', 'TypeScript'],
  ['python', 'Python'],
  ['java', 'Java'],
  ['cpp', 'C++'],
  ['c', 'C'],
  ['csharp', 'C#'],
  ['php', 'PHP'],
  ['go', 'Go'],
  ['rust', 'Rust'],
  ['html', 'HTML'],
  ['css', 'CSS'],
];
const PREVIEWABLE = ['html', 'css', 'javascript'];
const MAX_CHARS = 50000;

const scoreTone = score =>
  score >= 80
    ? { fg: '#1F7A45', bg: '#E2F6E8' }
    : score >= 60
    ? { fg: '#8A5300', bg: '#FFF1CC' }
    : { fg: '#B3261E', bg: '#FDE8E6' };

const previewDoc = (language, code) =>
  language === 'html'
    ? code
    : language === 'css'
    ? `<html><head><style>${code}</style></head><body><div class="preview">CSS preview</div></body></html>`
    : `<html><body><div id="app"></div><script>try{${code}}catch(e){document.body.innerHTML+='<pre style="color:#B3261E;padding:16px">'+e+'</pre>'}</script></body></html>`;

const Panel = ({ title, children }) => (
  <section className="rounded-2xl border border-[#D9DDE8] bg-white p-5">
    <h3 className="mb-3 text-lg font-bold">{title}</h3>
    {children}
  </section>
);

const iconBtn =
  'flex items-center gap-2 rounded-lg border border-[#BFC5D6] px-3 py-2 text-sm font-semibold hover:bg-[#E6E9F2]';

export default function Reviewer() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [reviewId, setReviewId] = useState(null);
  const [copied, setCopied] = useState(false);
  const [mobileTab, setMobileTab] = useState('code');
  const [showPreview, setShowPreview] = useState(false);

  const isPreviewSupported = PREVIEWABLE.includes(language);

  const handleReview = async () => {
    if (!code.trim()) return toast.error('Please enter some code');
    if (code.length > MAX_CHARS) return toast.error('Code is over the 50,000 character limit');

    try {
      setLoading(true);
      setResult(null);
      const response = await api.post('/reviews', { code, language });
      setResult(response.data.data.aiResponse);
      setReviewId(response.data.data._id || null);
      setMobileTab('review'); // jump to the result on phones
      toast.success('Review complete');
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Review failed');
    } finally {
      setLoading(false);
    }
  };

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Copy failed');
    }
  };

  const shareReview = async () => {
    const url = reviewId ? `${window.location.origin}/review/${reviewId}` : window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Revynix AI review', text: result?.summary, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success('Link copied');
      }
    } catch {
      toast.error('Share failed');
    }
  };

  const downloadPDF = () => {
    if (!result) return toast.error('No review available');
    try {
      const pdf = new jsPDF();
      let y = 20;
      const addLine = (text = '') => {
        const lines = pdf.splitTextToSize(String(text), 170);
        pdf.text(lines, 20, y);
        y += lines.length * 8;
        if (y > 270) {
          pdf.addPage();
          y = 20;
        }
      };

      pdf.setFontSize(22);
      pdf.text('Revynix AI Review', 20, y);
      y += 15;
      pdf.setFontSize(16);

      addLine(`Score: ${result.score}/100`);
      addLine(`Summary: ${result.summary}`);
      addLine(`Expected Output: ${result.expectedOutput}`);

      if (result.bugs?.length) {
        addLine('Bugs Detected:');
        result.bugs.forEach((bug, i) => {
          addLine(`${i + 1}. Line ${bug.line}`);
          addLine(`Severity: ${bug.severity}`);
          addLine(`Description: ${bug.description}`);
          addLine(`Fix: ${bug.fix}`);
          y += 5;
        });
      }
      if (result.complexity) {
        addLine(`Time Complexity: ${result.complexity.timeComplexity}`);
        addLine(`Space Complexity: ${result.complexity.spaceComplexity}`);
      }
      if (result.finalVerdict) addLine(`Final Verdict: ${result.finalVerdict}`);
      if (result.refactoredCode) {
        addLine('Refactored Code:');
        addLine(result.refactoredCode);
      }

      pdf.save('revynix-review.pdf');
      toast.success('PDF downloaded');
    } catch (error) {
      console.error(error);
      toast.error('PDF generation failed');
    }
  };

  const score = result?.score || 0;
  const tone = scoreTone(score);

  return (
    <div className="rv min-h-screen bg-[#F3F5F9] px-4 py-6 text-[#14182B] lg:py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">Review your code</h1>
        <p className="mt-3 text-[#4A5068]">Paste a file, pick the language and read what Revynix AI finds.</p>

        {/* MOBILE TABS */}
        <div className="mt-6 grid grid-cols-2 rounded-xl border border-[#BFC5D6] bg-white p-1 lg:hidden" role="tablist">
          {[
            ['code', 'Code'],
            ['review', 'Review'],
          ].map(([id, label]) => (
            <button
              key={id}
              role="tab"
              aria-selected={mobileTab === id}
              onClick={() => setMobileTab(id)}
              className={`rounded-lg py-2.5 font-semibold ${
                mobileTab === id ? 'bg-[#14182B] text-white' : 'text-[#4A5068]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-2">
          {/* LEFT: CODE */}
          <section className={`${mobileTab === 'review' ? 'hidden lg:block' : 'block'}`}>
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
                {LANGS.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>

              {isPreviewSupported && (
                <button onClick={() => setShowPreview(!showPreview)} aria-pressed={showPreview} className={iconBtn}>
                  {showPreview ? 'Hide preview' : 'Live preview'}
                </button>
              )}

              <span className="ml-auto text-sm text-[#5A6078]">
                {code.length.toLocaleString()} / {MAX_CHARS.toLocaleString()}
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#D9DDE8] bg-white">
              <Editor
                height="65vh"
                language={language}
                theme="vs"
                value={code}
                onChange={value => setCode(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: 'JetBrains Mono, monospace',
                  wordWrap: 'on',
                  automaticLayout: true,
                  scrollBeyondLastLine: false,
                  padding: { top: 12, bottom: 12 },
                }}
              />
            </div>

            {showPreview && isPreviewSupported && (
              <div className="mt-4 overflow-hidden rounded-2xl border border-[#D9DDE8] bg-white">
                <p className="border-b border-[#D9DDE8] bg-[#F8F9FC] px-4 py-2.5 text-sm font-semibold">Live preview</p>
                {/* No allow-same-origin: pasted code must not reach your login token */}
                <iframe
                  title="Live preview"
                  sandbox="allow-scripts"
                  srcDoc={previewDoc(language, code)}
                  className="h-[320px] w-full bg-white"
                />
              </div>
            )}

            <button
              onClick={handleReview}
              disabled={loading}
              className="mt-4 h-12 w-full rounded-xl bg-[#4B3FFF] font-semibold text-white hover:bg-[#3A2FE0] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Reviewing your code...' : 'Review code'}
            </button>
          </section>

          {/* RIGHT: REVIEW */}
          <section
            className={`overflow-hidden rounded-2xl border border-[#D9DDE8] bg-[#F8F9FC] ${
              mobileTab === 'code' ? 'hidden lg:block' : 'block'
            }`}
          >
            <div className="flex items-center justify-between gap-3 border-b border-[#D9DDE8] bg-white px-5 py-4">
              <h2 className="text-lg font-bold">Review</h2>
              {result && (
                <div className="flex items-center gap-2">
                  <button onClick={shareReview} aria-label="Share review" className={iconBtn}>
                    <RiShareLine />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                  <button onClick={downloadPDF} aria-label="Download PDF" className={iconBtn}>
                    <RiDownloadLine />
                    <span className="hidden sm:inline">PDF</span>
                  </button>
                  <button onClick={copyResult} aria-label="Copy review" className={iconBtn}>
                    {copied ? <RiCheckLine /> : <RiFileCopyLine />}
                    <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4 p-4 sm:p-5 lg:max-h-[85vh] lg:overflow-y-auto">
              {!result ? (
                <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
                  <RiSparklingLine size={44} className="text-[#4B3FFF]" />
                  <h3 className="mt-4 text-xl font-bold">
                    {loading ? 'Reviewing your code...' : 'Your review will appear here'}
                  </h3>
                  <p className="mt-2 max-w-sm text-[#4A5068]">
                    {loading
                      ? 'This usually takes a few seconds.'
                      : 'Add your code on the left and select Review code.'}
                  </p>
                </div>
              ) : (
                <>
                  {/* SCORE */}
                  <div className="flex items-center justify-between rounded-2xl border border-[#D9DDE8] bg-white p-5">
                    <div>
                      <p className="text-sm text-[#5A6078]">Quality score</p>
                      <p className="mt-1 text-4xl font-extrabold">
                        {score}
                        <span className="text-xl text-[#5A6078]">/100</span>
                      </p>
                    </div>
                    <span
                      className="rv-code rounded-lg px-4 py-2 text-lg font-semibold"
                      style={{ color: tone.fg, background: tone.bg }}
                    >
                      {score >= 80 ? 'Good' : score >= 60 ? 'Needs work' : 'Risky'}
                    </span>
                  </div>

                  <Panel title="Summary">
                    <p className="leading-relaxed text-[#4A5068]">{result.summary}</p>
                  </Panel>

                  <Panel title="Expected output">
                    <pre className="rv-code overflow-x-auto whitespace-pre-wrap rounded-lg bg-[#14182B] p-4 text-sm text-[#E6E9F2]">
                      {result.expectedOutput || 'No output prediction available.'}
                    </pre>
                  </Panel>

                  {/* BUGS */}
                  <Panel title={`Bugs (${result.bugs?.length || 0})`}>
                    {result.bugs?.length > 0 ? (
                      <div className="-m-2">
                        {result.bugs.map((bug, i) => (
                          <div key={i} className="m-2 rounded-lg border border-[#E8CF73] bg-[#FFF6D6] p-3 text-sm">
                            <div className="mb-1.5 flex items-center gap-2">
                              <span className="rounded bg-[#B3261E] px-2 py-0.5 text-xs font-semibold text-white">
                                {bug.severity || 'Bug'}
                              </span>
                              <span className="rv-code text-xs">Line {bug.line}</span>
                            </div>
                            {bug.description}
                            {bug.fix && (
                              <p className="mt-2 text-[#4A5068]">
                                <span className="font-semibold text-[#14182B]">Fix: </span>
                                {bug.fix}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="flex items-center gap-2 rounded-lg bg-[#E2F6E8] px-4 py-3 font-semibold text-[#1F7A45]">
                        <RiShieldCheckLine size={20} />
                        No critical issues found.
                      </p>
                    )}
                  </Panel>

                  {result.finalVerdict && (
                    <Panel title="Final verdict">
                      <p className="leading-relaxed text-[#4A5068]">{result.finalVerdict}</p>
                    </Panel>
                  )}

                  {result.codeQuality && (
                    <Panel title="Code quality">
                      <div className="space-y-4">
                        {Object.entries(result.codeQuality).map(([key, value]) => (
                          <div key={key}>
                            <div className="mb-1.5 flex justify-between text-sm">
                              <span className="capitalize">{key}</span>
                              <span className="text-[#5A6078]">{value}%</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-[#E6E9F2]">
                              <div
                                className="h-full rounded-full bg-[#4B3FFF]"
                                style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </Panel>
                  )}

                  {result.complexity && (
                    <Panel title="Complexity">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-[#5A6078]">Time</p>
                          <p className="rv-code mt-1 text-xl font-semibold">{result.complexity.timeComplexity}</p>
                        </div>
                        <div>
                          <p className="text-sm text-[#5A6078]">Space</p>
                          <p className="rv-code mt-1 text-xl font-semibold">{result.complexity.spaceComplexity}</p>
                        </div>
                      </div>
                      {result.complexity.description && (
                        <p className="mt-4 leading-relaxed text-[#4A5068]">{result.complexity.description}</p>
                      )}
                    </Panel>
                  )}

                  {result.refactoredCode && (
                    <section className="overflow-hidden rounded-2xl border border-[#D9DDE8] bg-white">
                      <h3 className="border-b border-[#D9DDE8] px-5 py-4 text-lg font-bold">Refactored code</h3>
                      <Editor
                        height="300px"
                        language={language}
                        theme="vs"
                        value={result.refactoredCode}
                        options={{ readOnly: true, minimap: { enabled: false }, scrollBeyondLastLine: false }}
                      />
                    </section>
                  )}
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}