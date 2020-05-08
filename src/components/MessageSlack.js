import React from 'react';
import { MessageSimple } from 'stream-chat-react-native';
import MessageAvatar from './MessageAvatar';
import MessageHeader from './MessageHeader';
import MessageFooter from './MessageFooter';
import MessageText from './MessageText';
import Giphy from './Giphy';
import UrlPreview from './UrlPreview';

const MessageSlack = (props) => {
  if (props.message.deleted_at) {
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

export default MessageSlack;
