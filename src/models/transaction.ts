import prisma from "../config/prisma";

const getDataUsers = async () => {
    return await prisma.transaction.findMany()
}

const createDataUser = async (newData: any) => {
    return await prisma.transaction.create({
        data: newData
    })
}

export default { getDataUsers, createDataUser }