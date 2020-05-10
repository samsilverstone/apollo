import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import query from '../queries/fetchSongs';

class SongList extends Component {

    onDelete(id) {
        this.props.mutate({
            variables: { id },
        }).then(() => this.props.data.refetch())

    }

    renderSongs() {
        console.log(this.props.data)
        return this.props.data.songs.map(({ id, title }) => {
            return <li key={id} className="collection-item" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Link to={`/song/${id}`}>
                    <span style={{color:"black"}}>
                        {title}
                    </span>
                </Link>
                <i
                    className="material-icons"
                    onClick={() => this.onDelete(id)}
                    style={{ cursor: "pointer" }}
                >
                    delete
            </i>
            </li>
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
                <div class="container" style={{ padding: "40px 0px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h3 style={{ margin: "0px" }}>Song List</h3>
                        <Link to={"/create"} style={{lineHeight:"8px"}}>
                        <span class="material-icons" style={{fontSize:"70px"}}>
                            add_circle
                        </span>
                        </Link>
                    </div>
                    <ul className="collection">
                        {this.renderSongs()}
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}

const mutation = gql`
mutation DeleteSong($id:ID){
    deleteSong(id:$id){
        id
    }
}
`

export default graphql(mutation)(
    graphql(query)(SongList)
)