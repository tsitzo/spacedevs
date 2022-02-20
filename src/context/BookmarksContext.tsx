import React, { FC, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NewsArticle } from "../types/apiResponse";

type BookmarksContextState = {
  bookmarkedNews: NewsArticle[];
  bookmarkedLaunches: string[];
  addToBookmarkedNews: (article: NewsArticle) => void;
  addToBookmarkedLaunches: (launchId: string) => void;
  removeFromBookmarkedNews: (article: NewsArticle) => void;
  removeFromBookmarkedLaunches: (launchId: string) => void;
};

const contextDefaultValue: BookmarksContextState = {
  bookmarkedNews: [],
  bookmarkedLaunches: [],
  addToBookmarkedNews: () => {},
  addToBookmarkedLaunches: () => {},
  removeFromBookmarkedNews: () => {},
  removeFromBookmarkedLaunches: () => {},
};

export const BookmarksContext =
  createContext<BookmarksContextState>(contextDefaultValue);

export const BookmarksContextProvider: FC = ({ children }) => {
  const [bookmarkedNews, setBookmarkedNews] = useState<NewsArticle[]>(
    contextDefaultValue.bookmarkedNews
  );

  const [bookmarkedLaunches, setBookmarkedLaunches] = useState<string[]>(
    contextDefaultValue.bookmarkedLaunches
  );

  const addToBookmarkedNews = (article: NewsArticle) => {
    setBookmarkedNews([...bookmarkedNews, article]);
  };

  const addToBookmarkedLaunches = (launchId: string) => {
    setBookmarkedLaunches([...bookmarkedLaunches, launchId]);
  };

  const removeFromBookmarkedNews = (article: NewsArticle) => {
    setBookmarkedNews(
      bookmarkedNews.filter((bookmark) => bookmark.id !== article.id)
    );
  };

  const removeFromBookmarkedLaunches = (launchId: string) => {
    setBookmarkedLaunches(
      bookmarkedLaunches.filter((bookmark) => bookmark !== launchId)
    );
  };

  const saveBookmarkedNews = async (value: NewsArticle[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@ORBITAL/bookmarkedNews", jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const saveBookmarkedLaunches = async (value: string[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@ORBITAL/bookmarkedLaunches", jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const loadBookmarkedNews = async () => {
    try {
      const value = await AsyncStorage.getItem("@ORBITAL/bookmarkedNews");
      if (value !== null) {
        setBookmarkedNews(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadBookmarkedLaunches = async () => {
    try {
      const value = await AsyncStorage.getItem("@ORBITAL/bookmarkedLaunches");
      if (value !== null) {
        setBookmarkedLaunches(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadBookmarkedNews();
  }, []);

  useEffect(() => {
    loadBookmarkedLaunches();
  }, []);

  useEffect(() => {
    saveBookmarkedNews(bookmarkedNews);
  }, [bookmarkedNews]);

  useEffect(() => {
    saveBookmarkedLaunches(bookmarkedLaunches);
  }, [bookmarkedLaunches]);

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedNews,

        bookmarkedLaunches,
        addToBookmarkedNews,

        addToBookmarkedLaunches,
        removeFromBookmarkedNews,

        removeFromBookmarkedLaunches,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
};
