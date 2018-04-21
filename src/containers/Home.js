import React,{ Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Home extends Component{
	constructor(props){
		super(props);
		this.state = {
			data : []
		}
	}
	componentDidMount(){
		this.loadSearches();
	}
	loadSearches(){
		var count = 1;
		var storedResults = JSON.parse(localStorage.getItem("prevRes"));
		if(storedResults){
			var arrLength = storedResults.length;
				while (count<=6){
					axios.get(storedResults[arrLength])
						.then(res => this.state.data.push(res.data))
						.catch(e => console.log(e));
					arrLength--;
					count++;
				}
			}
	}
	render(){
		if(this.state.data){
			var searchNodes = this.state.data.map(function(search){
				return <li key = { search.imdbID }><img src = { search.Poster } alt = { search.Title }/><h4><Link to = {`/detail/${ search.imdbID }`}>{ search.Title }</Link></h4><p>type : { search.Type } year : { search.Year }</p></li>
			});
		}
		return (
			<div>
				<p>Your past searches</p>
				<ul>
					{ searchNodes }
				</ul>
			</div>
			)
	}
}