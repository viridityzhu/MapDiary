import React, { Component } from 'react'
import styles from './index.module.less'
import Header from "../../components/Layout/Header";
import SideNav from "../../components/Layout/SideNav";
import Footer from "../../components/Layout/Footer";
import Mapbox from '../Mapbox'


export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideNav: false,
      currentMarker:''
    };
    this.showSideNav = this.showSideNav.bind(this);

    this.setCurrentMarker = this.setCurrentMarker.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  showSideNav(yesorno) {
    this.setState({ showSideNav: yesorno });
    console.log("home showSideNav: ");
    console.log(yesorno);
  }

  setCurrentMarker(pos) {
    this.setState({currentMarker:pos});
    console.log("home currentMarker: ");
    console.log(pos);
  }
  render() {
    return (
      <div className={styles['homepage-wrapper']}>
          <Header />
        <div className={styles.content}>
          <div>{this.state.showSideNav ? <SideNav /> : <div></div>}</div>
          
          <Mapbox showSideNav={this.showSideNav} setCurrentMarker={this.setCurrentMarker}/>
        </div>
        <Footer />
      </div>
    )
  }
}
