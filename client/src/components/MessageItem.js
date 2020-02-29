import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Text
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Paragraph,
  TextInput
} from "react-native-paper";
import Modal from "react-native-modal";
import { postComment } from "../Helper";
import CommentsMaker from "./Comment";

const MessageItem = ({
  post,
  screenProps,
  messagePreviewRestPosts,
  toggleMessageItemModal
}) => {
  const [isSending, setIsSending] = useState(false);
  const [messageModal, toggleMessageModal] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments);
  const [counter, setCounter] = useState(0);

  const sendPostComment = () => {
    //since we're posting a comment, we'll want to add it after we post it
    const commentData = {
      postId: post.id,
      text: comment,
      userId: screenProps.user.id
    };
    postComment(commentData)
      .then(({ data }) => {
        let newComment = data;
        console.log("sendPostComment MessageItem.js");
        messagePreviewRestPosts();
        return data;
      })
      .catch(err => {
        console.log(err, "postComment messageitemJS");
      });
    setComment("");
  };

  useEffect(() => {
    setComments(post.comments);
    console.log("called" + counter);
  }, [setCounter]);

  const { title, text, post_local, post_anonymous, post_public } = post;
  const { username, name_first, name_last } = post.user;
  const initials = name_first[0] + name_last[0];

  return (
    <Card style={styles.container} title="Show messageModal">
      <Text onPress={() => toggleMessageModal(true)} style={{ marginTop: -10 }}>
        {text}
      </Text>
      <Modal
        isVisible={messageModal}
        onBackButtonPress={() => toggleMessageModal(false)}
      >
        <ScrollView>
          <KeyboardAvoidingView behavior="position" enabled>
            <Card style={{ marginBottom: 10, backgroundColor: "#F5F0F6" }}>
              <Card.Title
                title={!post_anonymous ? username : "Anonymous"}
                subtitle={title}
                style={{ backgroundColor: "#F5F0F6", borderRadius: 5 }}
                left={
                  !post_anonymous
                    ? () => (
                        <Avatar.Text
                          size={48}
                          label={initials}
                          style={post_local ? styles.local : styles.global}
                        />
                      )
                    : () => (
                        <Avatar.Icon
                          size={48}
                          icon="emoticon-neutral-outline"
                          style={post_local ? styles.local : styles.global}
                        />
                      )
                }
              />
              <Divider />
              <Paragraph
                style={post_local ? styles.localMessage : styles.globalMessage}
              >
                {text}
              </Paragraph>
            </Card>
            {post.comments &&
              post.comments.map((comment, i) => {
                return <CommentsMaker commentProp={comment} />;
              })}
            <Card
              style={{
                borderRadius: 5,
                position: "relative",
                zIndex: 2,
                marginTop: 10,
                backgroundColor: "#F5F0F6"
              }}
            >
              {post_public && (
                <Card.Content>
                  <TextInput
                    label="Comment"
                    placeholder="comment"
                    mode="outlined"
                    multiline={true}
                    numberOfLines={3}
                    value={comment}
                    theme={{
                      colors: {
                        primary: "#003489"
                      }
                    }}
                    onChangeText={comment => setComment(comment)}
                  />
                  <Button
                    icon="send"
                    mode="contained"
                    style={{
                      marginTop: 10,
                      marginRight: 220,
                      height: 40
                    }}
                    color="#385F71"
                    onPress={() => sendPostComment()}
                  >
                    Comment
                  </Button>
                </Card.Content>
              )}
            </Card>
          </KeyboardAvoidingView>
        </ScrollView>
      </Modal>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 20,
    paddingBottom: 10,
    backgroundColor: "#fff"
  },
  local: { backgroundColor: "#D7B377" },
  global: { backgroundColor: "#385F71", color: "#F5F0F6" },
  globalMessage: {
    padding: 18,
    fontSize: 18,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginVertical: -2,
    backgroundColor: "#385F71",
    color: "#F5F0F6"
  },
  localMessage: {
    padding: 18,
    fontSize: 18,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginVertical: -2,
    backgroundColor: "#D7B377"
  }
});

export default MessageItem;
