import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function MyRecipeScreen() {
  const [recipes, setrecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchrecipes();
  }, []);

  const fetchrecipes = async () => {
    try {
      const stored = await AsyncStorage.getItem("customrecipes");
      if (stored) {
        setrecipes(JSON.parse(stored));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handlerecipeClick = (recipe) => {
    navigation.navigate("CustomRecipesScreen", { recipe });
  };

  const handleAddrecipe = () => {
    navigation.navigate("RecipesFormScreen");
  };

  const deleterecipe = async (index) => {
    try {
      const updated = [...recipes];
      updated.splice(index, 1);
      await AsyncStorage.setItem(
        "customrecipes",
        JSON.stringify(updated)
      );
      setrecipes(updated);
    } catch (error) {
      console.log(error);
    }
  };

  const editrecipe = (recipe, index) => {
    navigation.navigate("RecipesFormScreen", {
      recipeToEdit: recipe,
      recipeIndex: index,
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading recipes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      {/* BACK BUTTON */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>Back</Text>
      </TouchableOpacity>

      {/* ADD BUTTON */}
      <TouchableOpacity style={styles.addBtn} onPress={handleAddrecipe}>
        <Text style={styles.addText}>Add New Recipe</Text>
      </TouchableOpacity>

      {recipes.length === 0 ? (
        <Text style={styles.empty}>No recipes added yet</Text>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              testID="handlerecipeBtn"
              style={styles.card}
              onPress={() => handlerecipeClick(item)}
            >
              {/* IMAGE */}
              {item.image ? (
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                />
              ) : null}

              <Text style={styles.title}>{item.title}</Text>

              <Text testID="recipeDescp" style={styles.desc}>
                {item.description
                  ? item.description.length > 50
                    ? item.description.slice(0, 50) + "..."
                    : item.description
                  : ""}
              </Text>

              {/* EDIT / DELETE */}
              <View style={styles.buttons} testID="editDeleteButtons">
                <TouchableOpacity
                  onPress={() => editrecipe(item, index)}
                >
                  <Text style={styles.edit}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => deleterecipe(index)}
                >
                  <Text style={styles.delete}>Delete</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  back: {
    color: "blue",
    marginBottom: 10,
  },
  addBtn: {
    backgroundColor: "#fbbf24",
    padding: 10,
    borderRadius: 10,
    marginBottom: hp(2),
  },
  addText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  empty: {
    textAlign: "center",
    marginTop: hp(5),
  },
  card: {
    marginBottom: hp(2),
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: hp(20),
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: hp(2.2),
    fontWeight: "bold",
  },
  desc: {
    color: "gray",
    marginVertical: 5,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  edit: {
    color: "green",
  },
  delete: {
    color: "red",
  },
});