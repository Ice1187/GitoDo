import AddTitle from '../components/addTitle';
import Permission from '../components/permission';
import BranchColor from '../components/branchColor';
import ShareBlock from '../components/shareBlcok';
import React from 'react';
import Link from 'next/link';

export default class AddBranchView extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      branchName: null,
      branchColor: '#f44336',
      permission: null,
    };

    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleBranchNameChange = this.handleBranchNameChange.bind(this);
    this.handlePermissionChange = this.handlePermissionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return(
      <>
        <form onSubmit={this.handleSubmit}>
          <div className='sm:pt-28 pt-32 lg:ml-80 lg:mr-20 ml-20 mr-1 p-5'>
            <h1 className='text-2xl'>Add a new branch</h1>
            <p className='text-gray-500'>A branch contains many tasks, can also include multiple branches.</p>
            <hr className='my-2'></hr>
            <div className='container flex-col'>
              <AddTitle color={this.state.branchColor} name='Branch' value={this.state.branchName} branchNameChange={this.handleBranchNameChange}></AddTitle>
              <Permission color={this.state.branchColor} value={this.state.permission} permissionChange={this.handlePermissionChange}></Permission>
              <BranchColor onColorChange={this.handleColorChange} color={this.state.branchColor}></BranchColor>
              <ShareBlock color={this.state.branchColor}></ShareBlock>
            </div>
            <button type='submit' className='bg-green-600 hover:bg-green-700 text-white rounded-lg shadow p-2 focus:outline-none my-3'>
              <span>Add Branch</span>
            </button>
            <Link href='/'>
              <button className='bg-red-500 hover:bg-red-600 text-white rounded-lg shadow py-2 px-2.5 focus:outline-none my-3 ml-5'>
                <a>
                  <span>Discard</span>
                </a>
              </button>
            </Link>
          </div>
        </form>
      </>
    );
  }

  handleColorChange(color) {
    this.setState({ branchColor: color.hex, });
  }

  handleBranchNameChange(value) {
    this.setState({ branchName: value,});
  }

  handlePermissionChange(value) {
    this.setState({ permission: value,});
  }
  
  handleSubmit(event) {
    /* TODO: add redirect after submit*/
    // alert('A name was submitted: ' + this.state.branchColor + this.state.branchName + this.state.permission);
    event.preventDefault();
  }
}