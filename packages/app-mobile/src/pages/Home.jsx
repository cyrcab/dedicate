import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import EventsCard from "../components/EventsCard";
import { axiosApiInstance } from "../../axios.config";
import { backendUrl } from "../backendUrl";

export default function Home() {
  const [event, setEvent] = useState([]);

  function EventInfo() {
    axiosApiInstance.get(backendUrl + "events/next/next").then((response) => {
      setEvent(response.data.data);
    });
  }

  useEffect(() => {
    EventInfo();
  }, []);
  console.log(event);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>DEDICATE</Text>
        <FontAwesome name="search" size={24} style={styles.searchIcon} />
      </View>
      <ScrollView style={styles.eventList}>
        {event.map((item) => (
          <EventsCard item={item} />
        ))}
      </ScrollView>
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
