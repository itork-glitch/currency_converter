import Image from 'next/image';
import { Inter } from 'next/font/google';
import { Form } from '@/components';
import img from '@/public/currency.png';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className='w-full h-[100vh] flex justify-center'>
      <section className='w-[75%]'>
        <div className='p-10 flex justify-center items-center'>
          <Image src={img} alt='Logo' width={128} height={128} />
          <h1 className='font-semibold text-4xl pl-5'>Currency Converter</h1>
        </div>
        <Form />
      </section>
    </main>
  );
}
