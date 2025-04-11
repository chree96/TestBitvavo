import React, { useCallback } from "react";
import { View, Text, Button } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { watchToken } from "../../redux/slices/tokenSlice";
import { wsDisconnect } from "../../redux/slices/wsSlice";

const DetailsScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isConnected } = useSelector((state: RootState) => state.websocket);
  const { watchedToken } = useSelector((state: RootState) => state.token);

  useFocusEffect(
    useCallback(() => {
      console.log("subscribe asset");
      setTimeout(() => {
        dispatch(watchToken("btcusdt"));
      }, 500);

      return () => {
        dispatch(wsDisconnect());
      };
    }, [])
  );

  return (
    <View>
      <Text>
        Stato connessione: {isConnected ? "✅ Connesso" : "❌ Disconnesso"}
      </Text>

      <Text>
        Prezzo {watchedToken?.symbol}: ${watchedToken?.price || "--"}
      </Text>

      <Button title={"BACK"} onPress={() => navigation.goBack()} />
    </View>
  );
};

export default DetailsScreen;
