import type { NextPage } from 'next'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react'
import InputMask from 'react-input-mask';

const Home: NextPage = () => {
  const charsLimit = 256;
  const [to, setTo] = useState('');
  const [message, setMessage] = useState('');

  function submitToggles(stage: String = 'final') {
    if (stage == 'inicio') {
      document.getElementById("submit")!.innerHTML = 'Carregando...';
      document.getElementById("submit")!.setAttribute('disabled', 'disabled');
    } else {
      document.getElementById("submit")!.innerHTML = 'Faça o pagamento e envie sua mensagem';
      document.getElementById("submit")!.removeAttribute('disabled');
    }
  }

  return (
    <div className='max-w-screen-xl px-4 m-auto'>
      <header className='flex py-4 mb-4 md:py-11 md:mb-8'>
        <svg xmlns="http://www.w3.org/2000/svg" width="210.2" height="47.458" viewBox="0 0 210.2 47.458">
          <g id="Lovebox" transform="translate(-4404.53 -460.667)">
            <path id="Caminho_1" data-name="Caminho 1" d="M4838.409,426.215V416.49l-15.061-8.772v9.725Zm3.347-9.725v9.725l15.06-8.772v-9.725Zm-8.325-29.551a4.786,4.786,0,0,0-3.262,1.24c-2.308,2.142-.67,5.084,1.941,7.894a66.134,66.134,0,0,0,6.184,5.574c.636.526,1.238,1.024,1.79,1.5.551-.472,1.153-.969,1.79-1.5a66.191,66.191,0,0,0,6.183-5.574c2.611-2.81,4.25-5.752,1.94-7.894a4.909,4.909,0,0,0-6.523,0l-3.39,3.144-3.39-3.144A4.783,4.783,0,0,0,4833.431,386.938Zm-1.379,13.76-7.062,4.113,15.092,8.791,15.091-8.791-4.794-2.793c.674-.635,1.33-1.289,1.96-1.966q.224-.242.448-.493l7.375,4.3v15.5l-20.081,11.7L4820,419.355v-15.5l9.591-5.587c-3.794-4.111-5.93-8.609-1.7-12.534a8.23,8.23,0,0,1,11.074,0l1.115,1.034,1.115-1.034a8.228,8.228,0,0,1,11.073,0c4.258,3.949,2.068,8.479-1.771,12.611a68.44,68.44,0,0,1-6.5,5.875c-1.092.9-2.081,1.721-2.784,2.373l-1.137,1.056-1.138-1.056c-.7-.652-1.691-1.47-2.783-2.373C4834.87,403.152,4833.436,401.965,4832.052,400.7Z" transform="translate(-415.472 77.073)" fill="#fff" />
            <path id="Caminho_11" data-name="Caminho 11" d="M6.944-4.736h8.7a3.641,3.641,0,0,1,1.536.24,1.213,1.213,0,0,1,.64.752,4.694,4.694,0,0,1,.16,1.36,4.694,4.694,0,0,1-.16,1.36,1.1,1.1,0,0,1-.544.7A3.605,3.605,0,0,1,15.616,0H4.1Q1.856,0,1.472-1.216A5.032,5.032,0,0,1,1.28-2.848V-20.64a9.3,9.3,0,0,1,.048-1.1,2.564,2.564,0,0,1,.3-.848q.448-.864,2.5-.864,2.24,0,2.656,1.184a6.364,6.364,0,0,1,.16,1.664ZM31.072-23.744A11.353,11.353,0,0,1,39.3-20.32a11.427,11.427,0,0,1,3.488,8.5,12.21,12.21,0,0,1-3.328,8.64A10.762,10.762,0,0,1,31.264.384a11.085,11.085,0,0,1-8.272-3.52,11.637,11.637,0,0,1-3.408-8.384,12.884,12.884,0,0,1,.96-4.976,11.537,11.537,0,0,1,2.56-3.888,11.984,11.984,0,0,1,3.68-2.464A10.735,10.735,0,0,1,31.072-23.744ZM25.248-11.68a6.138,6.138,0,0,0,1.84,4.624A5.787,5.787,0,0,0,31.2-5.28a5.811,5.811,0,0,0,4.1-1.728,6.089,6.089,0,0,0,1.824-4.64,6.165,6.165,0,0,0-1.84-4.672,5.812,5.812,0,0,0-4.112-1.76,5.733,5.733,0,0,0-4.1,1.776A6.166,6.166,0,0,0,25.248-11.68ZM64.992-23.1q1.888.928,1.888,2.048a4.117,4.117,0,0,1-.48,1.536L57.568-1.6A2.741,2.741,0,0,1,56.5-.464a2.855,2.855,0,0,1-1.488.432h-.32a2.909,2.909,0,0,1-1.52-.432A2.741,2.741,0,0,1,52.1-1.6L43.264-19.52a4.117,4.117,0,0,1-.48-1.536q0-1.12,1.888-2.048a3.971,3.971,0,0,1,1.616-.544,2.175,2.175,0,0,1,.848.128,1.488,1.488,0,0,1,.544.448,6.016,6.016,0,0,1,.528.848q.24.464,1.232,2.656t2.128,4.656q1.136,2.464,2.144,4.656t1.136,2.448l6.4-14.016q.256-.608.448-.96a1.67,1.67,0,0,1,1.408-.864A4.212,4.212,0,0,1,64.992-23.1ZM74.3-5.664H84.16a9.3,9.3,0,0,1,1.1.048,2.564,2.564,0,0,1,.848.3q.864.448.864,2.5,0,2.24-1.184,2.624A5.35,5.35,0,0,1,84.128,0H71.456q-2.24,0-2.624-1.216a5.032,5.032,0,0,1-.192-1.632V-20.64a3.1,3.1,0,0,1,.608-2.224,3.343,3.343,0,0,1,2.3-.592H84.16a9.3,9.3,0,0,1,1.1.048,2.564,2.564,0,0,1,.848.3q.864.448.864,2.5,0,2.24-1.184,2.624a5.35,5.35,0,0,1-1.664.192H74.3v3.232H80.64a9.3,9.3,0,0,1,1.1.048,2.564,2.564,0,0,1,.848.3q.864.448.864,2.5,0,2.24-1.216,2.624a5.35,5.35,0,0,1-1.664.192H74.3Zm31.456-6.912a7.6,7.6,0,0,1,1.888,5.024,7.564,7.564,0,0,1-2.192,5.36,6.984,6.984,0,0,1-5.168,2.16H91.872q-2.24,0-2.624-1.216a5.35,5.35,0,0,1-.192-1.664v-17.76a9.236,9.236,0,0,1,.048-1.12,2.58,2.58,0,0,1,.3-.832q.448-.864,2.5-.864h8.064A6.584,6.584,0,0,1,104.9-21.44a6.808,6.808,0,0,1,2.08,4.992A6.665,6.665,0,0,1,105.76-12.576Zm-3.776,4.7a3.411,3.411,0,0,0-.176-1.216,1.129,1.129,0,0,0-.592-.64,4.986,4.986,0,0,0-1.792-.256,2.787,2.787,0,0,1-1.728-.448,2.266,2.266,0,0,1-.576-1.84,2.229,2.229,0,0,1,.592-1.84,3.325,3.325,0,0,1,1.968-.448q1.28,0,1.536-.672a4.866,4.866,0,0,0,.1-1.152,1.2,1.2,0,0,0-.528-1.12,3.115,3.115,0,0,0-1.584-.32H94.72V-5.7h5.248Q101.984-5.7,101.984-7.872Zm18.752-15.872a11.353,11.353,0,0,1,8.224,3.424,11.427,11.427,0,0,1,3.488,8.5,12.21,12.21,0,0,1-3.328,8.64A10.762,10.762,0,0,1,120.928.384a11.085,11.085,0,0,1-8.272-3.52,11.637,11.637,0,0,1-3.408-8.384,12.884,12.884,0,0,1,.96-4.976,11.537,11.537,0,0,1,2.56-3.888,11.984,11.984,0,0,1,3.68-2.464A10.735,10.735,0,0,1,120.736-23.744ZM114.912-11.68a6.138,6.138,0,0,0,1.84,4.624,5.787,5.787,0,0,0,4.112,1.776,5.811,5.811,0,0,0,4.1-1.728,6.089,6.089,0,0,0,1.824-4.64,6.165,6.165,0,0,0-1.84-4.672,5.812,5.812,0,0,0-4.112-1.76,5.733,5.733,0,0,0-4.1,1.776A6.166,6.166,0,0,0,114.912-11.68Zm32.768-.192L154.112-4.8A3.433,3.433,0,0,1,155.2-2.752,3,3,0,0,1,153.968-.8a3.46,3.46,0,0,1-2.08,1.12A2.989,2.989,0,0,1,149.92-.96l-6.08-6.976L137.76-.96Q136.608.32,135.792.32a3.555,3.555,0,0,1-2.08-1.136q-1.264-1.136-1.264-1.936a3.511,3.511,0,0,1,1.12-2.048L140-11.872l-6.432-7.072a3.287,3.287,0,0,1-1.12-2.016,3.047,3.047,0,0,1,1.248-1.968,3.5,3.5,0,0,1,2.1-1.136,2.989,2.989,0,0,1,1.968,1.28l6.08,6.976,6.08-6.976q1.152-1.28,1.968-1.28a3.513,3.513,0,0,1,2.064,1.12A3,3,0,0,1,155.2-20.96a3.215,3.215,0,0,1-1.088,2.016Z" transform="translate(4459.53 495.667)" fill="#fff" />
          </g>
        </svg>
      </header>
      <main>
        <article className='grid grid-cols-1 gap-12 md:grid-cols-2'>
          <section className='flex flex-col gap-6'>
            <h2 className='text-2xl text-white md:text-4xl font-big'>Por apenas R$2,49 envie uma mensagem anonimamente para o seu amor!</h2>
            <h3 className='mb-6 text-sm text-white md:text-base'>Basta inserir o número do whatsapp dele(a) e escrever a sua própria mensagem.</h3>

            <form className='flex flex-col gap-6' onSubmit={(e) => {
              e.preventDefault();
              submitToggles('inicio');

              var mpTab = window.open('', '_blank');
              mpTab?.document.write('Carregando pagamento...');

              fetch('/api/message', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ to, message })
              }).then(response => response.json())
                .then(json => {
                  if (json.error == false) {
                    submitToggles();
                    document.getElementById("mp-link")!.setAttribute('href', json.data.payment_url);
                    document.getElementById("mp-link")!.classList.remove('hidden');

                    if (mpTab) {
                      mpTab.location.href = json.data.payment_url;
                      mpTab.focus();
                    }
                  } else {
                    submitToggles();
                    alert(json.message)
                  }
                })
                .catch(err => {
                  alert('Erro, tente novamente mais tarde.');
                  console.log(err);
                })
            }}>
              <InputMask mask="(99) \9 9999-9999" onChange={(e) => setTo(e.target.value)} type="tel" name="to" placeholder='Whatsapp do seu (ou da sua) amado(a) <3' autoComplete="off" />
              <div className='form-group'>
                <textarea rows={5} maxLength={charsLimit} onChange={(e) => setMessage(e.target.value)} name="message" placeholder='Escreva aqui sua declaração...'></textarea>
                <small>Tá ligado que essa mensagem é anônima, né!?</small>
                <small className='text-right'>{message.length}/{charsLimit}</small>
              </div>
              <a id="mp-link" target={'_blank'} className='hidden text-center bg-white border-4 border-red-500 rounded-md' href="#">clique aqui caso o pagamento não abrir automaticamente</a>
              <button className='button' id="submit">Faça o pagamento e envie sua mensagem</button>
            </form>
          </section>
          <section className='flex flex-col gap-4'>
            <p className='text-3xl text-white font-big'>Como funciona?</p>
            <div className='p-4 bg-white rounded-2xl'>
              <ol className='flex flex-col gap-4'>
                <li>1. Preencha o número do destinatário</li>
                <li>2. Escreva a sua mensagem e realize o pagamento.</li>
                <li>3. Após a aprovação do pagamento, o seu amado irá receber uma mensagem no whatsapp contendo a sua mensagem de amor.</li>
              </ol>
            </div>
            <div className='text-center'>
              <Image src='/lovebox-envelope.png' alt='Lovebox' width={282} height={304} />
            </div>
          </section>
        </article>
      </main>
      <footer className='flex flex-col w-full gap-2 p-4 text-center'>
        <Link href={'/termos'}>
          <a className='text-white underline bold'>termos de uso</a>
        </Link>
        <span className='text-white bold'>Copyright © LoveBox 2023.</span>
      </footer>
    </div>
  )
}

export default Home
