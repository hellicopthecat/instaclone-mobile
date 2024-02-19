import {ReactNode} from "react";
import {ActivityIndicator, View} from "react-native";

interface IScreenLayout {
  loading: boolean;
  children: ReactNode;
}
const ScreenLayout: React.FC<IScreenLayout> = ({loading, children}) => {
  return (
    <View style={{flex: 1}}>
      {loading ? <ActivityIndicator color="gray" /> : children}
    </View>
  );
};
export default ScreenLayout;
