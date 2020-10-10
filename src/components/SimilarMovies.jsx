import React , { Component } from 'react';
import Poster from './Poster';
import {Link} from 'react-router';
import { Grid, Row, Col} from 'react-bootstrap';

export default class SimilarMovies extends Component{

  render() {
    console.log(this.props)
  const style={
	display: 'flex',
	flexWrap: 'wrap'
  }
  const similars = (this.props.similar.length > 0) ? this.props.similar.map((movie) => {
    return (
      <Col xs={6} sm={4} md={3} key={movie.id} >
      <Link to={'/movie/'+movie.id} ><Poster info id={movie.id} path={movie.poster_path} title={movie.title} voteAverage={movie.vote_average} release_date={movie.release_date} responsive /></Link>
    </Col>
    )
  }) : null
  return (
    {similars}
  )
  }
}
