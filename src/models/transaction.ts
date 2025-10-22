import prisma from "../config/prisma";

interface NewDataType {
    nama: string
    email: string
    password: string
}

const getDataUsers = async () => {
    return await prisma.user.findMany()
}

const createDataUser = async (newData: NewDataType) => {
    return await prisma.user.create({
        data: newData
    })
}

export default { getDataUsers, createDataUser }