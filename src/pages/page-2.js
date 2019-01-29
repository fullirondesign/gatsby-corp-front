import React, { Component } from 'react'
// import { graphql } from 'gatsby';
// import { Query } from 'react-apollo';
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import { graphql } from 'gatsby'
import { Query } from 'react-apollo'
import Layout from '../components/layout'



import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';


//STYLES
const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};



// import Link from "gatsby"

// This query is executed at build time by Gatsby.
export const GatsbyQuery = graphql`
  {
    rickAndMorty {
      character(id: 1) {
        name
        image
      }
    }
  }
`

// This query is executed at run time by Apollo.
const APOLLO_QUERY = gql`
  query POSTS {
    posts {
      _id
      content
      title
      createdAt

      cover {
        public_id
      }
    }
  }
`

const POST_MUTATION = gql`
  mutation PostMutation($title: String!, $content: String!) {
    createPost(input: { data: { title: $title, content: $content } }) {
      post {
        _id
        content
      }
    }
  }
`

class test extends Component {
  state = {
    title: '',
    content: '',
  }

  render() {
    const { classes } = this.props
    const { title, content } = this.state
    const { character } = this.props.data.rickAndMorty
    console.log('character :', character)
    return (
      <Layout>
        <div style={{ textAlign: 'center' }}>
          <h1>{character.name} With His Pupper</h1>
          <p>
            Rick & Morty API data loads at build time. Dog API data loads at run
            time.
          </p>
          <div>
            <img
              src={character.image}
              alt={character.name}
              style={{ width: 300 }}
            />

            <Query query={APOLLO_QUERY}>
              {({ data, loading, error }) => {
                if (loading) return <p>Loading pupper...</p>
                if (error) return console.log(error.message) // if: TODO: added so error on load would not show on the screen.

                // const { displayImage: src, breed } = data.dog;
                // return <img src={src} alt={breed} style={{ maxWidth: 300 }} />;
                console.log('data in apppolo querry', data)
                return (
                  <div>
                    posts in console
                    <div>
                      <div className="flex flex-column mt3">
                        <input
                          className="mb2"
                          value={title}
                          onChange={e =>
                            this.setState({ title: e.target.value })
                          }
                          type="text"
                          placeholder="Title"
                        />
                        <input
                          className="mb2"
                          value={content}
                          onChange={e =>
                            this.setState({ content: e.target.value })
                          }
                          type="text"
                          placeholder="title"
                        />
                      </div>
                      <Mutation
                        mutation={POST_MUTATION}
                        variables={{ title, content }}
                      >
                        {postMutation => (
                          <button onClick={postMutation}>Submit</button>
                        )}
                      </Mutation>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        //   justifyContent: 'flex-center',
                        alignContent: 'center',
                        justifyContent: 'flex-start',
                        padding: '0',
                        margin: '0',
                        flexDirection: 'row',
                        background: 'grey',
                        width: '100%',
                        borderRadius: '42px',
                      }}
                    >
                      {console.log(data.posts)}
                      {data.posts.map(post => (
                        <div key="post._id" >
                          <Card className={classes.card}>
                          <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {post._id}
                            </Typography>
                          </CardContent>
                            


                          </Card>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }}
            </Query>
          </div>
        </div>
      </Layout>
    )
  }
}

export default withStyles(styles)(test);

// export default ({
//   data: {
//     rickAndMorty: { character },
//   },
// }) => (  );
