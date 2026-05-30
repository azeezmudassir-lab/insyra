import { Router } from "express";
import prisma from "../utils/prisma.js";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/rbac.js";

const router = Router();

router.get("/", authenticate, async (req, res) => {
  const schoolId = req.user!.schoolId;
  const { classId, studentId, examType } = req.query;

  const where: any = { student: { class: { schoolId } } };
  if (classId) where.student.classId = classId;
  if (studentId) where.studentId = studentId;
  if (examType) where.examType = examType;

  const marks = await prisma.mark.findMany({
    where,
    include: { student: { select: { id: true, name: true, rollNo: true } } },
    orderBy: { createdAt: "desc" },
  });
  res.json(marks);
});

router.post("/", authenticate, authorize("SCHOOL_ADMIN", "TEACHER"), async (req, res) => {
  const { studentId, subject, score, maxScore, examType } = req.body;
  const mark = await prisma.mark.create({
    data: { studentId, subject, score, maxScore, examType },
  });
  res.status(201).json(mark);
});

router.post("/bulk", authenticate, authorize("SCHOOL_ADMIN", "TEACHER"), async (req, res) => {
  const { records } = req.body;
  // records: [{ studentId, subject, score, maxScore, examType }]
  const created = await prisma.mark.createMany({ data: records });
  res.status(201).json({ count: created.count });
});

router.put("/:id", authenticate, authorize("SCHOOL_ADMIN", "TEACHER"), async (req, res) => {
  const { subject, score, maxScore, examType } = req.body;
  const mark = await prisma.mark.update({
    where: { id: req.params.id },
    data: { subject, score, maxScore, examType },
  });
  res.json(mark);
});

router.delete("/:id", authenticate, authorize("SCHOOL_ADMIN"), async (req, res) => {
  await prisma.mark.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

export default router;
