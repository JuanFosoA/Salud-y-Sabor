// app/(tabs)/(recipeScreens)/_layout.tsx

import { Stack } from "expo-router";

export default function RecipeScreensLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
