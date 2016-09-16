import React, { Component } from 'react';
import DateFormatter from 'dateformat';
import styles from '../styles/EntryStyles';

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
  if (props.thumbnail === null) {
    return (
      <Text>
      </Text>
    );
  } else {
    return (
      <View>
        <Image 
        style={styles.entryImage}
        source={{ uri: props.thumbnail }}
        />
      </View>
    )
  }
}

module.exports = EntryPic;