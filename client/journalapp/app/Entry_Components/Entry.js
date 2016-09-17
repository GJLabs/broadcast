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

import Sound from 'react-native-sound'
var audio = require('react-native').NativeModules.RNAudioPlayerURL;
import styles from '../styles/EntryStyles';
import EntryPic from './EntryPic';

export default class FriendScene extends Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      song: undefined
    //   dynamicHeight: () => { return {height: Dimensions.get('window').height * .08}},
    //   dynamicAudioHeight : () => { return { height: Dimensions.get('window').height * .0 }}, 
    //   dynamicMargin: () => { return {bottom: Dimensions.get('window').height * .10 }}, 
    //   image: 'http://media.todaybirthdays.com/thumb_x256x256/upload/1930/08/25/sean-connery.jpg', 
    //   imageSource: {uri: 'http://media.todaybirthdays.com/thumb_x256x256/upload/1930/08/25/sean-connery.jpg'}, 
    //   imageStyle: {position: 'absolute', height:200, width:200, margin: 15, opacity: 0}, 
    //   imageAttached: '',
    //   audioStyle: {height: 0},
    //   displayRecorder: false,
    //   audioRecording: false,
    //   audioPath: undefined 

    };
  };

  componentWillMount(){
    var audioPath = this.props.audiopath; 
    if (audioPath !== null) {
      // console.log(audioPath); 
      // console.log(this.props.text); 
      // var whoosh = new Sound(audioPath, '', (error) => {
      //   if (error) {
      //     console.log(this.props.text); 
      //     console.warn('failed to load the sound', error);
      //   } else { // loaded successfully
      //     console.warn('duration in seconds: ' + whoosh.getDuration() +
      //         'number of channels: ' + whoosh.getNumberOfChannels());
      //   }
      // });
      // this.setState({song: whoosh}); 
      // whoosh.setVolume(.5); 
      // console.log(audioPath); 
      var text = this.props.text
      // console.log(typeof audioPath); 
      // audio.initWithURL(audioPath);
      // audio.getDuration((duration) => { 
      //   console.log(duration, text, audioPath); 
      // }); 
    }
  }

  playAudio() {
    console.warn('Playing audio!'); 
    var audioPath = this.props.audiopath; 
    if (audioPath !== null) {
      audio.initWithURL(audioPath);
      audio.play(); 
    }
    // console.warn(this.state.song.getDuration()); 
    // this.state.song.play((success) => {
    //   if (success) {
    //     console.log('WE PLAYED AUDIO!'); 
    //     console.warn('successfully finished playing');
    //   } else {
    //     console.warn('playback failed due to audio decoding errors');
    //   }
    // });
    // audio.play(); 
  }

  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.row }>
          <View style={ styles.rowHeader }>
            <Text style={ styles.date }>
            </Text>
            <Text style={ styles.location }>
              { this.props.location }
            </Text>
          </View>
          <View style={ styles.rowBody }>
            <Text style={ styles.entryText }
                  onPress={this.playAudio.bind(this)}>
              { this.props.text }
            </Text>
            <Text>
              {this.props.audiopath}
            </Text>
            <EntryPic thumbnail={ this.props.filepath } />
          </View>
        </View>
      </View>
    )
  }
  
}; 
