import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom'

class SongList extends Component {

    renderSongs() {
        return this.props.data.songs.map((song) => {
            return <li key={song.id} className="collection-item">{song.title}</li>
        })
    }

    render() {
        console.log(this.props)

        if (this.props.data.loading) {
            return null
        }
        console.log(this.props)
        return (
            <React.Fragment>
                <div class="container" style={{padding:"40px 0px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <h3 style={{margin:"0px"}}>Song List</h3>
                        <Link to={"/create"} className="btn">Create a Song</Link>
                    </div>
                    <ul className="collection">
                        {this.renderSongs()}
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}

const query = gql`
{
    songs{
        id
        title
    }
}
`

export default graphql(query)(SongList)