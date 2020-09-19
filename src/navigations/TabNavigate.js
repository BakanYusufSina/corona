import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../pages/HomeScreen'
import DataScreen from '../pages/DataScreen'
import Ionicons from 'react-native-vector-icons/Ionicons'
import NewsScreen from '../pages/NewsScreen'

const BottomTab = createBottomTabNavigator()

export default function TabNavigate() {
    return (
        <BottomTab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'md-home'
                            : 'md-home';
                    } else if (route.name === 'Datas') {
                        iconName = focused ? 'md-earth' : 'md-earth';
                    }
                    else if (route.name === 'News') {
                        iconName = 'md-newspaper';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'red',
                inactiveTintColor: 'gray'
            }}>
            <BottomTab.Screen name="Home" component={HomeScreen} options={{ title: 'Anasayfa' }} />
            <BottomTab.Screen name="Datas" component={DataScreen} options={{ title: 'Veriler' }} />
            <BottomTab.Screen name="News" component={NewsScreen} options={{ title: 'Haberler' }} />
        </BottomTab.Navigator>
    )
}
