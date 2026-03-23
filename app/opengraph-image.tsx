import { ImageResponse } from "next/og";

export const alt = "Aryan Ganju — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#080c0a",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top gradient bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #10b981, #06b6d4, #f59e0b)",
          }}
        />

        {/* Emerald ambient glow top-left */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -200,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Amber ambient glow bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: -150,
            right: -100,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            padding: "0 100px",
            gap: 80,
            paddingTop: 20,
          }}
        >
          {/* AG monogram */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 200,
              height: 200,
              borderRadius: 32,
              background: "rgba(16, 185, 129, 0.08)",
              border: "2px solid rgba(16, 185, 129, 0.2)",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "sans-serif",
                fontWeight: 900,
                fontSize: 96,
                color: "#10b981",
                letterSpacing: "-0.05em",
                lineHeight: 1,
              }}
            >
              AG
            </span>
          </div>

          {/* Text block */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span
              style={{
                fontFamily: "sans-serif",
                fontWeight: 800,
                fontSize: 80,
                color: "#f5f5f4",
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              Aryan Ganju
            </span>
            <span
              style={{
                fontFamily: "sans-serif",
                fontWeight: 400,
                fontSize: 36,
                color: "#9ca3a0",
                letterSpacing: "-0.01em",
              }}
            >
              Software Engineer
            </span>
            <span
              style={{
                fontFamily: "sans-serif",
                fontWeight: 500,
                fontSize: 28,
                color: "#10b981",
                letterSpacing: "0.02em",
              }}
            >
              NUS Computer Science · AI/ML · Database Systems
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px 100px",
            borderTop: "1px solid rgba(16, 185, 129, 0.08)",
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 24,
              color: "#9ca3a0",
              letterSpacing: "0.02em",
            }}
          >
            aryanganju.com
          </span>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 22,
              color: "rgba(16, 185, 129, 0.6)",
            }}
          >
            Available Jun 2026
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
