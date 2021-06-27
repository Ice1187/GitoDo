import React from 'react';
import {connect} from 'react-redux';
import Link from 'next/link';
import {getUser, modifyUser} from '../../../api/user';
import Router from 'next/router';

let qs = require('qs');
class AccountContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      account: '',
      email: '',
      name: '',
      password: '',
      avatar_url: '',
      confirmPassword: '',
      newPwdValid: false,
      pwdValid: false,
      valueName: '',
      valueEmail: '',
      input: {},
      msg: {},
      pwdShow: false,
    };

    // getUser
    getUser(this.props.userId).then(userId => {
      this.setState({
        account: userId.account, 
        name: userId.name, 
        email: userId.email,
        password: userId.password,
        avatar_url: userId.avatar_url,
    })
    }).catch(err => {
        console.error('Error while getUser', err);
    });
    this.handlePwdExpand = this.handlePwdExpand.bind(this);
    this.pwdConfirm = this.pwdConfirm.bind(this);
    this.handlePwdSubmit = this.handlePwdSubmit.bind(this);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDiscard = this.handleDiscard.bind(this);
  }
  
  render() {
    let color = 'red';
    let data = qs.stringify({
      'account': this.state.account,
      'email': this.state.email,
      'name': this.state.name,
      'password': this.state.password
    })
	console.log(this.state.avatar_url);

    return (
      <>
      {/* header */}
      
      <div className='container flex-row flex items-center my-2'>
        <div className='container flex-row flex items-center'>
          <h1 className="font-bold pl-3 pr-3 pb-3 text-xl ml-0">Profile & Account</h1>
          <div className='flex-grow'></div>
          <div className='flex flex-row relative mr-0 justify-end w-12 items-center hover-trigger cursor-pointer'>
            <label htmlFor="filePicker" className='focus:outline-none outline-none hover:bg-gray-200 cursor-pointer'>
              <span className='hover-target rounded-full p-1 bg-opacity-60 bg-gray-400 text-white text-sm absolute h-12 w-12 text-center material-icons pt-3'>file_upload</span>
              <img src={this.state.avatar_url} className="inline shadow-sm rounded-full h-12 w-12 overflow-hidden"></img>
            </label>
            <span className='hover-target rounded-md p-1 bg-opacity-90 bg-gray-800 text-white text-sm absolute top-12 right-12 text-center'>Avatar (Click&nbsp;to&nbsp;upload&nbsp;photos)</span>
            <input id="filePicker" style={{display:'none'}} type={"file"} onChange={this.fileSelectedHandler}/>
          </div>
        </div>
      </div>
      <hr></hr>
      {/* Account Block */}
      <div className='container shadow rounded-lg p-4 my-4 flex-col flex items-center cursor-default bg-white w-auto'>
          <div className="container flex-row flex items-center">
            <div className={`ml-5 h-4 w-0.5 bg-${color}-500 ring-2 ring-${color}-500`}></div>
            <span className='ml-5 font-semibold overflow-hidden'>
              Account: <span className='font-semibold text-lg'>{this.state.account}</span></span>
            <div className='flex-grow' />
          </div> 
        </div>

      {/* UserName Block */}
        <div className='container shadow rounded-lg p-4 my-4 flex-col flex items-center cursor-default bg-white w-auto'>
          <div className="container flex-row flex items-center">
            <div className={`ml-5 h-4 w-0.5 bg-${color}-500 ring-2 ring-${color}-500`}></div>
            <span className='ml-5 font-semibold overflow-scroll'>
              Username: {this.state.name}</span>
            <div className='flex-grow' />
          </div>
          <div className='my-2.5 container py-2'>
            <div className='container ring-2 ring-gray-200 rounded-lg p-3 px-0 my-2 sm:flex-row flex-col flex items-center cursor-default bg-white'>
              <div className='container justify-start flex-row flex items-center'>
                <div className={`ml-5 h-4 w-0.5 bg-${color}-500 ring-2 ring-${color}-500`}></div>
                <label className="ml-5 font-medium overflow-hidden sm:mr-2 w-60">New UserName</label>
                <div className='flex-grow'></div>
              </div>
              <input type="text" className='sm:my-0 my-3 text-center sm:mr-10 w-40 xs:w-36 bg-white border-gray-200 border-b-2 p-1 outline-none focus:outline-none hover:border-red-200 focus:border-red-500 cursor-auto focus:placeholder-transparent' placeholder='Enter your username'  
              value={this.state.valueName}  onChange={this.handleNameChange}
              ></input>
            </div>
         </div>
        
        </div>

        {/* Email Part */}
        <div className='container shadow rounded-lg p-4 my-4 flex-col flex items-center cursor-default bg-white w-auto'>
          <div className="container flex-row flex items-center">
            <div className={`ml-5 h-4 w-0.5 bg-${color}-500 ring-2 ring-${color}-500`}></div>
            <span className='ml-5 font-semibold overflow-scroll'>Email: {this.state.email} </span>
            <div className='flex-grow' />         
            </div>
            <div className='my-2.5 container py-2'>
              <div className='container ring-2 ring-gray-200 rounded-lg p-3 px-0 my-2 sm:flex-row flex-col flex items-center cursor-default bg-white'>
                <div className='container justify-start flex-row flex items-center'>
                  <div className={`ml-5 h-4 w-0.5 bg-${color}-500 ring-2 ring-${color}-500`}></div>
                  <label className="ml-5 font-medium overflow-hidden sm:mr-2 w-60">New Email</label>
                  <div className='flex-grow'></div>
                </div>
                <input className='sm:my-0 my-3 text-center sm:mr-10 w-40 xs:w-36 bg-white border-gray-200 border-b-2 p-1 outline-none focus:outline-none hover:border-red-200 focus:border-red-500 cursor-auto focus:placeholder-transparent' 
                value={this.state.valueEmail} onChange={this.handleEmailChange} placeholder='Enter your email' 
                ></input>
              </div>
            </div>
        </div>

        {/* Password Part */}
        
        <div className='container shadow flex-col rounded-lg p-4 my-4 flex items-center cursor-default bg-white w-auto'>
          <div className="container flex-row flex items-center">
            <div className={` ml-5 h-4 w-0.5 bg-${color}-500 ring-2 ring-${color}-500`}></div>
            <span className='ml-5 font-semibold overflow-hidden'>Password</span>
            <div className='flex-grow' />
            <button  className='text-center focus:outline-none outline-none pt-2 font-semibold mr-2 text-gray-400 hover:text-gray-600' 
            onClick={this.handlePwdExpand}>
            {this.state.pwdShow ? (<span className='material-icons'>cancel</span>) : (<span className='material-icons'>edit</span>)}</button>
          </div>
           { this.state.pwdShow &&
            <div className='container flex-col flex items-center bg-white py-2'>
            {
              <div className='my-2.5 container py-2 ring-2 ring-gray-200 rounded-lg p-3 px-0 sm:flex-row flex-col flex items-center cursor-default bg-white'>
                <div className='container justify-start flex-row flex items-center'>
                  <div className={`ml-5 h-4 w-0.5 bg-${color}-500 ring-2 ring-${color}-500`}></div>
                  <label className="ml-5 font-medium overflow-hidden w-60" htmlFor="curpwd">Current Password</label>
                  <div className='flex-grow'></div>
                </div>
                <input type="password" name="curPwd" className='sm:my-0 my-3 text-center sm:mr-10 w-40 bg-white border-gray-200 border-b-2 p-1 outline-none focus:outline-none hover:border-red-200 focus:border-red-500 cursor-auto focus:placeholder-transparent' 
                placeholder='Current Password' onChange={this.pwdConfirm} required value={this.state.input.curPwd} onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                ></input>              
              </div>
            }
            {
              <div className='my-2.5 container py-2 ring-2 ring-gray-200 rounded-lg p-3 px-0 sm:flex-row flex-col flex items-center cursor-default bg-white'>
                <div className='container justify-start flex-row flex items-center'>
                  <div className={`ml-5 h-4 w-0.5 bg-${color}-500 ring-2 ring-${color}-500`}></div>
                  <label className="ml-5 font-medium overflow-hidden w-60" htmlFor="newPwd1">New Password</label>
                  <div className='flex-grow'></div>
                </div>
                <input type="password" name="newPwd1" className='sm:my-0 my-3 text-center sm:mr-10 w-40 bg-white border-gray-200 border-b-2 p-1 outline-none focus:outline-none hover:border-red-200 focus:border-red-500 cursor-auto focus:placeholder-transparent' 
                placeholder='New Password' onChange={this.pwdConfirm} required value={this.state.input.newPwd1} onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                ></input>              
              </div>
            }
            {
              <div className='my-2.5 container py-2 ring-2 ring-gray-200 rounded-lg p-3 px-0 sm:flex-row flex-col flex items-center cursor-default bg-white'>
                <div className='container justify-start flex-row flex items-center'>
                  <div className={`ml-5 h-4 w-0.5 bg-${color}-500 ring-2 ring-${color}-500`}></div>
                  <label className="ml-5 font-medium overflow-hidden w-60" htmlFor="newPwd2">Confirm New Password</label>
                  <div className='flex-grow'></div>
                </div>
                <input type="password" name="newPwd2" className='sm:my-0 my-3 text-center sm:mr-10 w-40 bg-white border-gray-200 border-b-2 p-1 outline-none focus:outline-none hover:border-red-200 focus:border-red-500 cursor-auto focus:placeholder-transparent' 
                placeholder='Cofirm Password' onChange={this.pwdConfirm} required value={this.state.input.newPwd2} onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                ></input>              
              </div>
            }
            {
              <div className="mr-auto ml-3 container flex-row flex container">
                <button className='ring-2 ring-green-600 bg-green-200 hover:bg-green-600 text-green-800 hover:text-white rounded-lg shadow-md pl-2 pr-2 pt-1 pb-1 focus:outline-none my-3' 
                onClick={this.handlePwdSubmit}>
                  <span>Save</span>
                </button>
                <div className='flex-grow'></div>
                <div className='items-center sm:mr-16 mr-4 pt-2 text-right'>
                  <span className='cursor-pointer text-blue-700 hover:underline sm:text-base text-sm block'>Forgot Password?</span>
                  <div className="text-red-500 font-semibold sm:text-base text-sm">{this.state.msg.newPwd1}</div>
                  <div className="text-red-500 font-semibold sm:text-base text-sm">{this.state.msg.curPwd}</div>
                  <div className="text-green-500 font-semibold sm:text-base text-sm">{this.state.msg.pwdSave}</div>
                </div>       
              </div>
            }
        </div>
        }
        </div>
      </>
    );
  }

  // Password Part
  handlePwdExpand () {
    this.setState({ pwdShow: !this.state.pwdShow, });
    this.setState({input: {}, msg: {}})
  }
  pwdConfirm(e){
    var inputPwd = this.state.input;
    inputPwd[e.target.name] = e.target.value;
    this.setState({
      inputPwd
    })
  }
  validation(){
    var msg={};
    if(this.state.input["newPwd1"] !== this.state.input["newPwd2"]){
      msg["newPwd1"] = "!New Password Are Not Matching!";
      this.setState({newPwdValid: false});
    }
    else{
      console.log('new Password equal');
      this.setState({newPwdValid: true});
    }
    this.setState({
      msg: msg
    })
  }

  handlePwdSubmit(e){
    e.preventDefault();
    if(this.validation())
    {
      var input = {};
      input["newPwd1"] = "";
      input["newPwd2"] = "";
    }    
    var msg={};
    if(this.state.input["curPwd"] !== this.state.password){
      this.setState({pwdValid: false});
      msg["curPwd"] = "!Current Password Are Wrong!";
      this.setState({msg: msg});
    }
    else  {
      this.setState({pwdValid: true});
    }
    if(this.state.newPwdValid && this.state.pwdValid ){
      // console.log('Pwd ok')
      this.state.password = this.state.input["newPwd1"];
      let data = qs.stringify({
        'account': `${this.state.account}`,
        'email': `${this.state.valueEmail}`,
        'name': `${this.state.valueName}`,
        'avatar_url': '',
        'password': `${this.state.password}`,
      })
      modifyUser(this.props.userId, data).then(() => {
        var msg = {};
        msg["pwdSave"] = "already saved!";
        this.setState({ msg: msg , })
        setTimeout(( () => this.setState({pwdShow: false}) ), 800);
      }).catch(err => {
        console.error('Error while change', err);
        window.location.reload();
      });
      this.state.password = this.state.input["newPwd1"];
    }
  }
  

  // Basic Info Part
  handleNameChange(event) {
    this.setState({valueName: event.target.value});
  }

  handleEmailChange(event) {
    this.setState({ valueEmail: event.target.value});
  }

  handleDiscard(){
    this.setState({valueEmail: '', valueName:''});
  }

  handleSubmit(event) {
    if(this.state.valueName == '' && this.state.valueEmail == '')
      alert('You should enter some text');
    else {
      console.log('submit');
      let data = qs.stringify({
        'account': `${this.state.account}`,
        'email': `${this.state.valueEmail}`,
        'name': `${this.state.valueName}`,
        'avatar_url': '',
        'password': `${this.state.password}`,
      })
      // console.log(data)
      modifyUser(this.props.userId, data).then(() => {
        var msg = {};
        msg["save"] = "already saved!";
        this.setState({ msg: msg })
      }).catch(err => {
        console.error('Error while change', err);
        window.location.reload();
      });

    }
    event.preventDefault();
    setInterval('window.location.reload()', 800);
  }

  
}

const mapStateToProps = state => ({
  userId: state.login.userId
});

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountContent);  // handleSubmit(event) {

{/* <div className='container flex-col flex items-center bg-white py-2'>
          
  <div className='container ring-2 ring-gray-200 rounded-lg p-3 px-4 my-2 flex-row flex items-center cursor-default bg-white'>
    <div className={` ml-5 h-4 w-0.5 bg-${subcolor}-500 ring-2 ring-${subcolor}-500`}></div>
    <label className="ml-5 font-medium overflow-hidden mr-2 w-60" for="curAcc">New Account</label>
    </div>
            
</div> */}

  {/* Bio Description */}
  {/* <div className='container shadow rounded-lg p-4 my-3 flex items-center cursor-default bg-white max-w-xl w-auto'>
    <div className="grid grid-rows-5">
      <div className={`row-span-1 row-start-1 ml-5 h-4 w-0.5 bg-${color}-500 ring-2 ring-${color}-500`}></div>
      <span className='row-span-1 row-start-1 ml-5 font-semibold overflow-hidden'>BIO Description (Optional)</span>
      <div className='flex-grow' />
    
      <div className="grid row-span-4">
      <div className=' flex sm:flex-row flex-col p-3'>
      <textarea type='textarea' className='container text-left rounded-md mx-1 sm:w-96 w-auto bg-white border-gray-200 border-2 pr-2 pl-2 pb-1 pt-1 outline-none focus:outline-none hover:border-red-200 focus:border-red-500 cursor-auto focus:placeholder-transparent' 
        placeholder='Write something about yourself...' 
      ></textarea>
      </div>
    </div>
    </div>
  </div> */}

  {/* Phone Part */}
  {/* <div className='container shadow rounded-lg p-4 my-3 flex-col flex items-center cursor-default bg-white max-w-xl w-auto'>
    <div className="container flex-row flex items-center">
      <div className={`ml-5 h-4 w-0.5 bg-${color}-500 ring-2 ring-${color}-500`}></div>
      <span className='ml-5 font-semibold overflow-hidden'>Connected Phone:  {phoneNumber}</span>
      <div className='flex-grow' />
      <button className='text-center rounded-lg border-3 focus:outline-none outline-none border-black-700 bg-gray-300 text-gray-600 pr-2 pl-2 pb-1 pt-1 ml-5 font-semibold hover:bg-gray-600 hover:text-white '
      onClick={this.handlePhoneExpand}><BiEdit className="inline pr-1" />Change</button>
    </div>
    { this.state.phoneShow &&
      <div className='container flex-col flex items-center bg-white py-2'>
      {
        <div className='container ring-2 ring-gray-200 rounded-lg p-3 px-4 my-2 flex-row flex items-center cursor-default bg-white'>
          <div className={` ml-5 h-4 w-0.5 bg-${color}-500 ring-2 ring-${color}-500`}></div>
          <label className="ml-5 font-medium overflow-hidden mr-2 w-60" for="curpwd">New Connected Phone</label>
          <input className="border-2 rounded-md border-gray-300 ml-3 pl-2" placeholder={phoneNumber} id="curpwd" type="tel" name="curPwd"></input>
        </div>
      }
      {
        <div className="mr-auto ml-3">
        <button type='submit' className='ring-2 ring-green-600 bg-green-200 hover:bg-green-600 text-green-800 hover:text-white rounded-lg shadow-md pl-2 pr-2 pt-1 pb-1 focus:outline-none my-3' onClick={this.handleSubmit}>
          <span>Change</span>
        </button>
        </div>
      }
  </div>
  }
  </div> */}