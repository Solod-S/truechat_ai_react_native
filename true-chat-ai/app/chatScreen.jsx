import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert,
  Vibration,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { getGoogleAIResponse } from "../services";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { UsePreventBack } from "../hooks/usePreventBack";

const ChatScreen = () => {
  UsePreventBack();
  const router = useRouter();
  const { selected } = useLocalSearchParams();
  const chatData = JSON.parse(selected);

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [firsRender, setFirsRender] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleGoBack = () => {
    Vibration.vibrate(200);
    Alert.alert(
      "Go Back?",
      "Are you sure you want to close this chat? The chat history will be permanently deleted.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Go Back",
          onPress: () => router.back(),
        },
      ]
    );
  };

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
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;
    let msg = inputText;
    const newMessage = {
      id: Date.now(),
      text: inputText,
      sender: "user",
      createdAt: new Date(),
    };

    setMessages(prev => [newMessage, ...prev]);
    setLoading(true);
    setInputText("");
    try {
      const resp = await getGoogleAIResponse(
        msg,
        firsRender,
        chatData?.specialization
      );
      const botReply = {
        id: Date.now() + 1,
        text: resp?.content || "Sorry 🙏 No data found 😢",
        sender: "bot",
        createdAt: new Date(),
      };
      setMessages(prev => [botReply, ...prev]);
    } catch (error) {
      const errorReply = {
        id: Date.now() + 1,
        text: "Something went wrong ❌",
        sender: "bot",
        createdAt: new Date(),
      };
      setMessages(prev => [errorReply, ...prev]);
    } finally {
      setLoading(false);
      setFirsRender(false);
    }
  };

  const renderItem = ({ item }) => (
    <Animated.View
      style={[
        styles.messageContainer,
        item.sender === "user" ? styles.userMessage : styles.botMessage,
        { opacity: fadeAnim },
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
    </Animated.View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : ""}
    >
      <SafeAreaView style={styles.container} edges={["top"]}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              if (messages?.length > 1) {
                handleGoBack();
              } else {
                router.back();
              }
            }}
          >
            <Text style={styles.backButton}>Back</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            inverted
            contentContainerStyle={styles.chat}
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="handled"
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
              {loading ? (
                <ActivityIndicator size={"small"} color="#007AFF" />
              ) : (
                <Text style={styles.sendButtonText}>Send</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  backButton: {
    color: "black",
    fontSize: hp(2),
    fontWeight: "bold",
  },
  chat: {
    padding: 10,
    paddingBottom: 20,
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
    paddingBottom: Platform.OS == "ios" ? 25 : 10,
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
