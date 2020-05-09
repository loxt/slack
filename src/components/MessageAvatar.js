import React from 'react';
import { MessageAvatar as StreamMessageAvatar } from 'stream-chat-react-native';
import PropTypes from 'prop-types';

const MessageAvatar = (props) => {
  const { groupStyles } = props;
  return (
    <StreamMessageAvatar
      {...props}
      showAvatar={!!(groupStyles[0] === 'single' || groupStyles[0] === 'top')}
    />
  );
};

MessageAvatar.propTypes = {
  groupStyles: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ).isRequired,
};

export default MessageAvatar;
