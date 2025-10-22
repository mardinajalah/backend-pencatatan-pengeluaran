import express from "express"
import UserControllers from "../controllers/transaction"

const router = express()


router.get("/", UserControllers.getAllUsers)
router.post("/", UserControllers.createUser)

export default router