import Link from 'next/link';

export default function Avatar() {
  return (
    <>
      <Link href='/'>
        <a className='inline-flex items-end mr-2'>
          {/* TODO: modify code to get avatar from database */}
          <span className='material-icons'>account_circle</span>
        </a>
      </Link>
    </>
  )
}