import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScoresPage, HomePage } from '../screens';
import { SCREENS } from '../utilities/enums';
import { SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Modal } from '../components';
import { RootStackParam } from '../utilities/types';



const Stack = createNativeStackNavigator<RootStackParam>();
const Tab = createBottomTabNavigator();

const HomeBottomTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name={'Play'} component={HomePage}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Icon name="gamepad" size={25} color={color} />
                }} />
            <Tab.Screen name={'Results'} component={ScoresPage}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Icon name="rocket" size={25} color={color} />
                }} />
        </Tab.Navigator>
    )
}


export const RootNavigator = () => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer  >
                <Stack.Navigator initialRouteName={"HomePage"} screenOptions={{ headerBackTitleVisible: false, headerShown: false }}>
                    <Stack.Screen name={'HomePage'} component={HomeBottomTabNavigator} />
                    <Stack.Screen name={"ScoresPage"} component={ScoresPage} />
                </Stack.Navigator >
            </NavigationContainer >
            <Modal />
        </SafeAreaView>
    );
}
export default RootNavigator;