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
      showOthers: true,
      showMarkerContent: false,
      currentMarker:'',
      text:'',
      marker: null,
      markers: null,
      addedMarker:null,
      isEdit:false,
      editContent:'',
      editId:null,
      delMarkerId:null,
      LMarker:false
    };
    this.showSideNav = this.showSideNav.bind(this);
    this.showMarkerContent = this.showMarkerContent.bind(this);
    this.changeText = this.changeText.bind(this);
    this.setCurrentMarker = this.setCurrentMarker.bind(this);
    this.setEditId = this.setEditId.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.setEditFalse = this.setEditFalse.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.clearEditContent = this.clearEditContent.bind(this);
    this.setShowOthers = this.setShowOthers.bind(this);
  }
  setLMarker = (flag) => {
    this.setState({LMarker:flag})
  }
  // 把获取数据的逻辑放在父组件中
  async fetchData() {
    const query = `mutation getMarkerByUser( $username: String!) {
      getMarkerByUser(
        username: $username
      ) { id username created_time
        content position is_public }
    }`;
    const data =  await graphQLFetch(query, { username:this.props.params.user }, null);
    if (data) {
      this.setState({ markers: data.getMarkerByUser });
      // console.log('this.state.markers in Homepage: ', this.state.markers);
    }
  }
  showNavOnly = (flag) => {
    this.setState({ showSideNav: flag })
  }
  setShowOthers = (flag) => {
    this.setState({showOthers: flag})
  }

  showMarkerContent(marker) {
    this.setState({showMarkerContent:true, marker:marker, showSideNav:false});
  }
  changeText(text){
    this.setState({text:text});
  }
  onEdit (content){
    // console.log("onEdit, content:", content);
    this.setState({showMarkerContent:false, editContent:content, isEdit:true, showSideNav:true}); 
  }
  setEditFalse(){
    this.setState({isEdit:false});
  }




  async onDelete(){//markerDelete(id: Int!): Boolean!
    const id = this.state.editId;
    const query = `mutation markerDelete( $id: Int!) {
      markerDelete(
        id: $id
      ) 
    }`;
    const data = await graphQLFetch(query, { id }, null); 
    if (data) {
      // console.log("Deleted pin", data);
      message.success('Deleted pin!');
      // window.location.reload();
      this.setState({showMarkerContent:false, delMarkerId:id, showSideNav:false, currentMarker:'', isEdit:false, editContent:''});
    }
    this.fetchData()
  }
  async onSubmit (){
    if (this.state.isEdit){
      const text=this.state.text;

        if (text.length === 0) {message.info("You haven't written down anything!")}
        else {
          const changes = {
            content:text,
            id:this.state.editId,
            is_public:true
          } 
          // markerUpdate(changes: MarkerUpdateInputs!): Marker!
          const query = `mutation markerUpdate( $changes: MarkerUpdateInputs!) {
            markerUpdate(
              changes: $changes
            ) {id username created_time
              content position is_public}
          }`;
          const data = await graphQLFetch(query, { changes }, null);
          if (data) {
            // console.log("Updated pin", data.markerUpdate);
            message.success('Updated pin!');
            // window.location.reload();
            this.setState({showMarkerContent:true, marker:data.markerUpdate, showSideNav:false, currentMarker:'', isEdit:false, editContent:''});
            
          }
        }

    }else {
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
          // console.log(marker);
          
          const query = `mutation markerAdd( $marker: Newmarker!) {
            markerAdd(
              marker: $marker
            ) {id username created_time
              content position is_public}
          }`;
          const data = await graphQLFetch(query, { marker }, null);
          if (data) {
            // console.log("submitted pin", data.markerAdd);
            message.success('Submit new pin!');
            // window.location.reload();
            this.setState({ showMarkerContent: true, marker: data.markerAdd, showSideNav: false, currentMarker: '', addedMarker: data.markerAdd, });
            this.setLMarker(false)
          }
        }
        
     }
     this.fetchData()
  }
  onClear(){
    this.setState({text:''});
  }
  clearEditContent(){
    // console.log('clear edit cnt...');
    this.setState({editContent:''}); 
  }

  showSideNav(yesorno) {
    this.setState({ showSideNav: yesorno, showMarkerContent:!yesorno });
  }

  setCurrentMarker(pos) {
    this.setState({currentMarker:pos});
  }
  setEditId(id) {
    this.setState({editId:id}); 
  }

  componentDidMount () {
    this.fetchData()
  }
  render() {
    return (
      <div className={styles['homepage-wrapper']}>
          <Header username={this.props.params.user} setShowOthers={this.setShowOthers}/>
        <div className={styles.content}>
          <div>{this.state.showSideNav ? <SideNav editContent={this.state.editContent} clearEditContent={this.clearEditContent} isEdit={this.state.isEdit} setEditFalse={this.setEditFalse} changeText={this.changeText} onClear={this.onClear} onSubmit={this.onSubmit}/> : <div></div>}</div>
          <div>{this.state.showMarkerContent ? <SideContent marker={this.state.marker} username={this.props.params.user} onEdit={this.onEdit} onDelete={this.onDelete}/> : <div></div>}</div>
          
          <Mapbox text={this.state.text} delMarkerId={this.state.delMarkerId} markers={this.state.markers}
            addedMarker={this.state.addedMarker} setEditId={this.setEditId} setEditFalse={this.setEditFalse}
            currentMarker={this.state.currentMarker} username={this.props.params.user} showSideNav={this.showSideNav}
            setCurrentMarker={this.setCurrentMarker} showMarkerContent={this.showMarkerContent}
            LMarker={this.state.LMarker} setLMarker={this.setLMarker} showNavOnly={this.showNavOnly} showOthers={this.state.showOthers}
          />

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