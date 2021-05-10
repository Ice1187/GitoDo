import React from 'react';

export default class Search extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      searchStatus: false
    };

    this.handleClick = this.handleClick.bind(this);
    
  }

  handleClick() {
    this.setState({searchStatus: !this.state.searchStatus});
  }
  
  /* TODO: Change the method of button and adjust the input field */

  render() {
    return(
      <>
        <div className='mr-5'>
          {this.state.searchStatus && <input type='search' className='mx-3 border-solid border-gray-300 border-2 rounded-lg hover:border-red-500 focus:border-red-500 outline-none px-2 transition-transform animate-pulse' placeholder='search for you want'></input>}
          <button type='submit' className='outline-none focus:outline-none' onClick={this.handleClick}>
          <svg className='mt-1 text-gray-600 h-4 w-4 fill-current items-end' xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 56 56'>
            <path
              d='M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z'/>
          </svg>
        </button>
        </div>
      </>
    );
  }
  
}