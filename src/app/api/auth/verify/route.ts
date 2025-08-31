import { type NextRequest, NextResponse } from "next/server";
import { verifyToken, AuthError } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    // Get token from cookie
    const token = request.cookies.get("admin-token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    // Verify token
    const payload = verifyToken(token);

    return NextResponse.json(
      {
        success: true,
        user: {
          id: payload.userId,
          role: payload.role,
        },
        valid: true,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    console.error("Token verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
