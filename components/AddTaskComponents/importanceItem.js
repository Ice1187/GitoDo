import React from 'react';
import { SegmentedControl } from 'segmented-control-react';

export default class ImportanceItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {open: false,};

    this.handleImportPick = this.handleImportPick.bind(this);
    this.handleImportExpand = this.handleImportExpand.bind(this);
  }

  render() {
    const stylebranch = {
      backgroundColor: this.props.color,
      '--tw-ring-color': this.props.color
    } 
    const segments = [
      { name: 'None' },
      { name: 'Low' },
      { name: 'Medium'},
      { name: 'High' }
    ]
    const importance = [
      'None', '!', '!!', '!!!'
    ]
    return (
      <>
        <div className={`container shadow rounded-lg p-4 my-3 flex-col items-center bg-white cursor-default group`}>
          <div className='flex flex-row items-center'>
            <div className={`sm:ml-5 h-4 w-0.5 ring-2`} style={stylebranch}></div>
            <span className='ml-5 font-semibold overflow-hidden'>Importance</span>
            <div className='flex-grow'/>
            <span className='font-normal pb-0.5 mr-5 text-gray-500 overflow-hidden'>{importance[this.props.importance]}</span>
            <span className={'material-icons text-gray-400 hover:text-gray-700 transform origin-center transition-all mr-12 cursor-pointer' + (this.state.open ? ' rotate-180' : ' rotate-0')} onClick={this.handleImportExpand}>expand_more</span>
          </div>
          {this.state.open &&
            <div className='px-16 py-5'>
              <SegmentedControl segments={segments}
              variant='dark'
              onChangeSegment={this.handleImportPick }></SegmentedControl>
            </div>
          }
        </div>
      </>
  )}

  handleImportPick (index) {
    this.props.importPick(index);
  }

  handleImportExpand () {
    this.setState({ open: !this.state.open, });
  }
}