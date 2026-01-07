import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return NextResponse.json(
        { error: "Expected application/json" },
        { status: 400 }
      );
    }

    let data: any;
    try {
      data = await request.json();
    } catch (e) {
      console.error("Invalid JSON body:", e);
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    // basic validation
    if (!data.position || !data.company) {
      return NextResponse.json(
        { error: "position and company required" },
        { status: 400 }
      );
    }

    const created = await prisma.application.create({
      data: {
        position: data.position,
        company: data.company,
        status: data.status ?? "",
        notes: data.notes ?? "",
        url: data.url ?? "",
        dateApplied: data.dateApplied ? new Date(data.dateApplied) : null,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error("POST /api/applications error:", err);
    const message =
      process.env.NODE_ENV === "production" ? "server error" : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
