import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ToDoList from './components/ToDoList';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

const App = () => {
  const [token, setToken] = useState(null);

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <ThemeProvider theme={createMuiTheme(theme)}>
      <Router>
        <Switch>
          <Route path="/login">
            {token ? <Redirect to="/" /> : <Login onLoginSuccess={handleLogin} />}
          </Route>
          <Route path="/register">
            {token ? <Redirect to="/" /> : <Register />}
          </Route>
          <Route path="/">
            {token ? <ToDoList token={token} onLogout={handleLogout} /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
