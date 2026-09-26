/** Inline SVG logos — pixel-perfect recreations of official brand marks */

interface LogoProps {
  size?: number;
  className?: string;
}

export function LeetCodeLogo({ size = 16, className }: LogoProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="LeetCode"
    >
      <path
        d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.083 5.083 0 0 0 .349 1.017 5.159 5.159 0 0 0 1.579 2.256l.066.052 5.943 5.159a1.379 1.379 0 0 0 1.913-.069l1.073-1.17a1.38 1.38 0 0 0-.067-1.933l-5.943-5.16a1.89 1.89 0 0 1-.456-.704 1.878 1.878 0 0 1-.1-.514c-.013-.262.031-.524.127-.77a1.927 1.927 0 0 1 .454-.7L11.36 8.57l4.005-4.287a1.38 1.38 0 0 0-.07-1.93L14.232.385A1.366 1.366 0 0 0 13.483 0z"
        fill="currentColor"
      />
      <path
        d="M20.308 17.276a1.38 1.38 0 0 0-1.38-1.38h-8.61a1.89 1.89 0 0 1-.82-.196 1.918 1.918 0 0 1-.675-.544 1.893 1.893 0 0 1-.442-1.238 1.873 1.873 0 0 1 .177-.827c.103-.246.259-.468.454-.653l.066-.058 4.517-4.525a1.38 1.38 0 0 1 1.951 0l1.073 1.073a1.38 1.38 0 0 1 0 1.951l-4.517 4.526h7.736a1.38 1.38 0 0 1 1.38 1.38v1.511a1.38 1.38 0 0 1-1.38 1.38h-8.61"
        fill="currentColor"
        opacity="0.5"
      />
      <path
        d="M20.308 17.276h-8.728a1.38 1.38 0 0 0 0 2.76h8.728a1.38 1.38 0 0 0 0-2.76z"
        fill="currentColor"
      />
    </svg>
  );
}

export function GFGLogo({ size = 16, className }: LogoProps) {
  return (
    <svg
      className={className}
      width={size * 1.2}
      height={size}
      viewBox="0 0 600 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="GeeksForGeeks"
    >
      {/* Left curly brace shape */}
      <path
        d="M 245 80 Q 245 80 195 130 Q 150 175 150 200 Q 150 225 195 270 Q 245 320 245 320"
        stroke="currentColor"
        strokeWidth="40"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right curly brace shape */}
      <path
        d="M 355 80 Q 355 80 405 130 Q 450 175 450 200 Q 450 225 405 270 Q 355 320 355 320"
        stroke="currentColor"
        strokeWidth="40"
        strokeLinecap="round"
        fill="none"
      />
      {/* Center line */}
      <line
        x1="220"
        y1="200"
        x2="380"
        y2="200"
        stroke="currentColor"
        strokeWidth="40"
        strokeLinecap="round"
      />
    </svg>
  );
}
