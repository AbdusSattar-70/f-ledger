function LogoIcon() {
  return (
    <svg
      className="w-8 h-8 mr-2 text-blue-500 animate-pulse-subtle fill-gray-800"
      id="logo"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      viewBox="0 0 84 96"
    >
      <title>Logo</title>
      <g transform="translate(-8.000000, -2.000000)">
        <g transform="translate(11.000000, 5.000000)">
          <polygon
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="39 0 0 22 0 67 39 90 78 68 78 23"
          />
          <text
            x="39"
            y="60"
            textAnchor="middle"
            fontSize="50"
            fill="currentColor"
            fontFamily="monospace"
          >
            F
          </text>
        </g>
      </g>
    </svg>
  );
}

export default LogoIcon;
