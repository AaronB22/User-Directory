import React, { Component } from "react";
import ApiCall from "./apiCall";
import 'bootstrap/dist/css/bootstrap.min.css';
import './topBar.css'

export default class topBar extends Component{
    constructor(props){
        super(props);
        this.state={
            hasChanged: false,
            display:false,
            filter:'Filter By Gender',
            sort:'Sort by Age',
        }
    }
    
    handleClick=(e)=>{
        e.preventDefault();
        this.props.handleReGen()
    }
    sortByAge=(e)=>{
        e.preventDefault();
        if(this.state.sort==='Oldest To Youngest'){
            this.setState({
                sort: "Youngest To Oldest"
            })
        }
        else {
            this.setState({
                sort: "Oldest To Youngest"
            })
        }
        this.props.sortByAge()
    }
    
    filterGender=(e)=>{
     e.preventDefault();
        if (this.state.filter==='Showing Men'){
            this.setState({
                filter: 'Showing Women'
            })
        }
        else{
            this.setState({
                filter: 'Showing Men'
            })
        }
        this.props.filterGender()
    }
    


    render(){
        return(
        <>

        <div className="topBars">
            <h1 className='headers h1'>User Directory</h1>
        <button className='generate btn btn-lg btn-info' onClick={this.handleClick}>Generate Users</button>
        <button className='sort btn btn-lg btn-info' onClick={this.sortByAge}>{this.state.sort}</button>
        <button className='filter btn btn-lg btn-info' onClick={this.filterGender}>{this.state.filter}</button>
        </div>
            
        </>
        );
    }
}



