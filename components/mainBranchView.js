import BranchItem from './ShareComponent/branchItem';
import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class MainBranchDisplay extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    let b = {
      'id' : 1933,
      'branchName': 'Main',
      'owner': 'Alice',
      'sharer': [],
      'color': '#f44336',
      'isMain': true,
      'permission': 'public'
    };
    let c = {
      'id' : 1944,
      'branchName': 'Software Studio',
      'owner': 'Lucy',
      'sharer': ['Bob', 'Chris', 'Edward', 'Fill', 'Alice'],
      'color': '#ffc107',
      'isMain': true,
      'permission': 'public',
    };
    let d = {
      'id' : 1955,
      'branchName': 'Project',
      'owner': 'Lucy',
      'sharer': ['Bob', 'Chris', 'Edward', 'Fill', 'Alice'],
      'color': '#00bcd4',
      'permission': 'public',
      'isMain': false,
      'branchFrom': 'Software Studio',
    };
    let branch = [b, c, d, c, d, c, d];
    let children = (
      <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
        <div></div>
      </ListGroupItem>
    );
    if (branch.length) {
      children = branch.map((p) => (
        <ListGroupItem key={p.id} action>
          <BranchItem {...p}/>
        </ListGroupItem>
      ));
    }

    return (
      <div className='sm:pt-40 pt-20 lg:ml-80 lg:mr-10 md:ml-20 ml-16 mr-1 p-5'>
        <ListGroup>
          {children}
        </ListGroup>
      </div>
    );
  }
}