import React from 'react';
import moment from 'moment';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const DateSeparator = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{moment(message.date).calendar()}</Text>
      <Text style={styles.line} />
    </View>
  );
};

DateSeparator.propTypes = {
  message: PropTypes.shape({
    date: PropTypes.any,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginBottom: 10,
    marginTop: 10,
  },
  date: {
    fontWeight: 'bold',
    paddingBottom: 5,
    fontSize: 12,
  },
  line: {
    flex: 1,
    height: 0.5,
    backgroundColor: '#E8E8E8',
  },
});

export default DateSeparator;
