import TaskDisplay from '../components/taskDisplay';
import React from 'react';

export default class MainTaskDisplay extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <>
        <div className='mt-40 ml-80 mr-10 p-5'>
          <TaskDisplay></TaskDisplay>
          <TaskDisplay></TaskDisplay>
          <TaskDisplay></TaskDisplay>
          <TaskDisplay></TaskDisplay>
          <TaskDisplay></TaskDisplay>
          <TaskDisplay></TaskDisplay>
          <TaskDisplay></TaskDisplay>
          <TaskDisplay></TaskDisplay>
          <TaskDisplay></TaskDisplay>
          <TaskDisplay></TaskDisplay>
          <TaskDisplay></TaskDisplay>
          <TaskDisplay></TaskDisplay>
        </div>
      </>
    );
  }
}