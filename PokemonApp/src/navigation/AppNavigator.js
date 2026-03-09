import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import MoveDetailScreen from "../screens/MoveDetailScreen";
import MovesScreen from "../screens/MovesScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#3B4CCA" },
          headerTintColor: "#FFDE00",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Pokédex" }}
        />
        <Stack.Screen
          name="Moves"
          component={MovesScreen}
          options={{ title: "Moves" }}
        />
        <Stack.Screen
          name="MoveDetail"
          component={MoveDetailScreen}
          options={{ title: "Move Detail" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
