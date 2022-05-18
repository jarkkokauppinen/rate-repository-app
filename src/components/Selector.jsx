import { View, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const styles = StyleSheet.create({
  picker: {
    padding: 20,
    backgroundColor: '#e1e4e8',
    marginLeft: 10
  }
});

const Selector = ({ order, setOrder }) => {

  return (
    <View>
      <Picker
        style={styles.picker}
        selectedValue={order}
        onValueChange={(itemValue) =>
          setOrder(itemValue)
        }>
        <Picker.Item label='Latest repositories' value='latest' />
        <Picker.Item label='Highest rated repositories' value='highest' />
        <Picker.Item label='Lowest rated repositories' value='lowest' />
      </Picker>
    </View>
  )
};

export default Selector;