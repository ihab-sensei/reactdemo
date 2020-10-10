import React, { Component } from 'react';
import { CastList, TrailerList} from '../components';
import { CAST_MAX_NUM, SIMILAR_MAX_NUM , TRAILER_MAX_NUM } from '../const';
import { Grid, Row, Col} from 'react-bootstrap/lib';
import { MovieInfo, Poster, SimilarMovies } from '../components';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import { fetchMovieDetail, fetchCastList, fetchTrailerList, fetchSimilarMovies} from '../actions';

class MovieDetail extends Component {

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchMovieDetail(this.props.params.id));
    dispatch(fetchCastList(this.props.params.id));
    dispatch(fetchTrailerList(this.props.params.id));
    dispatch(fetchSimilarMovies(this.props.params.id));
  }

  componentWillReceiveProps(nextProps) {
     const {dispatch} = this.props;
     if(nextProps.params.id && this.props.params.id !== nextProps.params.id) {
         dispatch(fetchMovieDetail(nextProps.params.id));
         dispatch(fetchCastList(nextProps.params.id));
         dispatch(fetchTrailerList(nextProps.params.id));
         dispatch(fetchSimilarMovies(this.props.params.id));
      }
  }

  // shouldComponentUpdate(nextProps, nextState){
  //     if(this.props.movie.id !== nextProps.movie.id) {
  //       //console.log('shouldComponentUpdate');
  //       return true;
  //     }
  //     return false;
  // }

  render() {
    console.log(this.props)
    const {movie, similar, isFetcing_similar, casts, trailers, isFetcing_movie, isFetcing_casts, isFetcing_trailers} = this.props;

    if(isFetcing_movie || isFetcing_casts || isFetcing_trailers) {
      return <p>loading...</p>
    }
    if(movie.hasOwnProperty('id')) {
      return(
        <Grid onClick={() => console.log(casts)} fluid={false}>
          <Row>
            <Col xs={12} sm={6} md={4}>
              <Poster id={movie.id} path={movie.poster_path} responsive />
            </Col>
            <Col xs={12} sm={6} md={8}>
              <MovieInfo movie={movie}/>
              
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={6} md={4}>
          <CastList data={casts.slice(0,CAST_MAX_NUM)} />
          </Col>
          </Row>
          <Row>
            <TrailerList data={trailers.slice(0,TRAILER_MAX_NUM)} />
          </Row>
          <Row>
            
            {(similar.results.length > 0) ? this.props.similar.results.slice(0, SIMILAR_MAX_NUM).map((movie) => {
              return (
                <Col xs={6} sm={4} md={3} key={movie.id} >
                 <Link to={'/movie/'+movie.id} ><Poster info id={movie.id} path={movie.poster_path} title={movie.title} voteAverage={movie.vote_average} release_date={movie.release_date} responsive /></Link>
                </Col>
              )
            }) : null}
            <h4>gafds</h4>
            
          </Row>
        </Grid>
      );
    } else
      return null;

  }
}

function mapStateToProps(state){
  const {movieDetail, castList, trailerList, similarList} = state;
  const {isFetcing_movie, item: movie, error_movie} = movieDetail;
  const {isFetcing_similar, items: similar, error_similar} = similarList;
  const {isFetcing_casts, items: casts, error_casts} = castList;
  const {isFetcing_trailers, items: trailers, error_trailers} = trailerList;

  return {isFetcing_movie, movie, error_movie, isFetcing_casts, casts, error_casts, isFetcing_trailers, trailers, error_trailers, isFetcing_similar, similar, error_similar}
}

export default connect(mapStateToProps)(MovieDetail);
