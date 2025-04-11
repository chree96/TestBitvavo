import React, { memo, useCallback } from "react";
import { View, Button, FlatList, Text } from "react-native";
import { Screens } from "../../navigator/StackNavigator.types";
import useNavigation from "../../navigator/useNavigation";
import { useFocusEffect } from "@react-navigation/native";
import { watchTokenList } from "../../redux/slices/tokenSlice";
import { wsDisconnect } from "../../redux/slices/wsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Token } from "../../redux/slices/tokenSlice.types";

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

  const renderTokenList = (item: Token) => (
    <View>
      <Text>{item.symbol}</Text>
      <Text>{item.price}</Text>
    </View>
  );

  return (
    <View>
      <Button
        title="Go to detail"
        onPress={() => navigation.navigate(Screens.DETAILS)}
      />
      <FlatList
        data={tokenList}
        keyExtractor={(item) => `list-item-${item.symbol}`}
        renderItem={({ item }) => renderTokenList(item)}
      />
    </View>
  );
});

export default Home;
