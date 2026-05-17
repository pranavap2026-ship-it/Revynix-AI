import {
  useEffect,
  useState,
} from 'react';

import {
  useParams,
  Link,
} from 'react-router-dom';

import api from '../utils/api';

import toast from 'react-hot-toast';

import {
  RiArrowLeftLine,
  RiCodeSSlashLine,
  RiBugLine,
  RiShieldLine,
  RiFlashlightLine,
} from 'react-icons/ri';

export default function ReviewDetails() {

  const { id } =
    useParams();

  const [loading,
    setLoading] =
    useState(true);

  const [review,
    setReview] =
    useState(null);

  // ========================================
  // FETCH REVIEW
  // ========================================

  useEffect(() => {

    fetchReview();

  }, []);

  const fetchReview =
    async () => {

      try {

        const { data } =
          await api.get(
            `/reviews/${id}`
          );

        setReview(
          data.data
        );

      } catch (error) {

        console.error(
          error
        );

        toast.error(
          'Review not found'
        );

      } finally {

        setLoading(false);

      }
    };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {

    return (

      <div
        className="
          min-h-screen
          flex items-center justify-center
          text-white
        "
      >

        Loading...

      </div>
    );
  }

  // ========================================
  // NO REVIEW
  // ========================================

  if (!review) {

    return (

      <div
        className="
          min-h-screen
          flex items-center justify-center
          text-white
        "
      >

        Review not found

      </div>
    );
  }

  // ========================================
  // AI RESPONSE
  // ========================================

  const ai =
    review.aiResponse;

  // ========================================
  // UI
  // ========================================

  return (

    <div
      className="
        max-w-7xl mx-auto
        px-4 py-8
        text-white
      "
    >

      {/* BACK */}

      <Link
        to="/dashboard/history"
        className="
          inline-flex items-center gap-2
          mb-6
          text-cyan-400
        "
      >

        <RiArrowLeftLine />

        Back to History

      </Link>

      {/* HEADER */}

      <div
        className="
          rounded-3xl
          border border-white/5
          bg-zinc-950/70
          p-6 mb-6
        "
      >

        <div className="flex items-center justify-between">

          <div>

            <h1
              className="
                text-4xl font-black
              "
            >
              Review Details
            </h1>

            <p className="text-zinc-500 mt-2">
              {review.language}
            </p>

          </div>

          <div
            className="
              w-24 h-24 rounded-full
              border-4 border-cyan-400
              flex items-center justify-center
              text-3xl font-black
              text-cyan-300
            "
          >
            {ai?.score || 0}
          </div>

        </div>

      </div>

      {/* GRID */}

      <div
        className="
          grid lg:grid-cols-2
          gap-6
        "
      >

        {/* ORIGINAL CODE */}

        <div
          className="
            rounded-3xl
            border border-white/5
            bg-zinc-950/70
            overflow-hidden
          "
        >

          <div
            className="
              p-5 border-b border-white/5
              flex items-center gap-3
            "
          >

            <RiCodeSSlashLine />

            <h2 className="text-xl font-bold">
              Original Code
            </h2>

          </div>

          <pre
            className="
              p-5 overflow-auto
              text-sm
              text-zinc-300
            "
          >
{review.originalCode}
          </pre>

        </div>

        {/* SUMMARY */}

        <div
          className="
            rounded-3xl
            border border-white/5
            bg-zinc-950/70
            p-6
          "
        >

          <h2
            className="
              text-2xl font-bold mb-4
            "
          >
            AI Summary
          </h2>

          <p
            className="
              text-zinc-300
              leading-8
            "
          >
            {ai?.summary}
          </p>

        </div>

      </div>

      {/* BUGS */}

      <div
        className="
          mt-6
          rounded-3xl
          border border-red-500/20
          bg-red-500/[0.03]
          overflow-hidden
        "
      >

        <div
          className="
            p-5 border-b border-white/5
            flex items-center gap-3
          "
        >

          <RiBugLine />

          <h2 className="text-2xl font-bold">
            Bugs
          </h2>

        </div>

        <div className="p-6 space-y-4">

          {ai?.bugs?.length > 0 ? (

            ai.bugs.map(
              (
                bug,
                index
              ) => (

                <div
                  key={index}
                  className="
                    rounded-2xl
                    border border-white/5
                    bg-black/20
                    p-5
                  "
                >

                  <p className="font-bold mb-2">
                    Line:
                    {' '}
                    {bug.line}
                  </p>

                  <p className="text-red-300">
                    {bug.description}
                  </p>

                  <p className="text-zinc-400 mt-2">
                    Fix:
                    {' '}
                    {bug.fix}
                  </p>

                </div>
              )
            )

          ) : (

            <p className="text-zinc-400">
              No bugs found
            </p>

          )}

        </div>

      </div>

    </div>
  );
}