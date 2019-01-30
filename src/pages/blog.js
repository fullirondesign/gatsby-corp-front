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

import classNames from "classnames"
// import classNames from 'classnames/bind';


//STYLES
const styles = {
  pageContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "",
    //   alignContent: "center",
      alignItems: "center",
      
  },
  pageContainerBlog: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
  },  
  card: {
    // width: "50%",
    minWidth: 155,
    margin: 8,
    paddingTop: 32,
    boxShadow: "0px 1px 3px 3px rgba(0,0,0,0.02)",
    "&:hover": {
        boxShadow: "0px 1px 3px 3px rgba(0,0,0,0.2)",
     },
    
  },
//   hover: {
//     // width: "50%",
//     minWidth: 155,
//     margin: 8,
//     paddingTop: 32,
//     boxShadow: "0px 1px 3px 3px rgba(0,0,0,0.7)"
    
//   },
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
  postContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    //   justifyContent: 'flex-center',
    alignContent: 'center',
    justifyContent: 'stretch',
    padding: '0',
    margin: '0',
    flexDirection: 'row',
    // background: '#a9a19f17',
    width: '60vw',
    borderRadius: '4px',
  }
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
    isHovered: false
  };
//   handleHover = this.handleHover.bind(this);

// ---------------------functions--------------------------




handleHover(){ 
    this.setState( {
        isHovered: !this.state.isHovered
    });
}



  render() {
    const { classes } = this.props
    const { title, content } = this.state
    const { character } = this.props.data.rickAndMorty
    console.log('character :', character)
    return (
      <Layout>
        <div className={classes.pageContainer}>
          <h1>{character.name} With His Pupper</h1>
          <p>
            Rick & Morty API data loads at build time. Dog API data loads at run
            time.
          </p>
          <div className={classes.pageContainerBlog}>
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
                      <div>
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
                        className={classes.postContainer}
                      style={{
                      }}
                    >
                      {console.log(data.posts)}
                      {data.posts.map(post => (
                        
                          <Card key="post._id" 
                          hover
                                className={classNames( {[classes.card]: true})}
                            >
                          <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                              {post._id}
                            </Typography>

                            <Typography className={classes.pos} color="textPrimary">
                              {post.title}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                              {post.content}
                            </Typography>
                          </CardContent>
                          </Card>
                        
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
