import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          background: "black",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            fontSize: 60,
            fontWeight: "bold",
            color: "#fffff2",
            background:
              "radial-gradient(circle at top left, rgba(255, 0, 0, 0.2), transparent 50%), radial-gradient(circle at top right, rgba(128, 0, 128, 0.2), transparent 50%), radial-gradient(circle at bottom right, rgba(255, 165, 0, 0.2), transparent 50%), radial-gradient(circle at bottom left, rgba(255, 192, 203, 0.2), transparent 50%)",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            whiteSpace: "pre-wrap",
          }}
        >
          THE+BETH SETLISTS
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
