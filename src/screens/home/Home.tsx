import React, { memo, useCallback } from "react";
import { View, FlatList } from "react-native";
import { Screens } from "../../navigator/StackNavigator.types";
import useNavigation from "../../navigator/useNavigation";
import { useFocusEffect } from "@react-navigation/native";
import { watchTokenList } from "../../redux/slices/tokenSlice";
import { wsDisconnect } from "../../redux/slices/wsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import TokenListCard from "../../components/molecules/token-list-card/TokenListCard";
import styles from "./Home.styles";
import Loader from "../../components/atoms/loader/Loader";

const Home: React.FC = memo(() => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { tokenList } = useSelector((state: RootState) => state.token);

  useFocusEffect(
    useCallback(() => {
      console.log("subscribe token list");
      dispatch(watchTokenList());

      return () => {
        dispatch(wsDisconnect());
      };
    }, [])
  );

  const goToTokenDetails = (symbol: string) => {
    navigation.navigate(Screens.DETAILS, { tokenSymbol: symbol });
  };

  return (
    <View style={styles.container}>
      {tokenList?.length ? (
        <FlatList
          data={tokenList}
          testID="token-list"
          keyExtractor={(item) => `list-item-${item.symbol}`}
          renderItem={({ item }) => (
            <TokenListCard
              token={item}
              onPress={() => goToTokenDetails(item.symbol)}
            />
          )}
        />
      ) : (
        <Loader testID="home-loader" />
      )}
    </View>
  );
});

export default Home;
