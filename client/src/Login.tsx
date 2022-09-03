import React from "react";
import {Link, withRouter} from "react-router-dom";
import axios from "axios";

import {User} from "./Interfaces";
import {authenticate, getUser} from "./helpers";

const Login = (props: {history: string[]}): JSX.Element => {
  // console.log({props});
  const [state, setState] = React.useState<User>({
    name: "",
    password: "",
  });
  const {name, password} = state;

  React.useEffect(() => {
    getUser() && props.history.push("/");
  }, [props.history]);

  const handleChange = (name: string) => (event: React.FormEvent<HTMLInputElement>) => {
    // console.log('name:', name, 'event:', (event.target as HTMLInputElement).value);
    setState({...state, [name]: (event.target as HTMLInputElement).value});
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    // console.table({name, password});
    axios
      .post(`${process.env.REACT_APP_API}/login`, {name, password})
      .then((response) => {
        // console.log({response});
        // Response will contain token and name and redirect to the main page "/"
        authenticate(response, () => props.history.push("/"));
      })
      .catch((error) => {
        console.log(error.response);
        alert(error.response.data.error);
      });
  };

  return (
    <div className="container pb-5">
      <br />
      <h1>Login</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            onChange={handleChange("name")}
            value={name}
            type="text"
            className="form-control"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            onChange={handleChange("password")}
            value={password}
            type="password"
            className="form-control"
            placeholder="Your Password"
            required
          />
        </div>
        <div>
          <button className="btn btn-primary">Login</button>
          <button style={{float: "right", background: "none", padding: 0, border: "none"}}>
            <Link to="/" className="btn btn-outline-primary">
              Cancel
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default withRouter(Login as React.FC<any>);
