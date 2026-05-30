import { Router } from "express";
import prisma from "../utils/prisma.js";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/rbac.js";

const router = Router();

router.get("/", authenticate, authorize("SCHOOL_ADMIN", "TEACHER"), async (req, res) => {
  const schoolId = req.user!.schoolId;
  const { classId, search } = req.query;

  const where: any = { class: { schoolId } };
  if (classId) where.classId = classId;
  if (search) {
    where.OR = [
      { name: { contains: String(search) } },
      { rollNo: { contains: String(search) } },
      { fatherName: { contains: String(search) } },
    ];
  }

  const students = await prisma.student.findMany({
    where,
    include: {
      class: true,
      _count: { select: { attendance: true, marks: true } },
    },
    orderBy: { name: "asc" },
  });

  const result = students.map((s) => {
    const totalMarks = s.marks.length;
    const attendanceTotal = s.attendance.length;
    return {
      ...s,
      attendance: attendanceTotal,
      marks: totalMarks,
    };
  });

  res.json(result);
});

router.get("/:id", authenticate, async (req, res) => {
  const student = await prisma.student.findUnique({
    where: { id: req.params.id },
    include: {
      class: { include: { school: true } },
      attendance: { orderBy: { date: "desc" }, take: 30 },
      marks: true,
      behavior: { include: { student: false } },
      leaveRequests: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!student) {
    res.status(404).json({ error: "Student not found" });
    return;
  }
  const fees = await prisma.fee.findMany({ where: { studentId: student.id } });
  res.json({ ...student, fees });
});

router.post("/", authenticate, authorize("SCHOOL_ADMIN", "TEACHER"), async (req, res) => {
  const { name, fatherName, motherName, rollNo, classId, photoUrl, phone, height, weight, bloodGroup, address } = req.body;
  const schoolId = req.user!.schoolId;

  const cls = await prisma.class.findUnique({ where: { id: classId } });
  if (!cls || cls.schoolId !== schoolId) {
    res.status(400).json({ error: "Invalid class" });
    return;
  }

  const student = await prisma.student.create({
    data: { name, fatherName, motherName, rollNo, classId, photoUrl, phone, height, weight, bloodGroup, address },
    include: { class: true },
  });
  res.status(201).json(student);
});

router.put("/:id", authenticate, authorize("SCHOOL_ADMIN"), async (req, res) => {
  const { name, fatherName, motherName, rollNo, photoUrl, phone, height, weight, bloodGroup, address, feeStatus, marksheetUrl } = req.body;
  const student = await prisma.student.update({
    where: { id: req.params.id },
    data: { name, fatherName, motherName, rollNo, photoUrl, phone, height, weight, bloodGroup, address, feeStatus, marksheetUrl },
  });
  res.json(student);
});

router.delete("/:id", authenticate, authorize("SCHOOL_ADMIN"), async (req, res) => {
  await prisma.student.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

export default router;
