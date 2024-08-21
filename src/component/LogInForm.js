import { useRef, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { tokenAction } from "../store/token-slice";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const dispatch = useDispatch();
  const history = useNavigate();
  const apiKey = process.env.REACT_APP_API_KEY;

  const getOobConfirmationCode = async (email) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
        {
          requestType: "PASSWORD_RESET",
          email: email,
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        setIsLoading(false);
      } else {
        throw new Error("Unable to reset password");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );
      if (response.status === 200) {
        history("/createpoll");
        dispatch(tokenAction.addToken(response.data.idToken));
        dispatch(tokenAction.addEmail(email));
      } else {
        throw new Error("User login failed...");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    loginUser(email, password);
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  const signupHandler = () => {
    history("/");
  };

  const resetPasswordHandler = () => {
    const email = emailRef.current.value;
    getOobConfirmationCode(email);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
          <Form.Group className="mb-6">
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
          <Button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Login
          </Button>
        </Form>
        {!isLoading ? (
          <Link
            to="#"
            className="mt-3 text-blue-500 hover:underline"
            onClick={resetPasswordHandler}
          >
            Forgot password
          </Link>
        ) : (
          <div className="mt-3">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
      </div>
      <Button onClick={signupHandler} className="mt-4 text-blue-500 underline">
        Don't have an account? Sign up
      </Button>
    </div>
  );
};

export default LoginForm;
