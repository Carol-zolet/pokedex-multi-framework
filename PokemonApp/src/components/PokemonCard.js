import { memo, useEffect, useRef } from "react";
import { Animated, Image, Pressable, StyleSheet, Text } from "react-native";

export default memo(PokemonCard);

function PokemonCard({ item, onPress }) {
  // Animação de Fade-in (Uncle Bob aprova a organização!)
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  // Extração do ID de forma segura
  const getPokemonId = (url) => {
    if (!url) return "1";
    const parts = url.split("/");
    return parts[parts.length - 2];
  };

  const id = getPokemonId(item.url);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Pressable
        style={styles.card}
        onPress={onPress}
        android_ripple={{ color: "#444", borderless: false }} // Feedback tátil para o Moto G15
      >
        <Image
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.name}>{item.name.toUpperCase()}</Text>
        <Text style={styles.idText}>#{id.padStart(3, "0")}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
  },
  card: {
    backgroundColor: "#252525",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4, // Sombra no Android
    overflow: "hidden", // Garante que o ripple respeite as bordas
  },
  image: {
    width: 100,
    height: 100,
  },
  name: {
    color: "#FFDE00", // Amarelo Pokémon para destaque
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 14,
  },
  idText: {
    color: "#888",
    fontSize: 10,
    marginTop: 5,
  },
});
