import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LoginContext from "../context/login-context";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import styles from "./Login.module.css";

const Login = () => {
  const loginContext = useContext(LoginContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/sessions/new`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      const data = await res.json();

      if (res.status === 200) {
        setSuccessMessage("Log in successful!");
        loginContext.setLoggedIn(true);
        loginContext.setProfileName(data.username);
        setShowMessage(true);
        setUsername("");
        setPassword("");
        navigate("/");
      } else {
        setFailureMessage("Log in unsuccessful!");
        setShowMessage(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.message}>
        {failureMessage && showMessage &&
          <Alert
            variant="danger"
            onClose={() => setShowMessage(false)}
            dismissible
          >
            {failureMessage}
          </Alert>
        }
      </div>

      <br />

      <div className={styles.login}>
        <h3>Log In</h3>
        <br />

        <form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formLoginUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="text"
              name="username"
              value={username}
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLoginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <button className={styles.submit}>Submit</button>
          </div>
        </form>

        <hr />

        <Form>
          <div className="d-grid gap-2">
            <NavLink to="/register">
              <button className={styles.create}>Create Account</button>
            </NavLink>
          </div>
        </Form>

        <br />
      </div>
    </div>
  );
};

export default Login;