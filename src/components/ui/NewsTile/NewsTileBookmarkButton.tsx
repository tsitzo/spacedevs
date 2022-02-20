import React, { FC, useContext } from "react";
import { TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { BookmarksContext } from "../../../context/BookmarksContext";
import { NewsArticle } from "../../../types/apiResponse";

interface INewsTileBookmarkButtonProps {
  article: NewsArticle;
  size?: number;
}

const NewsTileBookmarkButton: FC<INewsTileBookmarkButtonProps> = ({
  article,
  size = 22,
}) => {
  const { bookmarkedNews, addToBookmarkedNews, removeFromBookmarkedNews } =
    useContext(BookmarksContext);
  const { colors } = useTheme();
  const isBookmark = bookmarkedNews.find(
    (bookmark) => bookmark.id === article.id
  );

  return (
    <TouchableOpacity
      onPress={() =>
        isBookmark
          ? removeFromBookmarkedNews(article)
          : addToBookmarkedNews(article)
      }
    >
      <Ionicons
        name={isBookmark ? "bookmark" : "bookmark-outline"}
        size={size}
        color={isBookmark ? colors.primary : colors.subtext}
      />
    </TouchableOpacity>
  );
};

export default NewsTileBookmarkButton;
