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

const SupplierChatPage = () => {
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

  const { currentUser, loading } = useAuth();

  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    if (productData && buyerId) {
      const chatRef = collection(
        db,
        "chats",
        `${productData.id}_${buyerId}`,
        "messages"
      );
      const q = query(chatRef, orderBy("timestamp", "asc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map((doc) => doc.data());
        setChatLog(messages);
      });

      return () => unsubscribe();
    }
  }, [productData, buyerId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!productData || !buyerId || !currentUser?.uid) {
      console.error(
        "Missing data: productData, buyerId, or currentUser is not defined."
      );
      return;
    }

    const chatRef = collection(
      db,
      "chats",
      `${productData.id}_${buyerId}`,
      "messages"
    );
    const newMessage = {
      text: message,
      senderId: currentUser.uid,
      role: "supplier",
      timestamp: new Date(),
    };

    try {
      await addDoc(chatRef, newMessage);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Container className='py-5'>
      {loading && <div>Loading...</div>}

      {productData && !loading && (
        <Card className='mb-4'>
          <Card.Body>
            <Card.Title>Chat about: {productData.name}</Card.Title>
            <Card.Text>{productData.description}</Card.Text>
          </Card.Body>
        </Card>
      )}

      <div className='chat-log'>
        {chatLog.map((chat, index) => (
          <p
            key={index}
            style={{
              textAlign: chat.senderId === currentUser.uid ? "right" : "left",
            }}
          >
            <strong>{chat.role === "supplier" ? "You" : "Buyer"}:</strong>{" "}
            {chat.text}
          </p>
        ))}
      </div>

      {!loading && (
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
      )}
    </Container>
  );
};

export default SupplierChatPage;
