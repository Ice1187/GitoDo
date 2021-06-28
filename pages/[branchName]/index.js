// Display page for single branch and edit
import React from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import Header from '../../components/header';
import MainTaskView from '../../components/mainTaskView';
import Footer from '../../components/footer';
import ShareBlock from '../../components/ShareComponent/shareBlcok';
import Link from 'next/link';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { getLine, getNodesByLine } from '../../api/line';
import { modifyNode } from '../../api/node';
import Router from 'next/router';

import SvgTaskView from '../../components/svgTaskView';

let qs = require('qs');
class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      all_line: [],
      task: [],
      position: [],
      loading: false,
      share_open: false,
      color: null,
      title: '',
      shareLineId: '',
    };

    this.handleStore = this.handleStore.bind(this);
    this.handleDraw = this.handleDraw.bind(this);
    this.getAllLines = this.getAllLines.bind(this);
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
    if (this.props.userId != -1) {
      if (this.props.router.query.id) {
        this.getAllLines();
      } else {
        Router.push(
          {
            pathname: '/main/branch',
            query: {},
          },
          `/main/branch`
        );
      }
    }
  }

  render() {
    return (
      <>
        {this.props.userId != -1 && this.props.router.query.id && (
          <div className={styles.container}>
            <Head>
              <title>{this.props.router.query.branchName}</title>
              <meta name='description' content='Generated by create next app' />
              <link rel='icon' href='/favicon.ico' />
            </Head>

            <Header></Header>

            <main className={styles.main + ' bg-gray-100 relative'}>
              <SvgTaskView
                lines={this.state.all_line}
                tasks={this.state.task}
                positions={this.state.position}
              ></SvgTaskView>
              <div className='sm:top-28 top-24 lg:right-7 right-2 lg:left-80 left-8 px-10 absolute w-auto'>
                <div className='container flex flex-row mx-auto items-center'>
                  <h1 className='sm:text-2xl text-md sm:w-auto w-40 font-semibold'>
                    Branch - {this.props.router.query.branchName}
                  </h1>
                  <div className='flex-grow' />
                  {(this.props.router.query.sharerLineId === this.props.router.query._id || !this.props.router.query.sharerLineId) && (
                    <div
                      className='relative hover-trigger flex flex-row cursor-pointer mr-5'
                      onClick={this.handleShareOpen}
                    >
                      {!this.state.share_open && (
                        <span className='hover-target rounded-md p-1 bg-opacity-90 bg-gray-800 text-white text-sm absolute top-5 right-7'>
                          Share
                        </span>
                      )}
                      {!this.state.share_open && (
                        <span className='material-icons text-md transform scale-90 text-gray-400 hover:text-gray-600'>
                          ios_share
                        </span>
                      )}
                      {this.state.share_open && (
                        <span className='hover-target rounded-md p-1 bg-opacity-90 bg-gray-800 text-white text-sm absolute top-5 right-7'>
                          Show&nbsp;tasks
                        </span>
                      )}
                      {this.state.share_open && (
                        <span className='material-icons text-md transform scale-90 text-gray-400 hover:text-gray-600'>
                          splitscreen
                        </span>
                      )}
                    </div>
                  )}
                  <button className='outline-none focus:outline-none bg-blue-200 text-blue-700 ring-2 ring-blue-600 hover:bg-blue-500 hover:text-white rounded-md p-2 py-1'>
                    <Link
                      href={{
                        pathname: '/branch-edit/[branchId]',
                        query: {
                          branchId: this.props.router.query.id,
                          node_id: this.props.router.query.node_id,
                        },
                      }}
                      as={`/branch-edit/[branchId]`}
                    >
                      Edit
                    </Link>
                  </button>
                </div>
                {this.state.share_open &&
                  (this.props.router.query.sharerLineId === this.props.router.query.id || !this.props.router.query.sharerLineId) && (
                    <ShareBlock
                      color={this.state.color}
                      branchName={this.state.title}
                      lineId={this.props.router.query.id}
                    ></ShareBlock>
                  )}
              </div>
              {!this.state.share_open && (
                <MainTaskView
                  loading={this.state.loading}
                  userId={this.props.userId}
                  onDraw={this.handleDraw}
                  task={this.state.task}
                  onTaskDone={this.handleTaskDone}
                  onTaskUndone={this.handleTaskUndone}
                ></MainTaskView>
              )}
              {this.state.loading == true && (
                <div className='flex flex-row container justify-center w-16 h-8 items-center fixed bottom-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-md '>
                  <div
                    className={`h-2 w-2 bg-white ring-2 ring-green-500 animate-bounce200 rounded-full mr-2`}
                  ></div>
                  <div
                    className={`h-2 w-2 bg-white ring-2 ring-red-500 animate-bounce400 rounded-full mr-2`}
                  ></div>
                  <div
                    className={`h-2 w-2 bg-white ring-2 ring-blue-500 animate-bounce100 rounded-full`}
                  ></div>
                </div>
              )}
            </main>

            <Footer></Footer>
          </div>
        )}
      </>
    );
  }

  handleDraw(index, task_id, branch_color, mother_id, x, y) {
    let obj = {
      index: index,
      task_id: task_id,
      branch_color: branch_color,
      mother_id: mother_id,
      x: x,
      y: y,
    };
    setTimeout(() => {
      this.handleStore(obj);
    }, index * 3);
  }

  handleStore(obj) {
    this.setState({ position: [...this.state.position, obj] });
  }

  checkLogin() {
    if (this.props.userId == -1) {
      Router.push(
        {
          pathname: '/login',
          query: {},
        },
        `/login`
      );
    }
  }

  getLinetoState(LineId, node) {
    getLine(LineId)
      .then((Line) => {
        let line_new = [];
        let state_task = this.state.all_line;
        let state_i = 0;
        let action_i = 0;
        while (state_i < state_task.length || action_i < 1) {
          if (state_i >= state_task.length && action_i < 1) {
            line_new = [...line_new, { Line: Line, Node: node }];
            action_i++;
          } else if (state_i < state_task.length && action_i >= 1) {
            line_new = [...line_new, state_task[state_i]];
            state_i++;
          } else {
            let state_ms = Date.parse(state_task[state_i].Node.due_date);
            let action_ms = Date.parse(node.due_date);
            if (state_ms <= action_ms) {
              line_new = [...line_new, state_task[state_i]];
              state_i++;
            } else {
              line_new = [...line_new, { Line: Line, Node: node }];
              action_i++;
            }
          }
        }
        this.setState(
          {
            all_line: line_new,
          },
          () => {
            getNodesByLine(Line._id, 0, 1000, 0).then((task) => {
              for (let i = 0; i < task.length; i++) {
                if (task[i].branch_line_id) {
                  this.getLinetoState(task[i].branch_line_id[0], task[i]);
                }
                setTimeout(() => {}, 10);
              }
            });
          }
        );
      })
      .catch((err) => {
        console.error('Error fetching branches', err);
      });
  }

  getAllLines() {
    this.setState(
      {
        loading: true,
      },
      () => {
        this.getLinetoState(this.props.router.query.id,
          { 'due_date': '2021-01-01T18:50:21.000Z' });
        getLine(this.props.router.query.id).then(line => {
          this.setState({shareLineId: line.shareLineId})
        })
        setTimeout(() => {
          this.getAllTasks();
        }, 1000);
        setTimeout(() => {
          this.setState({ loading: false });
        }, 1500);
      }
    );
  }

  getTasktoState(LineObject, index) {
    getNodesByLine(LineObject._id, 0, 1000, 0).then((task) => {
      /*inside here and compare */
      let task_new = [{ _id: '0' }];
      let state_task = this.state.task;
      let state_i = 1;
      let action_i = 0;
      while (state_i < state_task.length || action_i < task.length) {
        if (state_i >= state_task.length && action_i < task.length) {
          task_new = [
            ...task_new,
            { task: task[action_i], line: LineObject, depth: index },
          ];
          action_i++;
        } else if (state_i < state_task.length && action_i >= task.length) {
          task_new = [...task_new, state_task[state_i]];
          state_i++;
        } else {
          let state_ms = Date.parse(state_task[state_i].task.due_date);
          let action_ms = Date.parse(task[action_i].due_date);
          if (state_ms <= action_ms) {
            task_new = [...task_new, state_task[state_i]];
            state_i++;
          } else {
            task_new = [
              ...task_new,
              { task: task[action_i], line: LineObject, depth: index },
            ];
            action_i++;
          }
        }
      }
      this.setState({ task: task_new });
    });
  }

  getAllTasks() {
    this.setState(
      {
        loading: true,
        task: [],
      },
      () => {
        for (let i = 0; i < this.state.all_line.length; i++) {
          this.getTasktoState(this.state.all_line[i].Line, i);
          setTimeout(() => {}, 30);
        }
        this.setState({
          loading: false,
        });
      }
    );
  }

  handleShareOpen() {
    this.setState({ share_open: !this.state.share_open });
  }

  handleUpdateSharer() {
    getLine(this.props._id).then((line) => {
      this.setState({ sharer: line.sharer });
    });
  }

  handleTaskDone(id, time, index) {
    this.setState(
      {
        loading: true,
      },
      () => {
        let data = qs.stringify({
          achieved: true,
          achieved_at: time,
        });
        modifyNode(id, data).then(() => {
          let task = this.state.task;
          task[index + 1].task.achieved = true;
          task[index + 1].task.achieved_at = time;
          this.setState({ task: task });
        });
        this.setState({
          loading: false,
        });
      }
    );
  }

  handleTaskUndone(id, index) {
    this.setState(
      {
        loading: true,
      },
      () => {
        let data = qs.stringify({
          achieved: false,
          achieved_at: 'null',
        });
        modifyNode(id, data).then(() => {
          let task = this.state.task;
          task[index + 1].task.achieved = false;
          task[index + 1].task.achieved_at = null;
          this.setState({ task: task });
        });
        this.setState({
          loading: false,
        });
      }
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.login.userId,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
