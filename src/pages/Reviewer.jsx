import { useState } from 'react';

import Editor from '@monaco-editor/react';

import toast from 'react-hot-toast';

import api from '../utils/api';

import {
  RiSparklingLine,
  RiCodeSSlashLine,
  RiBugLine,
  RiShieldCheckLine,
  RiFlashlightLine,
  RiFileCopyLine,
  RiCheckLine,
} from 'react-icons/ri';

import { motion } from 'framer-motion';

export default function Reviewer() {

  // ========================================
  // STATES
  // ========================================

  const [code, setCode] =
    useState('');

  const [language, setLanguage] =
    useState('javascript');

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const [copied, setCopied] =
    useState(false);

  // MOBILE SWITCH

  const [mobileTab, setMobileTab] =
    useState('code');

    const [showPreview,
  setShowPreview] =
  useState(false);
  // ========================================
  // REVIEW CODE
  // ========================================

  const handleReview =
    async () => {

      if (!code.trim()) {

        toast.error(
          'Please enter code'
        );

        return;
      }

      try {

        setLoading(true);

        setResult(null);

        const response =
          await api.post(
            '/reviews',
            {
              code,
              language,
            }
          );

      setResult(
  response.data.data.aiResponse
);
        // AUTO SWITCH TO REVIEW ON MOBILE

        setMobileTab('review');

        toast.success(
          'AI Review Completed'
        );

      } catch (error) {

        console.error(error);

        toast.error(
          error?.response?.data
            ?.message ||
            'Review failed'
        );

      } finally {

        setLoading(false);

      }
    };

  // ========================================
  // COPY RESULT
  // ========================================

  const copyResult =
    async () => {

      try {

        await navigator.clipboard.writeText(
          JSON.stringify(
  result,
  null,
  2
)
        );

        setCopied(true);

        toast.success(
          'Copied to clipboard'
        );

        setTimeout(() => {
          setCopied(false);
        }, 2000);

      } catch {

        toast.error(
          'Copy failed'
        );

      }
    };

  // ========================================
  // SCORE
  // ========================================

const score =
  result?.score || 0;


    const isPreviewSupported = [

  'html',

  'css',

  'javascript',

].includes(language);
  // ========================================
  // UI
  // ========================================

  return (

    <div
      className="
        min-h-screen
        text-white
        px-4 py-6 lg:py-8
      "
    >

      {/* HEADER */}

      <div className="max-w-7xl mx-auto mb-6">

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >

          <div className="flex items-center gap-4 mb-4">

            <div
              className="
                w-14 h-14 rounded-2xl
                flex items-center justify-center
              "
              style={{
                background:
                  'linear-gradient(135deg,#7C3AED,#06B6D4)',
              }}
            >
              <RiSparklingLine
                size={26}
              />
            </div>

            <div>

              <h1
                className="
                  text-3xl md:text-5xl
                  font-black
                "
              >
                Revynix AI
              </h1>

              <p className="text-zinc-400 mt-1">
                AI-Powered Code Review Platform
              </p>

            </div>

          </div>

        </motion.div>

      </div>

      {/* ======================================== */}
      {/* MOBILE TAB SWITCHER */}
      {/* ======================================== */}

      <div className="lg:hidden mb-5">

        <div
          className="
            grid grid-cols-2
            bg-zinc-900
            border border-white/5
            rounded-2xl
            p-1
          "
        >

          <button
            onClick={() =>
              setMobileTab('code')
            }
            className={`
              py-3 rounded-xl
              font-medium transition-all

              ${
                mobileTab === 'code'
                  ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white'
                  : 'text-zinc-400'
              }
            `}
          >
            Code
          </button>

          <button
            onClick={() =>
              setMobileTab('review')
            }
            className={`
              py-3 rounded-xl
              font-medium transition-all

              ${
                mobileTab === 'review'
                  ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white'
                  : 'text-zinc-400'
              }
            `}
          >
            Review
          </button>

        </div>

      </div>

      {/* ======================================== */}
      {/* MAIN LAYOUT */}
      {/* ======================================== */}

      <div
        className="
          max-w-7xl mx-auto
          grid grid-cols-1 lg:grid-cols-2
          gap-6
          items-start
        "
      >

        {/* ======================================== */}
        {/* LEFT SIDE — CODE SECTION */}
        {/* ======================================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: -20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          className={`
            bg-zinc-950/80
            border border-white/5
            rounded-3xl
            overflow-hidden
            backdrop-blur-xl
            shadow-2xl

            ${
              mobileTab === 'review'
                ? 'hidden lg:block'
                : 'block'
            }
          `}
        >

          {/* HEADER */}

          <div
            className="
              flex flex-col sm:flex-row
              sm:items-center
              justify-between
              gap-4
              px-5 py-4
              border-b border-white/5
              bg-white/[0.02]
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                  w-10 h-10 rounded-xl
                  flex items-center justify-center
                "
                style={{
                  background:
                    'linear-gradient(135deg,#7C3AED,#06B6D4)',
                }}
              >
                <RiCodeSSlashLine />
              </div>

              <div>

                <h2 className="font-semibold text-lg">
                  Code Section
                </h2>

                <p className="text-xs text-zinc-500">
                  Write or paste your code
                </p>

              </div>

            </div>

            {/* LANGUAGE */}

            <select
  value={language}
  onChange={e =>
    setLanguage(
      e.target.value
    )
  }
  className="
    bg-zinc-900
    border border-zinc-700
    rounded-xl
    px-4 py-2.5
    text-sm
    outline-none
    min-w-[180px]
  "
>

  <option value="javascript">
    JavaScript
  </option>

  <option value="typescript">
    TypeScript
  </option>

  <option value="python">
    Python
  </option>

  <option value="java">
    Java
  </option>

  <option value="cpp">
    C++
  </option>

  <option value="c">
    C
  </option>

  <option value="csharp">
    C#
  </option>

  <option value="php">
    PHP
  </option>

  <option value="go">
    Go
  </option>

  <option value="rust">
    Rust
  </option>

  <option value="html">
    Html
  </option>

  <option value="css">
    Css
  </option>

</select>
          </div>


{
  isPreviewSupported && (

    <button
      onClick={() =>
        setShowPreview(
          !showPreview
        )
      }
      className="
        bg-cyan-500/10
        border border-cyan-500/20
        text-cyan-400
        rounded-xl
        px-4 py-2
        text-sm
        transition-all
        hover:bg-cyan-500/20
      "
    >
      {
        showPreview

          ? 'Hide Preview'

          : 'Live Preview'
      }
    </button>
  )
}
          {/* EDITOR */}

          <Editor
            height="75vh"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={value =>
              setCode(value || '')
            }
            options={{
              minimap: {
                enabled: false,
              },

              fontSize: 15,

              wordWrap: 'on',

              automaticLayout: true,

              scrollBeyondLastLine: false,

              smoothScrolling: true,
            }}
          />

          {/* BUTTON */}

          <div className="p-5">

            <button
              onClick={handleReview}
              disabled={loading}
              className="
                w-full
                py-4 rounded-2xl
                font-semibold
                text-white
                transition-all
                hover:scale-[1.01]
                disabled:opacity-50
              "
              style={{
                background:
                  'linear-gradient(135deg,#7C3AED,#06B6D4)',
              }}
            >
              {loading
                ? 'Analyzing Code...'
                : 'Review Code with AI'}
            </button>

          </div>

        </motion.div>

        {/* ======================================== */}
        {/* RIGHT SIDE — REVIEW SECTION */}
        {/* ======================================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: 20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          className={`
            bg-zinc-950/80
            border border-white/5
            rounded-3xl
            overflow-hidden
            backdrop-blur-xl
            shadow-2xl

            ${
              mobileTab === 'code'
                ? 'hidden lg:block'
                : 'block'
            }
          `}
        >

          {/* HEADER */}

          <div
            className="
              flex items-center justify-between
              px-5 py-4
              border-b border-white/5
              bg-white/[0.02]
            "
          >

            <div>

              <h2 className="font-semibold text-lg">
                Review & Output
              </h2>

              <p className="text-xs text-zinc-500">
                AI-generated analysis
              </p>

            </div>

            {result && (

              <button
                onClick={copyResult}
                className="
                  flex items-center gap-2
                  px-4 py-2 rounded-xl
                  bg-white/5 hover:bg-white/10
                  text-sm transition-all
                "
              >

                {copied ? (
                  <>
                    <RiCheckLine />
                    Copied
                  </>
                ) : (
                  <>
                    <RiFileCopyLine />
                    Copy
                  </>
                )}

              </button>

            )}

          </div>

          {/* BODY */}

          <div
            className="
              p-5
              lg:h-[85vh]
              overflow-y-auto
              space-y-6
            "
          >

            {!result ? (

              <div
                className="
                  min-h-[70vh]
                  flex flex-col
                  items-center justify-center
                  text-center
                "
              >

                <RiSparklingLine
                  size={60}
                  className="text-cyan-400 mb-6"
                />

                <h3 className="text-3xl font-bold mb-3">
                  Waiting for AI Review
                </h3>

                <p className="text-zinc-500 max-w-md leading-7">
                  Submit your code to receive
                  AI-powered analysis, bug detection,
                  optimization suggestions, and
                  expected output.
                </p>

              </div>

            ) : (

              <>

                {/* SCORE */}

                <div
                  className="
                    rounded-3xl
                    border border-cyan-500/20
                    bg-cyan-500/5
                    p-6
                  "
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-zinc-400 text-sm">
                        AI Quality Score
                      </p>

                      <h2 className="text-4xl font-black mt-1">
                        {score}
                        <span className="text-cyan-400">
                          /100
                        </span>
                      </h2>

                    </div>

                    <div
                      className="
                        w-20 h-20 rounded-full
                        border-4 border-cyan-400
                        flex items-center justify-center
                        text-cyan-300 font-bold
                      "
                    >
                      {score}%
                    </div>

                  </div>

                </div>

                {/* SUMMARY */}

                <div
                  className="
                    rounded-3xl
                    border border-white/5
                    bg-white/[0.03]
                    p-6
                  "
                >

                  <h3 className="text-xl font-bold mb-4">
                    AI Summary
                  </h3>

                  <p className="text-zinc-300 leading-8">
                    {
                     result?.summary
                    }
                  </p>

                </div>


{
  showPreview &&
  isPreviewSupported && (

    <div
      className="
        border-t
        border-white/5
        bg-black
      "
    >

      <div
        className="
          px-5 py-3
          border-b border-white/5
          flex items-center justify-between
        "
      >

        <h3 className="font-semibold">
          Live Preview
        </h3>

        <span
          className="
            text-xs
            text-zinc-500
          "
        >
          Real-time rendering
        </span>

      </div>

      <iframe
        title="preview"

        sandbox="
          allow-scripts
          allow-same-origin
        "

        srcDoc={

          language === 'html'

            ? code

            : language === 'css'

            ? `
              <html>
              <head>
                <style>
                  ${code}
                </style>
              </head>

              <body>
                <div class="preview">
                  Revynix AI CSS Preview
                </div>
              </body>
              </html>
            `

            : `
              <html>

              <body>

                <div id="app">
                  JavaScript Preview
                </div>

                <script>
                  try {

                    ${code}

                  } catch(error) {

                    document.body.innerHTML +=
                    '<pre style="color:red;padding:20px;">'
                    + error +
                    '</pre>';
                  }
                </script>

              </body>

              </html>
            `
        }

        className="
          w-full
          h-[350px]
          bg-white
        "
      />

    </div>
  )
}

                {/* OUTPUT */}

                <div
                  className="
                    rounded-3xl
                    border border-emerald-500/20
                    bg-emerald-500/[0.04]
                    overflow-hidden
                  "
                >

                  <div
                    className="
                      px-5 py-4
                      border-b border-emerald-500/10
                    "
                  >

                    <h3 className="text-xl font-bold">
                      Expected Output
                    </h3>

                  </div>

                  <div className="p-5">

                    <div
                      className="
                        rounded-2xl
                        bg-black/40
                        border border-white/5
                        p-5
                        font-mono
                        text-emerald-300
                        text-lg
                        whitespace-pre-wrap
                      "
                    >
                      {
                       result?.expectedOutput||

                        'No output prediction available.'
                      }
                    </div>

                  </div>

                </div>

                

                {/* BUGS */}

                <div>

                  <h3 className="text-xl font-bold mb-5">
                    Bugs Detected
                  </h3>

                  {result?.bugs
                    ?.length > 0 ? (

                    <div className="space-y-4">

                      {result?.bugs?.map(
                          (
                            bug,
                            index
                          ) => (

                            <div
                              key={index}
                              className="
                                rounded-3xl
                                border border-red-500/20
                                bg-red-500/[0.03]
                                p-5
                              "
                            >

                              <div className="flex items-center gap-3 mb-4">

                                <div
                                  className="
                                    w-11 h-11 rounded-2xl
                                    bg-red-500/10
                                    flex items-center justify-center
                                  "
                                >
                                  <RiBugLine className="text-red-400" />
                                </div>

                                <div>

                                  <h4 className="font-semibold">
                                    Line {bug.line}
                                  </h4>

                                  <p className="text-sm text-zinc-500">
                                    {bug.severity}
                                  </p>

                                </div>

                              </div>

                              <p className="text-zinc-300 leading-7">
                                {bug.description}
                              </p>

                              <div
                                className="
                                  mt-4 rounded-2xl
                                  bg-black/30
                                  border border-white/5
                                  p-4
                                "
                              >

                                <p className="text-cyan-400 text-sm mb-2">
                                  Suggested Fix
                                </p>

                                <p className="text-zinc-300 text-sm">
                                  {bug.fix}
                                </p>

                              </div>

                            </div>
                          )
                        )}

                    </div>

                  ) : (

                    <div
                      className="
                        rounded-3xl
                        border border-green-500/20
                        bg-green-500/[0.05]
                        p-8 text-center
                      "
                    >

                      <RiShieldCheckLine
                        size={50}
                        className="
                          text-green-400
                          mx-auto mb-4
                        "
                      />

                      <h3 className="text-2xl font-bold text-green-300 mb-3">
                        No Critical Issues Found
                      </h3>

                      <p className="text-zinc-400 leading-7">
                        Revynix AI analyzed your code
                        and found no major issues.
                      </p>

                    </div>

                  )}

                </div>

              </>

            )}

          </div>

        </motion.div>

      </div>

    </div>
  );
}


