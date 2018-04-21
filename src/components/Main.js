import React from 'react';
import { Switch,Route } from 'react-router-dom';
import Home from '../containers/Home';
import Search from '../containers/Search';
import Detail from '../containers/Detail';

const Main = (props) => (
	<main>
		<Switch>
			<Route exact path = '/' component = { Home }/>
			<Route path = '/search' component = { Search } />
			<Route path = '/detail/:id' component = { Detail }/>
		</Switch>
	</main>
	);

export default Main;
