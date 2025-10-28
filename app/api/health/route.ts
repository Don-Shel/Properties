// Health check endpoint for monitoring
export async function GET() {
  return Response.json({ status: "ok", timestamp: new Date().toISOString() })
}
