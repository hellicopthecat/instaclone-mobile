import {Maybe, Photo, Query} from "@/__generated__/graphql";
import DismissKeyBoard from "@/components/DismissKeyBoard";
import {StackNavMakerType} from "@/navigators/StackNavMaker";
import {gql, useLazyQuery} from "@apollo/client";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useEffect} from "react";
import {Controller, useForm} from "react-hook-form";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import styled from "styled-components/native";

const SEARCH_QUERY = gql`
  query SearchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      file
      id
    }
  }
`;
interface ISearch {
  navigation: StackNavigationProp<StackNavMakerType, "StackSearch">;
  route: RouteProp<StackNavMakerType, "StackSearch">;
}
type ISearchForm = {keyword: string};

const Input = styled.TextInput<{$width: number}>`
  width: ${(props) => `${props.$width / 1.1}px`};
  padding: 5px 0px;
`;
const SearchWrapper = styled.View`
  flex: 1;
  justify-content: center;
`;
const MessageCont = styled.View``;
const SearchCont = styled.View``;
const SearchTxt = styled.Text`
  font-weight: 600;
`;

const Search = ({navigation, route}: ISearch) => {
  const numberColumn = 5;
  const {width} = useWindowDimensions();
  const {control, handleSubmit, getValues, setValue, watch} =
    useForm<ISearchForm>({
      defaultValues: {keyword: ""},
    });

  const [startQuery, {data, loading, called}] =
    useLazyQuery<Query>(SEARCH_QUERY);
  const onSubmit = ({keyword}: ISearchForm) => {
    startQuery({variables: {keyword}});
  };

  const SearchBox = () => (
    <Controller
      control={control}
      rules={{required: true}}
      render={({field: {onChange, onBlur, value}}) => (
        <Input
          $width={width}
          placeholder="Search Photo"
          placeholderTextColor={"black"}
          autoCapitalize="none"
          returnKeyLabel="Search"
          returnKeyType="search"
          onChangeText={(text) => setValue("keyword", text)}
          onBlur={onBlur}
          value={value}
          autoCorrect={false}
          onSubmitEditing={handleSubmit(onSubmit)}
        />
      )}
      name="keyword"
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
  }, []);

  const renderItem = (item: Maybe<Photo>) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("PhotoScreen", {photoId: item?.id as number})
      }
    >
      <Image
        source={{uri: item?.file}}
        style={{width: width / numberColumn, height: 100}}
      />
    </TouchableOpacity>
  );
  return (
    <DismissKeyBoard>
      <SearchWrapper>
        {loading ? (
          <MessageCont>
            <MessageCont>
              <ActivityIndicator />
              <SearchTxt>loading</SearchTxt>
            </MessageCont>
          </MessageCont>
        ) : null}
        {!called ? (
          <MessageCont>
            <MessageCont>
              <SearchTxt>검색어를 입력해주세요.</SearchTxt>
            </MessageCont>
          </MessageCont>
        ) : null}
        {data?.searchPhotos !== undefined ? (
          data?.searchPhotos?.length === 0 ? (
            <MessageCont>
              <MessageCont>
                <SearchTxt>찾을수 없습니다.</SearchTxt>
              </MessageCont>
            </MessageCont>
          ) : (
            <FlatList
              numColumns={numberColumn}
              data={data.searchPhotos}
              keyExtractor={(photo) => photo?.id + ""}
              renderItem={({item}) => renderItem(item)}
            />
          )
        ) : null}
      </SearchWrapper>
    </DismissKeyBoard>
  );
};
export default Search;
