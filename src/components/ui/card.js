
export function Card({ children }) {
  return <div className="shadow-md rounded-lg border">{children}</div>;
}
export function CardContent({ children, className }) {
  return <div className={className}>{children}</div>;
}
