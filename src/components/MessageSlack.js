import React from 'react';
import { MessageSimple } from 'stream-chat-react-native';
import PropTypes from 'prop-types';
import MessageAvatar from './MessageAvatar';
import { MessageHeader } from './MessageHeader';
import MessageFooter from './MessageFooter';
import MessageText from './MessageText';
import Giphy from './Giphy';
import UrlPreview from './UrlPreview';

const MessageSlack = (props) => {
  const { message } = props;
  if (message.deleted_at) {
    return null;
  }

  return (
    <MessageSimple
      {...props}
      forceAlign='left'
      ReactionList={null}
      MessageAvatar={MessageAvatar}
      MessageHeader={MessageHeader}
      MessageFooter={MessageFooter}
      MessageText={MessageText}
      UrlPreview={UrlPreview}
      Giphy={Giphy}
    />
  );
};

MessageSlack.propTypes = {
  message: PropTypes.shape({
    deleted_at: PropTypes.string,
  }).isRequired,
};

export default MessageSlack;
