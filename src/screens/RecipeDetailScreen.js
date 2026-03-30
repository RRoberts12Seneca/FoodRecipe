import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/favoritesSlice";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function RecipeDetailScreen({ route, navigation }) {
  const recipe = route.params;
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.favoriterecipes);
  const isFav = favorites.some((r) => r.idFood === recipe.idFood);

  return (
    <ScrollView style={styles.container}>
      
      {/* IMAGE */}
      <View testID="imageContainer">
        <Image
          source={{ uri: recipe.recipeImage }}
          style={styles.recipeImage}
        />
      </View>

      {/* BUTTONS */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => dispatch(toggleFavorite(recipe))}>
          <Text style={styles.favBtn}>{isFav ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </View>

      {/* TITLE */}
      <View testID="recipeTitle">
        <Text style={styles.title}>{recipe.recipeName}</Text>
      </View>

      {/* CATEGORY */}
      <View testID="recipeCategory">
        <Text style={styles.category}>{recipe.category}</Text>
      </View>

      {/* MISC INFO */}
      <View style={styles.miscContainer} testID="miscContainer">
        <Text>⏱ 30 mins</Text>
        <Text>🍽 2 servings</Text>
        <Text>🔥 500 calories</Text>
        <Text>⭐ Easy</Text>
      </View>

      {/* INGREDIENTS */}
      <View style={styles.sectionContainer} testID="sectionContainer">
        <Text style={styles.sectionTitle}>Ingredients</Text>

        <View testID="ingredientsList">
          {recipe.ingredients &&
            recipe.ingredients.map((ing, i) => (
              <View key={i} style={styles.ingredientItem}>
                <Text>
                  {ing.ingredientName} - {ing.measure}
                </Text>
              </View>
            ))}
        </View>
      </View>

      {/* INSTRUCTIONS */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.instructionsText}>
          {recipe.recipeInstructions}
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
  },
  recipeImage: {
    width: "100%",
    height: hp(30),
    borderRadius: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: hp(2),
  },
  backBtn: {
    fontSize: hp(2),
    color: "blue",
  },
  favBtn: {
    fontSize: hp(3),
  },
  title: {
    fontSize: hp(3),
    fontWeight: "bold",
  },
  category: {
    fontSize: hp(2),
    color: "gray",
    marginBottom: hp(1),
  },
  miscContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: hp(2),
  },
  sectionContainer: {
    marginVertical: hp(2),
  },
  sectionTitle: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    marginBottom: 5,
  },
  ingredientItem: {
    marginBottom: 5,
  },
  instructionsText: {
    fontSize: hp(2),
    color: "#333",
  },
});