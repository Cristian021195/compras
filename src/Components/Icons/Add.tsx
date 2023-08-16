export function Add({width=16, height=16, color="currentColor", classDefinition="bi bi-plus-circle-fill"}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      className={classDefinition}
      viewBox={`0 0 ${width+2} ${height+2}`}
    >
      <path d="M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4.5a.5.5 0 00-1 0v3h-3a.5.5 0 000 1h3v3a.5.5 0 001 0v-3h3a.5.5 0 000-1h-3v-3z"></path>
    </svg>
  );
}