import React, { memo, useCallback, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { wsDisconnect, wsSubscribe } from "../../redux/slices/wsSlice";
import { Screens } from "../../navigator/StackNavigator.types";
import useNavigation from "../../navigator/useNavigation";
import { useFocusEffect } from "@react-navigation/native";

const Home: React.FC = memo(() => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { priceUpdates, isConnected, subscribedAsset } = useSelector(
    (state: RootState) => state.websocket
  );

  useFocusEffect(
    useCallback(() => {
      console.log("subscribe asset");
      dispatch(wsSubscribe("btcusdt"));

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
        Prezzo {subscribedAsset}: ${priceUpdates || "--"}
      </Text>

      <Button
        title="Go to detail"
        onPress={() => navigation.navigate(Screens.DETAILS)}
      />
    </View>
  );
});

export default Home;
