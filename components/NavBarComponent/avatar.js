import React from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../api/user';

class Avatar extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      dropdown: false,
      name: '',
    };

    getUser(this.props.userId).then(userId => {
      this.setState({
        name: userId.name, 
    })
    }).catch(err => {
        console.error('Error while getUser', err);
    });

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
        <div>
        <button className='inline-flex items-end mr-2 text-gray-500 hover:text-black focus:outline-none outline-none'onClick={this.openMenu}>
          {/* TODO: modify code to get avatar from database */}
<span className='pt-0.5 material-icons'>{this.state.dropdown ? "person" : "account_circle"}</span>
        </button>

          {this.state.dropdown ? (
            <ul className='fixed top-15 right-0 bg-white shadow-lg py-3 my-6 mx-4 rounded-xl text-black ring-2 ring-red-500'>
              <li className='px-4 py-2 border-b-2 border-red-300'>Hello, {this.state.name}</li>
              <li className='px-4 py-2 hover:bg-red-500 hover:text-white'><a href='/profile/account'>Settings</a></li>
              <li className='px-4 py-2 hover:bg-red-500 hover:text-white'><a href='/'>Log Out</a></li>
            </ul>
          ) : (null)}
        </div>
      </>
    );
  }
  
}

const mapStateToProps = state => ({
  userId: state.login.userId
});

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);  // handleSubmit(event) {
