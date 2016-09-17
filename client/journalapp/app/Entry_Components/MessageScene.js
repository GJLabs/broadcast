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

//// CAMERA COMPONENTS //// 
import ImagePicker from 'react-native-image-picker';
const fetchParams = {
    first: 3,
    groupTypes: 'All', 
    assetType: 'Photos'
}

//// AUDIO COMPONENTS //// 
import Sound from 'react-native-sound'
import AudioRecord from './AudioRecord'


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
      dynamicAudioHeight : () => { return { height: Dimensions.get('window').height * .0 }}, 
      dynamicMargin: () => { return {bottom: Dimensions.get('window').height * .10 }}, 
      image: 'http://media.todaybirthdays.com/thumb_x256x256/upload/1930/08/25/sean-connery.jpg', 
      imageSource: {uri: 'http://media.todaybirthdays.com/thumb_x256x256/upload/1930/08/25/sean-connery.jpg'}, 
      imageStyle: {position: 'absolute', height:200, width:200, margin: 15, opacity: 0}, 
      imageAttached: '',
      audioStyle: {height: 0},
      displayRecorder: false,
      audioRecording: false,
      audioPath: undefined 
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

  moveUpForAudioRecord(){
    setTimeout( ()=> {
      this.setState(
        { dynamicAudioHeight : () => { return { height: Dimensions.get('window').height * .20 }} }
      );
    }, 200); 
  }

  handleAudioRecording(audioPath){
    // console.log('Handling audio!')
    // console.log(audioPath); 
    // console.log(typeof audioPath); 
    var test = 'file://' + audioPath; 
    console.log(test); 
    this.props.updateAudio(audioPath); 
    this.setState({audioRecording: true, audioPath: test}); 
  }

  playRecorded(){
    var audioPath = this.state.audioPath; 
    console.log(audioPath); 
    
    var whoosh = new Sound('/Users/Riedel/Music/iTunes/iTunes Media/Music/Tiësto/Unknown Album/Wasted (Lyric Video) ft. Matthew Koma.mp3', '', (error) => {
      if (error) {
        console.warn('failed to load the sound', error);
      } else { // loaded successfully
      }
    });


    whoosh.setVolume(.5).play((success) => {
      if (success) {
      } else {
        console.warn('playback failed due to audio decoding errors');
      }
    });

  }

  // When the user clicks out of the text input but remains on this view, this resets the container
  // back to its original size, effectively pushing the footer back down. 
  moveDownForKeyboardHide(){
    this.setState(
      { dynamicHeight : () => { return {height: Dimensions.get('window').height * .08}},
        dynamicMargin: () => { return {bottom: Dimensions.get('window').height * .10 }} }
    );
  }

  _renderAudioRecorder(active) {
    if (active) {
      return (
          <AudioRecord handleAudioRecording={this.handleAudioRecording.bind(this)}/>
      )
    }
  }

  handlePhotoAdd(){
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
    var displayAudio = this.state.displayRecorder; 
    displayRecorder = !displayAudio
    this.setState({displayRecorder: displayRecorder})
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
          <View> 
            {this._renderAudioRecorder(this.state.displayRecorder)}
          </View>
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
