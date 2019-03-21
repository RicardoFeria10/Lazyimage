import React, { FunctionComponent } from "react";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";
import client from "./apolloClient";
import "./App.css";

import LazyImage from "./components/lazy-image";
import hdImg from "./high.jpeg";
import ldImg from "./low.jpg";

const query = gql`
  Query users {
    users{
      id,
      name,
      lastname,
      email
    }    
  }
`;

const Test = () => {
  <Query query={query}>
    {({ data, loading, error }) => {
      if (loading) { return <span>Loading...</span>; }
      if (error) { return <span>{error}</span>; }

      return (
        <>
          <p>{JSON.stringify(data)}</p>
        </>
      );
    }}
  </Query>;
};

const App = () => (
  <ApolloProvider client={client}>
    <Test />
  </ApolloProvider>
);

export default App;

// const validateEmail: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

{
  /* <>
    <div style={{ height: "170vh" }}>
      <div style={{ height: "50vh", width: "50vw", margin: "50px auto" }}>
        <LazyImage scrPreloaded={ldImg} srcLoaded={hdImg} />
      </div>
    </div>

    <div style={{ height: "170vh" }}>
      <div style={{ height: "50vh", width: "50vw", margin: "50px auto" }}>
        <LazyImage scrPreloaded={ldImg} srcLoaded={hdImg} />
      </div>
    </div>
  </> */
}
