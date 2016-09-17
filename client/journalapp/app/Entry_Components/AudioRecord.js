import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import {AudioRecorder, AudioUtils} from 'react-native-audio';

export default class AudioRecord extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      currentTime: 0.0,
      recording: false,
      stoppedRecording: false,
      stoppedPlaying: false,
      playing: false,
      finished: false
    };
  }

  prepareRecordingPath(audioPath){
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac",
      AudioEncodingBitRate: 32000
    });
  }

  componentDidMount() {
    let audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac';
    this.prepareRecordingPath(audioPath);
    this.setState({audioPath: audioPath}); 
    AudioRecorder.onProgress = (data) => {
      this.setState({currentTime: Math.floor(data.currentTime)});
    };
    AudioRecorder.onFinished = (data) => {
      this.setState({finished: data.finished});
      console.log(`Finished recording: ${data.finished}`);
    };
  }

   _renderButton(title, onPress, active) {
     var style = (active) ? styles.activeButtonText : styles.buttonText;

     return (
       <TouchableHighlight style={styles.button} onPress={onPress}>
         <Text style={style}>
           {title}
         </Text>
       </TouchableHighlight>
     );
   }

   _play() {
      if (this.state.recording) {
        this._stop();
        this.setState({recording: false});
      }
      AudioRecorder.playRecording();
      this.setState({playing: true});
    }

   _stop() {
     if (this.state.recording) {
       AudioRecorder.stopRecording();
       this.setState({stoppedRecording: true, recording: false});
     } else if (this.state.playing) {
       AudioRecorder.stopPlaying();
       this.setState({playing: false, stoppedPlaying: true});
     }
   }

   _record() {
     if(this.state.stoppedRecording){
       let audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac';
       this.prepareRecordingPath(audioPath);
     }
     AudioRecorder.startRecording();
     this.setState({recording: true, playing: false});
   }

   render() {

     return (
       <View style={styles.container}>
         <View style={styles.controls}>
           {this._renderButton("RECORD", () => {this._record()}, this.state.recording )}
           {this._renderButton("STOP", () => {this._stop()} )}
           {this._renderButton("PAUSE", () => {this._pause()} )}
           {this._renderButton("PLAY", () => {this._play()}, this.state.playing )}
           <Text style={styles.progressText}>{this.state.currentTime}s</Text>
         </View>
       </View>
     );
   }
}; 

var styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "#2b608a",
  },
  controls: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  progressText: {
    paddingTop: 20,
    paddingBottom: 10, 
    fontSize: 20,
    color: "#fff"
  },
  button: {
    padding: 18
  },
  disabledButtonText: {
    color: '#eee'
  },
  buttonText: {
    fontSize: 20,
    color: "#fff"
  },
  activeButtonText: {
    fontSize: 20,
    color: "#B81F00"
  }

});