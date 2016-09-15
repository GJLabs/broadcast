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
      dynamicHeight: () => { return {height: Dimensions.get('window').height - 49 - 65}},
      image: 'http://media.todaybirthdays.com/thumb_x256x256/upload/1930/08/25/sean-connery.jpg', 
      imageSource: {uri: 'http://media.todaybirthdays.com/thumb_x256x256/upload/1930/08/25/sean-connery.jpg'},
      imageData: null 
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
        { dynamicHeight : () => { return { height: Dimensions.get('window').height * .45 }} }
      );
    }, 200); 
  }

  // When the user clicks out of the text input but remains on this view, this resets the container
  // back to its original size, effectively pushing the footer back down. 
  moveDownForKeyboardHide(){
    this.setState(
      { dynamicHeight : () => { return {height: Dimensions.get('window').height - 49 - 70}} }
    );
  }

  handlePhotoAdd(){
    console.log('Clicked to add photo!'); 
    // CameraRoll.getPhotos(fetchParams)
    // .then((data) => this.setState({image: data.edges[0].image}), (e) => console.warn(e));
    // console.warn(typeof CameraRoll); 
    // console.warn(typeof CameraRoll.getPhotos); 
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response); 
      // You can display the image using either: 
      const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
      // const source = {uri: response.uri.replace('file://', ''), isStatic: true};
      this.setState({
        imageSource: source,
        imageData: response
      });
    });
    console.log('Current image source:', this.state.imageSource); 
  }

  storeImages(data) {
    console.warn('Did something with an object!'); 
  }

  logImageError(err) {
    console.log(err);
  }

  logState() {
    console.log(this.state.imageSource); 
  }
  
  render() {
    return (
      <ScrollView style={ styles.container } ref='scrollView'>
      <Image
        style={{width: 350, height: 350}}
        source={this.state.imageSource}
      />

        <View style={ [styles.bodyWidth, styles.footer] }>
          <Icon style={ [styles.footerContent, styles.footerPadlock] } name="lock-open"/>
          <Icon style={ [styles.footerContent, styles.footerArrow] } name="near-me"
            onPress={ this.logState.bind(this) }/> 
          <Icon style={ [styles.footerContent, styles.buttonText] } name='camera-alt'
            onPress={ this.handlePhotoAdd.bind(this) }/>
        </View>
      </ScrollView>
    )
  }
}


        // <TextInput
        //     keyboardType='default'
        //     keyboardAppearance='light' 
        //     multiline={ true }
        //     placeholder= 'What did you do today?'
        //     style={ [this.state.dynamicHeight(), styles.bodyWidth, styles.fadedText] }
        //     maxLength={ 100 }
        //     onChangeText={ (text) => this.props.updateEntry(text) }
        //     onFocus= { this.moveUpForKeyboardShow.bind(this) }
        //     onBlur= { this.moveDownForKeyboardHide.bind(this) }/>