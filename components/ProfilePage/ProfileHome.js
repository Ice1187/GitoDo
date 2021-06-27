import React from 'react';
import Link from 'next/link';

export default class Profile extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    
    return(
      <>
        <div className="pt-36 ml-5 w-44 w-auto mr-5 hidden sm:flex">
          <nav className='container flex-col flex bg-white shadow rounded-t-lg rounded-b-lg'>
            <Link href='/profile/account'>
              <a className="rounded-t-lg border-b-2 border-gray-100 bg-white font-semibold hover:bg-gray-200 hover:text-black p-3 text-left ">
                  Profile & Account
              </a>
            </Link>
            <Link href='/profile/theme'>
              <a className="border-b-2 border-gray-100 bg-white font-semibold hover:bg-gray-200 hover:text-black p-3 text-left">
                    Theme
              </a>
            </Link>
            <Link href='/profile/notification'>
              <a className="border-b-2 border-gray-100 bg-white font-semibold hover:bg-gray-200 hover:text-black p-3 text-left">
                  Notification
              </a>
            </Link>
            <Link href='/'>
              <a className="rounded-t-lg border-b-2 border-gray-100 bg-white font-semibold hover:bg-gray-200 hover:text-black p-3 text-left">
                  Log Out
              </a>
            </Link>
          </nav>
        </div>
          
        <div>
      `</div>
      </>
    );
  }
}