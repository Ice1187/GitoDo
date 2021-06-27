// Display page for single branch and edit
import React from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import Header from '../../components/header';
import MainTaskView from '../../components/mainTaskView';
import Footer from '../../components/footer';
import ShareBlock from '../../components/ShareComponent/shareBlcok';
import Link from 'next/link';
import {connect} from 'react-redux';
import { withRouter } from 'next/router'
import { getLine, getNodesByLine } from '../../api/line';
import { modifyNode } from '../../api/node';
import Router from 'next/router';

let qs = require('qs');
class Home extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      all_line: [],
      task: [],
      loading: false,
      share_open: false,
      color: null,
      title: '',
    };

    this.getAllLines = this.getAllLines.bind(this)
    this.getLinetoState = this.getLinetoState.bind(this);
    this.getAllTasks = this.getAllTasks.bind(this);
    this.getLinetoState = this.getLinetoState.bind(this);
    this.handleTaskDone = this.handleTaskDone.bind(this);
    this.handleTaskUndone = this.handleTaskUndone.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.handleUpdateSharer = this.handleUpdateSharer.bind(this);
    this.handleShareOpen = this.handleShareOpen.bind(this);

    this.checkLogin();
  }

  componentDidMount() {
    if(this.props.userId != -1){
      if(this.props.router.query.id){
        this.getAllLines();
      } else{
        Router.push({
          pathname: '/main/branch',
          query: {},
        }, `/main/branch`);
      }
    }
  }

  render(){
    return (
      <>
      {
      this.props.userId != -1 && this.props.router.query.id &&  
      <div className={styles.container}>
        <Head>
          <title>{this.props.router.query.branchName}</title>
          <meta name='description' content='Generated by create next app' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
  
        <Header></Header>
  
        <main className={styles.main + ' bg-gray-100 relative'}>
          <div className='sm:top-28 top-24 lg:right-7 right-2 lg:left-80 left-20 px-10 absolute w-auto'>
            <div className='container flex flex-row mx-auto items-center'>
              <h1 className='text-2xl font-semibold'>Branch -  {this.props.router.query.branchName}</h1>
              <div className='flex-grow' />
              <div className='relative hover-trigger flex flex-row cursor-pointer mr-5' onClick={this.handleShareOpen}>
                {!this.state.share_open && <span className='hover-target rounded-md p-1 bg-opacity-90 bg-gray-800 text-white text-sm absolute top-5 right-7'>Share</span>}
                {!this.state.share_open && <span className='material-icons text-md transform scale-90 text-gray-400 hover:text-gray-600'>ios_share</span>}
                {this.state.share_open && <span className='hover-target rounded-md p-1 bg-opacity-90 bg-gray-800 text-white text-sm absolute top-5 right-7'>Show&nbsp;tasks</span>}
                {this.state.share_open && <span className='material-icons text-md transform scale-90 text-gray-400 hover:text-gray-600'>splitscreen</span>}
              </div>
              <button className='outline-none focus:outline-none bg-blue-200 text-blue-700 ring-2 ring-blue-600 hover:bg-blue-500 hover:text-white rounded-md p-2 py-1'>
                <Link href={{
                  pathname: '/branch-edit/[branchId]',
                  query: { branchId: this.props.router.query.id },
                }} as={`/branch-edit/[branchId]`}>Edit</Link>
              </button>
            </div>
            {this.state.share_open && <ShareBlock color={this.state.color} branchName={this.state.title} lineId={this.state._id}></ShareBlock>}
          </div>
          {!this.state.share_open && <MainTaskView task={this.state.task} onTaskDone={this.handleTaskDone} onTaskUndone={this.handleTaskUndone}></MainTaskView>}
        </main>
  
        <Footer></Footer>
      </div>
      }
      </>
    );
  }

  checkLogin(){
    if(this.props.userId == -1){
      Router.push({
        pathname: '/login',
        query: {},
      }, `/login`);
    }
  }

  getLinetoState(LineId) {
    getLine(LineId).then(Line => {
      if(!this.state.color){
        this.setState({color: Line.color_RGB, title: Line.title, _id: Line._id})
      }
      this.setState({
        all_line: [...this.state.all_line, Line],
      }, () => {
        getNodesByLine(Line._id, 0, 1000, 0).then(task => {
          for(let i = 0; i < task.length; i++) {
            if(task[i].branch_line_id) {
              this.getLinetoState(task[i].branch_line_id[0])
            }
          }
        })
      })
    }).catch(err => {
      console.error('Error fetching branches', err);
    })
  }

  getAllLines(){
    this.setState({
        loading: true,
    }, () => {
      this.getLinetoState(this.props.router.query.id);
      this.setState({
        loading: false,
      }, () => {
        /* FIXME: add mask otherwie if have many branches, we will have no acurate tasks*/
        setTimeout(() => {this.getAllTasks();}, 300);
      })
    })
  }

  getTasktoState(LineObject){
    getNodesByLine(LineObject._id, 0, 1000, 0).then(task => {
      /*inside here and compare */
      let task_new = [{_id:'0'}];
      let state_task = this.state.task
      let state_i = 1;
      let action_i = 0;
      while (state_i < state_task.length || action_i < task.length) {
        if(state_i >= state_task.length && action_i < task.length) {
          task_new = [...task_new, {task:task[action_i], line:LineObject}];
          action_i++;
        }
        else if(state_i < state_task.length && action_i >= task.length) {
          task_new = [...task_new, state_task[state_i]];
          state_i++;
        }
        else {
          let state_ms = Date.parse(state_task[state_i].task.due_date);
          let action_ms = Date.parse(task[action_i].due_date);
          if(state_ms <= action_ms) {
            task_new = [...task_new, state_task[state_i]];
            state_i++;
          } else {
            task_new = [...task_new, {task:task[action_i], line:LineObject}];
            action_i++;
          }
        }
      }
      this.setState({task: task_new});
    })
  }

  getAllTasks(){
    this.setState({
      loading: true,
      task: [],
    }, () => {
      console.log('all', this.state.all_line)
      for(let i = 0; i < this.state.all_line.length; i++){
        this.getTasktoState(this.state.all_line[i])
      }
      this.setState({
        loading: false,
      })
    })
  }

  handleShareOpen() {
    this.setState({share_open: !this.state.share_open})
  }

  handleUpdateSharer() {
    getLine(this.props._id).then(line => {
      this.setState({sharer: line.sharer})
    })
  }

  handleTaskDone(id, time) {
    this.setState({
      loading: true,
    }, () => {
      let data = qs.stringify({
        'achieved': true,
        'achieved_at': time
      })
      modifyNode(id, data).then(() => {
        this.getAllTasks();
      })
      this.setState({
        loading: false,
      })
    })
  }

  handleTaskUndone(id) {
    this.setState({
      loading: true,
    }, () => {
      let data = qs.stringify({
        'achieved': false,
        'achieved_at': null,
      })
      modifyNode(id, data).then(() => {
        this.getAllTasks();
      })
      this.setState({
        loading: false,
      })
    })
  }
}

const mapStateToProps = state => ({
  userId: state.login.userId
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));