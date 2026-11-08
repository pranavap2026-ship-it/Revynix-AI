import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  RiSearchLine,
  RiBookmarkLine,
  RiBookmarkFill,
  RiDeleteBin6Line,
  RiGitPullRequestLine,
} from 'react-icons/ri';
import toast from 'react-hot-toast';

import api from '../utils/api';
import { getError, timeAgo } from '../utils/helpers';
import Loader from '../components/Loader';

const scoreTone = score =>
  score >= 80
    ? { fg: '#1F7A45', bg: '#E2F6E8' }
    : score >= 60
    ? { fg: '#8A5300', bg: '#FFF1CC' }
    : { fg: '#B3261E', bg: '#FDE8E6' };

export default function HistoryPage() {
  const [reviews, setReviews] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filter, setFilter] = useState('all');

  // wait 400ms after typing before searching
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchReviews = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ page, limit: 9 });
        if (debouncedSearch) params.append('search', debouncedSearch);

        const { data } = await api.get(`/reviews?${params}`);
        let results = data.data.reviews;
        if (filter === 'saved') results = results.filter(r => r.isSaved);

        setReviews(results);
        setPagination(data.data.pagination);
      } catch (err) {
        toast.error(getError(err));
      } finally {
        setLoading(false);
      }
    },
    [debouncedSearch, filter]
  );

  useEffect(() => {
    fetchReviews(1);
  }, [fetchReviews]);

  const handleDelete = async id => {
    if (!window.confirm('Delete this review?')) return;
    try {
      await api.delete(`/reviews/${id}`);
      setReviews(prev => prev.filter(r => r._id !== id));
      setPagination(p => ({ ...p, total: Math.max(0, p.total - 1) }));
      toast.success('Review deleted');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const handleToggleSave = async id => {
    try {
      const { data } = await api.patch(`/reviews/${id}/save`);
      setReviews(prev =>
        prev.map(r => (r._id === id ? { ...r, isSaved: data.data.isSaved } : r))
      );
      toast.success(data.message);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const savedHere = reviews.filter(r => r.isSaved).length;

  return (
    <div className="rv min-h-screen bg-[#F3F5F9] text-[#14182B]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">Review history</h1>
        <p className="mt-3 text-[#4A5068]">
          {pagination.total} {pagination.total === 1 ? 'review' : 'reviews'} so far
          {savedHere ? `, ${savedHere} saved on this page` : ''}.
        </p>

        {/* SEARCH + FILTER */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <label htmlFor="search" className="sr-only">
              Search reviews
            </label>
            <RiSearchLine
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8A90A6]"
            />
            <input
              id="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by title or language"
              className="h-12 w-full rounded-xl border border-[#BFC5D6] bg-white pl-11 pr-4 outline-none placeholder:text-[#8A90A6] focus:border-[#4B3FFF] focus:ring-2 focus:ring-[#4B3FFF]/20"
            />
          </div>

          <div className="flex rounded-xl border border-[#BFC5D6] bg-white p-1" role="group" aria-label="Filter">
            {['all', 'saved'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`rounded-lg px-5 py-2 text-sm font-semibold capitalize ${
                  filter === f ? 'bg-[#14182B] text-white' : 'text-[#4A5068] hover:bg-[#E6E9F2]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* LIST */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-[#D9DDE8] bg-white">
          {loading ? (
            <div className="flex justify-center py-24">
              <Loader size="lg" text="Loading reviews..." />
            </div>
          ) : reviews.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <RiGitPullRequestLine size={40} className="mx-auto text-[#8A90A6]" />
              <h2 className="mt-4 text-xl font-bold">
                {search
                  ? 'No reviews match your search'
                  : filter === 'saved'
                  ? 'No saved reviews on this page'
                  : 'No reviews yet'}
              </h2>
              <p className="mx-auto mt-2 max-w-md text-[#4A5068]">
                {search
                  ? 'Try a different word.'
                  : filter === 'saved'
                  ? 'Use the bookmark on a review to save it.'
                  : 'Paste a file to get your first review.'}
              </p>
              {!search && filter === 'all' && (
                <Link
                  to="/review"
                  className="mt-6 inline-block rounded-xl bg-[#4B3FFF] px-6 py-3 font-semibold text-white hover:bg-[#3A2FE0]"
                >
                  Start a review
                </Link>
              )}
            </div>
          ) : (
            <ul className="divide-y divide-[#E6E9F2]">
              {reviews.map(review => {
                const tone = scoreTone(review.score);
                return (
                  <li key={review._id} className="flex items-center gap-2 pr-3 hover:bg-[#F8F9FC]">
                    <Link
                      to={`/review/${review._id}`}
                      className="flex min-w-0 flex-1 items-center gap-4 px-5 py-4"
                    >
                      <RiGitPullRequestLine size={20} className="shrink-0 text-[#4B3FFF]" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold">{review.title}</p>
                        <p className="mt-0.5 text-sm text-[#5A6078]">
                          <span className="rv-code">{review.language}</span>
                          {' · '}
                          {timeAgo(review.createdAt)}
                        </p>
                      </div>
                      <span
                        className="rv-code shrink-0 rounded-md px-2.5 py-1 text-sm font-semibold"
                        style={{ color: tone.fg, background: tone.bg }}
                        title="Review score out of 100"
                      >
                        {review.score}
                      </span>
                    </Link>

                    <button
                      onClick={() => handleToggleSave(review._id)}
                      aria-label={review.isSaved ? 'Remove from saved' : 'Save review'}
                      aria-pressed={!!review.isSaved}
                      className="flex h-10 w-10 items-center justify-center rounded-lg text-[#4B3FFF] hover:bg-[#E6E9F2]"
                    >
                      {review.isSaved ? <RiBookmarkFill size={19} /> : <RiBookmarkLine size={19} />}
                    </button>
                    <button
                      onClick={() => handleDelete(review._id)}
                      aria-label="Delete review"
                      className="flex h-10 w-10 items-center justify-center rounded-lg text-[#5A6078] hover:bg-[#FDE8E6] hover:text-[#B3261E]"
                    >
                      <RiDeleteBin6Line size={19} />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* PAGINATION */}
        {pagination.pages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-4 text-sm font-semibold">
            <button
              onClick={() => fetchReviews(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="rounded-lg border border-[#BFC5D6] px-4 py-2 hover:bg-white disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-[#4A5068]">
              Page {pagination.page} of {pagination.pages}
            </span>
            <button
              onClick={() => fetchReviews(pagination.page + 1)}
              disabled={pagination.page >= pagination.pages}
              className="rounded-lg border border-[#BFC5D6] px-4 py-2 hover:bg-white disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}