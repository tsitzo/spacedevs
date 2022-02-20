import React, { FC, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import Typography from "../text/Typography";
import Spacer from "../layout/Spacer";

interface IHomeCountdownProps {
  date: string;
}

let timer: NodeJS.Timeout;

const HomeCountdown: FC<IHomeCountdownProps> = ({ date }) => {
  const { colors } = useTheme();
  const [timeLeft, setTimeLeft] = useState(0);
  const stamp = new Date(date).getTime() / 1000;

  useEffect(() => {
    updateTimeLeft();
    if (stamp) {
      timer = setInterval(() => {
        updateTimeLeft();
      }, 1000);
    } else {
      setTimeLeft(0);
    }

    return () => {
      clearInterval(timer);
    };
    /* @ts-ignore */
  }, [updateTimeLeft, stamp]);

  const updateTimeLeft = () => {
    const now = new Date();

    const timeLeft = stamp * 1000 - now.getTime();
    setTimeLeft(timeLeft);
  };

  const seconds = Math.floor(timeLeft / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const noTimeLeft = timeLeft <= 0;

  return (
    <View style={styles.countdown}>
      <View style={styles.countdownBlockWraooer}>
        <View style={styles.countdownNumberWraooer}>
          <Typography style={styles.countdownNumberText} variant="bold">
            {noTimeLeft ? "-" : days < 10 ? `0${days}` : days}
          </Typography>
        </View>
        <Spacer y={5} />
        <Typography variant="bold" style={styles.countdownNumberLabel}>
          dys
        </Typography>
      </View>
      <Spacer x={10} />

      <View style={styles.countdownBlockWraooer}>
        <View style={styles.countdownNumberWraooer}>
          <Typography style={styles.countdownNumberText} variant="bold">
            {noTimeLeft ? "-" : hours % 24 < 10 ? `0${hours % 24}` : hours % 24}
          </Typography>
        </View>
        <Spacer y={5} />
        <Typography variant="bold" style={styles.countdownNumberLabel}>
          hrs
        </Typography>
      </View>
      <Spacer x={10} />

      <View style={styles.countdownBlockWraooer}>
        <View style={styles.countdownNumberWraooer}>
          <Typography style={styles.countdownNumberText} variant="bold">
            {noTimeLeft
              ? "-"
              : minutes % 60 < 10
              ? `0${minutes % 60}`
              : minutes % 60}
          </Typography>
        </View>
        <Spacer y={5} />
        <Typography variant="bold" style={styles.countdownNumberLabel}>
          min
        </Typography>
      </View>
      <Spacer x={10} />
      <View style={styles.countdownBlockWraooer}>
        <View style={styles.countdownNumberWraooer}>
          <Typography style={styles.countdownNumberText} variant="bold">
            {noTimeLeft
              ? "-"
              : seconds % 60 < 10
              ? `0${seconds % 60}`
              : seconds % 60}
          </Typography>
        </View>
        <Spacer y={5} />
        <Typography variant="bold" style={styles.countdownNumberLabel}>
          sec
        </Typography>
      </View>
    </View>
  );
};

export default HomeCountdown;

const styles = StyleSheet.create({
  countdown: { flexDirection: "row" },
  countdownBlockWraooer: { alignItems: "center" },
  countdownNumberWraooer: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 7.5,
    width: 40,
    borderRadius: 5,
  },
  countdownNumberText: { color: "black" },
  countdownNumberLabel: { color: "#989899" },
});
