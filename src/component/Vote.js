import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form, ProgressBar } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Vote = () => {
  const [poll, setPoll] = useState(null);
  const [selectOption, setSelectOption] = useState("");
  const { pollId } = useParams();
  // console.log(pollId);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        let response = await axios.get(
          `https://real-time-polling-system-9fdf3-default-rtdb.firebaseio.com/polls/${pollId}.json`
        );
        let data = await response.data;
        setPoll(data);
        console.log(response, data);
      } catch (error) {
        console.log("Error fetch poll data", error);
      }
    };
    fetchPoll();
  }, [pollId]);

  const voteSubmitHandler = async (e) => {
    e.preventDefault();
    if (selectOption) {
      try {
        let updatedOption = poll.options.map((option) => {
          if (option.text === selectOption) {
            return {
              ...option,
              votes: option.votes + 1,
            };
          }
          return option;
        });

        await axios.put(
          `https://real-time-polling-system-9fdf3-default-rtdb.firebaseio.com/polls/${pollId}.json`,
          { ...poll, options: updatedOption }
        );

        setPoll((prev) => ({
          ...prev,
          options: updatedOption,
        }));

        alert("Your vote has been submitted successfully");
      } catch (error) {
        console.error("Error submitting vote:", error);
        alert("There was an error submitting your vote. Please try again.");
      }
    } else {
      alert("Please select an option before submitting");
    }
  };

  if (!poll) {
    return <div>Loading Poll.....</div>;
  }

  const totalVotes = poll.options.reduce(
    (acc, option) => acc + option.votes,
    0
  );

  return (
    <Container className="mt-5 p-4 bg-gray-100 rounded-lg shadow-lg ">
      <h1>{poll.question}</h1>
      <Form onSubmit={voteSubmitHandler}>
        {poll.options.map((option, index) => (
          <Form.Group key={index} className="mb-3">
            <Form.Check
              id={`option-${index}`}
              type="radio"
              label={option.text}
              name="pollOptions"
              value={option.text}
              checked={option.text === selectOption}
              onChange={(e) => setSelectOption(e.target.value)}
            />
            <div className="mt-2">
              <ProgressBar
                now={(option.votes / totalVotes) * 100}
                label={`${option.votes} votes`}
              />
            </div>
          </Form.Group>
        ))}
        <Form.Group className="mb-3">
          <Button variant="success" type="submit" className="px-4 py-2 mt-4">
            Vote
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};
export default Vote;
