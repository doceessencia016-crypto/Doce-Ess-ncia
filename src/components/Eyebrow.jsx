export default function Eyebrow({ children, className = "" }) {
  return (
    <p className={`font-sans text-xs uppercase tracking-widest font-semibold text-rose-dark mb-4 ${className}`}>
      {children}
    </p>
  );
}
