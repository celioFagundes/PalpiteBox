import React from 'react';
import { IoLogoWhatsapp, IoLogoFacebook } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import Footer from '../Footer';

const tel ='999999999'
const Layout = ({ children }) => {
  return (
    <div className='flex flex-col justify-between items-center min-h-screen bg-primary	 text-white'>
      <div className =' py-7'>
        <img className='mx-auto' src='/logo_palpitebox.png' alt='logo' />
      </div>
      <div className='grid grid-rows-1 grid-cols-1 md:grid-cols-2  h-full container px-9 '>
        <div className='flex flex-col  justify-start items-center'>
          <div className='w-96'>
            <p className='font-semibold mb-2'>Sobre o estabelecimento:</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className='font-semibold my-2'>Contato:</p>
            <div className='grid grid-cols-1'>
              <div className='flex items-center'>
                <IoLogoWhatsapp color='#67C15E' size={22} />
                <a href={`https://api.whatsapp.com/send?phone=${tel}&text=Teste%20de%20Mensagem` }target='_blank' className='font-semibold my-2 ml-1'>
                  Whatsapp: (51) 9 9999-9999
                </a>
              </div>
              <div className='flex items-center'>
                <IoLogoFacebook className='inline' color='#1877F2' size={22} />
                <a
                  href='https://www.facebook.com/'
                  target='_blank'
                  className='font-semibold my-2 ml-1'
                >
                  Facebook: facebook.com/estabelecimento
                </a>
              </div>
              <div className='flex items-center'>
                <MdEmail className='inline' color='#fff' size={22} />
                <a href='' target='_blank' className='font-semibold my-2 ml-1'>
                  Email: estabelecimento@suporte.com
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col  justify-start items-center'>
          {children}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;
