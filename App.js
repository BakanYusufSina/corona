import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigate from './src/navigations/TabNavigate'
import SplashScreen from 'react-native-splash-screen'

class App extends Component {
  componentDidMount() {
    SplashScreen.hide()
  }
  render() {
    return (
      <NavigationContainer>
        <TabNavigate />
      </NavigationContainer>
    )
  }
}

export default App