import TaskItem from './ShareComponent/taskItem';
import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class MainTaskView extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
    }

    this.handleTaskDone = this.handleTaskDone.bind(this);
    this.handleSubtaskDone = this.handleSubtaskDone.bind(this);
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
      children = allTask.map((p) => (
        !p.task.branch_line_id && 
        <ListGroupItem key={p.task._id} action>
          <TaskItem {...p} onTaskDone={this.handleTaskDone} onTaskUndone={this.handleTaskUndone} onSubtaskDone={this.handleSubtaskDone} />
        </ListGroupItem>
      ));
    }

    return(
      <>
        <div className='pt-40 lg:ml-80 lg:mr-10 md:ml-20 ml-16 mr-1 p-5'>
          <ListGroup>
            {children}
          </ListGroup>
        </div>
      </>
    );
  }

  handleTaskDone(id, time) {
    this.props.onTaskDone(id, time);
  }

  handleTaskUndone(id) {
    this.props.onTaskUndone(id);
  }

  handleSubtaskDone(id, bid) {
    /* TODO: call api change node state and rerender */
    console.log('branch' + {bid} + 'Subtask' + {id} + ' Done');
  }
}