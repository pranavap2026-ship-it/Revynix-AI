import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RiCodeSSlashLine, RiBugLine, RiBookmarkLine, RiBookmarkFill, RiDeleteBin6Line, RiExternalLinkLine } from 'react-icons/ri';
import { timeAgo, scoreColor, scoreColorClass } from '../utils/helpers';

const ReviewCard = ({ review, onDelete, onToggleSave, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="card group hover:border-brand-500/30 transition-all duration-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(26,174,157,0.1)', border: '1px solid rgba(26,174,157,0.2)' }}>
            <RiCodeSSlashLine size={14} className="text-brand-400" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate text-white">{review.title}</p>
            <p className="text-xs text-[var(--color-text-muted)]">
              {review.language} · {timeAgo(review.createdAt)}
            </p>
          </div>
        </div>
        {/* Score badge */}
        {review.score != null && (
          <div className="flex-shrink-0 text-center">
            <p className={`text-lg font-bold font-mono ${scoreColorClass(review.score)}`}
              style={{ color: scoreColor(review.score) }}>
              {review.score}
            </p>
            <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">score</p>
          </div>
        )}
      </div>

      {/* Issues count */}
      {review.issueCount > 0 && (
        <div className="flex items-center gap-1.5 mb-3">
          <RiBugLine size={13} className="text-red-400" />
          <span className="text-xs text-[var(--color-text-muted)]">
            {review.issueCount} issue{review.issueCount !== 1 ? 's' : ''} found
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-white/5">
        <Link
          to={`/review/${review._id}`}
          className="btn-secondary text-xs py-1.5 px-3 flex-1 justify-center"
        >
          <RiExternalLinkLine size={12} /> View Review
        </Link>

        {onToggleSave && (
          <button
            onClick={() => onToggleSave(review._id, review.isSaved)}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            title={review.isSaved ? 'Unsave' : 'Save'}
          >
            {review.isSaved
              ? <RiBookmarkFill size={15} className="text-brand-400" />
              : <RiBookmarkLine size={15} className="text-[var(--color-text-muted)]" />
            }
          </button>
        )}

        {onDelete && (
          <button
            onClick={() => onDelete(review._id)}
            className="p-2 rounded-lg hover:bg-red-500/10 transition-colors text-[var(--color-text-muted)] hover:text-red-400"
            title="Delete"
          >
            <RiDeleteBin6Line size={15} />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ReviewCard;