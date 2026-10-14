import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import ProductListScreen from '../screens/ProductListScreen';
import { colors } from '../theme/colors';
import PlaceholderScreen from './PlaceholderScreen';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <Tab.Screen
        name="Products"
        component={ProductListScreen}
        options={{ tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>⌂</Text> }}
      />
      <Tab.Screen
        name="Favourites"
        options={{ tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>♥</Text> }}
      >
        {() => <PlaceholderScreen title="Favourites" />}
      </Tab.Screen>
      <Tab.Screen
        name="Account"
        options={{ tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>☺</Text> }}
      >
        {() => <PlaceholderScreen title="Account" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
