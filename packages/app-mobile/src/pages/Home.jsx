import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, RefreshControl } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import EventsCard from "../components/EventsCard";
import { axiosApiInstance } from "../../axios.config";
import { backendUrl } from "../backendUrl";
import CodeQR from "../components/CodeQR";

import styles from "./styles";

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
    <View style={styles.containerHome}>
      <View style={styles.headerHome}>
        <Text style={styles.logoHome}>DEDICATE</Text>
        <FontAwesome name="search" size={24} style={styles.searchIconHome} />
      </View>
      <ScrollView
        style={styles.eventListHome}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {event.map((item, index) => (
          <EventsCard item={item} key={index} />
        ))}
      </ScrollView>
      <CodeQR />
    </View>
  );
}

