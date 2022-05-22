import type { NextPage } from 'next'
import { useState } from 'react'

const Home: NextPage = () => {
  const charsLimit = 256;
  const [to, setTo] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className='flex justify-center h-full'>
      <div className='w-full grid grid-cols-12'>
        <div className='col-span-12 md:col-span-5 bg-rose-600 text-rose-100 text-center p-4'>
          <h1 className='text-4xl font-bold'>Correio Elegante</h1>
          <p className='font-xl mt-8 w-8/12 m-auto'>Por apenas <strong>R$4,99</strong> envie uma mensagem anônimamente para o seu amor!</p>
          <p className='font-xl mt-4 w-8/12 m-auto'>Basta inserir o número do whatsapp dele(a) e escrever a sua própria mensagem.</p>
        </div>
        <div className='col-span-12 md:col-span-5 p-4'>
          <form onSubmit={(e) => {
            e.preventDefault();

            fetch('/api/message', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ to, message })
            }).then(response => response.json())
              .then(json => window.open(json.payment_url, '_blank')?.focus())
              .catch(err => console.log(err))
          }}>
            <label className="form-group">
              <span>Whatsapp destinatário</span>
              <input onChange={(e) => setTo(e.target.value)} type="text" name="to" placeholder='+554291336623' />
            </label>
            <label className="form-group">
              <span>Mensagem</span>
              <textarea rows={3} maxLength={charsLimit} onChange={(e) => setMessage(e.target.value)} name="message"></textarea>
              <div className='flex justify-between'>
                <small className='text-slate-600'>Essa é uma mensagem anônima!</small>
                <small className='text-slate-600 font-bold'>{message.length}/{charsLimit}</small>
              </div>
            </label>
            <button className='button'>Fazer pagamento e enviar</button>
          </form>

          <div className='mt-4'>
            <p className='text-xl font-bold'>Pré visualização da mensagem</p>
            <p className='bg-white w-full md:w-10/12 p-4 rounded border border-slate-300 shadow-sm mt-4'>
              Você é uma pessoa muito especial! 💕💕 <br />
              Alguém enviou um <span className='font-bold'>correio elegante</span> 😍😍 para você com a seguinte mensagem:<br />
              <br />
              <span className='italic'>{message ? message : 'escreva sua mensagem'}</span><br />
              <br />
              Acesse https://correio.khaue.com.br e envie também para alguém que você goste!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
