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
          <button className={'p-1 pt-2 text-gray-500 hover:text-black focus:outline-none outline-none hover:rotate-45 transform delay-70 transition-all origin-center'+ (this.state.dropdown ? ' rotate-45' : ' rotate-0')} onClick={this.openMenu}>
            <span className='material-icons'>add</span>
          </button>

          {this.state.dropdown ? (
            <div className='fixed top-13 right-5 bg-white shadow-lg py-2 my-6 mx-4 rounded-lg text-black ring-2 ring-red-500'>
              <a href='/newbranch'><button className='block'><div className='px-3 py-1 hover:bg-red-500 hover:text-white w-36 text-left text-sm'>New Branch</div></button></a>
              <a href='/importbranch'><button className='block'><div className='px-3 py-1 hover:bg-red-500 hover:text-white w-36 text-left text-sm'>Import Branch</div></button></a>
              <a href='/'><button className='block'><div className='px-3 py-1 hover:bg-red-500 hover:text-white w-36 text-left text-sm'>New Task</div></button></a>
            </div>
          ) : (null)}
        </div>
      </>
    );
  }
  
}