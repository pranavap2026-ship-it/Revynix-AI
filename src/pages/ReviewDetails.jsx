import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { RiArrowLeftLine } from 'react-icons/ri';

import api from '../utils/api';

const scoreTone = score =>
  score >= 80
    ? { fg: '#1F7A45', bg: '#E2F6E8' }
    : score >= 60
    ? { fg: '#8A5300', bg: '#FFF1CC' }
    : { fg: '#B3261E', bg: '#FDE8E6' };

const BugNote = ({ bug }) => (
  <div className="mx-3 my-2 rounded-lg border border-[#E8CF73] bg-[#FFF6D6] p-3 text-sm text-[#14182B] sm:ml-14">
    <span className="mr-2 inline-block rounded bg-[#B3261E] px-2 py-0.5 text-xs font-semibold text-white">
      Bug
    </span>
    {bug.description}
    {bug.fix && (
      <p className="mt-2 text-[#4A5068]">
        <span className="font-semibold text-[#14182B]">Fix: </span>
        {bug.fix}
      </p>
    )}
  </div>
);

export default function ReviewDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data } = await api.get(`/reviews/${id}`);
        if (active) setReview(data.data);
      } catch (error) {
        console.error(error);
        toast.error('Review not found');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [id]);

  const shell = children => (
    <div className="rv min-h-screen bg-[#F3F5F9] text-[#14182B]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">{children}</div>
    </div>
  );

  const back = (
    <Link
      to="/dashboard/history"
      className="mb-6 inline-flex items-center gap-2 font-semibold text-[#4B3FFF] hover:underline"
    >
      <RiArrowLeftLine />
      Back to history
    </Link>
  );

  if (loading) {
    return shell(<p className="py-24 text-center text-[#4A5068]">Loading review...</p>);
  }

  if (!review) {
    return shell(
      <>
        {back}
        <div className="rounded-2xl border border-[#D9DDE8] bg-white px-6 py-16 text-center">
          <h1 className="text-2xl font-bold">Review not found</h1>
          <p className="mt-2 text-[#4A5068]">It may have been deleted. Check your history for the full list.</p>
        </div>
      </>
    );
  }

  const ai = review.aiResponse;
  const tone = scoreTone(ai?.score || 0);
  const lines = (review.originalCode || '').split('\n');
  const bugs = ai?.bugs || [];

  // put each bug under its line; anything we cannot place goes in a list below
  const byLine = {};
  const unplaced = [];
  bugs.forEach(bug => {
    const n = parseInt(bug.line, 10);
    if (n >= 1 && n <= lines.length) (byLine[n] = byLine[n] || []).push(bug);
    else unplaced.push(bug);
  });

  return shell(
    <>
      {back}

      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            {review.title || 'Review details'}
          </h1>
          <p className="rv-code mt-3 text-[#4A5068]">{review.language}</p>
        </div>
        <div
          className="shrink-0 rounded-xl px-4 py-2 text-center"
          style={{ background: tone.bg, color: tone.fg }}
          title="Review score out of 100"
        >
          <p className="rv-code text-3xl font-semibold">{ai?.score || 0}</p>
          <p className="text-xs">out of 100</p>
        </div>
      </div>

      {/* SUMMARY */}
      {ai?.summary && (
        <section className="mt-8 rounded-2xl border border-[#D9DDE8] bg-white p-5 sm:p-7">
          <h2 className="text-lg font-bold">Summary</h2>
          <p className="mt-2 max-w-3xl leading-relaxed text-[#4A5068]">{ai.summary}</p>
        </section>
      )}

      {/* CODE WITH BUGS UNDER THEIR LINES */}
      <section className="mt-6 overflow-hidden rounded-2xl border border-[#D9DDE8] bg-white">
        <div className="flex items-center justify-between border-b border-[#D9DDE8] bg-[#F8F9FC] px-4 py-3 text-sm">
          <span className="font-semibold">Your code</span>
          <span className="text-[#5A6078]">
            {bugs.length} {bugs.length === 1 ? 'bug' : 'bugs'} found
          </span>
        </div>
        <div className="overflow-x-auto py-2">
          <div className="min-w-max sm:min-w-0">
            {lines.map((text, i) => {
              const n = i + 1;
              const hit = byLine[n];
              return (
                <div key={n}>
                  <div className={`rv-code flex text-[13px] leading-7 ${hit ? 'bg-[#FDE8E6]' : ''}`}>
                    <span className="w-10 shrink-0 select-none pr-3 text-right text-[#8A90A6]">{n}</span>
                    <span className="whitespace-pre pr-4">{text || ' '}</span>
                  </div>
                  {hit && hit.map((b, j) => <BugNote key={j} bug={b} />)}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BUGS WITHOUT A MATCHING LINE */}
      {unplaced.length > 0 && (
        <section className="mt-6 rounded-2xl border border-[#D9DDE8] bg-white p-3">
          <h2 className="px-3 pt-2 text-lg font-bold">Other bugs</h2>
          {unplaced.map((b, i) => (
            <BugNote key={i} bug={b} />
          ))}
        </section>
      )}

      {bugs.length === 0 && (
        <p className="mt-6 rounded-xl bg-[#E2F6E8] px-5 py-4 font-semibold text-[#1F7A45]">
          No bugs found in this review.
        </p>
      )}
    </>
  );
}