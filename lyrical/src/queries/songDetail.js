import gpl from 'graphql-tag';

export default gpl`
query QuerySong($id:ID!){
    song(id:$id){
        id
        title
      lyrics{
          id
        content
        likes
      }
    }
    }
`