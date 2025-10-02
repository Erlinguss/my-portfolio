"use client";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-64 w-full">
      <div className="relative w-16 h-16">
        {/* spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-indigo-500 animate-spin"></div>
        {/* pulsing gradient glow */}
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-purple-500 animate-ping opacity-50"></div>
      </div>
    </div>
  );
}


