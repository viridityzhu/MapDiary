import React, { Component } from 'react'
import styles from './index.module.css'
import Header from "../../components/Layout/Header";
import SideNav from "../../components/Layout/SideNav";
import Footer from "../../components/Layout/Footer";
import Mapbox from '../Mapbox'

export default class Homepage extends Component {
  render() {
    return (
      <div className={styles['homepage-wrapper']}>
          
          <Header />
        <div className={styles.content}>
          <SideNav />
          <Mapbox />
        </div>
        <Footer />
      </div>
    )
  }
}
