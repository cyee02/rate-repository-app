import React from 'react';
import { StyleSheet, TextInput, Text, Systrace } from 'react-native';
import { useField } from 'formik';
import theme from '../../assets/theme';

const styles = StyleSheet.create({
  errorText: {
    marginLeft: 10,
    color: theme.colors.red,
    fontFamily: theme.fonts.mainThin,
  },
});``

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        borderColor={showError ? theme.colors.red : theme.colors.textPrimaryasv}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;