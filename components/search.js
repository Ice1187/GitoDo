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
        <div className='mr-3 flex-row inline-flex'>
          <input type='search' className='mx-3 border-solid border-gray-300 border-2 rounded-lg hover:border-red-500 focus:border-red-500 outline-none px-2 transition-transform' placeholder='search for you want'></input>
          <button type='submit' className='outline-none focus:outline-none' onClick={this.handleClick}>
            <span className='pt-2 material-icons'>search</span>
          </button>
        </div>
      </>
    );
  }
  
}