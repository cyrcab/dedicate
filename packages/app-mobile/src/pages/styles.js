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
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
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

  // components\CodeQR.jsx
  buttonCodeQR: {
    borderRadius: 50,
    width: 60,
    height: 62,
    position: "absolute",
    bottom: 20,
    left: "41%",
  },
  containerCodeQR: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  closeIconCodeQR: {
    position: "absolute",
    top: 50,
    right: 20,
  },

  // pages\Home.jsx
  containerHome: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerHome: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginTop: 30,
  },
  logoHome: {
    fontSize: 18,
    fontWeight: "bold",
  },
  searchIconHome: {
    marginLeft: 16,
  },
  eventListHome: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  eventItemHome: {
    fontSize: 16,
    marginBottom: 8,
  },

  // pages\Event.jsx
  containerEvent: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
  },
  eventNameEvent: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  cardEvent: {
    width: "90%", // ou la largeur souhaitée
    marginBottom: 10,
  },
  buttonEvent: {
    width: "auto",
    alignSelf: "center",
  },
});