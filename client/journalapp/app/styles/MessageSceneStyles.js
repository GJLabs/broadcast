import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderColor: 'gray',
    width: Dimensions.get('window').width * 1,
    paddingTop: 70, 
    marginLeft: 0,
    backgroundColor: '#f5f6f6',
    flex: 1 
  },
  bodyWidth: {
    marginLeft: Dimensions.get('window').width * .05,
    marginRight: Dimensions.get('window').width * .05,
  },
  center: {
    left: Dimensions.get('window').width * .20
  },
  textArea: {
    height: 250,
  },
  fadedText: {
    fontSize: 16,
    color: 'gray',
    fontWeight: 'bold',
  }, 
  footer: {
    position: 'absolute', 
    marginLeft: 0,
    marginTop: 0, 
    flex: 1, 
    bottom: 0, 
    flexDirection: 'row', 
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    borderTopWidth: 1, 
    borderTopColor: 'rgba(175,175,175,.6)',
    paddingTop: 6, 
  },
  footerContent: {
    color:"#c7c7cc", 
    fontSize: 24
  },
  footerPadlock: {
    marginLeft: Dimensions.get('window').width * .08,
    width: Dimensions.get('window').width * .1,
  }, 
  footerArrow: {
    marginLeft: Dimensions.get('window').width * .12,
    marginRight: Dimensions.get('window').widith * .12
  },
  // footerText: {
  //   fontSize: 16,
  //   marginLeft: Dimensions.get('window').width * .02,
  //   width: Dimensions.get('window').width * .36,
  // },
  addPicButton: {
    width: Dimensions.get('window').width * .2,
    marginLeft: .7,
    // marginRight: .12,
    // height: Dimensions.get('window').height * .2,
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: '#000000'
  },
  buttonText: {
    marginTop: 7,
    fontSize: 24, 
    marginLeft: Dimensions.get('window').width * .16,
    
  },
});

module.exports = styles;

//<Text style={ [styles.footerContent, styles.footerText] }>{ this.props.location }</Text>

