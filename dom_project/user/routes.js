import { Router } from "express";
import { getAll, add } from "./controllers.js";

const router = Router();

router.get("/", getAll);
router.post("/", add);

export default router;