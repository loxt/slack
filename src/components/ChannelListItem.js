import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const ChannelListItem = ({
  channel,
  setActiveChannelId,
  changeChannel,
  isOneOnOneConversation,
  isUnread,
  activeChannelId,
  currentUserId,
}) => {
  let ChannelPrefix = '-';
  let ChannelTitle = '';

  let otherUserId = '';

  const countUnreadMentions = channel.countUnreadMentions();

  if (isOneOnOneConversation) {
    const memberIds = Object.keys(channel.state.members);
    otherUserId = memberIds[0] === currentUserId ? memberIds[1] : memberIds[0];

    ChannelPrefix = channel.state.members[otherUserId].user.online ? (
      <PresenceIndicator online />
    ) : (
      <PresenceIndicator online={false} />
    );

    ChannelTitle = (
      <Text style={isUnread ? styles.unreadChannelTitle : styles.channelTitle}>
        {channel.state.members[otherUserId].user.name}
      </Text>
    );
  }

  return (
    <TouchableOpacity
      key={channel.id}
      onPress={() => {
        setActiveChannelId(channel.id);
        changeChannel(channel.id);
      }}
      style={{
        ...styles.channelRow,
        backgroundColor: activeChannelId === channel.id ? '#0676db' : '#ccc',
        color: '#000',
      }}
    >
      <View style={styles.channelTitleContainer}>
        <Text>{ChannelPrefix}</Text>
        <Text>{ChannelTitle}</Text>
      </View>
      {countUnreadMentions > 0 && (
        <View style={styles.unreadMentionsContainer}>
          <Text style={styles.unreadMentionsText}>{countUnreadMentions}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const PresenceIndicator = (bool) => {
  return (
    <View style={bool.online ? styles.onlineCircle : styles.offlineCircle} />
  );
};

ChannelListItem.propTypes = {
  channel: PropTypes.shape({
    id: PropTypes.string,
    state: PropTypes.object.isRequired,
    countUnreadMentions: PropTypes.func.isRequired,
  }).isRequired,
  setActiveChannelId: PropTypes.func.isRequired,
  changeChannel: PropTypes.func.isRequired,
  isOneOnOneConversation: PropTypes.bool.isRequired,
  isUnread: PropTypes.bool.isRequired,
  activeChannelId: PropTypes.string,
  currentUserId: PropTypes.string.isRequired,
};

ChannelListItem.defaultProps = {
  activeChannelId: '',
};

const textStyles = {
  fontFamily: 'Lato-Regular',
  color: 'white',
  fontSize: 18,
};

const styles = StyleSheet.create({
  onlineCircle: {
    width: 10,
    height: 10,
    borderRadius: 100 / 2,
    backgroundColor: 'green',
  },
  offlineCircle: {
    width: 10,
    height: 10,
    borderRadius: 100 / 2,
    borderColor: 'white',
    borderWidth: 0.3,
    backgroundColor: 'transparent',
  },
  channelRow: {
    padding: 3,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    marginRight: 5,
  },
  channelTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unreadChannelTitle: {
    marginLeft: 3,
    fontWeight: 'bold',
    padding: 5,
    ...textStyles,
  },
  channelTitle: {
    padding: 5,
    fontWeight: '300',
    paddingLeft: 10,
    ...textStyles,
  },
  channelTitlePrefix: {
    fontWeight: '300',
    ...textStyles,
  },
  unreadMentionsContainer: {
    backgroundColor: 'red',
    borderRadius: 20,
    alignSelf: 'center',
    marginRight: 20,
  },
  unreadMentionsText: {
    color: 'white',
    padding: 3,
    paddingRight: 6,
    paddingLeft: 6,
    fontSize: 15,
    fontWeight: '900',
    fontFamily: 'Lato-Regular',
  },
});

export default ChannelListItem;
