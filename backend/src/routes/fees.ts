import { Router } from "express";
import prisma from "../utils/prisma.js";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/rbac.js";

const router = Router();

router.get("/", authenticate, authorize("SCHOOL_ADMIN"), async (req, res) => {
  const schoolId = req.user!.schoolId;
  const { classId, status } = req.query;

  const where: any = { schoolId };
  if (classId) where.classId = classId;
  if (status) where.status = status;

  const fees = await prisma.fee.findMany({
    where,
    include: { student: { select: { id: true, name: true, rollNo: true, fatherName: true } } },
    orderBy: { dueDate: "desc" },
  });
  res.json(fees);
});

router.get("/summary", authenticate, authorize("SCHOOL_ADMIN"), async (req, res) => {
  const schoolId = req.user!.schoolId;
  const total = await prisma.fee.count({ where: { schoolId } });
  const paid = await prisma.fee.count({ where: { schoolId, status: "PAID" } });
  const pending = await prisma.fee.count({ where: { schoolId, status: "PENDING" } });
  const overdue = await prisma.fee.count({ where: { schoolId, status: "OVERDUE" } });
  res.json({ total, paid, pending, overdue });
});

router.post("/", authenticate, authorize("SCHOOL_ADMIN"), async (req, res) => {
  const { studentId, amount, dueDate, classId } = req.body;
  const schoolId = req.user!.schoolId;
  const fee = await prisma.fee.create({
    data: { studentId, amount, dueDate: new Date(dueDate), classId, schoolId },
  });
  res.status(201).json(fee);
});

router.put("/:id/pay", authenticate, authorize("SCHOOL_ADMIN"), async (req, res) => {
  const fee = await prisma.fee.update({
    where: { id: req.params.id },
    data: { status: "PAID", paidDate: new Date() },
  });
  await prisma.student.update({
    where: { id: fee.studentId },
    data: { feeStatus: "PAID" },
  });
  res.json(fee);
});

export default router;
