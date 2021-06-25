import React from 'react';
import {getUser} from '../../api/user'
import {addNode} from '../../api/node'
import {shareLine} from '../../api/line'
import {connect} from 'react-redux'

let qs = require('qs');
class ShareBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {value: ''};
    
    this.handleShare = this.handleShare.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render(){
    const stylebar = {
      backgroundColor: this.props.color,
      '--tw-ring-color': this.props.color
    }
    console.log(this.props.sharer)
    return (
      /* TODO: make all color bar have same color but use redux to manage state*/
      /* TODO: find user in input field and able to delete invited*/
      <>
        <div className={`container shadow rounded-lg p-4 my-3 flex-col items-center cursor-default bg-white`}>
          <div className='container items-center flex'>
            <div className={`sm:ml-5 h-4 w-0.5 ring-2`} style={stylebar}></div>
            <span className='ml-5 font-semibold overflow-hidden'>Collaborate with Others (beta)</span>
          </div>
          <div className='ml-5 flex sm:flex-row flex-col p-5'>
            <span className=''>GitoDo Members or Email address (id)</span>
            <div className='sm:flex-grow' />
            <input className='sm:my-0 my-10 text-center sm:mr-10 mx-3 sm:w-48 md:w-96 w-auto bg-white border-gray-200 border-b-2 p-1 outline-none focus:outline-none hover:border-red-200 focus:border-red-500 cursor-auto focus:placeholder-transparent' 
            placeholder='Search for members to invite' value={this.state.value} onChange={this.handleChange}
            ></input>
            <button onClick={this.handleShare} className='bg-gray-300 hover:bg-gray-600 text-gray-600 hover:text-white rounded-lg focus:outline-none px-2 w-auto sm:py-0 py-2'>
                <span>Invite</span>
            </button>
          </div>
        </div>
      </>
    )
  }
  
  handleShare() {
    const now = new Date();
    getUser(this.state.value).then(user => {
      let node_data = qs.stringify({
        'mother_line_id': `${user.todo_host}`,
        'create_date': `${now}`,
        'due_date': `${now}`,
        'title': `${this.props.branchName}`,
        'url': `${null}`,
        'content': `${null}`,
        'importance': '0',
      })
      addNode(node_data).then(node => {
        let data = qs.stringify({
          'sharerLineId': `${this.props.lineId}`,
          'sharederUserId': `${this.state.value}`,
          'sharederNodeId': `${node._id}` 
        });
        shareLine(data).then(shareObj=>{
          console.log(shareObj)
        })
      })
    })
    this.props.update();
    event.preventDefault();
  }

  handleChange (event) {
    /* FIXME: fix the props func*/
    this.setState({value: event.target.value})
  }
}

const mapStateToProps = state => ({
  userId: state.login.userId,
  mainLine: state.branch.mainLine,
});

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareBlock);