import { Router } from "express";
import bcrypt from "bcryptjs";
import prisma from "../utils/prisma.js";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/rbac.js";

const router = Router();

router.get("/", authenticate, authorize("SCHOOL_ADMIN"), async (req, res) => {
  const schoolId = req.user!.schoolId;
  const teachers = await prisma.user.findMany({
    where: { schoolId, role: "TEACHER" },
    include: {
      classesAsTeacher: { include: { _count: { select: { students: true } } } },
    },
    orderBy: { name: "asc" },
  });
  res.json(teachers);
});

router.post("/", authenticate, authorize("SCHOOL_ADMIN"), async (req, res) => {
  const { name, email, phone, subject, classId, isClassTeacher } = req.body;
  const schoolId = req.user!.schoolId;

  if (await prisma.user.findUnique({ where: { email } })) {
    res.status(400).json({ error: "Email already in use" });
    return;
  }

  const tempPassword = "changeme123";
  const hashedPassword = await bcrypt.hash(tempPassword, 12);

  const teacher = await prisma.user.create({
    data: {
      name,
      email,
      phone,
      password: hashedPassword,
      role: "TEACHER",
      schoolId,
    },
  });

  if (classId) {
    await prisma.class.update({
      where: { id: classId },
      data: { teacherId: teacher.id },
    });
  }

  res.status(201).json({ ...teacher, tempPassword });
});

router.put("/:id", authenticate, authorize("SCHOOL_ADMIN"), async (req, res) => {
  const { name, email, phone, subject } = req.body;
  const teacher = await prisma.user.update({
    where: { id: req.params.id },
    data: { name, email, phone },
  });
  res.json(teacher);
});

router.delete("/:id", authenticate, authorize("SCHOOL_ADMIN"), async (req, res) => {
  await prisma.user.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

export default router;
