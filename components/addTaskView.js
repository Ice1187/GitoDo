import AddTitle from '../components/addTitle';
import DateItem from '../components/AddTaskComponents/dateItem';
import ImportanceItem from '../components/AddTaskComponents/importanceItem';
import NoteItem from '../components/AddTaskComponents/noteItem';
import UrlItem from '../components/AddTaskComponents/urlItem';
import React from 'react';
import Link from 'next/link';

export default class AddTaskView extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      taskName: null,
      branchColor: '#f44336',
      isDate: false,
      dueDate: null,
      importance: 0,
      note: null,
      url: null,
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDateToggle = this.handleDateToggle.bind(this);
    this.handleDatePick = this.handleDatePick.bind(this);
    this.handleImportPick = this.handleImportPick.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
  }

  render() {
    return(
      <>
        <form onSubmit={this.handleSubmit}>
          <div className='sm:pt-28 pt-5 lg:ml-80 lg:mr-20 sm:ml-40 ml-5 mr-1 p-5'>
            <h1 className='text-2xl'>Add a new task</h1>
            <p className='text-gray-500'>A task contains notes, due dates, and sub-tasks ... etc.</p>
            <hr className='my-2'></hr>
            <div className='container flex-col'>
              <AddTitle color={this.state.branchColor} name='Task' value={this.state.taskName} titleChange={this.handleTitleChange}></AddTitle>
              {/* TODO: insert branch item and edit func */}
              <DateItem color={this.state.branchColor} isDate={this.state.isDate} dueDate={this.state.dueDate} dateToggle={this.handleDateToggle} datePick={this.handleDatePick}></DateItem>
              <ImportanceItem color={this.state.branchColor} importance={this.state.importance} importPick={this.handleImportPick}></ImportanceItem>
              <NoteItem color={this.state.branchColor} note={this.state.note} noteChange={this.handleNoteChange}></NoteItem>
              <UrlItem color={this.state.branchColor} url={this.state.url} urlChange={this.handleUrlChange}></UrlItem>
            </div> 
            <button type='submit' className='ring-2 ring-green-600 bg-green-200 hover:bg-green-600 text-green-800 hover:text-white rounded-lg shadow-md p-2 focus:outline-none my-3'>
              <span>Add Task</span>
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

  handleDateToggle(checked) {
    if(!checked) {
      this.setState({ dueDate: null });
    }
    this.setState({ isDate: checked, });
  }

  handleTitleChange(value) {
    this.setState({ taskName: value,});
  }

  handleDatePick(moment) {
    this.setState({ dueDate: moment,});
  }

  handleImportPick(index) {
    this.setState({ importance: index,});
  }

  handleNoteChange(value) {
    this.setState({ note: value,});
  }

  handleUrlChange(value) {
    this.setState({ url: value,});
  }
  
  handleSubmit(event) {
    /* TODO: add redirect after submit*/
    // alert('A name was submitted: ' + this.state.branchColor + this.state.branchName + this.state.permission);
    event.preventDefault();
  }
}