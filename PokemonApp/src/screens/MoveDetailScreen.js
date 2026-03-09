import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import api from "../services/api";

export default function MoveDetailScreen({ route }) {
  const { moveName, moveUrl } = route.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMoveDetails();
  }, []);

  const loadMoveDetails = async () => {
    try {
      const response = await api.get(moveUrl);
      setDetails(response.data);
    } catch (error) {
      console.error("Erro ao carregar detalhes do movimento", error);
    } finally {
      setLoading(false);
    }
  };

  const ProgressBar = ({ label, value, max, color }) => (
    <View style={styles.statRow}>
      <View style={styles.statLabelContainer}>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statValue}>{value || "---"}</Text>
      </View>
      <View style={styles.barBackground}>
        <View
          style={[
            styles.barFill,
            {
              width: `${value ? (value / max) * 100 : 0}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFDE00" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.moveTitle}>
          {moveName.replace("-", " ").toUpperCase()}
        </Text>
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>
            {details?.type?.name.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>ATRIBUTOS DO ATAQUE</Text>

        <ProgressBar
          label="POWER"
          value={details?.power}
          max={250}
          color="#FF5733"
        />
        <ProgressBar
          label="ACCURACY"
          value={details?.accuracy}
          max={100}
          color="#33FF57"
        />
        <ProgressBar label="PP" value={details?.pp} max={40} color="#3357FF" />
      </View>

      <View style={styles.descriptionCard}>
        <Text style={styles.sectionTitle}>EFEITO</Text>
        <Text style={styles.descriptionText}>
          {details?.flavor_text_entries
            .find((e) => e.language.name === "en")
            ?.flavor_text.replace(/\n|\f/g, " ")}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#151515", padding: 16 },
  loading: {
    flex: 1,
    backgroundColor: "#151515",
    justifyContent: "center",
    alignItems: "center",
  },
  back: { color: "#FFDE00", fontSize: 16, marginBottom: 8 },
  title: {
    fontSize: 28,
    color: "#FFDE00",
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: { backgroundColor: "#1A1A1A", padding: 16, borderRadius: 12 },
  type: { color: "#FFDE00", fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  info: { color: "#FFFFFF", fontSize: 16, marginBottom: 8 },
  desc: { color: "#AAAAAA", fontSize: 14, marginTop: 8 },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#151515",
    justifyContent: "center",
  },
  header: {
    padding: 30,
    alignItems: "center",
    backgroundColor: "#252525",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  moveTitle: {
    color: "#FFDE00",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  typeBadge: {
    backgroundColor: "#444",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 10,
  },
  typeText: { color: "#FFF", fontSize: 12, fontWeight: "bold" },
  card: {
    backgroundColor: "#252525",
    margin: 20,
    padding: 20,
    borderRadius: 20,
    elevation: 5,
  },
  descriptionCard: {
    backgroundColor: "#252525",
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 20,
    borderRadius: 20,
  },
  sectionTitle: {
    color: "#888",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 20,
    letterSpacing: 1,
  },
  descriptionText: { color: "#DDD", fontSize: 16, lineHeight: 24 },
  statRow: { marginBottom: 20 },
  statLabelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  statLabel: { color: "#FFF", fontSize: 14, fontWeight: "600" },
  statValue: { color: "#FFDE00", fontSize: 14, fontWeight: "bold" },
  barBackground: {
    height: 8,
    backgroundColor: "#444",
    borderRadius: 4,
    overflow: "hidden",
  },
  barFill: { height: "100%", borderRadius: 4 },
});
