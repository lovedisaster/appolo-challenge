import React, { useReducer } from "react";
import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import AppRouter from "./router/AppRouter";
import Reducer from "./reducer/Reducer";

export const StateContext = React.createContext("globalContext");

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql/",
});

const App = () => {
  let [state, dispatch] = useReducer(Reducer, { article: null });

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <ApolloProvider client={client}>
        <div className="App">
          <AppRouter client={client} />
        </div>
      </ApolloProvider>
    </StateContext.Provider>
  );
};

export default App;
