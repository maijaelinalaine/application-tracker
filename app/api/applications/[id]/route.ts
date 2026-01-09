import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const appId = parseInt(id);
    const app = await prisma.application.findUnique({ where: { id: appId } });
    if (!app) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(app);
  } catch (err) {
    console.error("GET /api/applications/[id] error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const appId = parseInt(id);
    const data = await request.json();

    console.log("PATCH /api/applications/[id] - id:", appId, "data:", data);

    const updated = await prisma.application.update({
      where: { id: appId },
      data: {
        position: data.position,
        company: data.company,
        status: data.status,
        notes: data.notes,
        url: data.url,
        dateApplied: data.dateApplied ? new Date(data.dateApplied) : null,
      },
    });

    console.log("Update successful:", updated);
    return NextResponse.json(updated);
  } catch (err) {
    console.error("PATCH /api/applications/[id] error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const appId = parseInt(id);
    await prisma.application.delete({ where: { id: appId } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/applications/[id] error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
