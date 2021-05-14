import TaskDisplay from '../components/taskDisplay';
import React from 'react';

export default class MainTaskDisplay extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <>
        <div className='pt-40 lg:ml-80 lg:mr-10 ml-20 mr-1 p-5'>
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