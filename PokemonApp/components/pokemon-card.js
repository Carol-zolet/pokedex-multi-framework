import { useEffect, useRef } from "react";
import { Animated, Image, Pressable, StyleSheet, Text } from "react-native";

export default function PokemonCard({ item, onPress }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Pressable
        android_ripple={{ color: "#333", borderless: false }}
        style={styles.card}
        onPress={onPress}
      >
        <Image
          source={{
            uri: item.url
              ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id || 1}.png`
              : "https://via.placeholder.com/150",
          }}
          style={styles.pokemonImage}
          resizeMode="contain"
        />
        <Text style={styles.name}>{item.name}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#252525",
    borderRadius: 12,
    overflow: "hidden",
    margin: 10,
    padding: 15,
    alignItems: "center",
  },
  pokemonImage: {
    width: 120,
    height: 120,
    marginBottom: 8,
    backgroundColor: "#252525",
    borderRadius: 12,
  },
  name: {
    color: "#FFDE00",
    fontWeight: "bold",
    marginTop: 8,
    fontSize: 16,
    textTransform: "capitalize",
  },
});
