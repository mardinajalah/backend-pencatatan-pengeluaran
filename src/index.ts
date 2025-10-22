import express from "express"
import dotenv from "dotenv"
import transactionRouter from "./routes/transaction"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())

app.use("/", transactionRouter)

app.listen(PORT, () => {
    console.log(`server running in http://localhost:${PORT}`)
})