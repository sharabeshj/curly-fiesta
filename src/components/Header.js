import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => (
	<div>
		<nav>
			<ul>
				<li><Link to = '/'>Home</Link></li>
				<li><Link to = '/search'>Search</Link></li>
			</ul>
		</nav>
	</div>
	);

export default Header;	