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

export default function ChatAndComments() {
  const [tab, setTab] = useState('chat'); // "chat" | "comments"

  // Chat state
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hey! How are you?', user: 'Anestria' },
    { id: '2', text: 'Doing good, thanks! You?', user: 'Axel' },
  ]);
  const [messageInput, setMessageInput] = useState('');

  // Comments state
  const [comments, setComments] = useState([
    { id: '1', text: 'Hello, thank you for chatting today!', user: 'Anestria', replies: [] },
    { id: '2', text: 'Looking forward to the next update!', user: 'Axel', replies: [] },
  ]);
  const [commentInput, setCommentInput] = useState('');
  const [replyInput, setReplyInput] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);

  // --- Chat functions ---
  const sendMessage = () => {
    if (messageInput.trim() === '') return;
    const newMessage = {
      id: Date.now().toString(),
      text: messageInput,
      user: 'You',
    };
    setMessages([...messages, newMessage]);
    setMessageInput('');
  };

  const renderMessage = ({ item }) => (
    <View style={styles.messageBox}>
      <Text style={styles.messageUser}>{item.user}</Text>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  // --- Comment functions ---
  const addComment = () => {
    if (commentInput.trim() === '') return;
    const newComment = {
      id: Date.now().toString(),
      text: commentInput,
      user: 'You',
      replies: [],
    };
    setComments([...comments, newComment]);
    setCommentInput('');
  };

  const addReply = (commentId) => {
    if (replyInput.trim() === '') return;
    const updatedComments = comments.map((comment) =>
      comment.id === commentId
        ? {
            ...comment,
            replies: [
              ...comment.replies,
              { id: Date.now().toString(), text: replyInput, user: 'You' },
            ],
          }
        : comment
    );
    setComments(updatedComments);
    setReplyInput('');
    setReplyingTo(null);
  };

  const renderReply = ({ item }) => (
    <View style={styles.replyBox}>
      <Text style={styles.replyUser}>{item.user}</Text>
      <Text style={styles.replyText}>{item.text}</Text>
    </View>
  );

  const renderComment = ({ item }) => (
    <View style={styles.commentBox}>
      <Text style={styles.commentUser}>{item.user}</Text>
      <Text style={styles.commentText}>{item.text}</Text>

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
            onPress={() => addReply(item.id)}
          >
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sendButton, { backgroundColor: '#6c757d' }]}
            onPress={() => setReplyingTo(null)}
          >
            <Text style={styles.sendText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, tab === 'chat' && styles.activeTab]}
          onPress={() => setTab('chat')}
        >
          <Text style={styles.tabText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === 'comments' && styles.activeTab]}
          onPress={() => setTab('comments')}
        >
          <Text style={styles.tabText}>Comments</Text>
        </TouchableOpacity>
      </View>

      {/* Chat Section */}
      {tab === 'chat' && (
        <>
          <Text style={styles.title}>Chat Messages</Text>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            contentContainerStyle={styles.list}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              value={messageInput}
              onChangeText={setMessageInput}
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Comment Section */}
      {tab === 'comments' && (
        <>
          <Text style={styles.title}>
            {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
          </Text>
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={renderComment}
            contentContainerStyle={styles.list}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Add a comment..."
              value={commentInput}
              onChangeText={setCommentInput}
            />
            <TouchableOpacity style={styles.sendButton} onPress={addComment}>
              <Text style={styles.sendText}>Post</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },

  // Tabs
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
  activeTab: {
    backgroundColor: '#007bff',
  },
  tabText: {
    fontWeight: 'bold',
    color: '#333',
  },

  title: { fontSize: 20, fontWeight: 'bold', margin: 15 },
  list: { padding: 10 },

  // Messages
  messageBox: {
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 2,
  },
  messageUser: { fontWeight: 'bold', marginBottom: 5 },
  messageText: { fontSize: 16, color: '#333' },

  // Comments
  commentBox: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 2,
  },
  commentUser: { fontWeight: 'bold', marginBottom: 5 },
  commentText: { fontSize: 16, color: '#333' },
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

  // Input
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
