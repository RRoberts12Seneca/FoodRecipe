import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function RecipesFormScreen({ route, navigation }) {
  const { recipeToEdit, recipeIndex, onrecipeEdited } = route.params || {};

  const [title, setTitle] = useState(recipeToEdit?.title || "");
  const [image, setImage] = useState(recipeToEdit?.image || "");
  const [description, setDescription] = useState(
    recipeToEdit?.description || ""
  );

  const saveRecipe = async () => {
    try {
      const newRecipe = {
        title,
        image,
        description,
      };

      const stored = await AsyncStorage.getItem("customrecipes");
      const recipes = stored ? JSON.parse(stored) : [];

      if (recipeToEdit) {
        // EDIT
        recipes[recipeIndex] = newRecipe;
        if (onrecipeEdited) onrecipeEdited();
      } else {
        // ADD NEW
        recipes.push(newRecipe);
      }

      await AsyncStorage.setItem(
        "customrecipes",
        JSON.stringify(recipes)
      );

      navigation.goBack();
    } catch (error) {
      console.log("Error saving recipe:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Image URL"
        style={styles.input}
        value={image}
        onChangeText={setImage}
      />

      {/* IMAGE PREVIEW */}
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={styles.placeholder}>Upload Image URL</Text>
      )}

      <TextInput
        placeholder="Description"
        style={[styles.input, { height: hp(12) }]}
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.button} onPress={saveRecipe}>
        <Text style={styles.buttonText}>Save Recipe</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(5),
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: hp(2),
  },
  image: {
    width: "100%",
    height: hp(20),
    borderRadius: 10,
    marginBottom: hp(2),
  },
  placeholder: {
    textAlign: "center",
    color: "gray",
    marginBottom: hp(2),
  },
  button: {
    backgroundColor: "#fbbf24",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});