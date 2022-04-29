import React, { Component } from 'react'
import styles from './index.module.less'
import Header from "../../components/Layout/Header";
import SideNav from "../../components/Layout/SideNav";
import SideContent from "../SideContent"
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
      showMarkerContent: false,
      currentMarker:'',
      text:'',
      marker:null,
      addedMarker:null
    };
    this.showSideNav = this.showSideNav.bind(this);
    this.showMarkerContent = this.showMarkerContent.bind(this);
    this.changeText = this.changeText.bind(this);
    this.setCurrentMarker = this.setCurrentMarker.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClear = this.onClear.bind(this);
  }
  showMarkerContent(marker) {
    this.setState({showMarkerContent:true, marker:marker, showSideNav:false});
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
        ) {id username created_time
          content position is_public}
      }`;
      const data = await graphQLFetch(query, { marker }, null);
      if (data) {
        console.log("submitted pin", data.markerAdd);
        message.success('Submit new pin!');
        // window.location.reload();
        this.setState({showMarkerContent:true, marker:data.markerAdd, showSideNav:false, currentMarker:'', addedMarker:data.markerAdd,});
      }
    }

  }
  onClear(){
    this.setState({text:''});
  }
  showSideNav(yesorno) {
    this.setState({ showSideNav: yesorno, showMarkerContent:!yesorno });
  }

  setCurrentMarker(pos) {
    this.setState({currentMarker:pos});
  }
  render() {
    return (
      <div className={styles['homepage-wrapper']}>
          <Header />
        <div className={styles.content}>
          <div>{this.state.showSideNav ? <SideNav changeText={this.changeText} onClear={this.onClear} onSubmit={this.onSubmit}/> : <div></div>}</div>
          <div>{this.state.showMarkerContent ? <SideContent marker={this.state.marker}/> : <div></div>}</div>
          
          <Mapbox text={this.state.text} addedMarker={this.state.addedMarker} currentMarker={this.state.currentMarker} username={this.props.params.user} showSideNav={this.showSideNav} setCurrentMarker={this.setCurrentMarker} showMarkerContent={this.showMarkerContent} />
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