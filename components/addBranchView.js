import AddTitle from '../components/addTitle';
import Permission from '../components/permission';
import BranchColor from '../components/branchColor';
import ShareBlock from '../components/shareBlcok';
import React from 'react';

export default class AddBranchView extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <>
        <div className='sm:pt-28 pt-32 lg:ml-80 lg:mr-20 ml-20 mr-1 p-5'>
          <h1 className='text-2xl'>Add a new branch</h1>
          <p className='text-gray-500'>A branch contains many tasks, can also include multiple branches.</p>
          <hr className='my-2'></hr>
          <div className='container flex-col'>
            <AddTitle></AddTitle>
            <Permission></Permission>
            <BranchColor></BranchColor>
            <ShareBlock color='red'></ShareBlock>
          </div>
          <button className='bg-green-600 hover:bg-green-700 text-white rounded-lg shadow p-3 focus:outline-none my-3'>Add Branch</button>
          <button className='bg-red-500 hover:bg-red-600 text-white rounded-lg shadow p-3 focus:outline-none my-3 ml-5'>Discard</button>
        </div>
      </>
    );
  }
}