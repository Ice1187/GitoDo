import TaskItem from './ShareComponent/taskItem';
import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class MainTaskView extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
    }

    this.handleDraw = this.handleDraw.bind(this);
    this.handleTaskDone = this.handleTaskDone.bind(this);
    this.handleTaskUndone = this.handleTaskUndone.bind(this);
  }

  render() {
    let allTask = [...this.props.task]
    if(!allTask) allTask = [];
    let children = (
      <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
        <div></div>
      </ListGroupItem>
    );
    if (allTask.length > 1) {
      allTask.shift();
      let task = allTask.filter(element => element.task.branch_line_id == null);
      children = task.map((p, index) => (
        <ListGroupItem key={p.task._id} action>
          <TaskItem {...p} userId={this.props.userId} index={index} onDraw={this.handleDraw} onTaskDone={this.handleTaskDone} onTaskUndone={this.handleTaskUndone}/>
        </ListGroupItem>
      ));
    }

    return(
      <>
        <div className='pt-40 lg:ml-80 lg:mr-10 md:ml-20 ml-16 mr-1 p-5'>
          <ListGroup>
            {children}
          </ListGroup>
          {this.props.task.length == 0 && 
            <div className='text-green-500 flex flex-row container justify-center h-48 items-center'>
              <div className={`h-2.5 w-2.5 bg-current animate-bounce200 rounded-full mr-1`}></div>
              <div className={`h-2.5 w-2.5 bg-current animate-bounce400 rounded-full mr-1`}></div>
              <div className={`h-2.5 w-2.5 bg-current animate-bounce100 rounded-full`}></div>
            </div>
          }
        </div>
      </>
    );
  }

  handleDraw(index, task_id, branch_color, mother_id, x, y) {
    let task = this.props.task.filter(element => element.branch_line_id == null);
    this.props.onDraw(index, task_id, branch_color, mother_id, x, y, task.length);
  }

  handleTaskDone(id, time, index) {
    this.props.onTaskDone(id, time, index);
  }

  handleTaskUndone(id, index) {
    this.props.onTaskUndone(id, index);
  }
}