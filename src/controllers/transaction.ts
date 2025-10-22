import { Response, Request } from "express"
import TransactionModels from "../models/transaction"

const getAllTransaction = async (req: Request, res: Response) => {
    try {
        const data = await TransactionModels.getDataTransaction()
        res.status(200).json({
            message: "data berhasil di tampilkan",
            data
        })
    } catch {
        res.status(500).json({
            message: "data gagal di tampilkan",
        })
    }
}

const createTransaction = async (req: Request, res: Response) => {
    const newData = req.body
    try {
        const data = await TransactionModels.createDataTransaction(newData)

        res.status(201).json({
            message: "data berhasil di tambahkan",
            data
        })
    } catch {
        res.status(400).json({
            message: "data gagal di tambahkan"
        })
    }
}


export default { getAllTransaction, createTransaction }