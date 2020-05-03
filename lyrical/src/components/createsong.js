import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

class CreateSong extends Component {
    constructor(props) {
        super(props);
        this.state = { title: '' }
        this.formSubmit = this.formSubmit.bind(this)
    }
    formSubmit(e) {
        e.preventDefault()
        this.props.mutate({
            variables: {
                title: this.state.title
            }
        }).then(() => this.props.history.push('/'))

    }
    render() {
        return (
            <div class="container" style={{ padding: "40px 0px" }}>
                <form onSubmit={this.formSubmit}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h3 style={{ margin: "0px" }}>Create a Song</h3>
                        <Link to={"/"} className="btn">Go Back</Link>
                    </div>
                    <h5>Song Title:</h5>
                    <input
                        value={this.state.title}
                        onChange={e => this.setState({ title: e.target.value })}
                    />
                    <button class="btn" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

const mutation = gql`
    mutation AddSong($title:String){
        addSong(title:$title){
          title
        }
      }
`

export default graphql(mutation)(CreateSong)