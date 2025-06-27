import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyJwt } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const token = authHeader.replace("Bearer ", "");
  const decoded = verifyJwt(token) as any;
  if (!decoded) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
  const events = await prisma.event.findMany({
    where: { userId: decoded.id },
    orderBy: { start: "asc" },
  });
  return NextResponse.json(events);
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const token = authHeader.replace("Bearer ", "");
  const decoded = verifyJwt(token) as any;
  if (!decoded) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
  const { title, start, end, allDay } = await req.json();
  if (!title || !start || !end) {
    return NextResponse.json({ error: "Dados obrigatórios ausentes" }, { status: 400 });
  }
  const event = await prisma.event.create({
    data: {
      title,
      start: new Date(start),
      end: new Date(end),
      allDay: !!allDay,
      userId: decoded.id,
    },
  });
  return NextResponse.json(event);
}

export async function PUT(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const token = authHeader.replace("Bearer ", "");
  const decoded = verifyJwt(token) as any;
  if (!decoded) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
  const { id, title, start, end, allDay } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "ID do evento é obrigatório" }, { status: 400 });
  }
  const event = await prisma.event.update({
    where: { id },
    data: { title, start: new Date(start), end: new Date(end), allDay: !!allDay },
  });
  return NextResponse.json(event);
}

export async function DELETE(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const token = authHeader.replace("Bearer ", "");
  const decoded = verifyJwt(token) as any;
  if (!decoded) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "ID do evento é obrigatório" }, { status: 400 });
  }
  await prisma.event.delete({ where: { id } });
  return NextResponse.json({ success: true });
} 