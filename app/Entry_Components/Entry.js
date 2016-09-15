import React, { Component } from 'react';
import DateFormatter from 'dateformat';

import {
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View,
  Dimensions,
  Image
} from 'react-native';

import styles from '../styles/EntryStyles';
import Button from 'react-native-button';



var Entry = (props) => (
  <View style={ styles.container }>
    <View style={ styles.row }>
      <View style={ styles.rowHeader }>
        <Text style={ styles.date }>
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
          { props.thumbnail }
        </Text>
        <View>
          <Image 
          style={{width: 50, height: 50}}
          source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }}
          />
        </View>
      </View>
    </View>
  </View>
);

module.exports = Entry;

var parseDate = (date) => {
  date = new Date(date);
  return DateFormatter(date, "ddd, mmm d");
};

