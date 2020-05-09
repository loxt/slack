import React from 'react';
import { ReactionPickerWrapper } from 'stream-chat-react-native';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import iconEmotion from '../images/icon-emoticon.png';

const MessageFooter = (props) => {
  const { message, handleReaction, supportedReactions } = props;
  return (
    <View style={styles.reactionListContainer}>
      {message.latest_reactions &&
        message.latest_reactions.length > 0 &&
        renderReactions(
          message.latest_reactions,
          supportedReactions,
          message.reaction_counts,
          handleReaction
        )}

      <ReactionPickerWrapper {...props} offset={{ left: -70, top: 10 }}>
        {message.latest_reactions && message.latest_reactions.length > 0 && (
          <View style={styles.reactionPickerContainer}>
            <Image source={iconEmotion} style={styles.reactionPickerIcon} />
          </View>
        )}
      </ReactionPickerWrapper>
    </View>
  );
};

const renderReactions = (
  reactions,
  supportedReactions,
  reactionsCount,
  handleReaction
) => {
  const reactionsByType = {};
  reactions &&
    reactions.forEach((item) => {
      if (reactions[item.type] === undefined) {
        return (reactionsByType[item.type] = [item]);
      }
      return (reactionsByType[item.type] = [
        ...reactionsByType[item.type],
        item,
      ]);
    });

  const emojiDataByType = {};
  supportedReactions.forEach((e) => (emojiDataByType[e.id] = e));

  const reactionTypes = supportedReactions.map((e) => e.id);
  return Object.keys(reactionsByType).map((type, index) =>
    reactionTypes.indexOf(type) > -1 ? (
      <ReactionItem
        key={index}
        type={type}
        handleReaction={handleReaction}
        reactionCounts={reactionsCount}
        emojiDataByType={emojiDataByType}
      />
    ) : null
  );
};

const ReactionItem = ({
  type,
  handleReaction,
  reactionCounts,
  emojiDataByType,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        handleReaction(type);
      }}
      key={type}
      style={styles.reactionItemContainer}
    >
      <Text style={styles.reactionItem}>
        {emojiDataByType[type].icon}
        {reactionCounts[type]}
      </Text>
    </TouchableOpacity>
  );
};

MessageFooter.propTypes = {
  message: PropTypes.shape({
    latest_reactions: PropTypes.array.isRequired,
    reaction_counts: PropTypes.object.isRequired,
  }).isRequired,
  handleReaction: PropTypes.func.isRequired,
  supportedReactions: PropTypes.arrayOf(PropTypes.any).isRequired,
};

ReactionItem.propTypes = {
  type: PropTypes.string.isRequired,
  handleReaction: PropTypes.func.isRequired,
  reactionCounts: PropTypes.objectOf(PropTypes.number).isRequired,
  emojiDataByType: PropTypes.shape({
    like: PropTypes.object.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  reactionListContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 10,
  },
  reactionItemContainer: {
    borderColor: '#0064c2',
    borderWidth: 1,
    padding: 4,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 10,
    backgroundColor: '#d6ebff',
    marginRight: 5,
  },
  reactionItem: {
    color: '#0064c2',
    fontSize: 14,
  },
  reactionPickerContainer: {
    padding: 4,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
  },
  reactionPickerIcon: {
    width: 19,
    height: 19,
  },
});

export default MessageFooter;
