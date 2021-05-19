import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default class ShareBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      copied: false,
    };
    
  }

  render(){
    let Link = 'http://gitodo.com/shared/mapping/16ddfw4';
    const stylebar = {
      backgroundColor: this.props.color,
      '--tw-ring-color': this.props.color
    }
    return (
      /* TODO: make all color bar have same color but use redux to manage state*/
      <>
        <div className={`container shadow rounded-lg p-4 my-3 flex-col items-center cursor-default bg-white`}>
          <div className='container items-center flex'>
            <div className={`sm:ml-5 h-4 w-0.5 ring-2`} style={stylebar}></div>
            <span className='ml-5 font-semibold overflow-hidden'>Share with Others</span>
          </div>
          <div className='container flex items-center mt-4 mb-2 sm:ml-10 mr-0 sm:mx-auto ring-gray-500 sm:pr-5'>
            <span className='bg-green-100 text-green-800 p-2 rounded-md w-36 sm:w-auto overflow-scroll'>{Link}</span>
            <CopyToClipboard text={Link} onCopy={() => this.setState({copied: true})}>
              <button className='sm:ml-5 ml-2 bg-blue-100 text-blue-800 w-24 rounded-md p-2 focus:outline-none'>Copy link</button>
            </CopyToClipboard>
          </div>
          {this.state.copied && <p className='block w-auto sm:ml-10 text-gray-500 overflow-hidden'>You can import this branch once you have created it.</p>}
        </div>
      </>
    )
  }

  handleChangeComplete(color) {
    this.setState({ color: color.hex, });
  }
}