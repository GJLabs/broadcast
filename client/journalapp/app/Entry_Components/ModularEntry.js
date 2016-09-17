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

  // componentDidMount(){
  //   var audioPath = this.props.audiopath; 

  //   var whoosh = new Sound(audioPath, '', (error) => {
  //     if (error) {
  //       console.warn('failed to load the sound', error);
  //     } else { // loaded successfully
  //       console.warn('duration in seconds: ' + whoosh.getDuration() +
  //           'number of channels: ' + whoosh.getNumberOfChannels());
  //     }
  //   });

  //   this.setState({song: whoosh}); 
  //   whoosh.setVolume(.5); 
  // }

  // playAudio() {
  //   console.warn('Playing audio!'); 
  //   this.state.song.play(); 
  // }

  render() {
    return (
      <View style={ styles.container }
            onPress={this.playAudio.bind(this)}>
        <View style={ styles.row }>
          <View style={ styles.rowHeader }>
            <Text style={ styles.date }>
            { parseDate(props.createdAt) }
            </Text>
            <Text style={ styles.location }>
              { props.location }
            </Text>
          </View>
          <View style={ styles.rowBody }>
            <Text style={ styles.entryText }>
              { props.text }
            </Text>
            <Text>
              {props.audiopath}
            </Text>
            <EntryPic thumbnail={ props.filepath } />
          </View>
        </View>
      </View>
    )
  }
  
}; 

var parseDate = (date) => {
  date = new Date(date);
  return DateFormatter(date, "ddd, mmm d");
};