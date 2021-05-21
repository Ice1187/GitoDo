import React from 'react';

/* TODO: need link api*/
export default class AddTitle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    const stylebranch = {
      backgroundColor: this.props.color,
      '--tw-ring-color': this.props.color
    }
    const stylebox = {
      backgroundColor: 'white',
      '--tw-ring-color': this.props.color
    }
    return (
      <>
        <div className='container shadow rounded-lg p-4 my-3 flex-row flex items-center cursor-default bg-white'>
          {this.props.name == 'Branch' 
          ? <div className={`sm:ml-5 h-4 w-0.5 ring-2`} style={stylebranch}></div>
          : <button type='submit' className={`sm:ml-5 outline-none focus:outline-none ring-2 rounded-sm w-4 h-4`} style={stylebox}></button>}
          <span className='ml-5 font-semibold overflow-hidden'>{this.props.name} name</span>
          <div className='sm:flex-grow' />
          <input className='text-center sm:mr-10 mx-3 sm:w-60 w-32 bg-white border-gray-200 border-b-2 p-1 outline-none focus:outline-none hover:border-red-200 focus:border-red-500 cursor-auto focus:placeholder-transparent' 
          placeholder='Type your title' value={this.props.value} onChange={this.handleChange}
          ></input>
        </div>
      </>
    )
  }

  handleChange (event) {
    this.props.titleChange(event.target.value);
  }
}