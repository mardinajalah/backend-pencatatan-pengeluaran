import { Response, Request } from 'express';
import saldo from '../models/saldo';
import prisma from '../config/prisma';

const getAllsaldo = async (req: Request, res: Response) => {
  try {
    const data = await saldo.getDataSaldo();
    res.status(200).json({
      message: 'data berhasil di tampilkan',
      data,
    });
  } catch {
    res.status(500).json({
      message: 'data gagal di tampilkan',
    });
  }
};

const updateSaldo = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { saldo } = req.body;

  try {
    const updated = await prisma.saldo.update({
      where: { id },
      data: { saldo },
    });

    res.status(200).json({
      message: "saldo berhasil di update",
      data: updated,
    });
  } catch (error) {
    res.status(400).json({
      message: "saldo gagal di update",
    });
  }
};

export default { getAllsaldo, updateSaldo };
