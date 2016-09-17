import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    borderColor: '#cccccc',
    paddingTop: 12,
    paddingBottom:12
  },
  row: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 2,
  },
  rowHeader: {
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    marginLeft: 0,
  },
  date: {
    justifyContent: 'flex-start',
    fontSize: 11,
    color: '#999999',
    fontWeight: '500'
  },
  location: {
    justifyContent: 'flex-end',
    fontSize: 11,
    color: '#999999',
    fontWeight: '500'
  },
  rowBody: {
    marginLeft: 0,
    marginTop: 5,
    flexDirection: 'row',
  },
  entryText: {
    justifyContent: 'flex-start',
    fontSize: 15,
    fontWeight: '500',
    width: Dimensions.get('window').width * .7,
    color:"#424242",
    marginRight: 10
  },
  entryImage: {
    width: 50, 
    height: 50,
    borderRadius: 5,
    // 'justifyContent': 'flex-end' 
  },
  micPic: {
    fontSize: 16,
    // 'justifyContent': 'flex-start' 
    // width: 15,
    // height: 15, 

  },
  picView: {
    flexDirection: 'row'
  },
  placeHolder: {
    width: 16
  }

});

module.exports = styles;