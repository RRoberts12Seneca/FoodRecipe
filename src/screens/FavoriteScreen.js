import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function FavoriteScreen() {
  const navigation = useNavigation();
  const favorites = useSelector((state) => state.favorites.favoriterecipes);

  // EMPTY STATE
  if (!favorites || favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorite recipes yet!</Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container} testID="favoriteRecipes">
      <Text style={styles.heading}>My Favorite Recipes</Text>

      {/* GO BACK BUTTON */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>Go Back</Text>
      </TouchableOpacity>

      {/* LIST */}
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.idFood}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("RecipeDetail", item)}
          >
            <Image
              source={{ uri: item.recipeImage }}
              style={styles.image}
            />

            <Text style={styles.title}>
              {item.recipeName.length > 20
                ? item.recipeName.slice(0, 20) + "..."
                : item.recipeName}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
  },
  heading: {
    fontSize: hp(3),
    fontWeight: "bold",
    marginBottom: hp(2),
  },
  list: {
    paddingBottom: hp(5),
  },
  card: {
    marginBottom: hp(2),
  },
  image: {
    width: "100%",
    height: hp(20),
    borderRadius: 15,
  },
  title: {
    fontSize: hp(2),
    fontWeight: "600",
    marginTop: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: hp(2.2),
    marginBottom: hp(2),
  },
  backButton: {
    backgroundColor: "#fbbf24",
    padding: 10,
    borderRadius: 10,
  },
  backText: {
    color: "#fff",
    fontWeight: "bold",
  },
});