import React from 'react';
import gpl from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import LyricForm from '../components/addlyric';
import query from '../queries/songDetail';

class SongDetail extends React.Component {

    onLike(id, likes) {
        console.log(id)
        this.props.mutate({
            variables: { id },
            optimisticResponse: {
                __typename: "Mutation",
                likeLyric: {
                    __typename: "LyricType",
                    id,
                    likes: likes + 1
                }
            }

        })
    }
    render() {
        const { song } = this.props.data
        if (this.props.data.loading) {
            return null
        }
        console.log(this.props)
        return (
            <React.Fragment>
                <div className="container" style={{ padding: "40px 0px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <h3 style={{ margin: "0px" }}>{song.title}</h3>
                        <Link to={'/'} style={{lineHeight:"8px"}}>
                            <span class="material-icons" style={{fontSize:"40px"}}>
                                arrow_back
                            </span>
                        </Link>
                    </div>
                    {song.lyrics.length > 0 ?
                        <ul className="collection">
                            {song.lyrics.map((item) => {
                                return (<li key={item.id} className="collection-item" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <div style={{ flex: "1" }}>
                                        <span>
                                            {item.content}
                                        </span>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <span class="material-icons" style={{ cursor: "pointer" }} onClick={() => this.onLike(item.id, item.likes)}>thumb_up</span>
                                        <div style={{ height: "30px", width: "45px", display: "flex", justifyContent: "center", alignItems: "center" }}>{item.likes}</div>
                                    </div>
                                </li>)
                            })}
                        </ul> : null}
                    <LyricForm id={this.props.match.params.id} />
                </div>
            </React.Fragment>
        )
    }
}

const mutation = gpl`
mutation LikeLyric($id:ID){
    likeLyric(id:$id){
      likes
      id
    }
  }
`
export default graphql(mutation)(
    graphql(query, {
        options: (props) => { return { variables: { id: props.match.params.id } } }
    })(SongDetail)
)