import React from 'react';

/* TODO: need link api*/
export default class Permission extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      copied: false,
    };

    this.handleChange = this.handleChange.bind(this);   
  }

  render() {
    const stylebar = {
      backgroundColor: this.props.color,
      '--tw-ring-color': this.props.color
    }
    return (
      <>
        <div className='container shadow rounded-lg p-4 my-3 flex-col items-center cursor-default bg-white'>
          <div className='container flex items-center sm:ml-5'>
            <div className={`h-4 w-0.5 ring-2`} style={stylebar}></div>
            <span className='block ml-5 font-semibold overflow-hidden'>Permission</span>
          </div>
          <div className='container flex items-center ml-5 mt-5'>
            <input type='radio' name='branchPermission' value='private' className='mr-5 h-5 w-5' onClick={this.handleChange}></input>
            {/* TODO: Need private svg */}
            <div className='ml-5 container'>
              <span className='block font-semibold overflow-hidden'>Private</span>
              <p className='block w-auto mr-10 text-gray-500 overflow-hidden'>You choose who can see and commit to this branch.</p>
            </div>
          </div>
          <div className='container flex items-center ml-5 mt-5'>
            <input type='radio' name='branchPermission' value='public' className='mr-5 h-5 w-5' onClick={this.handleChange}></input>
            {/* TODO: Need private svg */}
            <div className='ml-5  container'>
              <span className='block font-semibold overflow-hidden'>Public</span>
              <p className='block w-auto mr-10 text-gray-500 overflow-hidden'>Anyone on the internet can see and copy this branch. You can choose who can collaborate with.</p>
            </div>
          </div>
        </div>
      </>
  )}

  handleChange (event) {
    this.props.permissionChange(event.target.value);
  }
}