import { type LucideIcon } from "lucide-react";

interface GradientCircleIconProps {
  Icon: LucideIcon;
  size?: number;
}

export function GradientCircleIcon({
  Icon,
  size = 64,
}: GradientCircleIconProps) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2}
          fill="url(#gradient)"
        />
        <defs>
          <radialGradient
            id="gradient"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform={`translate(${size / 2} ${
              size / 2
            }) rotate(90) scale(${size})`}
          >
            <stop stopColor="#E84D70" />
            <stop offset="0.530886" stopColor="#A337F6" />
            <stop offset="1" stopColor="#28A7ED" />
          </radialGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon size={size / 2} color="white" />
      </div>
    </div>
  );
}
