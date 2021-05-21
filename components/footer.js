import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <hr className='mx-10'></hr>
      <div className='container flex-row flex items-center bg-gray-100 px-10 pb-10 pt-5 mb-0 justify-start'>
        <div className='ml-5 text-sm'><h1>© 2021 GitoDo</h1></div>
        <div className='ml-5 text-sm text-blue-600 hover:underline'><Link href='/'>GitoDo</Link></div>
        <div className='ml-5 text-sm text-blue-600 hover:underline'><Link href='/'>Contact us</Link></div>
        <div className='ml-5 text-sm text-blue-600 hover:underline'><Link href='/'>Tutorial</Link></div>
        <div className='ml-5 text-sm text-blue-600 hover:underline'><Link href='/'>About</Link></div>
      </div>
    </>
  )
}