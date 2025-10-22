import express from "express"
import UserControllers from "../controllers/transaction"

const router = express()


router.get("/", UserControllers.getAllTransaction)
router.post("/", UserControllers.createTransaction)

export default router