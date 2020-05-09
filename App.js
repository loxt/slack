import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StreamChat } from 'stream-chat';
import PropTypes from 'prop-types';
import {
  Chat,
  MessageList,
  MessageInput,
  Channel,
} from 'stream-chat-react-native';

import ChannelList from './src/components/ChannelList';
import ChannelHeader from './src/components/ChannelHeader';
import MessageSlack from './src/components/MessageSlack';
import DateSeparator from './src/components/DateSeparator';

const chatClient = new StreamChat('q95x9hkbyd6p');
const userToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidG9tbWFzbyJ9.wuLqzU1D6RYKokmzkgyFvQ43lWF7dMVGt5NOLwHNqyc';
const user = {
  id: 'tommaso',
  name: 'Tommaso Barbugli',
};

chatClient.setUser(user, userToken);

function ChannelScreen({ navigation, route }) {
  const [channel, setChannel] = useState(null);
  useEffect(() => {
    if (!channel) {
      navigation.openDrawer();
    }
    const channelId = route.params ? route.params.channelId : null;
    const _channel = chatClient.channel('messaging', channelId);
    setChannel(_channel);
  }, [route.params]);

  return (
    <SafeAreaView style={styles.channelScreenSaveAreaView}>
      <View style={styles.channelScreenContainer}>
        <ChannelHeader
          navigation={navigation}
          channel={channel}
          client={chatClient}
        />
        <View style={styles.chatContainer}>
          <Chat client={chatClient}>
            <Channel channel={channel}>
              <MessageList
                Message={MessageSlack}
                DateSeparator={DateSeparator}
              />
              <MessageInput />
            </Channel>
          </Chat>
        </View>
      </View>
    </SafeAreaView>
  );
}

ChannelScreen.propTypes = {
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      channelId: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

const ChannelListDrawer = (props) => {
  return (
    <ChannelList
      client={chatClient}
      changeChannel={(channelId) => {
        props.navigation.jumpTo('ChannelScreen', {
          channelId,
        });
      }}
    />
  );
};

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Drawer.Navigator
          drawerContent={ChannelListDrawer}
          drawerStyle={styles.drawerNavigator}
        >
          <Drawer.Screen name='ChannelScreen' component={ChannelScreen} />
        </Drawer.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  channelScreenSaveAreaView: {
    backgroundColor: 'white',
  },
  channelScreenContainer: { flexDirection: 'column', height: '100%' },
  container: {
    flex: 1,
  },
  drawerNavigator: {
    backgroundColor: '#3F0E40',
    width: 350,
  },
  chatContainer: {
    backgroundColor: 'white',
    flexGrow: 1,
    flexShrink: 1,
  },
});

ChannelListDrawer.propTypes = {
  navigation: PropTypes.shape({
    jumpTo: PropTypes.func.isRequired,
  }).isRequired,
};
