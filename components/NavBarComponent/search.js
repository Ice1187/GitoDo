import React from 'react';

export default class Search extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      searchStatus: false,
      searchText: '',
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
  }

  handleClick() {
    this.setState({searchStatus: !this.state.searchStatus});
  }
  
  /* TODO: Change the method of button and adjust the input field */

  render() {
    return(
      <>
        <div className='flex-row inline-flex relative'>
          <input type='text' className='p-1 mx-3 border-solid border-gray-300 border-2 rounded-lg hover:border-red-500 focus:border-red-500 outline-none px-2 transition-transform' 
              placeholder='Search' onKeyPress={this.handleSearchKeyPress}></input>
          <button type='submit' className='text-gray-400 outline-none focus:outline-none absolute right-5' onClick={this.handleClick}>
            <span className='pt-2 material-icons'>search</span>
          </button>
        </div>
      </>
    );
  }

  handleSearchKeyPress(e) {
    let keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      this.setState({
        searchText: e.target.value,
      });
    }
  }
}