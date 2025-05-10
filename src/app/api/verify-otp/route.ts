import { NextRequest, NextResponse } from "next/server";

// Fake OTP for testing
const TEST_OTP = "123456";

export async function POST(req: NextRequest) {
  try {
    const { otp } = await req.json();

    if (!otp || otp.length !== 6) {
      return NextResponse.json(
        { message: "Invalid OTP. Please enter a 6-digit code." },
        { status: 400 }
      );
    }

    // Check if the OTP matches the fake one
    if (otp === TEST_OTP) {
      return NextResponse.json(
        { message: "OTP verified successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Incorrect OTP. Please try again." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
