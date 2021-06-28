import Link from 'next/link';
import React from 'react';
import Avatar from './NavBarComponent/avatar';
import NavAdd from './NavBarComponent/navAdd';
import Search from './NavBarComponent/search';
import styles from '../styles/Home.module.css';

export default class Header extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      dropdown_ava: false,
      dropdown_add: false,
    };
    
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  render() {
    const glass = {
      'backdropFilter': 'blur(8px)',
    }
    return (
      <div>
        <nav className={styles.header + ' fixed flex mx-auto items-center flex-wrap bg-white px-3 py-1 shadow-lg sm:mb-5 inset-x-0 top-0 z-50'} style={glass}>
          <Link href='/main'>
            <a className='inline-flex items-center p-2 mr-4 '>
              <img src='/logo.jpeg' width='100' height='40'></img>
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
          <NavAdd onOpen={this.openMenu} dropdown={this.state.dropdown_add}></NavAdd>
          <Avatar onOpen={this.openMenu} dropdown={this.state.dropdown_ava}></Avatar>
        </nav>
      </div>
    )
  }

  openMenu(syntheticEvent, str){
    syntheticEvent.stopPropagation()
    if(str == 'avatar') {
      this.setState({dropdown_ava: !this.state.dropdown_ava, dropdown_add: false}, () => {
        if(this.state.dropdown_ava) {
          window.addEventListener('click', this.closeMenu)
        } else {
          window.removeEventListener('click', this.closeMenu)
        }
      });
    } else {
      this.setState({dropdown_add: !this.state.dropdown_add, dropdown_ava: false}, () => {
        if(this.state.dropdown_add) {
          window.addEventListener('click', this.closeMenu)
        }  else {
          window.removeEventListener('click', this.closeMenu)
        }
      });
    }
  }

  closeMenu() {
    this.setState({dropdown_ava: false, dropdown_add: false}, () => {
      window.removeEventListener('click', this.closeMenu)
    });
  }
}