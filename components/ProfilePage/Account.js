import React from 'react';
import {connect} from 'react-redux';
import ProfileHome from './ProfileHome';
import AccountContent from './ProfileContent/AccountContent';
import {getUser} from '../../api/user';

class Profile extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      avatar_url: '',
    }

    getUser(this.props.userId).then(userId => {
      this.setState({
        avatar_url: userId.avatar_url,
    })
    }).catch(err => {
        console.error('Error while getUser', err);
    });
  }

  render() {
    
    return(
      <>
      <div className="grid grid-cols-7 xs:grid-cols-3">
        <div className="sm:col-start-2 xs:col-start-1 col-span-1">
          <ProfileHome></ProfileHome>
        </div>
        <div className="col-start-3 col-end-6 col-span-4 sm:pt-36 xs:col-start-2">
          <AccountContent></AccountContent>
        </div>
        
        <div className="col-start-6 sm:pt-36 xs:col-start-3">
        <img src={this.state.avatar_url} className="rounded-full h-52 w-52 flex"></img>
        {/* <button  className='focus:outline-none outline-none text-center rounded-lg border-3 border-black-700 bg-white pt-2 pb-2 pl-3 pr-3 mt-5 ml-16 font-semibold hover:bg-gray-200 '>Upload</button> */}
        <label htmlFor="filePicker" className='focus:outline-none outline-none text-center rounded-lg border-3 border-black-700 bg-white pt-2 pb-2 pl-3 pr-3 mt-5 ml-16 font-semibold hover:bg-gray-200 '
        >
        Upload
        </label>
        <input id="filePicker" style={{visibility:"hidden"}} type={"file"} onChange={this.fileSelectedHandler}/>
        </div>   
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);  // handleSubmit(event) {
