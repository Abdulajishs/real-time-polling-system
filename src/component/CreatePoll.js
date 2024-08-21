import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const navigate = useNavigate();
  const addOptionsHanlder = () => {
    setOptions([...options, ""]);
  };

  const optionChangeHanlder = (index, e) => {
    let newOption = [...options];
    newOption[index] = e.target.value;
    setOptions(newOption);
  };

  let addDataToServer = async (pollData) => {
    try {
      let response = await axios.post(
        "https://real-time-polling-system-9fdf3-default-rtdb.firebaseio.com/polls.json",
        pollData
      );
      if (response.status === 200) {
        // alert("Create poll successfully");
        navigate("/voting");
      }
    } catch (error) {
      alert(error);
    }
  };

  const submitHanlder = (e) => {
    e.preventDefault();
    let pollData = {
      question,
      options: options.filter((option) => option.trim() !== ""),
    };
    // console.log(pollData);
    if (pollData.question.length > 0 && pollData.options.length > 0) {
      addDataToServer(pollData);
      setQuestion("");
      setOptions(["", ""]);
    } else {
      alert("Please provide poll question and atleast one option");
    }
  };
  return (
    <Container className="mt-5 p-4 bg-gray-100 rounded-lg shadow-md">
      <Form onSubmit={submitHanlder}>
        <Form.Group
          className="mb-4 flex flex-col "
          controlId="formGroupQuestion"
        >
          <Form.Label className="text-lg font-semibold self-start">
            Poll Question
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your poll question here"
            className="border-2 border-gray-300 rounded-lg"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </Form.Group>
        {options.map((option, index) => (
          <Form.Group key={index} className="mb-4 flex flex-col ">
            <Form.Label className="text-lg font-semibold  self-start">
              Option {index + 1}
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={`Enter option ${index + 1}`}
              value={option}
              className="border-2 border-gray-300 rounded-lg"
              onChange={(e) => optionChangeHanlder(index, e)}
            />
          </Form.Group>
        ))}

        <div className="flex space-x-3">
          <Button
            variant="primary"
            type="button"
            className="px-4 py-2"
            onClick={addOptionsHanlder}
          >
            Add Option
          </Button>
          <Button variant="success" type="submit" className="px-4 py-2">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default CreatePoll;
