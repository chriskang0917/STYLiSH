import { useState } from "react";
import styled from "styled-components";

const Title = styled.h1`
  margin-top: 1em;
  font-size: 1.5em;
  text-align: center;
`;

const Messages = styled.div`
  margin-top: 1em;
  min-height: 300px;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Form = styled.form`
  width: 200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Input = styled.input`
  width: 100px;
  margin: 0 30px;
`;

export default function Test() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages([...messages, input]);
    setInput("");
  };

  return (
    <section>
      <Title>Test</Title>
      <Messages>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </Messages>
      <Form action="">
        <input onChange={handleChange} value={input} type="text" />
        <button type="submit" onClick={handleSubmit}>
          送出
        </button>
      </Form>
    </section>
  );
}
