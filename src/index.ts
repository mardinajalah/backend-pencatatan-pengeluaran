import express from "express"
import dotenv from "dotenv"
import usersRouter from "./routes/users"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())

app.use("/saldo", usersRouter)

app.listen(PORT, () => {
    console.log(`server running in http://localhost:${PORT}`)
})