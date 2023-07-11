import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: '70%',
  },
  connexionButton: {
    marginTop: 10,
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  registerLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  settingsButton: {
  },
  centerView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  centerButton: {
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  CardEvent: {
    margin: 10,
  },
  containerReadMore: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  readMorePresentation: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    color: 'gray',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  musicTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  musicTypeLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  musicTypeButton: {
    marginRight: 10,
  },
  qrCodeButton: {
    marginTop: 20,
  },
  etablissementInformation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: '40%',
    alignItems: 'center',
  },
  containerEtablissementInformation: {
    flexDirection: 'column',
  },
  scanner: {
    position: 'absolute',
    bottom: 20,
    left: '42%',
  },
  containerEventInformation: {
    flex: 1,
    padding: 20,
  },
  etablissementInformationHistoric: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: '20%',
    alignItems: 'center',
  },
});
