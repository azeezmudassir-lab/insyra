import { Router } from "express";
import prisma from "../utils/prisma.js";
import { authenticate } from "../middleware/auth.js";
import { authorize, requireSchoolAccess } from "../middleware/rbac.js";

const router = Router();

router.get("/", authenticate, authorize("SUPER_ADMIN"), async (_req, res) => {
  const schools = await prisma.school.findMany({
    include: { _count: { select: { users: true, classes: true } } },
  });
  res.json(schools);
});

router.get("/:schoolId", authenticate, requireSchoolAccess, async (req, res) => {
  const school = await prisma.school.findUnique({
    where: { id: req.params.schoolId },
    include: {
      _count: { select: { users: true, classes: true } },
      settings: true,
    },
  });
  if (!school) {
    res.status(404).json({ error: "School not found" });
    return;
  }
  res.json(school);
});

router.put("/:schoolId", authenticate, requireSchoolAccess, async (req, res) => {
  const { name, address, phone, logoUrl, themeColor } = req.body;
  const school = await prisma.school.update({
    where: { id: req.params.schoolId },
    data: { name, address, phone, logoUrl, themeColor },
  });
  res.json(school);
});

router.get("/:schoolId/stats", authenticate, requireSchoolAccess, async (req, res) => {
  const schoolId = req.params.schoolId;
  const [students, teachers, classes, attendanceRecords] = await Promise.all([
    prisma.student.count({ where: { class: { schoolId } } }),
    prisma.user.count({ where: { schoolId, role: "TEACHER" } }),
    prisma.class.count({ where: { schoolId } }),
    prisma.attendance.findMany({
      where: { student: { class: { schoolId } } },
      select: { status: true },
    }),
  ]);
  const total = attendanceRecords.length;
  const present = attendanceRecords.filter((a) => a.status === "PRESENT").length;
  const attendancePct = total > 0 ? Math.round((present / total) * 100) : 0;

  const marks = await prisma.mark.findMany({
    where: { student: { class: { schoolId } } },
    select: { score: true, maxScore: true },
  });
  const avgMarks =
    marks.length > 0
      ? Math.round(marks.reduce((s, m) => s + (m.score / m.maxScore) * 100, 0) / marks.length)
      : 0;

  res.json({ students, teachers, classes, attendance: attendancePct, avgMarks });
});

export default router;
