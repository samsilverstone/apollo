import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import SongList from './components/songlist';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import CreateSong from './components/createsong';
import SongDetail from './components/songdetail';
import NotFound from './components/notfound';

const client = new ApolloClient({
  dataIdFromObject:o=>o.id,
  uri:'http://localhost:4000/graphql'
})

const Root = () => {
  return (<ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route exact path="/" component={SongList} />
        <Route exact path="/create/" component={CreateSong}/>
        <Route exact path="/song/:id" component={SongDetail}/>
        <Route exact path="*" component={NotFound} />
      </Switch>
    </Router>
  </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
