import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  AsyncStorage,
  Navigator,
  Dimensions, 
  CameraRoll, 
  Image
} from 'react-native';

import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/MessageSceneStyles';
import ImagePicker from 'react-native-image-picker';


//// CAMERA COMPONENTS //// 
// import CameraRollInput from './CameraRoll';
const fetchParams = {
    first: 3,
    groupTypes: 'All', 
    assetType: 'Photos'
}

const options = {
  title: 'Select Avatar', // specify null or empty string to remove the title 
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button 
  chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button 
  customButtons: {
    'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection] 
  },
  maxWidth: 250,
  maxHeight: 250,
  quality: 0.5,
  allowsEditing: false, // Built in iOS functionality to resize/reposition the image 
  noData: false, // Disables the base64 `data` field from being generated (greatly improves performance on large photos) 
  storageOptions: { // if this key is provided, the image will get saved in the documents directory (rather than a temporary directory) 
    skipBackup: true, // image will NOT be backed up to icloud 
    path: 'images' // will save image at /Documents/images rather than the root 
  }
};
//////// 

// Note that this is a scene, not a tab view. In this case, that means the user clicked on "What did you do today?" in 
// EntriesTab.js. EntriesTab then tells Main.js to navigate to this scene. 
export default class FriendScene extends Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      dynamicHeight: () => { return {height: Dimensions.get('window').height * .08}},
      dynamicMargin: () => { return {bottom: Dimensions.get('window').height * .10 }}, 
      image: 'http://media.todaybirthdays.com/thumb_x256x256/upload/1930/08/25/sean-connery.jpg', 
      imageSource: {uri: 'http://media.todaybirthdays.com/thumb_x256x256/upload/1930/08/25/sean-connery.jpg'}, 
      imageStyle: {position: 'absolute', height:200, width:200, margin: 15, opacity: 0}, 
      imageAttached: ''
    };
  };

  componentDidMount(){
    this.props.updateEntry(''); 
  }

  // This shrinks the container to accommodate the keypad, when the user clicks the text input
  // to begin his/her entry. The footer is thus effectively pulled up the view. 
  moveUpForKeyboardShow(){
    setTimeout( ()=> {
      this.setState(
        { dynamicHeight : () => { return { height: Dimensions.get('window').height * .40 }},
          dynamicMargin: () => { return {bottom: Dimensions.get('window').height * .45 }} }
      );
    }, 200); 
  }

  // When the user clicks out of the text input but remains on this view, this resets the container
  // back to its original size, effectively pushing the footer back down. 
  moveDownForKeyboardHide(){
    this.setState(
      { dynamicHeight : () => { return {height: Dimensions.get('window').height * .08}},
        dynamicMargin: () => { return {bottom: Dimensions.get('window').height * .10 }} }
    );
  }

  handlePhotoAdd(){
    // console.log('Clicked to add photo!'); 
    // console.log('options:', options);

    ImagePicker.showImagePicker(options, (response) => {
      console.log('response: ', response)
      this.props.updateImg(response)
      const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
      this.setState({
        imageSource: source,
        imageData: response
      });
      this.changeStyle(); 
    });
    console.log('Current image source:', this.state.imageSource); 
  }

  handleAudioAdd() {
    console.warn('clicked');
  }

  changeStyle() {
    var showStyle = {position: 'absolute', height:200, width:200, margin: 15, borderColor: 'rgba(175,175,175,.6)', borderWidth: 5, backgroundColor: '#f4f4f4', padding: 2, opacity: 0.8}; 
    var hideStyle = {position: 'absolute', height:200, width:200, margin: 15, opacity: 0}; 
    this.setState({ imageStyle: showStyle, imageAttached: 'My Image:'}); 
  }
  
  render() {
      return (
        <View style={ styles.container } ref='scrollView'>
        <TextInput
            keyboardType='default'
            keyboardAppearance='light' 
            multiline={ true }
            placeholder= 'What did you do today?'
            style={ [styles.textArea, styles.bodyWidth, styles.fadedText] }
            maxLength={ 100 }
            onChangeText={ (text) => this.props.updateEntry(text) }
            onFocus= { this.moveUpForKeyboardShow.bind(this) }
            onBlur= { this.moveDownForKeyboardHide.bind(this) }/>
        <Image
          style={[this.state.dynamicMargin(), this.state.imageStyle, styles.center]}
          source={this.state.imageSource}
        />
          <View style={ [this.state.dynamicHeight(), styles.bodyWidth, styles.footer] }>
            <Icon style={ [styles.footerContent, styles.footerPadlock] } name="lock-open"/>
            <Icon style={ [styles.footerContent, styles.footerArrow] } name="near-me"/> 
            <Icon style={ [styles.footerContent, styles.addPicButton] } name='camera-alt'
              onPress={ this.handlePhotoAdd.bind(this) }/>
            <Icon style={ [styles.footerContent, styles.addMicButton] } name='mic-none' 
              onPress={ this.handleAudioAdd.bind(this) }/>
          </View>
        </View>
      )
    }

}
