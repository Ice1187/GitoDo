import ImportBlock from '../components/importBlcok';
import AddTitle from '../components/addTitle';
import Permission from '../components/permission';
import BranchColor from '../components/branchColor';
import ShareBlock from '../components/shareBlcok';
import React from 'react';
import Link from 'next/link';

export default class ImportBranchView extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      branchName: null,
      branchColor: '#f44336',
      permission: null,
      branchState: 'collaborate',
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
          <div className='sm:pt-28 pt-10 lg:ml-80 lg:mr-20 sm:ml-40 ml-5 mr-1 p-5 sm:mt-0 mt-2'>
            <h1 className='text-2xl'>Import a branch</h1>
            <p className='text-gray-500'>Import an existing branch, adjust it to your special branch or collaborate with others.</p>
            <hr className='my-2'></hr>
            <div className='container flex-col'>
              <ImportBlock color={this.state.branchColor}></ImportBlock>
              {this.state.branchState == 'copy' && <AddTitle color={this.state.branchColor} name='Branch' value={this.state.branchName} branchNameChange={this.handleBranchNameChange}></AddTitle>}
              {this.state.branchState == 'copy' && <Permission color={this.state.branchColor} value={this.state.permission} permissionChange={this.handlePermissionChange}></Permission>}
              <BranchColor onColorChange={this.handleColorChange} color={this.state.branchColor}></BranchColor>
              {this.state.branchState == 'copy' && <ShareBlock color={this.state.branchColor}></ShareBlock>}
            </div>
            {this.state.branchState == 'copy' && <button type='submit' className='ring-2 ring-green-600 text-green-800 bg-green-200 hover:bg-green-600 hover:text-white rounded-lg shadow p-2 focus:outline-none my-3 mr-5'>
              <span>Copy</span>
            </button>}
            {this.state.branchState == 'collaborate' && <button type='submit' className='ring-2 ring-green-600 text-green-800 bg-green-200 hover:bg-green-600 hover:text-white rounded-lg shadow p-2 focus:outline-none my-3 mr-5'>
              <span>Collaborate</span>
            </button>}
            <Link href='/'>
              <button className='ring-2 ring-red-600 text-red-800 bg-red-200 hover:bg-red-600 hover:text-white rounded-lg shadow py-2 px-2.5 focus:outline-none mt-3'>
                <a>
                  <span>Discard</span>
                </a>
              </button>
            </Link>
          </div>
        </form>
        <div className='sm:h-10 h-6'/>
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