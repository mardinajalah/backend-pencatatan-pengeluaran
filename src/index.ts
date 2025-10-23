import express from "express"
import dotenv from "dotenv"
import transactionRouter from "./routes/transaction"
import saldoRouter from "./routes/saldo"
import cors from "cors"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

app.use("/transaction", transactionRouter)
app.use("/saldo", saldoRouter)

app.listen(PORT, () => {
    console.log(`server running in http://localhost:${PORT}`)
})