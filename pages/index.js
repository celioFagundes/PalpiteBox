import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import PageTitle from '../components/PageTitle'

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const Index = () => {
  const { data, error } = useSWR('/api/get-promo', fetcher);
  return (
    <div className='flex flex-col justify-center py-8  items-center w-96 text-center'>
      <PageTitle title ='Home'/>
      <p className='font-semibold mb-5'>
        O restaurante x sempre busca por atender melhor seus clientes. Por isso,
        estamos sempre abertos a ouvir sua opinião
      </p>
      <div className='bg-button py-3 w-64 rounded-lg mb-5 font-semibold text-black text-center hover:shadow-lg'>
        <Link href='/pesquisa'>
          <a>Dar opnião ou sugestão</a>
        </Link>
      </div>
      {!data && <p>Carregando...</p>}

      {!error && data && data.showCoupon && (
        <p className='font-semibold'>
          {data.message}
        </p>
      )}
    </div>
  );
};

export default Index;
