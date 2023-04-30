'use client';

import React, { useState } from 'react';
import axios from 'axios';

interface data {
  from: string;
  to: string;
  constTo: string;
  amount: string;
  res: number;
  error: string;
}

const Form = () => {
  const [data, setData] = useState<data>({
    from: '',
    to: '',
    constTo: '',
    amount: '',
    res: 0,
    error: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setData((prevData) => ({ ...prevData, res: 0 }));
    const amount = Number(data.amount);
    if (amount <= 0) {
      setData((prevData) => ({
        ...prevData,
        error: 'Ammount must be a positive number',
      }));
      return null;
    }
    const options = {
      method: 'GET',
      url: 'https://currency-converter18.p.rapidapi.com/api/v1/convert',
      params: {
        from: data.from,
        to: data.to,
        amount: amount,
      },
      headers: {
        'content-type': 'application/octet-stream',
        'X-RapidAPI-Key': '3e00c8e183msh896120189311965p154abfjsn83cbcd3789d8',
        'X-RapidAPI-Host': 'currency-converter18.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      const result = await response.data?.result?.convertedAmount;
      const converted = result.toFixed(2);
      setData((prevData) => ({ ...prevData, res: converted }));
      setData((prevData) => ({ ...prevData, constTo: data.to }));
    } catch (err) {
      setData((prevData) => ({
        ...prevData,
        error: 'Please enter a valid currency',
      }));
    }
  };

  const handleChangeFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setData((prevData) => ({ ...prevData, from: value }));
  };

  const handleChangeTo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setData((prevData) => ({ ...prevData, to: value }));
  };

  const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setData((prevData) => ({ ...prevData, amount: value }));
  };

  return (
    <div className=''>
      <div className='flex justify-center'>
        <form
          onSubmit={handleSubmit}
          className='flex justify-center flex-col items-center md:flex-row w-[80%]'
        >
          <input
            type='text'
            placeholder='From: USD'
            className='w-[100%] md:w-[20%] my-2 md:my-5 md:mr-7 py-1 px-1 rounded-md text-black focus:border-0 focus:ring focus:ring-blue-300 outline-none border border-slate-400'
            onChange={handleChangeFrom}
            value={data.from.toUpperCase()}
            required
          />
          <input
            type='text'
            placeholder='To: EUR'
            className='w-[100%] md:w-[20%] my-2 md:my-5 md:mr-7 py-1 px-1 rounded-md text-black focus:border-0 focus:ring focus:ring-blue-300 outline-none border border-slate-400'
            onChange={handleChangeTo}
            value={data.to.toUpperCase()}
            required
          />
          <input
            type='number'
            placeholder='Amount: 20'
            className='w-[100%] md:w-[20%] my-2 md:my-5 md:mr-7 py-1 px-1 rounded-md text-black focus:border-0 focus:ring focus:ring-blue-300 outline-none border border-slate-400'
            onChange={handleChangeAmount}
            value={data.amount}
            required
          />
          <button
            type='submit'
            className='py-2  bg-indigo-500 text-white rounded-lg w-full md:w-[10%] hover:bg-indigo-700 transition-colors'
          >
            Check
          </button>
        </form>
      </div>
      <div className='flex justify-center pt-8 font-normal flex-wrap'>
        <div className='flex flex-col items-center'>
          <span className='text-2xl'>
            {data.res == 0
              ? data.error
              : data.amount +
                ' ' +
                data.from.toUpperCase() +
                ' in ' +
                data.to.toUpperCase() +
                ` is:`}
          </span>
          <span className='font-black text-[60px] md:text-[90px] gradient'>
            {data.res !== 0 ? (
              data.res + ' ' + data.constTo.toUpperCase()
            ) : (
              <></>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Form;
