import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons'


var Request = (props) => {
  return (
    <View style={styles.container}>
      <View style={ styles.row } onPress={()=> Alert.alert(
          'Friend Request',
          'Do you wish to accept this friend request so they can view your private entries?',
          [
            {text: 'Yes', onPress: () => props.acceptFriend(props.requestId)},
            {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
          ]
        )}
      >
      <Text style={ styles.bodyText }> Fullname:  { props.fullname }</Text>


      <Icon style= {styles.arrow} name="navigate-next" ></Icon>

      </View>
    </View>

  )
};


module.exports = Request;

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    flex: 1,
    flexDirection: 'column',
  },
  bodyText: {
    flexDirection: 'column',
    position:'relative',
    fontSize: 14,
    fontWeight: '400',
    color:"#666666",
    alignSelf:'center'
  },
  row: {
    flexDirection: 'row',
    paddingTop:12,
    paddingBottom:12,
    marginLeft:12,
    marginRight:12,
    borderBottomWidth: 0.5,
    borderColor: '#cccccc',
    justifyContent:'space-between'
  },
  arrow: {
    alignSelf:'flex-end',
    flexDirection: 'column',
    fontSize:24,
    color:"#c7c7cc",
  }
});