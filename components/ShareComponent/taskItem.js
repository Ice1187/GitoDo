import React from 'react';
import SubtaskList from '../AddTaskComponents/subtaskList';
import Router from 'next/router'
import { getNode, modifySubTask } from '../../api/node';
let qs = require('qs');

export default class TaskItem extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      subtask: [],
    }

    this.handleSubExpand = this.handleSubExpand.bind(this);
    this.handleTaskDone = this.handleTaskDone.bind(this);
    this.handleSubDone = this.handleSubDone.bind(this);
    this.handleTaskEdit = this.handleTaskEdit.bind(this);
    this.RGBToHex = this.RGBToHex.bind(this);
  }

  componentDidMount() {
    this.setState({ 
      subtask: this.props.task.subtask,
    });
  }

  render() {
    let branchName = 'Main';
    /* FIXME: fix the branchname and taskname overflow by server detecting */
    /* TODO: three dots svg and multipleitems icon */
    const {color_RGB, title} = this.props.line;
    branchName = title;
    const branch_color = color_RGB ? this.RGBToHex(color_RGB[0], color_RGB[1], color_RGB[2]) : '#ffffff';
    const stylebranch = {
      backgroundColor: branch_color,
      '--tw-ring-color': branch_color
    } 
    const stylebox = {
      backgroundColor: 'white',
      '--tw-ring-color': branch_color
    }
    const stylecomplete = {
      backgroundColor: branch_color,
      '--tw-ring-color': branch_color,
      border: '2px solid #fff',
      'boxShadow': '0 0 0 2px branch_color',
    }
    const importance = [
      '', '!', '!!', '!!!'
    ]
    let time = new Date(this.props.task.due_date);
    let now = new Date();
    time = time.toLocaleString();
    let expire = false;
    if(Date.parse(this.props.task.due_date) < Date.parse(now)){
      expire = true;
    }
    return(
      <>
        <div className='container shadow rounded-lg flex-col my-3 px-5 flex items-center cursor-default bg-white'>
          <div className={`container md:flex-row flex-col flex items-center ${(this.props.task.url || this.props.task.content || this.state.subtask) ? 'cursor-pointer' : 'cursor-default'} bg-white my-3`} onClick={this.handleSubExpand}>
            <div className='container flex flex-row items-center'>
              <button type='submit' className={`outline-none focus:outline-none ring-2 rounded-sm w-4 h-4`} style={this.props.task.achieved == true ? stylecomplete : stylebox} onClick={this.handleTaskDone}></button>
              <div className={`inline ml-5 h-4 w-0.5 ring-2`} style={stylebranch}></div>
              <span className='sm:ml-5 ml-3 font-semibold sm:w-36 w-auto overflow-hidden' onClick={this.handleSubExpand}>{branchName}</span>
              <div className={`sm:ml-5 ml-3 h-4 w-0.5 bg-black ring-0.5 ring-black`}></div>
              <span className='sm:ml-5 ml-3 font-semibold sm:w-40 w-auto overflow-hidden' onClick={this.handleSubExpand}>{this.props.task.title}</span>
              <div className='md:flex-grow'  onClick={this.handleSubExpand}/>
            </div>
            <div className='md:flex-grow'  onClick={this.handleSubExpand}/>
            <div className='flex flex-row items-center'>
              {this.props.task.due_date && <span className={`items-center sm:mx-2 mx-1 text-sm font-normal w-40 overflow-hidde self-baseline pt-1 ${expire ? 'text-red-500' : 'text-gray-500 hover:text-blue-700'}`} onClick={this.handleSubExpand}>{time}</span>}
              {<span className='sm:mr-3 mr-1 text-md font-semibold text-blue-700 overflow-hidde self-baseline w-4' onClick={this.handleSubExpand}>{importance[this.props.task.importance]}</span>}
              <button onClick={this.handleTaskEdit} className={`outline-none focus:outline-none pt-2`}>
                <span className='material-icons text-xs transform scale-75 text-gray-400 hover:text-gray-600'>mode_edit</span>
              </button>
            </div>
          </div>
          {
          this.state.open && (this.props.task.url || this.props.task.content || this.state.subtask) &&
          <div className='container flex-col flex items-center bg-white py-2'>
            {
              this.props.task.url && 
              <div className='container ring-2 ring-gray-200 rounded-lg p-3 px-4 my-2 flex-row flex items-center cursor-default bg-white'>
                <div className={`ml-5 h-4 w-0.5 ring-2`} style={stylebranch}></div>
                <span className='ml-5 font-medium overflow-hidden mr-2 w-32'>URL</span>
                <a target='_blank' rel='noreferrer' href={'//'+this.props.task.url}><span className='font-normal overflow-scroll w-auto cursor-pointer text-blue-700 hover:underline'>{this.props.task.url}</span></a>
                <div className='flex-grow'/>
              </div>
            }
            {
              this.props.task.content &&
              <div className='container ring-2 ring-gray-200 rounded-lg p-3 px-4 my-2 sm:flex-row flex-col flex items-center cursor-default bg-white'>
                <div className='container flex flex-row items-center justify-start ml-5'>
                  <div className={`h-4 w-0.5 ring-2`} style={stylebranch}></div>
                  <span className='ml-5 font-medium overflow-hidden w-32'>Content</span>
                </div>
                <div className='container flex flex-row items-center mx-auto justify-around'>
                  <p className='font-normal overflow-scroll w-96 sm:my-0 my-2 bg-gray-100 p-2 rounded-lg px-5'>{this.props.task.content}</p>
                </div>
              </div>
            }
            {
              this.state.subtask && 
              <div className='container ring-2 ring-gray-200 rounded-lg p-3 px-4 my-2 flex-row flex items-center cursor-default bg-white'>
                <div className={`ml-5 h-4 w-0.5 ring-2`} style={stylebranch}></div>
                <span className='ml-5 font-medium overflow-hidden mr-2 w-32'>Subtask</span>
                <div className='container pr-2'>
                  <SubtaskList color={branch_color} subtask={this.state.subtask} DoneSub={this.handleSubDone} delete={false}></SubtaskList> 
                </div>
              </div>
            }
          </div>
          }
          
        </div>
         
      </>
    );
  }

  handleSubExpand () {
    this.setState({ open: !this.state.open, });
  }

  handleTaskDone(event) {
    event.cancelBubble = true;
    if(event.stopPropagation) event.stopPropagation();
    if(this.props.task.achieved == true) {
      this.props.onTaskUndone(this.props.task._id);
    } else {
      const now = new Date();
      this.props.onTaskDone(this.props.task._id, now);
    }
  }

  handleSubDone(value, done, id) {
    let data = qs.stringify({
      'subtask': `${value}`,
      'done': `${done}`,
      'subtaskIdx': `${id}`,
    });
    modifySubTask(this.props.task._id, data).then(() => {
      getNode(this.props.task._id).then(node => {
        this.setState({subtask: [...node.subtask],})
      })
    });
  }

  handleTaskEdit () {
    // TODO: with api
    console.log('Edit: ' + this.props.task._id);
    // Dynamic Routing
    Router.push({
      pathname: '/task-edit/[taskId]',
      query: { taskId: this.props.task._id },
    }, '/task-edit/[taskId]');
  }

  RGBToHex(r,g,b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
  
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    return "#" + r + g + b;
  }
}