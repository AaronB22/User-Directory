import React, { Component } from "react";
import axios from "axios";
import API from "../utils/API"
import Topbar from "./topBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './apiCall.css'
import './apiCallResponsive.css'
let sort= "unSorted"
let genFilter;
let maleArr=[]
let femaleArr=[]

class ApiCall extends Component{
    state = {
        users:[],
        isLoaded: false,
        alreadyFitered: false
    }
    componentDidMount(){
        for (let i=0; i<20; i++){

        
        fetch('https://randomuser.me/api/')
            .then(res=>res.json())
            .then(json=>{
                const newUser=[json]
                this.setState({
                    isLoaded: true,
                    users: this.state.users.concat(newUser)
                })
            })
        }
    }
    handleReGen=()=>{
        
        for (let i=0; i<10; i++){

            API.search()
            .then(res=>{
                const newUser= [res.data]
                this.setState({users: this.state.users.concat(newUser)})
            })
        }
        this.setState({alreadyFitered: false})
    }
    sortByAge=()=>{
        if(sort ==='OldestToYoungest'){
            sort= 'YoungestToOldest'
        }
        else(
            sort= 'OldestToYoungest'
        )
        console.log(this.state.users)
        const sortedArr= this.state.users
        
        console.log(sortedArr)
            
        if(sort ==='YoungestToOldest'){

            let len = sortedArr.length;
            for (let i = 0; i < len; i++) {
                for (let j = 0; j < len; j++) {
                    if (j<len-1){
                        if (sortedArr[j].results[0].dob.age > sortedArr[j + 1].results[0].dob.age) {
                            let tmp = sortedArr[j];
                            sortedArr[j] =sortedArr[j + 1];
                            sortedArr[j + 1] = tmp;
                        }

                    }
                }
            }
            console.log('bdwdw')
            console.log(sortedArr)
            
        this.setState({users: sortedArr})
        }
        if(sort ==='OldestToYoungest'){

            let len = sortedArr.length;
            for (let i = 0; i < len; i++) {
                for (let j = 0; j < len; j++) {
                    if (j<len-1){
                        if (sortedArr[j].results[0].dob.age < sortedArr[j + 1].results[0].dob.age) {
                            let tmp = sortedArr[j];
                            sortedArr[j] =sortedArr[j + 1];
                            sortedArr[j + 1] = tmp;
                        }

                    }
                }
            }
            console.log('bdwdw')
            console.log(sortedArr)
            
        this.setState({users: sortedArr})
        }
     
    }

    filterGender=()=>{
        if(this.state.alreadyFitered){
            if(genFilter==='male'){
                genFilter='female'
            }
            else(
                genFilter='male'
            )
            if(genFilter==='male'){
                this.setState({users: maleArr})
               }
               if(genFilter==='female'){
                this.setState({users: femaleArr})
            }

        }

       
       
        if(!this.state.alreadyFitered){
            const len=this.state.users
            
            if(genFilter==='male'){
                genFilter='female'
            }
            else(
                genFilter='male'
            )
            
    
                for (let i=0; i<len.length; i++){
                    if (this.state.users[i].results[0].gender==='male'){
                        maleArr.push(this.state.users[i])
                    }
                    if (this.state.users[i].results[0].gender==='female'){
                        femaleArr.push(this.state.users[i])
                    }
                }
                this.setState({alreadyFitered: true})
               if(genFilter==='male'){
                this.setState({users: maleArr})
               }
               if(genFilter==='female'){
                this.setState({users: femaleArr})
            }

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
                <Topbar 
                handleReGen={ this.handleReGen} 
                sortByAge={this.sortByAge}
                filterGender={this.filterGender}
                userArr={users}
                />
                <div className='row parentDiv'>
                {users.map((value, index)=>{
                    return(

                    <div key={index} className='card mainDiv '>
                        <div className="HeaderDiv">
                            <img className='profilePic' alt='profile'src={value.results[0].picture.medium}/>
                            <h2 className='h2 headerName'>{value.results[0].name.first}</h2>
                            <h2 className='h2 headerName'>{value.results[0].name.last}</h2>
                        </div>
                        <div className='lowerDiv'>
                        <p className='lowerDivFonts'><span className='BaseText'>Age: </span>{value.results[0].dob.age}</p>
                        <p className='lowerDivFonts'><span className='BaseText'>Gender:</span> {value.results[0].gender}</p>
                        <p className='lowerDivFonts'><span className='BaseText'>Lives:</span> {value.results[0].location.city}, {value.results[0].location.country}</p>
                        <p className='lowerDivFonts'><span className='BaseText'>Email:</span> {value.results[0].email}</p>
                        <p className='lowerDivFonts'><span className='BaseText'>Phone:</span> {value.results[0].cell}</p>
                        </div>
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