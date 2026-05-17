import {
  useState,
  useEffect,
  useCallback,
} from 'react';

import {
  motion,
} from 'framer-motion';

import {
  RiHistoryLine,
  RiSearchLine,
  RiBookmarkLine,
  RiCodeSSlashLine,
  RiDeleteBin6Line,
} from 'react-icons/ri';

import api from '../utils/api';

import {
  getError,
} from '../utils/helpers';

import ReviewCard from '../components/ReviewCard';

import Loader from '../components/Loader';

import toast from 'react-hot-toast';

export default function HistoryPage() {

  // ========================================
  // STATES
  // ========================================

  const [reviews, setReviews] =
    useState([]);

  const [pagination, setPagination] =
    useState({
      page: 1,
      pages: 1,
      total: 0,
    });

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState('');

  const [debouncedSearch,
    setDebouncedSearch] =
    useState('');

  const [filter, setFilter] =
    useState('all');

  // ========================================
  // DEBOUNCE SEARCH
  // ========================================

  useEffect(() => {

    const timer =
      setTimeout(() => {

        setDebouncedSearch(
          search
        );

      }, 400);

    return () =>
      clearTimeout(timer);

  }, [search]);

  // ========================================
  // FETCH REVIEWS
  // ========================================

  const fetchReviews =
    useCallback(
      async (
        page = 1
      ) => {

        setLoading(true);

        try {

          const params =
            new URLSearchParams({
              page,
              limit: 9,
            });

          if (
            debouncedSearch
          ) {

            params.append(
              'search',
              debouncedSearch
            );

          }

          const { data } =
            await api.get(
              `/reviews?${params}`
            );

          let results =
            data.data.reviews;

          if (
            filter === 'saved'
          ) {

            results =
              results.filter(
                r => r.isSaved
              );

          }

          setReviews(results);

          setPagination(
            data.data.pagination
          );

        } catch (err) {

          toast.error(
            getError(err)
          );

        } finally {

          setLoading(false);

        }
      },

      [
        debouncedSearch,
        filter,
      ]
    );

  // ========================================
  // EFFECT
  // ========================================

  useEffect(() => {

    fetchReviews(1);

  }, [fetchReviews]);

  // ========================================
  // DELETE REVIEW
  // ========================================

  const handleDelete =
    async id => {

      if (
        !window.confirm(
          'Delete this review?'
        )
      ) return;

      try {

        await api.delete(
          `/reviews/${id}`
        );

        setReviews(prev =>
          prev.filter(
            r => r._id !== id
          )
        );

        toast.success(
          'Review deleted'
        );

      } catch (err) {

        toast.error(
          getError(err)
        );

      }
    };

  // ========================================
  // TOGGLE SAVE
  // ========================================

  const handleToggleSave =
    async id => {

      try {

        const { data } =
          await api.patch(
            `/reviews/${id}/save`
          );

        setReviews(prev =>
          prev.map(r =>
            r._id === id
              ? {
                  ...r,
                  isSaved:
                    data.data
                      .isSaved,
                }
              : r
          )
        );

        toast.success(
          data.message
        );

      } catch (err) {

        toast.error(
          getError(err)
        );

      }
    };

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

      {/* HEADER */}

      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="mb-8"
      >

        <div className="flex items-center gap-4 mb-3">

          <div
            className="
              w-14 h-14 rounded-2xl
              flex items-center justify-center
              shadow-2xl
            "
            style={{
              background:
                'linear-gradient(135deg,#7C3AED,#06B6D4)',
            }}
          >

            <RiHistoryLine
              size={28}
            />

          </div>

          <div>

            <h1
              className="
                text-4xl md:text-5xl
                font-black
              "
            >
              Review History
            </h1>

            <p className="text-zinc-400 mt-1">
              Manage all your AI code reviews
            </p>

          </div>

        </div>

      </motion.div>

      {/* STATS */}

      <div
        className="
          grid grid-cols-1 sm:grid-cols-3
          gap-4 mb-8
        "
      >

        {/* TOTAL */}

        <div
          className="
            rounded-3xl
            border border-white/5
            bg-zinc-950/70
            p-5
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-zinc-500 text-sm">
                Total Reviews
              </p>

              <h2 className="text-3xl font-black mt-2">
                {pagination.total}
              </h2>

            </div>

            <div
              className="
                w-12 h-12 rounded-2xl
                bg-cyan-500/10
                flex items-center justify-center
              "
            >

              <RiCodeSSlashLine
                className="text-cyan-400"
                size={24}
              />

            </div>

          </div>

        </div>

        {/* SAVED */}

        <div
          className="
            rounded-3xl
            border border-white/5
            bg-zinc-950/70
            p-5
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-zinc-500 text-sm">
                Saved Reviews
              </p>

              <h2 className="text-3xl font-black mt-2">
                {
                  reviews.filter(
                    r => r.isSaved
                  ).length
                }
              </h2>

            </div>

            <div
              className="
                w-12 h-12 rounded-2xl
                bg-yellow-500/10
                flex items-center justify-center
              "
            >

              <RiBookmarkLine
                className="text-yellow-400"
                size={24}
              />

            </div>

          </div>

        </div>

        {/* PAGES */}

        <div
          className="
            rounded-3xl
            border border-white/5
            bg-zinc-950/70
            p-5
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-zinc-500 text-sm">
                Total Pages
              </p>

              <h2 className="text-3xl font-black mt-2">
                {pagination.pages}
              </h2>

            </div>

            <div
              className="
                w-12 h-12 rounded-2xl
                bg-violet-500/10
                flex items-center justify-center
              "
            >

              <RiHistoryLine
                className="text-violet-400"
                size={24}
              />

            </div>

          </div>

        </div>

      </div>

      {/* SEARCH + FILTER */}

      <div
        className="
          flex flex-col lg:flex-row
          lg:items-center
          gap-4 mb-8
        "
      >

        {/* SEARCH */}

        <div className="relative flex-1">

          <RiSearchLine
            size={18}
            className="
              absolute
              left-4 top-1/2
              -translate-y-1/2
              text-zinc-500
            "
          />

          <input
            value={search}
            onChange={e =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search reviews..."
            className="
              w-full
              bg-zinc-950/70
              border border-white/5
              rounded-2xl
              py-4 pl-12 pr-4
              outline-none
              focus:border-cyan-500/40
              transition-all
            "
          />

        </div>

        {/* FILTERS */}

        <div className="flex gap-3">

          {[
            'all',
            'saved',
          ].map(f => (

            <button
              key={f}
              onClick={() =>
                setFilter(f)
              }
              className={`
                px-5 py-3 rounded-2xl
                text-sm font-medium
                transition-all capitalize

                ${
                  filter === f
                    ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white'
                    : 'bg-zinc-900 border border-white/5 text-zinc-400'
                }
              `}
            >
              {f}
            </button>

          ))}

        </div>

      </div>

      {/* LOADING */}

      {loading ? (

        <div className="flex justify-center py-24">

          <Loader
            size="lg"
            text="Loading reviews..."
          />

        </div>

      ) : reviews.length === 0 ? (

        /* EMPTY STATE */

        <div
          className="
            rounded-3xl
            border border-white/5
            bg-zinc-950/70
            py-24 px-6
            text-center
          "
        >

          <RiHistoryLine
            size={70}
            className="
              text-zinc-600
              mx-auto mb-6
            "
          />

          <h2
            className="
              text-3xl font-bold
              mb-3
            "
          >
            No Reviews Found
          </h2>

          <p className="text-zinc-500 max-w-md mx-auto leading-7">
            {
              search
                ? 'Try another search keyword.'
                : 'Start reviewing code to build your AI review history.'
            }
          </p>

        </div>

      ) : (

        /* REVIEW GRID */

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="
            grid sm:grid-cols-2
            xl:grid-cols-3
            gap-5
          "
        >

          {reviews.map(
            (
              review,
              index
            ) => (

              <ReviewCard
                key={review._id}
                review={review}
                index={index}
                onDelete={handleDelete}
                onToggleSave={handleToggleSave}
              />

            )
          )}

        </motion.div>

      )}

      {/* PAGINATION */}

      {pagination.pages > 1 && (

        <div
          className="
            flex items-center justify-center
            flex-wrap gap-3
            mt-12
          "
        >

          {Array.from(
            {
              length:
                pagination.pages,
            },

            (_, i) => i + 1
          ).map(page => (

            <button
              key={page}
              onClick={() =>
                fetchReviews(page)
              }
              className={`
                w-11 h-11 rounded-2xl
                font-medium
                transition-all

                ${
                  page ===
                  pagination.page

                    ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white'

                    : 'bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white'
                }
              `}
            >
              {page}
            </button>

          ))}

        </div>

      )}

    </div>
  );
}