import React, { Component } from 'react';

class CreateSong extends Component{
    constructor(props){
        super(props);
        this.state={title:''}
    }
    render(){
        console.log(this.state)
        return(
            <div>
                <form>
                    <h3>Create a Song</h3>
                    <input 
                    value={this.state.title}
                    onChange={e=>this.setState(e.target.value)}
                    />
                </form>
            </div>
        )
    }
}

export default CreateSong