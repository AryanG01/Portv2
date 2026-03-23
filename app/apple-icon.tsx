import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d1410",
          borderRadius: "32px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span
            style={{
              fontFamily: "sans-serif",
              fontWeight: 800,
              fontSize: 72,
              color: "#10b981",
              letterSpacing: "-0.05em",
              lineHeight: 1,
            }}
          >
            AG
          </span>
        </div>
      </div>
    ),
    { width: 180, height: 180 }
  );
}
