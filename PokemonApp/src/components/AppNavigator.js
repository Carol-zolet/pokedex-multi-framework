import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import MoveDetailScreen from "../screens/MoveDetailScreen";
import MovesScreen from "../screens/MovesScreen";

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Pokémons" }}
      />
      <Stack.Screen
        name="Moves"
        component={MovesScreen}
        options={{ title: "Movimentos" }}
      />
      <Stack.Screen
        name="MoveDetail"
        component={MoveDetailScreen}
        options={{ title: "Detalhes do Movimento" }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
