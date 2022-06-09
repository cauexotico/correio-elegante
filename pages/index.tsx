import type { NextPage } from 'next'
import Image from 'next/image';
import { useState } from 'react'

const Home: NextPage = () => {
  const charsLimit = 256;
  const [to, setTo] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className='max-w-screen-xl px-4 m-auto'>
      <header className='py-8 flex'>
        <Image src='/lovebox.png' alt='Lovebox' width={211} height={48} />
      </header>
      <main>
        <article className='grid grid-cols-1 md:grid-cols-2 gap-12'>
          <section className='flex gap-6 flex-col'>
            <h2 className='text-2xl md:text-4xl text-white font-big'>Por apenas R$4,99 envie uma mensagem anonimamente para o seu amor!</h2>
            <h3 className='text-sm md:text-base text-white'>Basta inserir o número do whatsapp dele(a) e escrever a sua própria mensagem.</h3>

            <form className='flex gap-6 flex-col' onSubmit={(e) => {
              e.preventDefault();

              fetch('/api/message', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ to, message })
              }).then(response => response.json())
                .then(json => {
                  if (json.error == false) {
                    window.open(json.data.payment_url, '_blank')?.focus()
                  }
                })
                .catch(err => console.log(err))
            }}>
              <input maxLength={12} onChange={(e) => setTo(e.target.value)} type="text" name="to" placeholder='Whatsapp do seu (ou da sua) amado(a) <3' />
              <div className='form-group'>
                <textarea rows={5} maxLength={charsLimit} onChange={(e) => setMessage(e.target.value)} name="message" placeholder='Escreva aqui sua declaração...'></textarea>
                <small>Tá ligado que essa mensagem é anônima, né!?</small>
                <small className='text-right'>{message.length}/{charsLimit}</small>
              </div>
              <button className='button'>Faça o pagamento e envie sua mensagem</button>
            </form>
          </section>
          <section className='flex gap-4 flex-col'>
            <p className='text-3xl text-white font-big'>Veja como a mensagem ficou:</p>
            <div className='bg-white rounded-2xl p-4'>
              <p className='font-preview'>
                Como é bom ser lembrado por alguém especial! 😍 <br />
                Você acabou de receber um Correio Elegante. 💘 <br />
                Confira sua mensagem 👇 <br />
                <br />
                <span className='italic'>{message ? message : 'escreva sua mensagem'}</span><br />
                <br />
                Acesse https://lovebox.khaue.com.br e envie também para alguém que você goste!
              </p>
            </div>
            <div className='text-center'>
              <Image src='/lovebox-envelope.png' alt='Lovebox' width={282} height={304} />
            </div>
          </section>
        </article>
      </main>
      <footer className='w-full text-center p-4'>
        <span className='text-white bold'>Copyright © LoveBox 2022.</span>
      </footer>
    </div>
  )
}

export default Home
