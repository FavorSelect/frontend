import { NextRequest, NextResponse } from "next/server";

// Fake user database for testing
const FAKE_USER = {
  email: "test@example.com",
  password: "password123",
};

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming JSON data
    const { email, password } = await req.json();

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if the email and password match the fake user
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      return NextResponse.json(
        { message: "Login successful" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
