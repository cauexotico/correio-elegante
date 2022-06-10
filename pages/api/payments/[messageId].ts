import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const twillio = require('twilio');
const authToken = process.env.TWILIO_AUTH_TOKEN;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const myNumber = process.env.TWILIO_SENDER_NUMBER;

const mercadopago = require('mercadopago');
const prisma = new PrismaClient();

mercadopago.configure({
    access_token: `${process.env.MERCADOPAGO_ACCESS_TOKEN}`
});

async function updatePaymentStatus(req: NextApiRequest, res: NextApiResponse<Object>) {
    const messageId = req.query.messageId as string | undefined;

    const payment = await getPayment(req.body.data.id);

    if (payment.status == 'approved') {
        const updateMessage = await prisma.message.update({
            where: {
                id: messageId,
            },
            data: {
                status: 'sent',
                payment_status: 'approved',
            },
        })

        return sendMessage(req, res);
    }

    return
}

async function getPayment(paymentId: string) {
    let payment = await mercadopago.payment.get(paymentId)

    return payment.response;
}

async function sendMessage(req: NextApiRequest, res: NextApiResponse<Object>) {
    const client = twillio(accountSid, authToken);
    const messageId = req.query.messageId as string | undefined;

    const message = await prisma.message.findUnique({
        where: { id: messageId },
    });

    await client.messages
        .create({
            from: `whatsapp:${myNumber}`,
            // body: `Você é uma pessoa muito especial! 💕💕 \nAlguém enviou um *correio elegante* para você 😍😍 com a seguinte mensagem:\n\n _${message?.message}_ \n\nAcesse https://lovebox.khaue.com.br e envie também para alguém que você goste!`,
            body: `Como é bom ser lembrado por alguém especial! 😍 \nVocê acabou de receber um Correio Elegante. 💘 \nConfira sua mensagem 👇 \n\n_${message?.message}_ \n\nAcesse https://lovebox.khaue.com.br e envie também para alguém que você goste!`,
            to: `whatsapp:+55${message?.to}`
        })
        .then((message: String) => res.json(message), (err: Error) => res.json(err));

    return
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Object>) {
    if (req.method !== 'POST') {
        return res.status(500).json({ error: 'only accepts POST method' })
    }

    if (!req.body.type || req.body.type !== 'payment' || req.query.messageId == undefined) {
        return res.status(500).json({ error: 'missing type, messageId or isnt payment' })
    }

    console.log(req.body);

    return updatePaymentStatus(req, res);
}