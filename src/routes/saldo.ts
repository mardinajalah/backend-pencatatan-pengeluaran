import express from "express"
import SaldoControllers from "../controllers/saldo"

const router = express.Router();

router.get("/", SaldoControllers.getAllsaldo)
router.put("/:id", SaldoControllers.updateSaldo);

export default router