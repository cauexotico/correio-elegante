import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const twillio = require('twilio');
const authToken = process.env.TWILIO_AUTH_TOKEN;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const myNumber = process.env.TWILIO_SENDER_NUMBER;

const prisma = new PrismaClient();

async function sendMessage(message: any, res: NextApiResponse<Object>) {
    const client = twillio(accountSid, authToken);

    await client.messages
        .create({
            from: `whatsapp:${myNumber}`,
            body: `${message.message}`,
            to: `whatsapp:+${message?.to}`
        })
        .then();

    return
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Object>) {
    if (req.method !== 'POST') {
        return res.status(400).json({ error: 'only accepts POST method' })
    }

    if (!req.body.Body.toUpperCase().includes('SIM')) {
        return res.status(400).json('invalid command');
    }
    
    const messages = await prisma.message.findMany({
        where: { 
            to: req.body.WaId as string,
            status: 'initiated',
            payment_status: 'approved'
        },
    });

    messages.forEach(async (message) => {
        await sendMessage(message, res);

        let updateMessage = await prisma.message.updateMany({
            where: {
                id: message.id,
            },
            data: {
                status: 'finalized',
            },
        })
    })

    return res.status(200).json({
        error: false,
        message: 'Message sent successfully',
    })
}