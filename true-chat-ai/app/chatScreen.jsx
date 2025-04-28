import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import { getGoogleAIResponse } from "../services";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ChatScreen = () => {
  const navigation = useNavigation();
  const { selected } = useLocalSearchParams();

  const chatData = JSON.parse(selected);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [firsRender, setFirsRender] = useState(true);

  useEffect(() => {
    if (chatData) {
      setFirsRender(true);
      setMessages([
        {
          id: 1,
          text: "Hello, I am " + chatData.name,
          sender: "bot",
          createdAt: new Date(),
        },
      ]);
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: false,
      headerTitle: "Chat",
      headerBackTitleVisible: true,
      headerBackTitle: "Back",
      headerTintColor: "black",
    });
  }, []);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputText,
      sender: "user",
      createdAt: new Date(),
    };

    setMessages(prevMessages => [newMessage, ...prevMessages]);

    setLoading(true);

    try {
      const resp = await getGoogleAIResponse(
        inputText,
        firsRender,
        chatData?.specialization
      );
      const botReply = {
        id: Date.now() + 1,
        text: resp?.content || "Sorry 🙏 No data found 😢",
        sender: "bot",
        createdAt: new Date(),
      };
      setMessages(prevMessages => [botReply, ...prevMessages]);
    } catch (error) {
      const errorReply = {
        id: Date.now() + 1,
        text: "Something went wrong ❌",
        sender: "bot",
        createdAt: new Date(),
      };
      setMessages(prevMessages => [errorReply, ...prevMessages]);
    } finally {
      setInputText("");
      setLoading(false);
      setFirsRender(false);
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "user" ? styles.userMessage : styles.botMessage,
      ]}
    >
      {item.sender === "bot" && (
        <Image source={chatData.image} style={styles.botAvatar} />
      )}
      <View style={styles.messageContent}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.messageMeta}>
          {item.sender === "user" ? "You" : chatData.name} |{" "}
          {item.createdAt.toLocaleTimeString()}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        inverted
        contentContainerStyle={styles.chat}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={sendMessage}
          editable={!loading}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
          disabled={loading}
        >
          <Text style={styles.sendButtonText}>
            {loading ? <ActivityIndicator size={"small"} /> : "Send"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chat: {
    padding: 10,
  },
  messageContainer: {
    marginVertical: 4,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  userMessage: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
    borderRadius: 15,
    padding: 5,
    borderBottomRightRadius: 0,
  },
  botMessage: {
    backgroundColor: "#E5E5E5",
    alignSelf: "flex-start",
    borderRadius: 15,
    padding: 5,
    borderBottomLeftRadius: 0,
  },
  messageContent: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 10,
  },
  messageText: {
    fontSize: hp(2),
  },
  messageMeta: {
    alignSelf: "flex-end",
    fontSize: hp(1.4),
    color: "#888",
    marginTop: 5,
  },
  botAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: "#007AFF",
    fontSize: hp(2),
    fontWeight: "bold",
  },
});
