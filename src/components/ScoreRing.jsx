const ScoreRing = ({
  score = 0,
  size = 100,
}) => {
  const radius = 42;

  const circumference =
    2 * Math.PI * radius;

  const offset =
    circumference -
    (score / 100) *
      circumference;

  const getColor = () => {
    if (score >= 80)
      return '#22c55e';

    if (score >= 60)
      return '#f59e0b';

    return '#ef4444';
  };

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        width={size}
        height={size}
        className="-rotate-90"
      >
        {/* BG */}

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="8"
          fill="transparent"
        />

        {/* PROGRESS */}

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth="8"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={
            circumference
          }
          strokeDashoffset={
            offset
          }
        />
      </svg>

      {/* TEXT */}

      <div className="absolute text-center">
        <p className="text-2xl font-bold text-white">
          {score}
        </p>

        <p className="text-[10px] text-zinc-500">
          Score
        </p>
      </div>
    </div>
  );
};

export default ScoreRing;