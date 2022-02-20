import React, {
  FC,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

import { BookmarksContext } from "../context/BookmarksContext";
import { AppStackParams } from "../types/navigation";
import SafeArea from "../components/layout/SafeArea";
import NewsTile from "../components/ui/NewsTile";
import Typography from "../components/text/Typography";
import Spacer from "../components/layout/Spacer";
import { NewsArticle } from "../types/apiResponse";

interface ISavedNewsScreenProps {
  navigation: NativeStackNavigationProp<AppStackParams, "SavedNewsScreen">;
}

const SavedNewsScreen: FC<ISavedNewsScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const { bookmarkedNews } = useContext(BookmarksContext);

  const [search, setSearch] = React.useState("");
  const [news, setNews] = useState<NewsArticle[]>([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: (event) => setSearch(event.nativeEvent.text),
        textColor: colors.subtext,
        obscureBackground: false,
        hideWhenScrolling: false,
      },
    });
  }, [navigation]);

  useEffect(() => {
    if (bookmarkedNews) {
      setNews(bookmarkedNews);

      const filteredNews = bookmarkedNews.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.newsSite.toLowerCase().includes(search.toLowerCase())
      );

      setNews(filteredNews);
    }
  }, [search, bookmarkedNews]);

  return (
    <SafeArea>
      {news && bookmarkedNews.length > 0 ? (
        <FlatList
          contentContainerStyle={styles.flatListContent}
          data={news}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.listItemWrapper,
                {
                  borderBottomColor: colors.separator,
                  borderBottomWidth:
                    index + 1 < bookmarkedNews.length ? 0.17 : 0,
                },
              ]}
            >
              <NewsTile article={item} />
            </View>
          )}
        />
      ) : (
        <View style={styles.centeredPage}>
          <Typography style={styles.centerText}>
            There are no bookmarked news.
          </Typography>
          <Spacer y={10} />
          <Typography style={styles.centerText}>
            They will appear on this page once you click on the{" "}
            <Ionicons name="bookmark" color={colors.primary} /> button on each
            news.
          </Typography>
        </View>
      )}
    </SafeArea>
  );
};

export default SavedNewsScreen;

const styles = StyleSheet.create({
  centeredPage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  listItemWrapper: { paddingVertical: 20 },
  flatListContent: { paddingHorizontal: 15 },
  centerText: { textAlign: "center" },
});
