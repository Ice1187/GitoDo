import Link from 'next/link';
import Avatar from './NavBarComponent/avatar';
import NavAdd from './NavBarComponent/navAdd';
import Search from './NavBarComponent/search';

export default function Header() {
  return (
    <>
      <nav className='backdrop-filter backdrop-blur-md bg-opacity-70 fixed flex mx-auto items-center flex-wrap bg-white px-3 py-1 shadow-lg sm:mb-5 inset-x-0 top-0 z-10'>
        <Link href='/main'>
          <a className='inline-flex items-center p-2 mr-4 '>
            <svg
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
              className='fill-current text-green-500 h-8 w-8 mr-2'
            >
              <path d='M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z' />
            </svg>
            <span className='text-xl text-black font-bold tracking-wide'>
              GitoDo
            </span>
          </a>
        </Link>
        <Link href='/main'>
          <a className='inline-flex items-center p-0.5 pt-1 mr-3 border-b-2 border-transparent hover:border-black transition-all'>
            <span className='text-l text-black font-semibold tracking-wide'>
              Task
            </span>
          </a>
        </Link>
        <Link href='/main/branch'>
          <a className='inline-flex items-center p-0.5 pt-1 mr-3 border-b-2 border-transparent hover:border-black transition-all'>
            <span className='text-l text-black font-semibold tracking-wide'>
              Branch
            </span>
          </a>
        </Link>
        <div className="flex-grow lg:flex-shrink" />
        <Search></Search>
        <NavAdd></NavAdd>
        <Avatar></Avatar>
      </nav>
    </>
  )
}