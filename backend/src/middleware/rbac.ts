import type { Request, Response, NextFunction } from "express";

export function authorize(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ error: "Insufficient permissions" });
      return;
    }
    next();
  };
}

export function requireSchoolAccess(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }
  const schoolId = req.params.schoolId || req.body.schoolId;
  if (!schoolId && !req.user.schoolId) {
    res.status(400).json({ error: "No school context" });
    return;
  }
  if (req.user.role === "SUPER_ADMIN") {
    next();
    return;
  }
  if (schoolId && req.user.schoolId !== schoolId) {
    res.status(403).json({ error: "Cross-school access denied" });
    return;
  }
  next();
}
