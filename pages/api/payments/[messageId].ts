import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const mercadopago = require('mercadopago');
const prisma = new PrismaClient();

mercadopago.configure({
    access_token: `${process.env.MERCADOPAGO_ACCESS_TOKEN}`
});

async function updatePaymentStatus(req: NextApiRequest, res: NextApiResponse<Object>) {
    const messageId = req.query.messageId as string | undefined;

    const payment = await getPayment(req.body.data.id);

    if (payment.status == 'approved') {
        const message = await prisma.message.findUnique({
            where: { id: messageId },
        });

        if (message?.status == 'draft') {
            const updatePayment = await prisma.message.update({
                where: {
                    id: messageId,
                },
                data: {
                    payment_status: 'approved',
                },
            })
        }
    }

    return true
}

async function getPayment(paymentId: string) {
    let payment = await mercadopago.payment.get(paymentId)

    return payment.response;
}


export default async function handler(req: NextApiRequest, res: NextApiResponse<Object>) {
    if (req.method !== 'POST') {
        return res.status(500).json({ error: 'only accepts POST method' })
    }

    if (!req.body.type || req.body.type !== 'payment' || req.query.messageId == undefined) {
        return res.status(400).json({ error: 'missing type, messageId or isnt payment' })
    }

    console.log(req.body);

    await updatePaymentStatus(req, res);

    return res.status(200).json({
        error: false,
        message: 'success'
    })
}