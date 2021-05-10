import React from 'react';

export default class TaskDisplay extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    let color = 'red';
    let branchName = 'Main';
    let taskName = 'Buy Milk';
    let haveMultipleItems = true
    /* FIXME: fix the branchname and taskname overflow by server detecting */
    /* TODO: three dots svg and multipleitems icon */
    return(
      <>
        <div className='container shadow rounded-lg p-5 my-3 flex-row flex items-center cursor-pointer'>
          <button type='submit' className={`outline-none focus:outline-none ring-2 ring-${color}-500 rounded-sm w-4 h-4`}></button>
          <div className={`ml-5 h-4 ring-2 ring-${color}-500`}></div>
          <span className='ml-5 font-semibold w-24 overflow-hidden'>{branchName}</span>
          <span className='ml-5 font-semibold'>|</span>
          <span className='ml-5 font-semibold w-80 overflow-hidden'>{taskName}</span>
          {haveMultipleItems && <button type='submit' className={`ml-5 outline-none focus:outline-none w-4 h-4 font-bold`}>*</button>}
          <button type='submit' className={`ml-5 outline-none focus:outline-none w-4 h-4 font-bold`}>⋯</button>
        </div>
      </>
    );
  }
}