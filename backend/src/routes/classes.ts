import { Router } from "express";
import prisma from "../utils/prisma.js";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/rbac.js";

const router = Router();

router.get("/", authenticate, async (req, res) => {
  const schoolId = req.user!.schoolId;
  if (!schoolId && req.user!.role !== "SUPER_ADMIN") {
    res.status(400).json({ error: "No school context" });
    return;
  }
  const classes = await prisma.class.findMany({
    where: { schoolId },
    include: {
      teacher: { select: { id: true, name: true, email: true } },
      _count: { select: { students: true } },
    },
    orderBy: { name: "asc" },
  });
  const result = await Promise.all(
    classes.map(async (c) => {
      const marks = await prisma.mark.findMany({
        where: { student: { classId: c.id } },
        select: { score: true, maxScore: true },
      });
      const avgScore =
        marks.length > 0
          ? Math.round(marks.reduce((s, m) => s + (m.score / m.maxScore) * 100, 0) / marks.length)
          : 0;
      return { ...c, avgScore };
    })
  );
  res.json(result);
});

router.get("/:id", authenticate, async (req, res) => {
  const cls = await prisma.class.findUnique({
    where: { id: req.params.id },
    include: {
      teacher: { select: { id: true, name: true, email: true } },
      students: {
        orderBy: { rollNo: "asc" },
        include: {
          _count: { select: { attendance: true } },
        },
      },
    },
  });
  if (!cls) {
    res.status(404).json({ error: "Class not found" });
    return;
  }
  res.json(cls);
});

router.post("/", authenticate, authorize("SCHOOL_ADMIN"), async (req, res) => {
  const { name, teacherId } = req.body;
  const schoolId = req.user!.schoolId;
  const cls = await prisma.class.create({
    data: { name, schoolId, teacherId },
  });
  res.status(201).json(cls);
});

router.put("/:id", authenticate, authorize("SCHOOL_ADMIN"), async (req, res) => {
  const { name, teacherId } = req.body;
  const cls = await prisma.class.update({
    where: { id: req.params.id },
    data: { name, teacherId },
  });
  res.json(cls);
});

router.delete("/:id", authenticate, authorize("SCHOOL_ADMIN"), async (req, res) => {
  await prisma.class.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

export default router;
