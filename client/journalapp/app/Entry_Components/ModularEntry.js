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

    };
  };


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

