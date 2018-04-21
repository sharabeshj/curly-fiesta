import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Detail extends Component{
	constructor(props){
		super(props);
		this.state = {
			data :  []
		};
	}
	componentDidMount(){
		this.loadDetail();
	}
	loadDetail(){
		axios.get('http://www.omdbapi.com/?apikey=b1d06d27&i='+this.props.match.params.id)
			.then(res => {
				this.setState({ data : res.data });
				var storedResults = JSON.parse(localStorage.getItem("prevRes"));
				if(!storedResults){
					var prevRes = [];
					prevRes[0] = 'http://www.omdbapi.com/?apikey=b1d06d27&i='+this.props.match.params.id;
					localStorage.setItem("prevRes",JSON.stringify(prevRes));
				}
				else {
					storedResults.push('http://www.omdbapi.com/?apikey=b1d06d27&i='+this.props.match.params.id);
					localStorage.setItem("prevRes",JSON.stringify(storedResults));
				}
			})
			.catch(e => console.log(e));
	}
	render(){
		if(this.state.data){
			var itemDetail = this.state.data;
		}
		return (
			<div>
				<Link to = '/'><button>Back</button></Link>
				<img src = { this.state.data.Poster } alt = { this.state.data.Title } />
				<pre>{ JSON.stringify(itemDetail,null,2)}</pre>
			</div>
			)
	}
}