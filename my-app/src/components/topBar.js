import React, { Component } from "react";
import ApiCall from "./apiCall";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class topBar extends Component{
    constructor(props){
        super(props);
        this.state={
            hasChanged: false
        }
    }
    
    handleClick=(e)=>{
        e.preventDefault();
        this.props.handleReGen()
    }
    sortByAge=(e)=>{
        e.preventDefault();
        this.props.sortByAge()
    }
    
    filterGender=(e)=>{
     e.preventDefault();
        this.props.filterGender()
    }
    render(){
        return(
        <>
    
            
        <button onClick={this.handleClick}>Generate Users</button>
        <button onClick={this.sortByAge}>Sort</button>
        <button onClick={this.filterGender}>Filter Gender</button>
        </>
        );
    }
}



