import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
let originalData = [];

const App = () => {
  const [mydata, setMydata] = useState([]);
  const [loading, setLoading] = useState(false)

  const url =
    "https://mysafeinfo.com/api/data?list=catbreeds&format=json&case=default";
  useEffect(() => {
    setLoading(true)
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (originalData.length < 1) {
          setMydata(data);
          originalData = data;
        }
        setLoading(false)
      });

      
  }, []);

  const filterTextData = (text) => {
    if (text != "") {
      const filteredData = originalData.filter((data) => {
        return data.BreedName.toLowerCase().includes(text.toLowerCase());
      });

      setMydata(filteredData);
    } else {
      setMydata(originalData);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.breedName}>
          {item.BreedName}
        </Text>
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Origin:</Text>
            <Text style={styles.value}>{item.Origin}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value}>{item.OriginLocation}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Coat Type:</Text>
            <Text style={styles.value}>{item.CoatType}</Text>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        {/* this is a cool loading component */}
        <ActivityIndicator size="large" color="#6B4EFF" />
      </View>
    );
  }

  // if (error) {
  //   return (
  //     <View style={styles.centerContainer}>
  //       <Text style={styles.errorText}>{error}</Text>
  //     </View>
  //   );
  // }
  

  return (
    <SafeAreaView style={styles.container}>
      
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F7" />
      
      <View style={styles.header}>
        <View style={styles.brand}>
          <FontAwesome5 name="cat" size={24} color="black" />
          <Text style={styles.title}> CatBreeds</Text>
        </View>

        <View style={styles.searchContainer}>
          <Text style={styles.searchLabel}>Search breeds:</Text>
          <TextInput
            style={styles.searchInput}
            onChangeText={(text) => filterTextData(text)}
            placeholder="Type breed name..."
            placeholderTextColor="#666"
            clearButtonMode="while-editing"
          />
        </View>
      </View>

      <FlatList
        data={mydata}
        renderItem={renderItem}
        keyExtractor={(item) => item.ID.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: 16,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E1E1E1",
  },
  brand: {
    display:'flex',
    flexDirection:'row',
    alignItems:'center'
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 16,
  },
  searchContainer: {
    marginBottom: 8,
  },
  searchLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  searchInput: {
    height: 40,
    backgroundColor: "#F5F5F7",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E1E1E1",
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  breedName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  detailsContainer: {
    gap: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: "#666",
    width: 80,
  },
  value: {
    fontSize: 14,
    color: "#1A1A1A",
    flex: 1,
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 16,
    textAlign: "center",
  },
});

export default App;