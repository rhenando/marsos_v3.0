// src/pages/ChatPage.js
import React, { useEffect, useState, useMemo } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { db } from "../firebase.config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const ChatPage = () => {
  // Static data for testing, memoized to avoid re-rendering issues
  const productData = useMemo(
    () => ({
      id: "testProductId",
      name: "Test Product",
      description: "This is a test product for communication testing.",
    }),
    []
  );
  const buyerId = "testBuyerId"; // Static buyer ID

  const { currentUser, loading } = useAuth(); // Access loading and currentUser from context

  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    console.log("In useEffect, currentUser:", currentUser); // Debugging line

    if (productData && currentUser) {
      // Use the shared chat ID to connect buyer and supplier chat sessions
      const chatRef = collection(
        db,
        "chats",
        `${productData.id}_${buyerId}`,
        "messages"
      );
      const q = query(chatRef, orderBy("timestamp", "asc"));

      // Real-time listener for chat messages
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map((doc) => doc.data());
        setChatLog(messages);
      });

      return () => unsubscribe(); // Cleanup on component unmount
    }
  }, [productData, currentUser, buyerId]); // Include buyerId as dependency

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!currentUser?.uid) {
      console.error("User not authenticated", currentUser); // Debugging line
      return;
    }

    console.log("Sending message with currentUser:", currentUser); // Debugging line

    const chatRef = collection(
      db,
      "chats",
      `${productData.id}_${buyerId}`,
      "messages"
    );
    const newMessage = {
      text: message,
      senderId: currentUser.uid,
      role: "buyer", // Indicate the sender role as "buyer"
      timestamp: new Date(),
    };

    try {
      await addDoc(chatRef, newMessage); // Add the message to Firestore
      setMessage(""); // Clear input after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Container className='py-5'>
      {loading && <div>Loading...</div>}

      {/* Only render chat when productData and currentUser are loaded */}
      {productData && currentUser && !loading && (
        <>
          <Card className='mb-4'>
            <Card.Body>
              <Card.Title>Chat about: {productData.name}</Card.Title>
              <Card.Text>{productData.description}</Card.Text>
            </Card.Body>
          </Card>

          <div className='chat-log'>
            {chatLog.map((chat, index) => (
              <p
                key={index}
                style={{
                  textAlign:
                    chat.senderId === currentUser.uid ? "right" : "left",
                }}
              >
                <strong>{chat.role === "buyer" ? "You" : "Supplier"}:</strong>{" "}
                {chat.text}
              </p>
            ))}
          </div>

          <Form onSubmit={handleSendMessage} className='d-flex mt-4'>
            <Form.Control
              type='text'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder='Type your message...'
              required
            />
            <Button
              type='submit'
              variant='success'
              style={{
                backgroundColor: "#2d6a4f",
                borderColor: "#2d6a4f",
                marginLeft: "10px",
              }}
            >
              Send
            </Button>
          </Form>
        </>
      )}
    </Container>
  );
};

export default ChatPage;
