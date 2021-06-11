import React from 'react';
import BranchChooseList from './BranchChooseList'

export default class ImportanceItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {open: false};

    this.handleBranchChoose = this.handleBranchChoose.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
  }

  render() {
    const stylebranch = {
      backgroundColor: this.props.color,
      '--tw-ring-color': this.props.color
    } 
    return (
      <>
        <div className={`container shadow rounded-lg p-4 my-3 flex-col items-center bg-white cursor-default group`} onClick={this.handleExpand}>
          <div className='flex flex-row items-center cursor-pointer'>
            <div className={`sm:ml-5 h-4 w-0.5 ring-2`} style={stylebranch}></div>
            <span className='ml-5 font-semibold overflow-hidden'>Branch</span>
            <div className='flex-grow'></div>
            <span className='pb-0.5 mr-5 overflow-hidden items-center font-medium'>{this.props.branchTitle}</span>
            <span className={'material-icons text-gray-400 hover:text-gray-700 transform origin-center transition-all sm:mr-12 cursor-pointer mr-7' + (this.state.open ? ' rotate-180' : ' rotate-0')} onClick={this.handleImportExpand}>expand_more</span>
          </div>
          {this.state.open &&
            <div className='sm:mx-8 sm:my-5 my-2 mx-4'>
              <BranchChooseList ChooseBranch={this.handleBranchChoose}></BranchChooseList>
            </div>
          }
        </div>
      </>
  )}
  
  handleBranchChoose (title, id, color) {
    this.props.ChooseBranch(title, id, color);
  }

  handleExpand () {
    this.setState({ open: !this.state.open, });
  }
}