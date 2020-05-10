import React from 'react';
import gpl from 'graphql-tag';
import {graphql} from 'react-apollo';
import query from '../queries/songDetail';

class LyricForm extends React.Component{

    constructor(props){
        super(props)
        this.state={lyric:''}
        this.submitLyric=this.submitLyric.bind(this)
    }

    submitLyric(e){
        e.preventDefault()
        this.props.mutate({
            variables:{
                id: this.props.id,
                content:this.state.lyric
            },
        }).then(()=>this.setState({lyric:''}))
    }
    
    render(){
        console.log(this.props)
        return(
            <React.Fragment>
                <form onSubmit={this.submitLyric} >
                    <label>Add Lyric</label>
                    <input value={this.state.lyric} onChange={e=>this.setState({lyric:e.target.value})} />
                </form>
            </React.Fragment>
        )
    }
}

const mutation=gpl`
mutation AddLyric($id:ID!,$content:String){
    addLyricToSong(songId:$id,content:$content){
  id
  lyrics{
    id
    content
    likes
  }
}
}
`

export default graphql(mutation)(LyricForm)