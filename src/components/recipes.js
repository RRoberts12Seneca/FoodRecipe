import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Recipes({ foods }) {
  const navigation = useNavigation();

  const ArticleCard = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("RecipeDetail", item)}
        style={styles.card}
      >
        <View testID="articleDisplay">
          <Image
            source={{ uri: item.recipeImage }}
            style={[
              styles.image,
              { height: index % 2 === 0 ? hp(25) : hp(30) },
            ]}
          />

          <Text style={styles.title}>
            {item.recipeName.length > 20
              ? item.recipeName.slice(0, 20) + "..."
              : item.recipeName}
          </Text>

          <Text style={styles.desc}>
            {item.recipeInstructions
              ? item.recipeInstructions.slice(0, 40) + "..."
              : "No description"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View testID="recipesDisplay">
      <FlatList
        data={foods}
        numColumns={2}
        keyExtractor={(item) => item.idFood}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ArticleCard item={item} index={index} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: wp(2),
  },
  image: {
    width: "100%",
    borderRadius: 15,
  },
  title: {
    fontSize: hp(2),
    fontWeight: "bold",
    marginTop: 5,
  },
  desc: {
    fontSize: hp(1.6),
    color: "gray",
  },
});