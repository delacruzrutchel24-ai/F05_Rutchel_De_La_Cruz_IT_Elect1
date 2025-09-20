import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Great job on this project! 👍', user: 'Alice', replies: [] },
    { id: '2', text: 'Looking forward to the next update!', user: 'Bob', replies: [] },
  ]);
  const [input, setInput] = useState('');
  const [replyInput, setReplyInput] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);

  const sendMessage = () => {
    if (input.trim() === '') return;

    const newMessage = {
      id: Date.now().toString(),
      text: input,
      user: 'You',
      replies: [],
    };

    setMessages([...messages, newMessage]);
    setInput('');
  };

  const sendReply = (messageId) => {
    if (replyInput.trim() === '') return;

    const updatedMessages = messages.map((message) =>
      message.id === messageId
        ? {
            ...message,
            replies: [
              ...message.replies,
              { id: Date.now().toString(), text: replyInput, user: 'You' },
            ],
          }
        : message
    );

    setMessages(updatedMessages);
    setReplyInput('');
    setReplyingTo(null);
  };

  const renderReply = ({ item }) => (
    <View style={styles.replyBox}>
      <Text style={styles.replyUser}>{item.user}</Text>
      <Text style={styles.replyText}>{item.text}</Text>
    </View>
  );

  const renderMessage = ({ item }) => (
    <View style={styles.messageBox}>
      <Text style={styles.messageUser}>{item.user}</Text>
      <Text style={styles.messageText}>{item.text}</Text>

      <TouchableOpacity onPress={() => setReplyingTo(item.id)}>
        <Text style={styles.replyButton}>Reply</Text>
      </TouchableOpacity>

      <FlatList
        data={item.replies}
        keyExtractor={(reply) => reply.id}
        renderItem={renderReply}
        contentContainerStyle={{ paddingLeft: 20 }}
      />

      {replyingTo === item.id && (
        <View style={styles.replyInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Write a reply..."
            value={replyInput}
            onChangeText={setReplyInput}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => sendReply(item.id)}
          >
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chat Messages</Text>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messageList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  title: { fontSize: 24, fontWeight: 'bold', margin: 15 },
  messageList: { padding: 10 },
  messageBox: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  messageUser: { fontWeight: 'bold', marginBottom: 5 },
  messageText: { fontSize: 16, color: '#333' },
  replyButton: {
    color: '#007bff',
    marginTop: 5,
    fontSize: 14,
  },
  replyBox: {
    marginTop: 8,
    padding: 10,
    backgroundColor: '#e2e6ea',
    borderRadius: 8,
  },
  replyUser: { fontWeight: 'bold' },
  replyText: { fontSize: 14, color: '#333' },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 20,
  },
  sendText: { color: '#fff', fontWeight: 'bold' },
  replyInputContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
});