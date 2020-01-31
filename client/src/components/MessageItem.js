import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Text,
} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Paragraph,
  Subheading,
  TextInput,
} from 'react-native-paper';
import Modal from 'react-native-modal';
import { getOne } from '../Helper';

const message = {
  title: 'Delivery',
  text: 'Pizza delivery for I.C. Weiner',
};

const comments = [
  { username: 'Bender', text: 'Bite my shiny metal ass' },
  { username: 'Professor', text: 'Good news everyone' },
  { username: 'Leela', text: `That isn't a real name, Fry` },
];

const MessageItem = ({ post }) => {
  console.log(post, 'message item 32');
  const { username } = post.username;
  const [modal, toggleModal] = useState(false);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState({});
  const [comments, setComments] = useState([]);
  const postComment = () => {
    setComment('');
  };
  useEffect(()=>{
    //todo unhardcode from just getting the first message on server
    getOne({id:1})
    .then(({data})=>{
      setMessage(data);
      setComments(data.comments)
    })
  },[]);

  useEffect(() => {
    //todo unhardcode from just getting the first message on server
    getOne({ id: 1 }).then(({ data }) => {
      setMessage(data);
      setComments(data.comments);
    });
  }, []);

  return (
    <Card
      style={styles.container}
      title='Show modal'
      // onPress={() => toggleModal(!modal)}
    >
      <Text onPress={() => toggleModal(!modal)} style={{ marginTop: -10 }}>
        Show Message
      </Text>
      <Modal isVisible={modal}>
        <ScrollView>
          <KeyboardAvoidingView behavior='position' enabled>
            <Card>
              <Card.Title
                title='Fry'
                // title={username}
                subtitle={message.title}
                left={() => <Avatar.Text size={48} label='PJF' />}

              />
              <Card.Content style={{ paddingTop: 10 }}>
                <Paragraph>{message.text}</Paragraph>
              </Card.Content>
            </Card>
            {comments &&
              comments.map((comment, i) => {
                return (
                  <Card style={{ marginTop: 10 }} key={i}>
                    <Subheading> {comment.user.username}</Subheading>
                    <Divider />
                    <Card.Content style={{ paddingTop: 10 }}>
                      <Paragraph>{comment.text}</Paragraph>
                    </Card.Content>
                  </Card>
                );
              })}
            <Card
              style={{
                borderRadius: 10,
                position: 'relative',
                zIndex: 2,
                marginTop: 10,
              }}
            >
              <Card.Content>
                <TextInput
                  label='Comment'
                  placeholder='comment'
                  mode='outlined'
                  multiline={true}
                  numberOfLines={3}
                  value={comment}
                  onChangeText={comment => setComment(comment)}
                />
                <Button
                  icon='send'
                  mode='contained'
                  style={{
                    marginTop: 10,
                    marginRight: 220,
                    height: 40,
                  }}
                  onPress={() => postComment()}
                >
                  Comment
                </Button>
              </Card.Content>
            </Card>
            <Button title='Hide modal' onPress={() => toggleModal(!modal)} />
          </KeyboardAvoidingView>
        </ScrollView>
      </Modal>
    </Card>
  );
};

MessageItem.navigationOptions = {
  title: message.title,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  name: {
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default MessageItem;
