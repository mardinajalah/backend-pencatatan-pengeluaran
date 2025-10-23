import prisma from "../config/prisma";

type DataSaldoType ={
  id: number,
  saldo: number
}

const getDataSaldo = async () => {
    return await prisma.saldo.findMany()
}

const updateDataSaldo = async (newData: DataSaldoType, id: number) => {
  return await prisma.saldo.update({
    where: { id },
    data: newData
  })
}

export default { getDataSaldo, updateDataSaldo }