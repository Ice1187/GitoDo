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
        <div className='container shadow rounded-lg p-5 my-3 flex-row flex items-center cursor-pointer bg-white'>
          <button type='submit' className={`outline-none focus:outline-none ring-2 ring-${color}-500 rounded-sm w-4 h-4`}></button>
          <div className={`ml-5 h-4 w-0.5 bg-${color}-500 ring-2 ring-${color}-500`}></div>
          <span className='ml-5 font-semibold sm:w-24 w-10 overflow-hidden'>{branchName}</span>
          <div className={`ml-5 h-4 w-0.5 bg-black ring-0.5 ring-black`}></div>
          <span className='ml-5 font-semibold sm:w-80 w-40 overflow-hidden'>{taskName}</span>
          <div className="flex-grow" />
          {haveMultipleItems && <button type='submit' className={`mr-5 outline-none focus:outline-none pt-2`}>
            <span className='material-icons'>expand_more</span>
          </button>}
          <button type='submit' className={`mr-5 outline-none focus:outline-none pt-2`}>
            <span className='material-icons'>more_horiz</span>
          </button>
        </div>
      </>
    );
  }
}