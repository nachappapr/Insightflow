import clsx from "clsx";

type AnimatedWaveLogoProps = {
  size?: number;
  isBrandTextRequired?: boolean;
  variant?: "primary" | "secondary";
};

const AnimatedWaveLogo = ({
  size = 48,
  isBrandTextRequired = true,
  variant = "primary",
}: AnimatedWaveLogoProps) => {
  const renderBrandText = () => {
    if (!isBrandTextRequired) return null;

    return (
      <div className="hidden md:flex flex-col">
        <span
          className={clsx(
            "text-2xl font-bold bg-clip-text text-transparent animate-gradient-x",
            "text-2xl font-bold text-transparent bg-clip-text",
            variant === "secondary"
              ? "bg-gradient-to-r from-background-secondary to-background-primary"
              : "bg-gradient-to-r from-brand-secondary to-brand-primary",
            "animate-gradient-x"
          )}
        >
          InsightFlow
        </span>
        <span
          className={clsx("text-sm text-gray-500 opacity-0 animate-fade-in", {
            hidden: variant === "secondary",
          })}
        >
          Feedback Platform
        </span>
      </div>
    );
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <defs>
            <linearGradient
              id="waveGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#8B5CF6">
                <animate
                  attributeName="stop-color"
                  values="#8B5CF6; #6D28D9; #8B5CF6"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#3B82F6">
                <animate
                  attributeName="stop-color"
                  values="#3B82F6; #2563EB; #3B82F6"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>

            {/* Wave Path Animation */}
            <path
              id="wavePath"
              d="M12 24 C16 18, 20 30, 24 24 C28 18, 32 30, 36 24"
            >
              <animate
                attributeName="d"
                values="
                    M12 24 C16 18, 20 30, 24 24 C28 18, 32 30, 36 24;
                    M12 24 C16 30, 20 18, 24 24 C28 30, 32 18, 36 24;
                    M12 24 C16 18, 20 30, 24 24 C28 18, 32 30, 36 24
                  "
                dur="3s"
                repeatCount="indefinite"
              />
            </path>
          </defs>

          {/* Circle Background with Pulse */}
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="url(#waveGradient)"
            className="animate-pulse"
          >
            <animate
              attributeName="r"
              values="20; 19.5; 20"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Animated Wave Lines */}
          <use
            href="#wavePath"
            stroke="white"
            strokeWidth="3"
            fill="none"
            opacity="0.9"
          />

          {/* Animated Center Dot */}
          <circle cx="24" cy="24" r="3" fill="white">
            <animate
              attributeName="r"
              values="3; 2.5; 3"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

      {/* Brand Text with Animation */}
      {renderBrandText()}
    </div>
  );
};

export default AnimatedWaveLogo;
