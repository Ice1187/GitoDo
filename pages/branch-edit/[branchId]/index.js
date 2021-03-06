// Display page for single branch and edit
import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'next/router';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Router from 'next/router';
import Head from 'next/head';
import styles from '../../../styles/Home.module.css';
import Header from '../../../components/header';
import EditBranchView from '../../../components/editBranchView';
import Footer from '../../../components/footer';
import { getLine } from '../../../api/line';

class Home extends React.Component{
  constructor(props) {
    super(props);

    this.state = {line: []}

    this.getData = this.getData.bind(this)
    this.checkLogin = this.checkLogin.bind(this)
  }

  componentDidMount() {
    this.checkLogin();
    if(this.props.router.query.branchId){
      this.getData();
    } else{
      Router.push({
        pathname: '/main/branch',
        query: {},
      }, `/main/branch`);
    }
  }

  render() {
    let children = (
      <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
        <div></div>
      </ListGroupItem>
    );
    if (this.state.line.length) {
      console.log(this.state.line)
      children = this.state.line.map((p) => (
        <ListGroupItem key={p._id} action>
          <EditBranchView {...p} node_id={this.props.router.query.node_id}/>
        </ListGroupItem>
      ));
    }
    return (
      <div className={styles.container}>
        <Head>
          <title>Edit Branch</title>
          <meta name='description' content='Generated by create next app' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
  
        <Header></Header>
  
        <main className={styles.main + ' bg-gray-100'}>
          <ListGroup>
              {children}
          </ListGroup>
        </main>
  
        <Footer></Footer>
      </div>
    );
  }

  checkLogin(){
    console.log(this.props.userId)
    if(this.props.userId == -1){
      Router.push({
        pathname: '/login',
        query: {},
      }, `/login`);
    }
  }

  getData(){
    getLine(this.props.router.query.branchId).then (Line => {
      this.setState({line: [Line]})
    })
  }
}

const mapStateToProps = state => ({
  userId: state.login.userId
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));