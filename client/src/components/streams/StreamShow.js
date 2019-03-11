import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component{

  componentDidMount(){
    // Look for the stream and add it to the state obj
    this.props.fetchStream(this.props.match.params.id);
  }

  render(){

    // If stream hasn't been fetched...
    if(!this.props.stream){
      return <div>Loading...</div>
    }

    const {title, description} = this.props.stream;
    return (
      <div>
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}

// Take the stream from the state obj that has the given id
const mapStateToProps = (state, ownProps) => {
  return {stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps, { fetchStream })(StreamShow)
