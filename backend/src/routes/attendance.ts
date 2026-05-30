import { Router } from "express";
import prisma from "../utils/prisma.js";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/rbac.js";

const router = Router();

router.get("/", authenticate, async (req, res) => {
  const schoolId = req.user!.schoolId;
  const { classId, date } = req.query;

  const where: any = { student: { class: { schoolId } } };
  if (classId) where.student.classId = classId;
  if (date) {
    const d = new Date(String(date));
    where.date = {
      gte: new Date(d.setHours(0, 0, 0, 0)),
      lt: new Date(d.setHours(23, 59, 59, 999)),
    };
  }

  const records = await prisma.attendance.findMany({
    where,
    include: { student: { select: { id: true, name: true, rollNo: true } } },
    orderBy: { date: "desc" },
  });
  res.json(records);
});

router.post("/mark", authenticate, authorize("SCHOOL_ADMIN", "TEACHER"), async (req, res) => {
  const { date, records } = req.body;
  // records: [{ studentId, status }]

  const dateStart = new Date(date);
  dateStart.setHours(0, 0, 0, 0);
  const dateEnd = new Date(date);
  dateEnd.setHours(23, 59, 59, 999);

  await prisma.attendance.deleteMany({
    where: {
      studentId: { in: records.map((r: any) => r.studentId) },
      date: { gte: dateStart, lte: dateEnd },
    },
  });

  const created = await prisma.attendance.createMany({
    data: records.map((r: any) => ({
      studentId: r.studentId,
      status: r.status,
      date: dateStart,
    })),
  });

  res.status(201).json({ count: created.count });
});

router.get("/stats/:studentId", authenticate, async (req, res) => {
  const records = await prisma.attendance.findMany({
    where: { studentId: req.params.studentId },
  });
  const total = records.length;
  const present = records.filter((r) => r.status === "PRESENT").length;
  const absent = records.filter((r) => r.status === "ABSENT").length;
  const late = records.filter((r) => r.status === "LATE").length;
  const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
  res.json({ total, present, absent, late, percentage });
});

export default router;
