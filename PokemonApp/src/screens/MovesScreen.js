import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Animated,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import api from "../services/api";

export default function MovesScreen({ route, navigation }) {
  const { pokemonName, pokemonUrl } = route.params;
  const [moves, setMoves] = useState([]);
  const [loading, setLoading] = useState(true);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    loadMoves();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const loadMoves = async () => {
    try {
      const id = pokemonUrl.split("/")[pokemonUrl.split("/").length - 2];
      const response = await api.get(`/pokemon/${id}`);
      setMoves(response.data.moves);
    } catch (error) {
      console.error("Erro ao carregar movimentos", error);
    } finally {
      setLoading(false);
    }
  };

  const renderMove = ({ item }) => (
    <Pressable
      style={styles.moveCard}
      android_ripple={{ color: "#FFDE0033" }}
      onPress={() =>
        navigation.navigate("MoveDetail", {
          moveName: item.move.name,
          moveUrl: item.move.url,
        })
      }
    >
      <Text style={styles.moveName}>
        {item.move.name.replace("-", " ").toUpperCase()}
      </Text>
      <Text style={styles.learnMethod}>Detalhes {">"}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>MOVIMENTOS</Text>
        <Text style={styles.pokemonName}>{pokemonName.toUpperCase()}</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#FFDE00" style={{ flex: 1 }} />
      ) : (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
          <FlatList
            data={moves}
            keyExtractor={(item) => item.move.name}
            renderItem={renderMove}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151515",
    paddingTop: 40,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    marginBottom: 10,
  },
  title: {
    color: "#888",
    fontSize: 12,
    letterSpacing: 2,
  },
  pokemonName: {
    color: "#FFDE00",
    fontSize: 28,
    fontWeight: "bold",
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  moveCard: {
    backgroundColor: "#252525",
    padding: 18,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },
  moveName: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  learnMethod: {
    color: "#666",
    fontSize: 12,
  },
});
