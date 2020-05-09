import React from 'react';
import PropTypes from 'prop-types';
import { MessageUserBar } from './MessageHeader';

const MessageText = (props) => {
  const { message, renderText, theme } = props;
  const { markdown } = theme.message.content;
  return (
    <>
      {message.attachments.length === 0 && <MessageUserBar {...props} />}
      {renderText(message, markdown)}
    </>
  );
};

MessageText.propTypes = {
  message: PropTypes.shape({
    attachments: PropTypes.array.isRequired,
  }).isRequired,
  renderText: PropTypes.func.isRequired,
  theme: PropTypes.shape({
    message: PropTypes.object.isRequired,
  }).isRequired,
};

export default MessageText;
