import { Router } from "express";
import prisma from "../utils/prisma.js";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/rbac.js";

const router = Router();

router.get("/", authenticate, authorize("SCHOOL_ADMIN"), async (req, res) => {
  const schoolId = req.user!.schoolId;
  const admissions = await prisma.admission.findMany({
    where: { schoolId },
    orderBy: { date: "desc" },
  });
  res.json(admissions);
});

router.post("/", async (req, res) => {
  const { studentName, fatherName, motherName, phone, email, grade, schoolId } = req.body;
  const admission = await prisma.admission.create({
    data: { studentName, fatherName, motherName, phone, email, grade, schoolId },
  });
  res.status(201).json(admission);
});

router.put("/:id/approve", authenticate, authorize("SCHOOL_ADMIN"), async (req, res) => {
  const admission = await prisma.admission.update({
    where: { id: req.params.id },
    data: { status: "APPROVED" },
  });
  res.json(admission);
});

router.put("/:id/reject", authenticate, authorize("SCHOOL_ADMIN"), async (req, res) => {
  const admission = await prisma.admission.update({
    where: { id: req.params.id },
    data: { status: "REJECTED" },
  });
  res.json(admission);
});

export default router;
