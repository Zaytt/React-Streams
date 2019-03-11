import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {

  componentDidMount(){
    this.props.fetchStream(this.props.match.params.id);
  }
  
  deleteStream = () => {
    this.props.deleteStream(this.props.match.params.id);
    history.push('/');
  } 

  renderActions(){
    return(
      <React.Fragment>
        <button className="ui button negative" onClick={this.deleteStream}>Delete</button>
        <button className="ui button" onClick={this.onDismiss}>Cancel</button>
      </React.Fragment>
    )
  }

  onDismiss = () => {
    history.push('/');
  }

  renderMessage(){
    if(!this.props.stream){
      return "Are you sure you want to delete this stream?";
    } else {
      return `Are you sure you want to delete the "${this.props.stream.title}" stream?`;
    }
  }

  render(){ 
    if(!this.props.stream)
      return null;
    return (
        <Modal 
          title="Delete Stream" 
          message={this.renderMessage()}
          actions={this.renderActions(this.renderActions())}
          onDismiss={this.onDismiss}
        />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {stream: state.streams[ownProps.match.params.id]};
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);
