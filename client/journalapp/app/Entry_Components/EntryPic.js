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

export default class EntryPic extends Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {};
  }

  expandPic () {

  } 

  render() {
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
          onPress={ this.expandPic }
          />
        </View>
      )
    }
  }
}
