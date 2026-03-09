import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
} from "react-native";
import PokemonCard from "../components/PokemonCard";
import api from "../services/api";

export default function HomeScreen({ navigation }) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = async () => {
    try {
      const response = await api.get("/pokemon?limit=151");
      setPokemons(response.data.results);
    } catch (error) {
      console.error("Erro na API:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPokemons = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar style="light" />

      <TextInput
        style={styles.searchBar}
        placeholder="Buscar Pokémon..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#FFDE00" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={filteredPokemons}
          keyExtractor={(item) => item.name}
          numColumns={2}
          renderItem={({ item }) => (
            <PokemonCard
              item={item}
              onPress={() =>
                navigation.navigate("Moves", {
                  pokemonName: item.name,
                  pokemonUrl: item.url,
                })
              }
            />
          )}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews={true}
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151515",
    paddingTop: 40,
  },
  searchBar: {
    backgroundColor: "#252525",
    color: "#FFF",
    margin: 15,
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
  },
});
