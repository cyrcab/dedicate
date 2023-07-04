import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, RefreshControl } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import EventsCard from "../components/EventsCard";
import { axiosApiInstance } from "../../axios.config";
import { backendUrl } from "../backendUrl";
import CodeQR from "../components/CodeQR";

export default function Home() {
  const [event, setEvent] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  function EventInfo() {
    axiosApiInstance.get(backendUrl + "events/next/next").then((response) => {
      setEvent(response.data.data);
      setRefreshing(false);
    });
  }

  const onRefresh = () => {
    setRefreshing(true);
    EventInfo();
  };

  useEffect(() => {
    EventInfo();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>DEDICATE</Text>
        <FontAwesome name="search" size={24} style={styles.searchIcon} />
      </View>
      <ScrollView
        style={styles.eventList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {event.map((item, index) => (
          <EventsCard item={item} key={index} />
        ))}
      </ScrollView>
      <CodeQR/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginTop: 30,
  },
  logo: {
    fontSize: 18,
    fontWeight: "bold",
  },
  searchIcon: {
    marginLeft: 16,
  },
  eventList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  eventItem: {
    fontSize: 16,
    marginBottom: 8,
  },
});
