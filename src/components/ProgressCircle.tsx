interface ProgressCircleProps {
  value: number; // This will be your cosine similarity score multiplied by 100
}

export const ProgressCircle = ({ value }: ProgressCircleProps) => {
  const radius = 30; // radius of the circle
  const stroke = 4;  // stroke thickness
  const circumference = 2 * Math.PI * radius; // the circumference of the circle
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative w-16 h-16">
      <svg className="rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="#d3d3d3"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="#4caf50"  // You can change the color depending on the score
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.35s' }}
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold">
        {Math.round(value)}%
      </div>
    </div>
  );
};
