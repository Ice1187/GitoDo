import AddTitle from '../components/addTitle';
import Permission from '../components/permission';
import React from 'react';

export default class AddBranchView extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <>
        <div className='pt-24 lg:ml-80 lg:mr-20 ml-20 mr-1 p-5'>
          <h1 className='text-2xl'>Add a new branch</h1>
          <p className='text-gray-500'>A branch contains many tasks, can also include multiple branches.</p>
          <hr className='my-2'></hr>
          <div className='container flex-col'>
            <AddTitle></AddTitle>
            <Permission></Permission>
          </div>
        </div>
      </>
    );
  }
}