import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Card, Divider } from "react-native-paper";
import { Avatar } from "react-native-elements";
import Modal from "react-native-modal";
import MessageItem from "../components/MessageItem";
import Profile from "../components/Profile";

const MessagePreview = ({
  screenProps,
  messages,
  focusedMessageId,
  resetPosts
}) => {
  const [profileModal, toggleProfileModal] = useState(false);
  const [nextTick, setNextTick] = useState(0);
  const [allModals, setAllModals] = useState([]);

  useEffect(() => {
    let arr = messages.map(message => {
      return false;
    });
    setAllModals(arr);
  }, []);

  const messagePreviewRestPosts = () => {
    resetPosts();
    setNextTick(nextTick + 1);
  };

  return (
    messages &&
    messages.map((message, i) => {
      const { post_anonymous, post_local, title, user } = message;
      const { username, password } = user;

      return (
        <Card style={post_local ? styles.local : styles.global} key={i}>
          <Card.Title
            title={title}
            titleStyle={post_local ? styles.titleLocal : styles.titleGlobal}
            subtitle={!post_anonymous ? username : "Anonymous"}
            subtitleStyle={post_local ? styles.titleLocal : styles.titleGlobal}
            left={
              !post_anonymous
                ? () => (
                    <Avatar
                      size="large"
                      rounded
                      source={{ uri: password }}
                      onPress={() => {
                        let preArr = allModals.slice(0, i);
                        let postArr = allModals.slice(i + 1);
                        let thisModal = true;
                        setAllModals([...preArr, thisModal, ...postArr]);
                        console.log(preArr, postArr, "messPreview 54");
                        console.log(allModals, i, "messPreview 55");
                        toggleProfileModal(true);
                      }}
                    />
                  )
                : () => (
                    <Avatar
                      size="large"
                      rounded
                      icon={{ name: "user-secret", type: "font-awesome" }}
                    />
                  )
            }
          />
          <Divider />
          <MessageItem
            messages={messages}
            post={message}
            screenProps={screenProps}
            focusedMessageId={focusedMessageId}
            setFocusedMessageId={focusedMessageId}
            resetPosts={resetPosts}
            messagePreviewRestPosts={messagePreviewRestPosts}
          />
          <Modal
            isVisible={allModals[i]}
            onBackButtonPress={() => {
              let preArr = allModals.slice(0, i);
              let postArr = allModals.slice(i + 1);
              let thisModal = true;
              let arr = [];
              for (let i = 0; i < allModals.length; i++) {
                arr.push(false);
              }
              setAllModals(arr);
            }}
          >
            <Profile toggleProfileModal={toggleProfileModal} post={message} />
          </Modal>
        </Card>
      );
    })
  );
};

MessagePreview.navigationOptions = {
  title: "title"
};

const styles = StyleSheet.create({
  local: {
    borderRadius: 10,
    padding: 10,
    paddingBottom: 10,
    margin: 3,
    backgroundColor: "#D7B377"
  },
  global: {
    borderRadius: 10,
    padding: 10,
    paddingBottom: 10,
    margin: 3,
    color: "#F5F0F6",
    backgroundColor: "#385F71"
  },
  avatar: { backgroundColor: "#F5F0F6" },
  titleLocal: { color: "#2B4162", marginLeft: 30 },
  titleGlobal: { color: "#F5F0F6", marginLeft: 30 }
});

export default MessagePreview;
