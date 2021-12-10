import React, { useState } from 'react';
import PageTitle from '../components/PageTitle';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

const notas = [0, 1, 2, 3, 4, 5];
const schema = yup.object().shape({
  Nome: yup.string().required('O campo nome é obrigatório'),
  Email: yup
    .string()
    .required('O campo email é obrigatório')
    .email('Digite um email valido'),
  Whatsapp: yup.string().required('O campo Whatsapp é obrigatório'),
  Opiniao: yup.string().required('Escreva uma opinião'),
  Nota: yup.number().required('Escolha uma nota').nullable(true),
  Recomendaria: 
  yup.string('asdsa').required('Marque uma opção de recomendação').nullable(true),
});

const Pesquisa = () => {
  const [sucesso, setSucesso] = useState(false);
  const [response, setResponse] = useState({});
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  /*const [form, setForm] = useState({
    Nome: '',
    Email: '',
    Whatsapp: '',
    Opiniao:'',
    Nota: '',
    Recomendaria: '',
  });
  const handleChange = (evt) => {
    const value = evt.target.value;
    const key = evt.target.name;
    setForm((old) => ({
      ...old,
      [key]: value,
    }));
  };*/
  const onSubmit = async (values) => {
    console.log('xxx');
    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify(values),
      });
      const data = await response.json();
      setSucesso(true);
      setResponse(data);
    } catch (err) {
      console.log(err);
    }
  };
  const onError = (errors, e) => console.log(errors, e);
  return (
    <div className='pb-4'>
      <PageTitle title='Pesquisa' />
      {!sucesso && (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <h1 className='font-semibold'>Opiniões ou sugestões:</h1>
          <div className='flex flex-col lg:flex-row'>
            <div className='mr-4'>
              <label className='block font-semibold mb-1'>Nome:</label>
              <input
                className='bg-input rounded  px-4'
                type='text'
                name='Nome'
                {...register('Nome')}
              />
              {errors?.Nome && <p className='italic text-yellow-200 text-sm'>{errors.Nome.message}</p>}
            </div>
            <div className='mb-2'>
              <label className='block font-semibold mb-1'>Email:</label>
              <input
                className='bg-input rounded px-4'
                type='email'
                {...register('Email')}
                name='Email'
                placeholder='Ex : seuemail@gmail.com'
              />
               {errors?.Email && <p className='italic text-yellow-200 text-sm'>{errors.Email.message}</p>}
            </div>
          </div>

          <div className='mb-2'>
            <label className='block font-semibold mb-1'>Whatsapp:</label>
            <input
              className='bg-input rounded px-4'
              type='text'
              name='Whatsapp'
              {...register('Whatsapp')}
              placeholder='(51) 9 9999-9999'
            />
             {errors?.Whatsapp && <p className='italic text-yellow-200 text-sm'>{errors.Whatsapp.message}</p>}
          </div>
          <div className='mb-2'>
            <label className='block font-semibold mb-1'>
              Opinião ou sugestão:
            </label>
            <input
              className='bg-input rounded  px-4'
              type='text'
              name='Opiniao'
              {...register('Opiniao')}
            />
             {errors?.Opiniao && <p className='italic text-yellow-200 text-sm'>{errors.Opiniao.message}</p>}
          </div>
          <div className='mb-2'>
            <label className=' font-semibold'>
              Qual nota você daria para o estabelecimento?
            </label>
            <div className='flex flex-row mt-1'>
              {notas.map((nota) => (
                <div key={nota}>
          
                  <label className='font-semibold mb-1 '>
                    <input
                      className='mr-4 block'
                      type='radio'
                      name='Nota'
                      value={nota}
                      {...register('Nota')}
                    />

                    {nota}
                  </label>
                  
                </div>
              ))}
              
            </div>
            {errors?.Nota && <p className='italic text-yellow-200 text-sm'>{errors.Nota.message}</p>}
            <div>
              <label className=' font-semibold mb-1 '>
                Voce recomendaria para um amigo?
              </label>
              <div>
                <label>
                  <input
                    className=' mx-1'
                    type='radio'
                    name='Recomendaria'
                    value= 'Sim'
                    {...register('Recomendaria')}
                  />
                  Sim
                </label>
                <label>
                  <input
                    className=' mx-1'
                    type='radio'
                    name='Recomendaria'
                    value= 'Não'
                    {...register('Recomendaria')}
                  />
                  Nao
                </label>
                {errors?.Recomendaria && <p className='italic text-yellow-200 text-sm'>{errors.Recomendaria.message}</p>}
              </div>
            </div>
          </div>
          <button
            type='submit'
            className='bg-button text-black font-semibold rounded py-1 px-4 place-self-center'
          >
            Enviar
          </button>
        </form>
      )}
      {sucesso && (
        <div className='text-center'>
          <p className='font-semibold'>
            Obrigado por contribuir com sua opinião ou sugestão
          </p>
          {response.showCupom && (
            <div className='mt-3 grid justify-center'>
              <p className='font-semibold'>Seu Cupom é:</p>
              <p className='my-3 text-xl font-bold bg-input w-48 py-1 px-3 rounded'>
                {response.Cupom}
              </p>
            </div>
          )}
          {response.showCupom && (
            <div>
              <p className='font-semibold'>Promoção:</p>
              <p>{response.Promo}</p>
              <p className='mt-4'>
                Tire um print ou foto desta tela e mostre ao garçom
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Pesquisa;
