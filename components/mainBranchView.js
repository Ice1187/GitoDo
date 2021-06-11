import BranchItem from './ShareComponent/branchItem';
import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class MainBranchDisplay extends React.Component{
  constructor(props) {
    super(props);

    this.state = ({});

  }

  render() {
    let allLine = [...this.props.allLine]
    if(!allLine) allLine = [];
    let children = (
      <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
        <div></div>
      </ListGroupItem>
    );
    if (allLine.length > 1) {
      allLine.shift();
      children = allLine.map((p) => (
        <ListGroupItem key={p.Line._id} action>
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