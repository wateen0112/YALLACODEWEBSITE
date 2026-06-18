"use client";

interface StarfieldProps {
  className?: string;
}

export function Starfield({ className = "" }: StarfieldProps) {
  return <div className={`starfield ${className}`} aria-hidden="true" />;
}
