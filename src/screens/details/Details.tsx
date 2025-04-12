import React, { useCallback } from "react";
import { View, Text, Button } from "react-native";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { updateToken, watchToken } from "../../redux/slices/tokenSlice";
import { wsDisconnect } from "../../redux/slices/wsSlice";
import { DetailsRouteProps } from "./Details.types";
import Loader from "../../components/atoms/loader/Loader";
import useNavigation from "../../navigator/useNavigation";

const DetailsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<DetailsRouteProps>();
  const { tokenSymbol } = route?.params;

  const dispatch = useDispatch();
  const { isConnected } = useSelector((state: RootState) => state.websocket);
  const { watchedToken } = useSelector((state: RootState) => state.token);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        dispatch(watchToken(tokenSymbol.toLowerCase()));
      }, 500);

      return () => {
        dispatch(wsDisconnect());
        dispatch(updateToken());
      };
    }, [tokenSymbol])
  );

  return (
    <View>
      <Button title={"BACK"} onPress={() => navigation.goBack()} />

      <Text>
        Stato connessione: {isConnected ? "✅ Connesso" : "❌ Disconnesso"}
      </Text>

      {isConnected && watchedToken ? (
        <Text>
          Prezzo {watchedToken?.symbol}: ${watchedToken?.price || "--"}
        </Text>
      ) : (
        <Loader testID="details-loader" />
      )}
    </View>
  );
};

export default DetailsScreen;
