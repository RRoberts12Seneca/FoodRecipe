import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Categories from "../components/categories";
import Recipes from "../components/recipes";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Chicken");

  const categories = [
    { idCategory: "1", strCategory: "Beef", strCategoryThumb: "" },
    { idCategory: "2", strCategory: "Chicken", strCategoryThumb: "" },
    { idCategory: "3", strCategory: "Dessert", strCategoryThumb: "" },
    { idCategory: "4", strCategory: "Lamb", strCategoryThumb: "" },
    { idCategory: "5", strCategory: "Pasta", strCategoryThumb: "" },
    { idCategory: "6", strCategory: "Seafood", strCategoryThumb: "" },
    { idCategory: "7", strCategory: "Vegan", strCategoryThumb: "" },
    { idCategory: "8", strCategory: "Vegetarian", strCategoryThumb: "" },
    { idCategory: "9", strCategory: "Breakfast", strCategoryThumb: "" },
    { idCategory: "10", strCategory: "My Food", strCategoryThumb: "" },
  ];

  const [allFood] = useState([
    {
      idFood: "1",
      recipeName: "Chicken Curry",
      category: "Chicken",
      recipeImage: "https://via.placeholder.com/300",
      recipeInstructions: "Cook chicken with spices...",
      ingredients: [{ ingredientName: "Chicken", measure: "500g" }],
    },
    {
      idFood: "2",
      recipeName: "Beef Steak",
      category: "Beef",
      recipeImage: "https://via.placeholder.com/300",
      recipeInstructions: "Grill beef steak...",
      ingredients: [{ ingredientName: "Beef", measure: "400g" }],
    },
  ]);

  const handleChangeCategory = (category) => {
    setActiveCategory(category);
  };

  const filteredfoods = allFood.filter(
    (food) => food.category === activeCategory
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView testID="scrollContainer" showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header} testID="headerContainer">
          <Image
            source={{ uri: "https://via.placeholder.com/100" }}
            style={styles.avatar}
          />
          <Text style={styles.greeting}>Hello, User!</Text>
        </View>

        {/* Title */}
        <View style={styles.titleContainer} testID="titleContainer">
          <Text style={styles.mainTitle}>Make your own food</Text>
          <Text style={styles.subTitle}>Stay at home</Text>
        </View>

        {/* Categories */}
        <View testID="categoryList">
          <Categories
            categories={categories}
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>

        {/* Recipes */}
        <View testID="foodList">
          <Recipes foods={filteredfoods} categories={categories} />
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(5),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(5),
  },
  avatar: {
    width: hp(5),
    height: hp(5),
    borderRadius: hp(2.5),
    marginRight: 10,
  },
  greeting: {
    fontSize: hp(2.2),
    fontWeight: "600",
  },
  titleContainer: {
    paddingHorizontal: wp(5),
    marginTop: hp(2),
  },
  mainTitle: {
    fontSize: hp(3),
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: hp(2),
    color: "gray",
  },
});