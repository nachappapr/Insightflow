const AnimatedWaveLogo = ({ size = 48 }) => {
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
      <div className="flex flex-col">
        <span
          className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent
                       animate-gradient-x"
        >
          InsightFlow
        </span>
        <span className="text-sm text-gray-500 opacity-0 animate-fade-in">
          Feedback Platform
        </span>
      </div>
    </div>
  );
};

export default AnimatedWaveLogo;
