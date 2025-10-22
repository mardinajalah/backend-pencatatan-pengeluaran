import prisma from "../config/prisma";

const getDataTransaction = async () => {
    return await prisma.transaction.findMany()
}

const createDataTransaction = async (newData: any) => {
    return await prisma.transaction.create({
        data: newData
    })
}

export default { getDataTransaction, createDataTransaction }