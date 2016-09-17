import React, { Component } from 'react';
import DateFormatter from 'dateformat';
import styles from '../styles/EntryStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View,
  Dimensions,
  Image
} from 'react-native';

var EntryPic = (props) => {
  if (props.thumbnail && props.audio) {
    return (
      <View style={styles.picView}>
        <Icon name='mic-none' style={styles.micPic}/>
        <Image 
        style={styles.entryImage}
        source={{ uri: props.thumbnail }}
        />
      </View>
    );
  } else if (props.audio) {
    return (

      <View style={styles.picView}>
        <Icon name='mic-none' style={styles.micPic}/>
      </View>
    )
  } else if (props.thumbnail) {
    return (

      <View style={styles.picView}>
        <Text style={styles.placeHolder}>
        </Text>
        <Image 
        style={styles.entryImage}
        source={{ uri: props.thumbnail }}
        />
      </View>
    )
  } else {
    return (
     <Text>
     </Text>
    )
  }
}

module.exports = EntryPic;