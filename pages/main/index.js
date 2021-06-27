import React from 'react';
import {connect} from 'react-redux';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import Header from '../../components/header';
import MainTaskView from '../../components/mainTaskView';
import Footer from '../../components/footer';
import { getLine, getNodesByLine } from '../../api/line';
import { listMainBranch } from '../../redux/actions/branchActions';
import { modifyNode } from '../../api/node';
import Router from 'next/router';

let qs = require('qs');
class Home extends React.Component{
  
  constructor(props) {
    super(props);

    this.state = {
      /* TODO: change to state not redux */
      all_line: [],
      task: [],
      position: [],
      loading: false,
      trigger: false,
    };

    this.handleTrigger = this.handleTrigger.bind(this);
    this.handleStore = this.handleStore.bind(this);
    this.handleDraw = this.handleDraw.bind(this);
    this.getAllLines = this.getAllLines.bind(this);
    this.getLinetoState = this.getLinetoState.bind(this);
    this.getAllTasks = this.getAllTasks.bind(this);
    this.getLinetoState = this.getLinetoState.bind(this);
    this.handleTaskDone = this.handleTaskDone.bind(this);
    this.handleTaskUndone = this.handleTaskUndone.bind(this);
    this.checkLogin = this.checkLogin.bind(this);

    this.checkLogin();
  }

  componentDidMount() {
    if(this.props.userId != -1) {
      this.props.listMainBranch(this.props.userId);
      setTimeout(() => {
        this.getAllLines();
      }, 100);
    }
  }

  render() {
    console.log(this.state.task)
    return (
      <>
      {
      this.props.userId != -1 && 
      <div className={styles.container}>
        <Head>
          <title>GitoDo</title>
          <meta name='description' content='Generated by create next app' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
  
        <Header></Header>
  
        <main className={styles.main + ' bg-gray-100 relative'}>
          <div className='sm:top-28 top-24 lg:right-7 right-2 lg:left-80 left-20 px-10 absolute w-auto'>
            <div className='container flex flex-row mx-auto items-center'>
              <h1 className='text-2xl font-semibold'>Task</h1>
              <div className='flex-grow' />
            </div>
          </div>
          <MainTaskView onTrigger={this.handleTrigger} trigger={this.state.trigger} userId={this.props.userId} loading={this.state.loading} onDraw={this.handleDraw} task={this.state.task} onTaskDone={this.handleTaskDone} onTaskUndone={this.handleTaskUndone}></MainTaskView>
          {this.state.loading == true && 
            <div className='flex flex-row container justify-center w-16 h-8 items-center fixed bottom-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-md '>
              <div className={`h-2 w-2 bg-white ring-2 ring-green-500 animate-bounce200 rounded-full mr-2`}></div>
              <div className={`h-2 w-2 bg-white ring-2 ring-red-500 animate-bounce400 rounded-full mr-2`}></div>
              <div className={`h-2 w-2 bg-white ring-2 ring-blue-500 animate-bounce100 rounded-full`}></div>
            </div>
          }
        </main>
  
        <Footer></Footer>
      </div>
      }
      </>  
    );
  }

  handleTrigger(){
    this.setState({trigger: true})
    setTimeout(() => {this.setState({trigger: false})}, 30);
  }

  handleDraw(index, task_id, branch_color, mother_id, x, y) {
    let obj = {index:index, task_id: task_id, branch_color: branch_color, mother_id: mother_id, x: x, y: y};
    setTimeout(() => {this.handleStore(index, obj)}, index * 50);
  }

  handleStore(index, obj) {
    if(this.state.position.length >= index) {
      let pos = this.state.position;
      pos[index] = obj;
      this.setState({position: pos})
    } else {
      this.setState({position: [...this.state.position, obj]});
    }
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
    if(LineId == this.props.mainLine._id) {
      getNodesByLine(LineId, 0, 1000, 0).then(task => {
        for(let i = 0; i < task.length; i++) {
          if(task[i].branch_line_id) {
            this.getLinetoState(task[i].branch_line_id[0])
          }
        }
      }).catch(err => {
        console.error('Error fetching branches', err);
      })
    } else {
      getLine(LineId).then(Line => {
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
  }

  getAllLines(){
    this.setState({
        loading: true,
    }, () => {
      this.getLinetoState(this.props.mainLine._id);
      setTimeout(() => {this.getAllTasks();}, 500);
      setTimeout(() => {this.setState({loading: false,})}, 1000);
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
      for(let i = 0; i < this.state.all_line.length; i++){
        this.getTasktoState(this.state.all_line[i])
      }
      this.setState({
        loading: false,
      })
    })
  }

  handleTaskDone(id, time, index) {
    this.setState({
      loading: true,
    }, () => {
      let data = qs.stringify({
        'achieved': true,
        'achieved_at': time
      })
      modifyNode(id, data).then(() => {
        let task = this.state.task;
        task[index+1].achieved = true;
        task[index+1].achieved_at = time;
        this.setState({task: task});
      })
      this.setState({
        loading: false,
      })
    })
  }

  handleTaskUndone(id, index) {
    this.setState({
      loading: true,
    }, () => {
      let data = qs.stringify({
        'achieved': false,
        'achieved_at': 'null',
      })
      modifyNode(id, data).then(() => {
        let task = this.state.task;
        task[index+1].achieved = false;
        task[index+1].achieved_at = null;
        this.setState({task: task});
      })
      this.setState({
        loading: false,
      })
    })
  }
}

const mapStateToProps = state => ({
  userId: state.login.userId,
  mainLine: state.branch.mainLine,
});

const mapDispatchToProps = {
  listMainBranch: listMainBranch,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
