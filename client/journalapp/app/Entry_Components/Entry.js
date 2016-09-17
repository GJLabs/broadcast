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

import DateFormatter from 'dateformat';
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
    };
  };

  componentWillMount(){
    var audioPath = this.props.audiopath; 
    if (audioPath !== null) {
      var text = this.props.text
    }
  }

  playAudio() { 
    var audioPath = this.props.audiopath; 
    if (audioPath !== null) {
      audio.initWithURL(audioPath);
      audio.play(); 
    }
  }



  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.row }>
          <View style={ styles.rowHeader }>
            <Text style={ styles.date }>
              {parseDate(this.props.createdAt)}
            </Text>
            <Text style={ styles.location }>
              
            </Text>
          </View>
          <View style={ styles.rowBody }>
            <Text style={ styles.entryText }
                  onPress={this.playAudio.bind(this)}>
              { this.props.text }
            </Text>
            <EntryPic 
              thumbnail={ this.props.thumbnail } 
              audio={ this.props.audiopath} />
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
