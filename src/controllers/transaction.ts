import { Request, Response } from 'express';
import prisma from '../config/prisma';

const getAllTransaction = async (req: Request, res: Response) => {
  try {
    // Ambil semua TransactionDay + relasi ke Transaction
    const data = await prisma.transactionDay.findMany({
      include: {
        transactions: true,
      },
      orderBy: {
        id: 'desc',
      },
    });

    // Format hasil agar cocok dengan frontend
    const formattedData = data.map((day) => ({
      id: day.id,
      day: formatIndonesianDate(day.day),
      amount: Number(day.amount).toLocaleString('id-ID'),
      transactions: day.transactions.map((t) => ({
        id: t.id,
        category: t.category,
        description: t.description,
        time: t.time,
        amount: Number(t.amount).toLocaleString('id-ID'),
      })),
    }));

    res.status(200).json({
      message: 'data berhasil di tampilkan',
      data: formattedData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'data gagal di tampilkan',
    });
  }
};

// 🔧 fungsi bantu format tanggal "2025-10-22" -> "Rabu, 22 Oktober 2025"
function formatIndonesianDate(dateString: string) {
  try {
    const date = new Date(dateString);
    const hari = date.toLocaleDateString('id-ID', { weekday: 'long' });
    const tanggal = date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    return `${hari}, ${tanggal}`;
  } catch {
    return dateString;
  }
}

const createTransaction = async (req: Request, res: Response) => {
  const newData = req.body;

  try {
    const date = new Date(newData.day);

    // Ambil transaksi pertama untuk tahu kategori (pemasukan/pengeluaran)
    const transaction = newData.transactions[0];
    const isIncome = transaction.category === 'pemasukan';

    // Cek apakah sudah ada transaksi di hari yang sama
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const existingDay = await prisma.transactionDay.findFirst({
      where: {
        day: {
          gte: startOfDay.toISOString(),
          lt: endOfDay.toISOString(),
        },
      },
      include: { transactions: true },
    });

    if (existingDay) {
      // 🧮 Hitung total baru tergantung jenis transaksi
      const updatedAmount = isIncome
        ? existingDay.amount + transaction.amount // pemasukan = tambah
        : existingDay.amount - transaction.amount; // pengeluaran = kurang

      const updated = await prisma.transactionDay.update({
        where: { id: existingDay.id },
        data: {
          amount: updatedAmount,
          transactions: {
            create: transaction,
          },
        },
        include: { transactions: true },
      });

      res.status(201).json({
        message: 'Transaksi berhasil ditambahkan ke hari yang sama',
        data: updated,
      });
    } else {
      // 🧮 Jika belum ada record hari ini, buat baru
      const initialAmount = isIncome ? transaction.amount : -transaction.amount;

      const created = await prisma.transactionDay.create({
        data: {
          day: newData.day,
          amount: initialAmount,
          transactions: {
            create: transaction,
          },
        },
        include: { transactions: true },
      });

      res.status(201).json({
        message: 'Transaksi baru berhasil dibuat',
        data: created,
      });
    }
  } catch (error) {
    console.error('Error saat menambahkan transaksi:', error);
    res.status(400).json({
      message: 'data gagal di tambahkan',
    });
  }
};

export default { getAllTransaction, createTransaction };
