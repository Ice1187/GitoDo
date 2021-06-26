import TaskItem from './ShareComponent/taskItem';
import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class MainTaskView extends React.Component{
  constructor(props) {
    super(props);

    let b = {
      id:  90909,
      is_main: true,
      is_head: false,
      color: '#f44336',
      mother_line_id: 1933, /* Main */
      create_date: '2021-05-29 06:33 Sat',
      due_date: '2021-06-1 06:33 Tue',
      title: 'Buy things',
      url: null,
      importance: 0,
      content: null,
      achieved: false,
      achieved_at: null,
      subtask: [
        {'task': 'Milk', 'done': false, 'id': 1},
        {'task': 'Water', 'done': true, 'id': 2},
        {'task': 'Glass mug', 'done': false, 'id': 3}
      ]
    }
    let c = {
      id:  90910,
      is_main: true,
      is_head: false,
      color: '#ffc107',
      mother_line_id: 1933, /* Main */
      create_date: '2021-05-30 07:45 Sun',
      due_date: '2021-06-29 06:33 Tue',
      title: 'Run 10 miles',
      url: 'https://google.com',
      importance: 2,
      content: 'Run for ten miles, and we can achieve our goal. \
      Loren LorenLorenLorenLorenLorenLorenLorenLorenLoren\
      LorenLorenLorenLorenLorenLorenLorenLoren.',
      achieved: false,
      achieved_at: null,
      subtask: []
    }
    let task = [b, c, b, c, b, c, b, c];

    this.state = {
      task: task,
    }

    this.handleTaskDone = this.handleTaskDone.bind(this);
    this.handleSubtaskDone = this.handleSubtaskDone.bind(this);
  }

  render() {
    
    let children = (
      <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
        <div></div>
      </ListGroupItem>
    );
    if (this.state.task.length) {
      children = this.state.task.map((p) => (
        <ListGroupItem key={p.id} action>
          <TaskItem {...p} onTaskDone={this.handleTaskDone} onSubtaskDone={this.handleSubtaskDone} />
        </ListGroupItem>
      ));
    }

    return(
      <>
        <div className='sm:pt-40 pt-20 lg:ml-80 lg:mr-10 md:ml-20 ml-16 mr-1 p-5'>
          <ListGroup>
            {children}
          </ListGroup>
        </div>
      </>
    );
  }

  handleTaskDone(time) {
    /* TODO: call api change node state and rerender */
    console.log('Task Done: ' + time);
  }

  handleSubtaskDone(id, bid) {
    /* TODO: call api change node state and rerender */
    console.log('branch' + {bid} + 'Subtask' + {id} + ' Done');
  }
}