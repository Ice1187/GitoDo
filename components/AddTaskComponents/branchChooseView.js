import React from 'react';
import BranchChooseList from './BranchChooseList'
import { getLine } from '../../api/line';
import { getUser } from '../../api/user';
import {connect} from 'react-redux';
import {endListAllLineClear, listAllLine_more, listMainBranch, endListAllMainClear, listAllMain_more} from '../../redux/actions/branchActions';

class BranchChooseView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {open: false};

    this.handleBranchChoose = this.handleBranchChoose.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.getAllBranches = this.getAllBranches.bind(this);
    this.getAllBranches_without = this.getAllBranches_without.bind(this);
  }

  componentDidMount() {
    this.props.listMainBranch(this.props.userId);
    if(this.props.view == 'task')
      this.getAllBranches(this.props.mainLine, this.props.mainLine.branch_line_id.length, 0)
    else
      this.getAllBranches_without(this.props.mainLine, this.props.mainLine.branch_line_id.length, 0)
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
            <span className='ml-5 font-semibold overflow-hidden'>{this.props.view == 'task' ? 'Branch' : 'Branch From'}</span>
            <div className='flex-grow'></div>
            <span className='mr-5 overflow-hidden items-center font-medium'>{this.props.branchTitle}</span>
            <span className={'material-icons text-gray-400 hover:text-gray-700 transform origin-center transition-all sm:mr-12 cursor-pointer mr-7' + (this.state.open ? ' rotate-180' : ' rotate-0')} onClick={this.handleImportExpand}>expand_more</span>
          </div>
          {this.state.open &&
            <div className='sm:mx-8 sm:my-5 my-2 mx-4'>
              <BranchChooseList ChooseBranch={this.handleBranchChoose} allLine={this.props.view == 'task' ? this.props.allLine : this.props.allMain} nowChoose={this.props.branchId}></BranchChooseList>
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

  getAllBranches(LineObject, limit, now) {
    if(LineObject == this.props.mainLine && now == 0) {
      this.props.listAllLineClear();
    }
    if(now < limit) {
      getLine(LineObject.branch_line_id[now]).then(Line => {
        getUser(Line.owner).then(res => {
          let owner = res.account;
          this.props.listAllLineMore(Line, owner, LineObject)
          if(Line.contain_branch)
            this.getAllBranches(Line, Line.branch_line_id.length, 0);
          this.getAllBranches(LineObject, limit, now+1)
        }).catch(err => {
          console.error('Error fetching owner', err);
        })
      }).catch(err => {
        console.error('Error fetching branches', err);
      })
    }
  }

  getAllBranches_without(LineObject, limit, now) {
    if(LineObject == this.props.mainLine && now == 0) {
      this.props.listAllMoreClear();
    }
    if(now < limit) {
      getLine(LineObject.branch_line_id[now]).then(Line => {
        getUser(Line.owner).then(res => {
          let owner = res.account;
          this.props.listAllMainMore(Line, owner, this.props.mainLine)
          this.getAllBranches_without(LineObject, limit, now+1)
        }).catch(err => {
          console.error('Error fetching owner', err);
        })
      }).catch(err => {
        console.error('Error fetching branches', err);
      })
    }
  }
}

const mapStateToProps = state => ({
  userId: state.login.userId,
  mainLine: state.branch.mainLine,
  branchLoading: state.branch.branchLoading,
  allLine: state.branch.allLine,
  allMain: state.branch.allMain,
});

const mapDispatchToProps = {
  listMainBranch: listMainBranch,
  listAllLineClear: endListAllLineClear,
  listAllLineMore: listAllLine_more,
  listAllMoreClear: endListAllMainClear,
  listAllMainMore: listAllMain_more,
};

export default connect(mapStateToProps, mapDispatchToProps)(BranchChooseView);
