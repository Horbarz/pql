export function LogoIcon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="PisonQALab logo"
    >
      <defs>
        <linearGradient id="handleGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <radialGradient id="lensGrad" cx="35%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#f5f3ff" />
          <stop offset="100%" stopColor="#ddd6fe" />
        </radialGradient>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#4338ca" />
        </linearGradient>
        <clipPath id="lensClip">
          <circle cx="13" cy="13" r="10" />
        </clipPath>
      </defs>

      {/* Handle */}
      <line
        x1="21.5"
        y1="21.5"
        x2="29.5"
        y2="29.5"
        stroke="url(#handleGrad)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Lens glass fill */}
      <circle cx="13" cy="13" r="10" fill="url(#lensGrad)" />

      {/* Bug — clipped inside the lens */}
      <g clipPath="url(#lensClip)">
        {/* Antennae */}
        <path
          d="M 12.2 8.2 Q 10.5 5.8 9.2 4.8"
          stroke="#4338ca"
          strokeWidth="0.85"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 13.8 8.2 Q 15.5 5.8 16.8 4.8"
          stroke="#4338ca"
          strokeWidth="0.85"
          strokeLinecap="round"
          fill="none"
        />
        {/* Antenna tips */}
        <circle cx="9" cy="4.5" r="1" fill="#4338ca" />
        <circle cx="17" cy="4.5" r="1" fill="#4338ca" />

        {/* Head */}
        <circle cx="13" cy="9.8" r="2.3" fill="#4338ca" />
        {/* Head shine */}
        <ellipse
          cx="12.1"
          cy="8.9"
          rx="0.8"
          ry="0.5"
          fill="white"
          opacity="0.3"
          transform="rotate(-20 12.1 8.9)"
        />

        {/* Body shell */}
        <ellipse cx="13" cy="16" rx="4.3" ry="6" fill="url(#bodyGrad)" />

        {/* Shell center line */}
        <line
          x1="13"
          y1="11"
          x2="13"
          y2="22"
          stroke="#312e81"
          strokeWidth="0.75"
        />

        {/* Shell spots */}
        <circle cx="11" cy="14.5" r="1.15" fill="#312e81" opacity="0.45" />
        <circle cx="15" cy="14.5" r="1.15" fill="#312e81" opacity="0.45" />
        <circle cx="11" cy="17.5" r="1.15" fill="#312e81" opacity="0.45" />
        <circle cx="15" cy="17.5" r="1.15" fill="#312e81" opacity="0.45" />

        {/* Shell highlight */}
        <ellipse
          cx="11.2"
          cy="13.5"
          rx="1.1"
          ry="1.8"
          fill="white"
          opacity="0.15"
          transform="rotate(-10 11.2 13.5)"
        />

        {/* Legs — 3 pairs */}
        {/* Upper */}
        <line x1="8.7" y1="13.5" x2="11.2" y2="14.5" stroke="#312e81" strokeWidth="0.9" strokeLinecap="round" />
        <line x1="17.3" y1="13.5" x2="14.8" y2="14.5" stroke="#312e81" strokeWidth="0.9" strokeLinecap="round" />
        {/* Middle */}
        <line x1="8.2" y1="16" x2="11.2" y2="16" stroke="#312e81" strokeWidth="0.9" strokeLinecap="round" />
        <line x1="17.8" y1="16" x2="14.8" y2="16" stroke="#312e81" strokeWidth="0.9" strokeLinecap="round" />
        {/* Lower */}
        <line x1="8.7" y1="18.8" x2="11.2" y2="17.5" stroke="#312e81" strokeWidth="0.9" strokeLinecap="round" />
        <line x1="17.3" y1="18.8" x2="14.8" y2="17.5" stroke="#312e81" strokeWidth="0.9" strokeLinecap="round" />
      </g>

      {/* Lens ring */}
      <circle
        cx="13"
        cy="13"
        r="10"
        stroke="url(#handleGrad)"
        strokeWidth="2"
        fill="none"
      />

      {/* Lens glare */}
      <ellipse
        cx="8.5"
        cy="8.5"
        rx="2.2"
        ry="1.2"
        fill="white"
        opacity="0.35"
        transform="rotate(-35 8.5 8.5)"
      />
    </svg>
  );
}
