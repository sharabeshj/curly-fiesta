import React,{ Component } from 'react';
import SingleInput from '../components/SingleInput';
import Select from '../components/Select';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Home extends Component {
	constructor(props){
		super(props);
		this.state = {
			title : '',
			year :  '',
			typeOptions : ["movie","series","episode"],
			type : '',
			page : 2,
			data : [],
			error : ''
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClear = this.handleClear.bind(this);
		this.handleTitle = this.handleTitle.bind(this);
		this.handleYear = this.handleYear.bind(this);
		this.handleType = this.handleType.bind(this);
	}
	handleTitle(e){
		this.setState({ title : e.target.value });
	}
	handleYear(e){
		this.setState({ year : e.target.value });
	}
	handleType(e){
		this.setState({ type : e.target.value });
	}
	handleClear(e){
		e.preventDefault();
		this.setState({
			title : '',
			year : '',
			type : []
		})
	}
	handleSubmit(e){
		e.preventDefault();

		const formPayload = {
			s : this.state.title,
			y : this.state.year,
			type : this.state.type
		};
		axios.get('http://www.omdbapi.com/?apikey=b1d06d27&s='+formPayload.s+'&y='+formPayload.y+'&type='+formPayload.type)
			.then(res => {
				console.log(res.data);
				this.setState({ data : res.data.Search,error : res.data.Error });
			})
			.catch(e => console.log(e));		
	}
	render(){
		if(this.state.data){
			var searchNodes = this.state.data.map(function(item){
				return <li key = { item.imdbID }><img src = { item.Poster } alt = { item.Title }/><h4><Link to = {`/detail/${ item.imdbID }`}>{ item.Title }</Link></h4><p>type : { item.Type } year : { item.Year }</p></li>
			})
		}
		if(this.state.error){
			var error = <p> No movie found!! </p>
		}
		return(
			<div>
			<form onSubmit = { this.handleSubmit }>
				<h3>Search</h3>
				<SingleInput 
					inputType = { 'text' }
					title = { 'Title' }
					name = { 'title' }
					controlFunc = { this.handleTitle }
					content = { this.state.title }
					placeholder = { 'Enter the title' }
					/>
				<SingleInput 
					inputType = { 'number' }
					title = { 'Year' }
					name = { 'year' }
					controlFunc = { this.handleYear }
					content = { this.state.year }
					placeholder = { 'Enter year' }
				/>
				<Select 
					name = { 'type' }
					placeholder = { 'Choose type' }
					controlFunc = { this.handleType }
					options = { this.state.typeOptions }
					selectedOptions = { this.state.type }
				/>
				<input type = "submit" value = "search" />
				<button onClick = { this.handleClear }>Clear</button>
			</form>
			<div>
				{ error }
				<ul>
				{ searchNodes }
				</ul>
			</div>
			</div>
			)
	}
}