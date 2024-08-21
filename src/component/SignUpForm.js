import { Button, Form } from "react-bootstrap";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  const history = useNavigate();
  const apiKey = process.env.REACT_APP_API_KEY;

  const addSignupUser = async (email, password) => {
    console.log(email, password);
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );

      console.log(response.data);
      if (response.status === 200) {
        console.log("User has successfully signed up");
        history("/login");
      } else {
        throw new Error("Authentication is failed");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      alert("password doesn't match");
      return;
    }
    addSignupUser(email, password);

    emailRef.current.value = "";
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
  };

  const loginHandler = () => {
    history("login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-4">
            <Form.Label htmlFor="email" className="block text-gray-700">
              Email address
            </Form.Label>
            <Form.Control
              id="email"
              type="email"
              placeholder="name@example.com"
              ref={emailRef}
              required
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label htmlFor="password" className="block text-gray-700">
              Password
            </Form.Label>
            <Form.Control
              id="password"
              type="password"
              placeholder="Password"
              ref={passwordRef}
              required
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </Form.Group>
          <Form.Group className="mb-6">
            <Form.Label
              htmlFor="confirmPassword"
              className="block text-gray-700"
            >
              Confirm Password
            </Form.Label>
            <Form.Control
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              ref={confirmPasswordRef}
              required
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Sign Up
          </Button>
        </Form>
      </div>
      <Button onClick={loginHandler} className="mt-4 text-blue-500 underline">
        Have an account? Login
      </Button>
    </div>
  );
};

export default SignUpForm;
