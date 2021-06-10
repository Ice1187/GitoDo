import React from 'react';
import {logIn} from '../api/user';
import { Button } from 'reactstrap';
import Router from 'next/router';
import {connect} from 'react-redux';
import {loginSuccess} from '../redux/actions/loginAction';
import {listMainBranch} from '../redux/actions/branchActions';

let qs = require('qs');

class LoginView extends React.Component{
  static getInitialProps() {}

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return(
      <>
        <form onSubmit={this.handleSubmit}>
          <div className='sm:top-20 top-16 lg:right-7 right-2 lg:left-80 left-20 px-10 absolute w-auto'>
            <div className='container flex flex-row mx-auto items-center'>
              <h1 className='text-2xl font-semibold'></h1>
              <div className='flex-grow' />
            </div>
          </div>
          <div className='sm:pt-12 pt-10 lg:ml-40 lg:mr-10 md:ml-20 ml-16 mr-1 p-5'>
            <div className='container flex flex-col shadow bg-white rounded-lg py-5'>
              <h1 className='text-2xl font-semibold mx-auto my-5'>Welcome Back.</h1>
              <div className='container flex flex-col ring-2 ring-gray-200 mx-auto w-96 rounded-lg p-2 mb-5'>
                <span className='ml-5 my-2'>Username</span>
                <input type='text' className='text-left mx-5 my-3 bg-white border-gray-200 border-b-2 p-1 outline-none focus:outline-none hover:border-red-200 focus:border-red-500 cursor-auto focus:placeholder-transparent' 
                value={this.state.username} onChange={this.handleUserChange} required></input>
                <div className='flex-row flex ml-5 my-2 mr-5'>
                  <span>Password</span>
                  <div className='flex-grow'></div>
                  <span className='cursor-pointer text-blue-700 hover:underline'>Forgot Password?</span>
                </div>       
                <input type='password' className='text-left mx-5 my-3 bg-white border-gray-200 border-b-2 p-1 outline-none focus:outline-none hover:border-red-200 focus:border-red-500 cursor-auto focus:placeholder-transparent' 
                value={this.state.password} onChange={this.handlePassChange} required></input>
                <Button className='ring-2 ring-green-500 mx-5 my-2 rounded-md py-2 bg-green-200 text-green-800 hover:bg-green-600 hover:text-white'>Sign in</Button>
              </div>
              <h1 className='text-md font-normal mx-auto mb-10'>First time?&nbsp;&nbsp;<span className='cursor-pointer text-blue-700 hover:underline'> Create one.</span></h1>
              <span className='text-sm text-gray-500 mx-auto'>Sign in to GitoDo means you agree to GitoDo&apos;s Terms of Service and</span>
              <span className='text-sm text-gray-500 mx-auto'>acknowledge that GitoDo&apos;s Privacy Policy applies to you.</span>
            </div>
          </div>
        </form>
      </>
    );
  }

  handleUserChange(event) {
    this.setState({username: event.target.value});
  }

  handlePassChange(event) {
    this.setState({password: event.target.value});
  }
  
  handleSubmit(event) {
    /* TODO: add wrong login  */

    let data = qs.stringify({
      'account': this.state.username,
      'password': this.state.password
    });

    logIn(data).then(res => {
      //console.log(userId);
      if(res.status === 200) {
        this.props.loginSuccess(res.data);
        this.props.listMainBranch(res.data);
        Router.push({
          pathname: '/main',
          query: { userId: res.data},
        }, `/main`);
      } else {
        window.location.reload();
      }
    }).catch(err => {
      console.error('Error while logIn', err);
      window.location.reload();
    });

    event.preventDefault();
  }
}

const mapStateToProps = state => ({
  userId: state.login.userId
});

const mapDispatchToProps = {
  loginSuccess: loginSuccess,
  listMainBranch: listMainBranch,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);