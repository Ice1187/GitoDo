import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import BranchChooseItem from './BranchChooseItem';
import {connect} from 'react-redux';
import { getLine } from '../../api/line';
import { getUser } from '../../api/user';

class BranchChooseList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {allLine: []};

    this.getAllBranches = this.getAllBranches.bind(this);
    this.handleChooseBranch = this.handleChooseBranch.bind(this);
    this.getBranchOwner = this.getBranchOwner.bind(this);
  }

  componentDidMount(){
    this.getAllBranches(this.props.mainLine)
  }

  render() {
    let children = (
      <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
        <div></div>
      </ListGroupItem>
    );
    children = this.props.mainLine.map((p) => (
        <ListGroupItem key={p._id} action>
          <BranchChooseItem {...p} ChooseBranch={this.handleChooseBranch}/>
        </ListGroupItem>
    ));
    /*
    if (this.state.allLine.length > 0) {
      children = this.state.allLine.map((p) => (
        <ListGroupItem key={p._id} action>
          <BranchChooseItem {...p} ChooseBranch={this.handleChooseBranch}/>
        </ListGroupItem>
      ));
    }*/

    return (
      <div className=''>
        <ListGroup>
          {children}
        </ListGroup>
      </div>
    );
  }

  handleChooseBranch(title, id, color) {
    this.props.ChooseBranch(title, id, color);
  }

  getAllBranches(LineObject) {
    if(LineObject.branch_line_id) {
      for(let i = 0; i < LineObject.branch_line_id.length; i++) {
        getLine(LineObject.branch_line_id[i]).then(Line => {
          getUser(Line.owner).then(res => {
            let owner = res.account
            this.setState = ({ allLine: [...this.state.allLine, {Line, owner}] });
          }).catch(err => {
            console.error('Error fetching owner', err);
          })
          this.getAllBranches(Line);
        }).catch(err => {
          console.error('Error fetching branches', err);
        })
      }
    }
  }

  getBranchOwner(owner) {
    getUser(owner).then(res => {
      return res.account
    }).catch(err => {
      console.error('Error fetching owner', err);
    })
  }
}

const mapStateToProps = state => ({
  userId: state.login.userId,
  mainLine: state.branch.mainLine,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BranchChooseList);