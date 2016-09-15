import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import styles from '../styles/MessageSceneStyles';

export default class CameraRollScene extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount(){
    console.warn('Mounted the CameraRollScene'); 
  }

  render() {
    return (
      <ScrollView style={ styles.container } ref='scrollView'>
        <View>
        </View>
      </ScrollView>
    )
  }
}


// ImagePickerManager.showImagePicker(options, (didCancel, response) => {
//   console.warn('Response = ', response);
 
//   if (didCancel) {
//     console.warn('User cancelled image picker');
//   } else {
//     // You can display the image using either: 
//     const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
//     const source = {uri: response.uri.replace('file://', ''), isStatic: true};

//     this.setState({
//       imageSource: source
//     });
//   }
// });

    // ImagePicker.showImagePicker(options, (response) => {
    //   console.log('Response = ', response);

    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   }
    //   else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   }
    //   else if (response.customButton) {
    //     console.log('User tapped custom button: ', response.customButton);
    //   }
    //   else {
    //     // You can display the image using either data...
    //     const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

    //     // or a reference to the platform specific asset location
    //     if (Platform.OS === 'ios') {
    //       const source = {uri: response.uri.replace('file://', ''), isStatic: true};
    //     } else {
    //       const source = {uri: response.uri, isStatic: true};
    //     }

    //     this.setState({
    //       avatarSource: source
    //     });
    //   }
    // });