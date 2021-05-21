import React from 'react';
import Switch from 'react-switch';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';

export default class DateItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {open: false,};

    this.handleDateToggle = this.handleDateToggle.bind(this);
    this.handleDatePick = this.handleDatePick.bind(this);
    this.handleDateExpand = this.handleDateExpand.bind(this);
  }

  render() {
    const stylebranch = {
      backgroundColor: this.props.color,
      '--tw-ring-color': this.props.color
    } 
    return (
      <>
        <div className={`container shadow rounded-lg p-4 my-3 flex-col items-center cursor-default bg-white`}>
          <div className='flex flex-row items-center'>
            <div className={`sm:ml-5 h-4 w-0.5 ring-2`} style={stylebranch}></div>
            <span className='ml-5 font-semibold overflow-hidden'>Due Time</span>
            <div className='flex-grow'/>
            <span className='mr-5 text-sm font-normal text-blue-500 overflow-hidden hover:text-blue-700 cursor-pointer' onClick={this.handleDateExpand}>{this.props.dueDate}</span>
            <Switch checked={this.props.isDate} checkedIcon={false} uncheckedIcon={false} width={36} height={20} activeBoxShadow='0 0 0px 0px #fff'
            className='sm:mr-10 mr-5 p-0' onChange={this.handleDateToggle} id='date'></Switch>
          </div>
          { this.state.open && this.props.isDate && 
              <Datetime className='m-1 mt-3 shadow-sm transition-all duration-500' input={false} initialViewMode='days' onChange={this.handleDatePick} initialValue={moment.now()}></Datetime>
          }
        </div>
      </>
  )}

  handleDateToggle (checked, event, id) {
    this.props.dateToggle(checked, event, id);
    if(checked) {
      this.setState({ open: true, });
    } else {
      this.setState({ open: false, });
    }
  }

  handleDatePick (moment) {
    this.props.datePick(moment.format("YYYY-MM-DD HH:mm ddd"));
  }

  handleDateExpand () {
    this.setState({ open: !this.state.open, });
  }
}