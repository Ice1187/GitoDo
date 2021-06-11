import AddTitle from '../components/ShareComponent/addTitle';
import Permission from '../components/ShareComponent/permission';
import BranchColor from '../components/ShareComponent/branchColor';
import ShareBlock from '../components/ShareComponent/shareBlcok';
import React from 'react';
import Link from 'next/link';
import { withRouter } from "next/router"

class EditBranchView extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      branchName: null,
      branchColor: '#f44336',
      permission: null,
    };

    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePermissionChange = this.handlePermissionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { branchName, id } = this.props.router.query;
    console.log(this.props.router.query);
    this.setState({ branchName: branchName, id: id,});
  }

  render() {
    return(
      <>
        <form onSubmit={this.handleSubmit}>
          <div className='sm:pt-28 pt-10 lg:ml-80 lg:mr-20 sm:ml-40 ml-5 mr-1 p-5 sm:mt-0 mt-24'>
            <h1 className='text-2xl'>Edit branch {this.state.id}</h1>
            <p className='text-gray-500'>A branch contains many tasks, can also include multiple branches.</p>
            <hr className='my-2'></hr>
            <div className='container flex-col'>
              <AddTitle color={this.state.branchColor} name='Branch' value={this.state.branchName} titleChange={this.handleTitleChange}></AddTitle>
              <Permission color={this.state.branchColor} value={this.state.permission} permissionChange={this.handlePermissionChange}></Permission>
              <BranchColor onColorChange={this.handleColorChange} color={this.state.branchColor}></BranchColor>
              <ShareBlock color={this.state.branchColor}></ShareBlock>
            </div>
            <button type='submit' className='ring-2 ring-green-600 bg-green-200 hover:bg-green-600 text-green-800 hover:text-white rounded-lg shadow-md p-2 focus:outline-none my-3'>
              <span>Save Change</span>
            </button>
            <Link href='/'>
              <button className='ring-2 ring-red-600 text-red-800 bg-red-200 hover:bg-red-600 hover:text-white rounded-lg shadow-md py-2 px-2.5 focus:outline-none my-3 ml-5'>
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

  handleTitleChange(value) {
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

export default withRouter(EditBranchView);