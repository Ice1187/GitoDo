import React from 'react';

export default class NavAdd extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      dropdown: false
    };
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeMenu)
  }

  openMenu(syntheticEvent){
    syntheticEvent.stopPropagation()
    this.setState({dropdown: !this.state.dropdown}, () => {
      if(this.state.dropdown) {
        window.addEventListener('click', this.closeMenu)
      }
    });
  }

  closeMenu() {
    this.setState({dropdown: false}, () => {
      window.removeEventListener('click', this.closeMenu)
    });
  }

  

  render() {
    /* TODO: replace url and svg */
    return(
      <>
        <div className='mr-5'>
          <button className='p-1 border-b-2 border-transparent hover:border-red-500 transition-all focus:outline-none outline-none' onClick={this.openMenu}>Add</button>

          {this.state.dropdown ? (
            <ul className='fixed top-15 right-10 bg-white shadow-lg py-3 my-6 mx-4 rounded-xl text-black ring-2 ring-red-500'>
              <li className='px-4 py-2 hover:bg-red-500 hover:text-white'><a href='/'>New Branch</a></li>
              <li className='px-4 py-2 hover:bg-red-500 hover:text-white'><a href='/'>Import Branch</a></li>
              <li className='px-4 py-2 hover:bg-red-500 hover:text-white'><a href='/'>New Task</a></li>
            </ul>
          ) : (null)}
        </div>
      </>
    );
  }
  
}