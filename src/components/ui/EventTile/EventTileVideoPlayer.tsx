import React, { FC, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import YoutubePlayer, { YoutubeIframeRef } from "react-native-youtube-iframe";
import { Ionicons } from "@expo/vector-icons";

interface IEventTileVideoPlayerProps {
  video: string;
  image: string;
}

const EventTileVideoPlayer: FC<IEventTileVideoPlayerProps> = ({
  video,
  image,
}) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const playerRef = useRef<YoutubeIframeRef>(null);

  return (
    <>
      {isPressed ? (
        <YoutubePlayer
          ref={playerRef}
          width={Dimensions.get("window").width - 20}
          height={220}
          videoId={video.split("v=")[1]}
        />
      ) : (
        <TouchableOpacity
          style={styles.imagePanel}
          onPress={() => setIsPressed(true)}
        >
          <ImageBackground
            resizeMode="cover"
            source={{ uri: image }}
            style={styles.imageBackground}
          />
          <View style={styles.imageBackgroundCover} />
          <View style={styles.imageCoverContainer}>
            <Ionicons name="ios-play-circle" size={55} color="#fff" />
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default EventTileVideoPlayer;

const styles = StyleSheet.create({
  imagePanel: {
    borderRadius: 5,
    overflow: "hidden",
    height: 220,
  },
  imageBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  imageBackgroundCover: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(1,1,1,0.7)",
  },
  imageCoverContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
