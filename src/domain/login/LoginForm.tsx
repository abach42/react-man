import React, { useContext, useState } from "react";
import AuthContext from "./AuthContext";
import { LoginCommand } from "./LoginCommand";
import { LoginInvoker } from "./LoginInvoker";
import { LoginReceiver } from "./LoginReceiver";
import ErrorMessage from "../../error/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Grid, TextField } from "@mui/material";
import { Rocket } from "@mui/icons-material";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useContext(AuthContext);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const token = await (async (
        username: string,
        password: string
      ): Promise<string> => {
        const receiver = new LoginReceiver(username, password);
        const command = new LoginCommand(receiver);
        const invoker = new LoginInvoker(command);
        const loginResponseData = await invoker.invoke();
        return loginResponseData;
      })(username, password);

      setAuth(token);
      setErrorMessage("");
      navigate("/list");
    } catch (error) {
      setIsError(true);
      setErrorMessage("An error occurred during login. Please try again.");
    }
  };

  return (
    <>
      {isError && <ErrorMessage message={errorMessage} />}
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  id="username"
                  label="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  type="password"
                  id="password"
                  label="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  title="Login"
                >
                  <Rocket /> Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default LoginForm;
