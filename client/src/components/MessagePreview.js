import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Card, Divider, Paragraph } from 'react-native-paper';
import MessageItem from '../components/MessageItem';

const MessagePreview = ({ messages }) =>
  messages &&
  messages.map((message, i) => {
    return (
      <Card style={styles.container} key={i}>
        <Card.Title
          title={message.title}
          subtitle={message.user ? message.user.username : ""}
          left={() => <Avatar.Text size={36} label={message.user ? message.user.username[0] : ""} />}
        />
        <MessageItem post={message} />
        <Divider />
        <Card.Content style={message.post_local ? { paddingTop: 10, backgroundColor: "blue" } : { paddingTop: 10, backgroundColor: "brown" } }>
          <Paragraph>{message.text}</Paragraph>
        </Card.Content>
        <Divider />
      </Card>
    );
  });

MessagePreview.navigationOptions = {
  title: 'title',
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  name: {
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default MessagePreview;
