import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0d1410, #111916)",
          borderRadius: "4px",
        }}
      >
        <span
          style={{
            fontFamily: "sans-serif",
            fontWeight: 800,
            fontSize: 16,
            color: "#10b981",
            letterSpacing: "-0.03em",
          }}
        >
          AG
        </span>
      </div>
    ),
    { width: 32, height: 32 }
  );
}
