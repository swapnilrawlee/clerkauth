
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "Unknown IP";
  const userAgent = req.headers.get("user-agent") || "Unknown UA";

  return new Response(JSON.stringify({ ip, userAgent }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
