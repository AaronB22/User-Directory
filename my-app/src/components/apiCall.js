import React, { Component } from "react";
import axios from "axios";
import API from "../utils/API"
import employeeCard from "./employeeCard";
import 'bootstrap/dist/css/bootstrap.min.css';
import './apiCall.css'

class ApiCall extends Component{
    state = {
        users:[],
        isLoaded: false
    }
    componentDidMount(){
        fetch('https://randomuser.me/api/')
            .then(res=>res.json())
            .then(json=>{
                const newUser=[json]
                this.setState({
                    isLoaded: true,
                    users: newUser
                })
            })

    }
    handleReGen=()=>{
     
        for (let i=0; i<10; i++){

            API.search()
            .then(res=>{
                const newUser= [res.data]
                this.setState({users: this.state.users.concat(newUser)})
            })
        }

    }
    render(){
        let {isLoaded, users}= this.state;
        if(!isLoaded){
            return <div>Loading...</div>
        }
        else{
            console.log(users)
            return (
                <>
                <button onClick={this.handleReGen}> Regenerate Users </button>


                <div className='row parentDiv'>
                {users.map((value, index)=>{
                    return(

                    <div key={index} className='card mainDiv '>
                        <div className="HeaderDiv">
                            <img className='profilePic' alt='profile'src={value.results[0].picture.medium}/>
                            <h2 className='h2 headerName'>{value.results[0].name.first}</h2>
                            <h2 className='h2 headerName'>{value.results[0].name.last}</h2>
                        </div>
                        <p>Gender: {value.results[0].gender}</p>
                        <p>Lives: {value.results[0].location.city}, {value.results[0].location.country}</p>
                        <p>Email: {value.results[0].email}</p>
                        <p>Phone: {value.results[0].phone}</p>
                    </div>
                    )



                })}
                 </div>

            
                    
                 </>
               
            )
        }
        
    }




}

export default ApiCall;