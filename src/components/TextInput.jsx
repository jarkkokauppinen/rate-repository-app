import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 12,
    borderRadius: 5
  }
});

// eslint-disable-next-line no-unused-vars
const TextInput = ({ style, error, ...props }) => {
  //const textInputStyle = [style];

  return <NativeTextInput style={styles.input} {...props} />;
  //return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;