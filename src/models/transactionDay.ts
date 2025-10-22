import prisma from "../config/prisma";

const getDataTransactionDay = async () => {
    return await prisma.transactionDay.findMany()
}

const createDataTransactionDay = async (newData: any) => {
    return await prisma.transactionDay.create({
        data: newData
    })
}

export default { getDataTransactionDay, createDataTransactionDay }