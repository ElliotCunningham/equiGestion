import React, { Component } from 'react';

class RiderListe extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentRider: false
    },
    this._initBindings();
  }

  _initBindings() {

  }

  componentWillMount() {

  }

  componentWillUnMount() {

  }

  didStateChanged(nextState) {
    if (this.currentRider !== nextState.currentRider) return true;
    return false;
  }

  didPropsChanged(nextProps) {
    id (this.props !== nextProps) return true;
    return false;
  }

  shouldComponentUpdate(nextState, nextProps) {
    if (this.didStateChanged(nextState)) return true;
    if (this.didPropsChanged(nextProps)) return true;
    return false;
  }

  setCurrentRider = (rider) => {
    this.setState({ currentRider: rider });
  }

  render() {
    return(
      <div className='rider_liste'>Bientot La liste de tous les rider</div>
    );
  }
}

export default RiderListe;
