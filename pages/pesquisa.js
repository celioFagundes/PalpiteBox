import React, { useState } from 'react';
import PageTitle from '../components/PageTitle';
const notas = [0, 1, 2, 3, 4, 5];
const pesquisa = () => {
  const [sucesso, setSucesso] = useState(false);
  const [response, setResponse] = useState({});
  const [form, setForm] = useState({
    Nome: '',
    Email: '',
    Whatsapp: '',
    Nota:'',
  });
  const handleChange = (evt) => {
    const value = evt.target.value;
    const key = evt.target.name;
    setForm((old) => ({
      ...old,
      [key]: value,
    }));
  };
  const save = async () => {
    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      const data = await response.json();
      setSucesso(true);
      setResponse(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='flex flex-col items-center py-6'>
      <PageTitle title = 'Pesquisa'/>
      <h1 className='font-semibold mb-5'>Opiniões ou sugestões</h1>
      <p className='font-semibold mb-5'>
        O restaurante x sempre busca por atender melhor seus clientes. Por isso,
        estamos sempre abertos a ouvir sua opinião
      </p>
      {!sucesso && (
        <div>
          <div className='mb-2'>
            <label className='block font-semibold mb-1'>Nome:</label>
            <input
              className='bg-blue-200 rounded py-2 px-4'
              type='text'
              value={form.Nome}
              name='Nome'
              onChange={handleChange}
            />
          </div>
          <div className='mb-2'>
            <label className='block font-semibold mb-1'>Email:</label>
            <input
              className='bg-blue-200 rounded py-2 px-4'
              type='text'
              value={form.Email}
              name='Email'
              onChange={handleChange}
            />
          </div>
          <div className='mb-2'>
            <label className='block font-semibold mb-1'>Whatsapp:</label>
            <input
              className='bg-blue-200 rounded py-2 px-4'
              type='text'
              value={form.Whatsapp}
              name='Whatsapp'
              onChange={handleChange}
            />
          </div>
          <div className='mb-2'>
            <label className='block font-semibold mb-1'>
              Opinião ou sugestão:
            </label>
            <input className='bg-blue-200 rounded py-2 px-4' type='text' />
          </div>
          <div className='mb-2'>
            <label className=' font-semibold mb-1 '>
              Qual nota você daria para o estabelecimento?
            </label>
            <div className='flex flex-row'>
              {notas.map((nota) => (
                <div>
                   <label className='font-semibold mb-1 ' >
                  <input
                    className='mx-1'
                    type='radio'
                    name='Nota'
                    value={nota}
                    onChange={handleChange}
                  />
                 
                    {nota}
                  </label>
                </div>
              ))}
            </div>
            <div>
              <label className=' font-semibold mb-1 '>
                Voce recomendaria para um amigo?
              </label>
              <div className='flex justify-center items-center'>
                <input className=' mx-1' type='radio' id='radio' />
                <label className='block font-semibold mb-1' htmlFor='radio-sim'>
                  Sim
                </label>
                <input className=' mx-1' type='radio' id='radio' />
                <label className='block font-semibold mb-1' htmlFor='radio-nao'>
                  Não
                </label>
              </div>
            </div>
          </div>
          <button onClick={save} className='bg-blue-200 rounded py-2 px-4'>
            Enviar
          </button>
        </div>
      )}
      {sucesso && (
        <div>
          <p>Obrigado por contribuir com sua opinião ou sugestão</p>
          {response.showCupom && <div>{response.Cupom}</div>}
          {response.showCupom && (
            <div>
              <p>{response.Promo}</p>
              Tire um print ou foto desta tela e mostre ao garçom
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default pesquisa;
