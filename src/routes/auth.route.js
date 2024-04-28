import express from "express";
const router = express.Router();
import * as authCtrlr from "../controllers/auth.controller";

// register user
router.post("/singUp", authCtrlr.singUp)

// login user
router.post("/singIn", authCtrlr.singIn);



export default router;