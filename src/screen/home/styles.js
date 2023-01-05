import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  saida: {
    fontSize: 35,
    margin: 15,
  },
  saida2: {
    fontSize: 15,
    margin: 15,
  },
  inputs: {
    width: '90%',
    height: 64,
    marginBottom: 20,
  },
  button: {
    width: '90%',
    marginTop: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 50,
    color: '#8c9494',
    left: 'auto',
    right: 'auto',
  },
  aboutHeader: {
    fontSize: 25,
  },
  update: {
    fontSize: 12,
    color: '#8c9494',
  },
  aboutText: {
    width: '90%',
    margin: 15,
  },
  reactNativeBadge: {
    position: 'absolute',
    bottom: 150,
    left: 'auto',
    right: 'auto',
  },
});

export default styles;
