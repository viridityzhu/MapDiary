import React, { Component } from 'react'
import styles from './index.module.less'
import Header from "../../components/Layout/Header";
import SideNav from "../../components/Layout/SideNav";
import Footer from "../../components/Layout/Footer";
import Mapbox from '../Mapbox'
import { message } from 'antd';
import { useParams } from 'react-router-dom';
import graphQLFetch from '../../browser/graphQLFetch';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideNav: false,
      currentMarker:'',
      text:''
    };
    this.showSideNav = this.showSideNav.bind(this);
    this.changeText = this.changeText.bind(this);
    this.setCurrentMarker = this.setCurrentMarker.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClear = this.onClear.bind(this);
  }
  changeText(text){
    this.setState({text:text});
  }
  async onSubmit (){
    const text=this.state.text;

    if (text.length === 0) {message.info("You haven't written down anything!")}
    else { //markerAdd(marker: Newmarker!): String
      // Newmarker{
      //   username: Int!
      //   content: String
      //   position: [Float!]!
      //   is_public: Boolean
      // }
      const marker = {
        username:this.props.params.user,
        content:text,
        position:[this.state.currentMarker.lat, this.state.currentMarker.lng],
        is_public:true
      }
      console.log(marker);
      
      const query = `mutation markerAdd( $marker: Newmarker!) {
        markerAdd(
          marker: $marker
        ) 
      }`;
      const data = await graphQLFetch(query, { marker }, null);
      if (data) {
        console.log(data);
        message.success('Submit new pin!');
      }
    }

  }
  onClear(){
    this.setState({text:''});
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
          <div>{this.state.showSideNav ? <SideNav changeText={this.changeText} onClear={this.onClear} onSubmit={this.onSubmit}/> : <div></div>}</div>
          
          <Mapbox text={this.state.text} username={this.props.params.user} showSideNav={this.showSideNav} setCurrentMarker={this.setCurrentMarker}/>
        </div>
        <Footer />
      </div>
    )
  }
}
function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
};
export default withParams(Homepage);