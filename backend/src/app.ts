import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import schoolRoutes from "./routes/schools.js";
import studentRoutes from "./routes/students.js";
import classRoutes from "./routes/classes.js";
import teacherRoutes from "./routes/teachers.js";
import attendanceRoutes from "./routes/attendance.js";
import markRoutes from "./routes/marks.js";
import feeRoutes from "./routes/fees.js";
import admissionRoutes from "./routes/admissions.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/schools", schoolRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/marks", markRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/admissions", admissionRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

export default app;
