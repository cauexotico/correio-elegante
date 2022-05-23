import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const mercadopago = require('mercadopago');
const prisma = new PrismaClient();

mercadopago.configure({
    access_token: `${process.env.MERCADOPAGO_ACCESS_TOKEN}`
});

async function createMessage(req: NextApiRequest, res: NextApiResponse<Object>) {
    const message = await prisma.message.create({
        data: {
            to: req.body.to,
            message: req.body.message
        }
    });

    if (!message.id) {
        return res.status(500).json({ error: 'something gone wrong while saving in database' })
    }

    const payment_url = await createPreference(message.id);

    return res.status(200).json({
        error: false,
        data: {
            message,
            payment_url: payment_url
        }
    })
};

async function createPreference(idMessage: String) {
    let data;

    let preference = {
        items: [{
            title: 'Correio Elegante Online',
            description: 'Um agrado para o seu amor',
            quantity: 1,
            unit_price: 4.99,
            currency_id: 'BRL',
        }],
        payment_methods: {
            excluded_payment_types: [
                { id: 'debit_card' },
                // {id:'credit_card'},
                { id: 'ticket' },
            ],
        },
        external_reference: idMessage,
        // auto_return: 'approved',
        // back_urls: {
        //     success: '',
        // }
        notification_url: `https://${process.env.APP_URL}/api/payments/${idMessage}`,
        statement_descriptor: 'CORREIOELEGANTE'
    };

    await mercadopago.preferences.create(preference)
        .then(function (response: any) {
            console.log(response.body.id);
            console.log(response.body.init_point);
            data = response.body.init_point;
        }).catch(function (error: any) {
            data = error;
        });

    return data;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Object>) {
    if (req.method !== 'POST') {
        return res.status(500).json({ error: 'only accepts POST method' })
    }
    
    if (!req.body.to || !req.body.message) {
        return res.status(500).json({ error: 'validation error' })
    }

    if (req.body.to.lenght != 12) {
        return res.status(500).json({
            error: true,
            field: 'to',
            message: 'Formato incorreto'
        })
    }

    if (req.body.message.lenght > 256) {
        return res.status(500).json({
            error: true,
            field: 'message',
            message: 'Limite de caracteres excedido'
        })
    }

    return createMessage(req, res);
}