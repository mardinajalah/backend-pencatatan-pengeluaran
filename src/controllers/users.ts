import { Response, Request } from "express"
import UserModels from "../models/users"

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const data = await UserModels.getDataUsers()
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

const createUser = async (req: Request, res: Response) => {
    const newData = req.body
    try {
        const data = await UserModels.createDataUser(newData)

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


const getUserById = async (req: Request, res:Response) => {
    const idUser = req.params.id
    try {
        const data = await UserModels.getDataUserById(Number(idUser))
        res.status(200).json({
            message: "data berhasil di tampilkan",
            data
        })
    } catch {
        res.status(400).json({
            message: "data gagal di tampilkan"
        })
    }
}

const updateUser = async (req: Request, res: Response) => {
    const idUser = req.params.id
    const newData = req.body
    try {
        const data = await UserModels.updateDataUser(Number(idUser), newData)
        res.status(200).json({
            message: "data berhasil di ubah",
            data
        })
    } catch {
        res.status(400).json({
            message: "data gagal di ubah"
        })
    }
}


const deleteUser = async (req: Request, res: Response) => {
    const idUser = req.params.id
    try {
        const data = await UserModels.deleteDataUser(Number(idUser))
        res.status(200).json({
            message: "data berhasil di hapus",
            data
        })
    } catch {
        res.status(400).json({
            message: "data gagal di hapus"
        })
    }
}

export default { getAllUsers, createUser, getUserById, updateUser, deleteUser }