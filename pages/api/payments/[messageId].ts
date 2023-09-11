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

            if (await sendMessage(req, res)) {
                const updateMessage = await prisma.message.update({
                    where: {
                        id: messageId,
                    },
                    data: {
                        status: 'sent',
                    },
                })
            }
        }
    }

    return true
}

async function getPayment(paymentId: string) {
    let payment = await mercadopago.payment.get(paymentId)

    return payment.response;
}

async function sendMessage(req: NextApiRequest, res: NextApiResponse<Object>) {
    const messageId = req.query.messageId as string | undefined;

    const message = await prisma.message.findUnique({
        where: { id: messageId },
    });

    let response;

    await fetch(`${process.env.WPPCONNECT_URL}/send-message`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.WPPCONNECT_TOKEN}`
        },
        body: JSON.stringify({
            'phone': message?.to,
            'message': `Como é bom ser lembrado por alguém especial! 😍 \nVocê acabou de receber um Correio Elegante. 💘 \nConfira sua mensagem 👇 \n\n_${message?.message}_ \n\nAcesse https://lovebox.khaue.com.br e envie também para alguém que você goste!`
        })
    }).then(response => response.json())
        .then(json => {
            response = json.status == 'success'
        })

    // body: `Você é uma pessoa muito especial! 💕💕 \nAlguém enviou um *correio elegante* para você 😍😍 com a seguinte mensagem:\n\n _${message?.message}_ \n\nAcesse https://lovebox.khaue.com.br e envie também para alguém que você goste!`,
    // body: `Como é bom ser lembrado por alguém especial! 😍 \nVocê acabou de receber um Correio Elegante. 💘 \nConfira sua mensagem 👇 \n\n_${message?.message}_ \n\nAcesse https://lovebox.khaue.com.br e envie também para alguém que você goste!`,
    // body: `Como é bom ser lembrado por alguém especial! 😍 \nVocê acabou de receber um Correio Elegante. 💘 \n Para conferir a mensagem recebida envie SIM 👇 \n\nAcesse https://lovebox.khaue.com.br e envie também para alguém que você goste!`,

    return response;
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