import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";

const dbUrl = process.env["DATABASE_URL"] || "file:./dev.db";

const adapter = new PrismaBetterSqlite3({ url: dbUrl });
const prisma = new PrismaClient({ adapter, log: ["error"] });

async function main() {
  console.log("Seeding database...");

  const school = await prisma.school.upsert({
    where: { email: "admin@kerlahigh.edu" },
    update: {},
    create: {
      name: "Kerla High School",
      email: "admin@kerlahigh.edu",
      phone: "+1-234-567-8900",
      address: "123 Education Lane, City",
      isActive: true,
      students: 1250,
    },
  });

  const password = await bcrypt.hash("demo123", 12);

  await prisma.user.upsert({
    where: { email: "principal@demo.school" },
    update: {},
    create: {
      name: "Dr. Sarah Miller",
      email: "principal@demo.school",
      password,
      role: "SCHOOL_ADMIN",
      schoolId: school.id,
    },
  });

  await prisma.user.upsert({
    where: { email: "teacher@demo.school" },
    update: {},
    create: {
      name: "Mr. Anderson",
      email: "teacher@demo.school",
      password,
      role: "TEACHER",
      schoolId: school.id,
    },
  });

  await prisma.user.upsert({
    where: { email: "student@demo.school" },
    update: {},
    create: {
      name: "Alice Smith",
      email: "student@demo.school",
      password,
      role: "STUDENT",
      schoolId: school.id,
    },
  });

  await prisma.user.upsert({
    where: { email: "parent@demo.school" },
    update: {},
    create: {
      name: "Robert Smith",
      email: "parent@demo.school",
      password,
      role: "PARENT",
      schoolId: school.id,
    },
  });

  await prisma.user.upsert({
    where: { email: "superadmin@insyra.com" },
    update: {},
    create: {
      name: "Super Admin",
      email: "superadmin@insyra.com",
      password,
      role: "SUPER_ADMIN",
    },
  });

  const classA = await prisma.class.upsert({
    where: { id: "class-grade10-a" },
    update: {},
    create: {
      id: "class-grade10-a",
      name: "Grade 10 - A",
      schoolId: school.id,
      teacherId: (await prisma.user.findFirst({ where: { email: "teacher@demo.school" } }))!.id,
    },
  });

  await prisma.class.upsert({
    where: { id: "class-grade9-b" },
    update: {},
    create: {
      id: "class-grade9-b",
      name: "Grade 9 - B",
      schoolId: school.id,
    },
  });

  const studentData = [
    { name: "Alice Smith", fatherName: "Robert Smith", rollNo: "101" },
    { name: "Bob Johnson", fatherName: "William Johnson", rollNo: "102" },
    { name: "Charlie Brown", fatherName: "James Brown", rollNo: "103" },
    { name: "Diana Prince", fatherName: "John Prince", rollNo: "104" },
    { name: "Evan Wright", fatherName: "Paul Wright", rollNo: "105" },
  ];

  for (const s of studentData) {
    const sid = `student-${s.name.toLowerCase().replace(/ /g, "-")}`;
    const existing = await prisma.student.findUnique({ where: { id: sid } });
    if (!existing) {
      const student = await prisma.student.create({
        data: {
          id: sid,
          ...s,
          admissionNo: `ADM${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
          phone: "+1234567890",
          classId: classA.id,
        },
      });
      await prisma.attendance.createMany({
        data: Array.from({ length: 20 }, (_, i) => ({
          date: new Date(Date.now() - i * 86400000),
          status: i % 5 === 0 ? "ABSENT" : "PRESENT",
          studentId: student.id,
        })),
      });
      await prisma.mark.createMany({
        data: [
          { subject: "Mathematics", score: 88, maxScore: 100, examType: "MIDTERM", studentId: student.id },
          { subject: "Science", score: 92, maxScore: 100, examType: "MIDTERM", studentId: student.id },
          { subject: "English", score: 78, maxScore: 100, examType: "MIDTERM", studentId: student.id },
          { subject: "History", score: 85, maxScore: 100, examType: "MIDTERM", studentId: student.id },
        ],
      });
    }
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
