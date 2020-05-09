import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import Moment from 'moment';

const MessageHeader = (props) => {
  const { message } = props;
  return (
    <View style={styles.column}>
      {message.attachments.length > 0 && (
        <View style={styles.header}>
          <MessageUserBar {...props} />
        </View>
      )}
    </View>
  );
};

const MessageUserBar = ({ groupStyles, message }) => {
  if (groupStyles[0] === 'single' || groupStyles[0] === 'top') {
    return (
      <View style={styles.userBar}>
        <Text style={styles.messageUserName}>{message.user.name}</Text>
        <Text style={styles.messageDate}>
          {Moment(message.created_at).format('hh:ss A')}
        </Text>
      </View>
    );
  }
  return null;
};

MessageHeader.propTypes = {
  message: PropTypes.shape({
    attachments: PropTypes.array,
  }).isRequired,
};

MessageUserBar.propTypes = {
  groupStyles: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ).isRequired,

  message: PropTypes.shape({
    user: PropTypes.object,
    created_at: PropTypes.any,
    attachments: PropTypes.array.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
  },
  header: {
    paddingLeft: 8,
  },
  userBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  messageUserName: {
    fontWeight: '900',
    color: 'black',
    fontSize: 15,
    fontFamily: 'Lato-Bold',
  },
  messageDate: {
    color: 'grey',
    marginLeft: 6,
    fontSize: 10,
  },
});

export { MessageHeader, MessageUserBar };
