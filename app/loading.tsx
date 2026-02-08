export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "radial-gradient(ellipse, rgba(16, 185, 129, 0.1), transparent 60%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Pulsing logo */}
        <div
          className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-2xl"
          style={{
            background: "rgba(21, 29, 25, 0.8)",
            border: "2px solid rgba(16, 185, 129, 0.2)",
            animation: "pulse-ring 2s ease-in-out infinite",
          }}
        >
          {/* Outer ring */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              border: "2px solid rgba(16, 185, 129, 0.3)",
              animation: "pulse-ring 2s ease-in-out infinite",
            }}
          />

          {/* AG monogram */}
          <span
            className="font-heading text-3xl font-bold"
            style={{
              background: "linear-gradient(135deg, #10b981, #06b6d4)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AG
          </span>
        </div>

        {/* Loading dots */}
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-accent"
              style={{
                animation: "bounce-dot 1.4s ease-in-out infinite",
                animationDelay: `${i * 0.16}s`,
                boxShadow: "0 0 8px rgba(16, 185, 129, 0.5)",
              }}
            />
          ))}
        </div>

        {/* Screen reader text */}
        <span className="sr-only">Loading...</span>
      </div>

    </main>
  );
}
