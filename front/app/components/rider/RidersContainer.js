import React, { Component, PropTypes } from 'react';

import RidersActionCreators from '../../logic/flux/action/RidersActionCreators';
import RiderStore from '../../logic/flux/action/RiderStore';

const _updateState = () => {
  const riders = RiderStore.getAllRiders();
  const currentRider = RiderStore.getCurrentRider();

  return {
    riders,
    currentRider
  };
}

class RidersContainer extends Component {

  constructor(props) {
    super(props);
    this.state = _updateState();
    this._bindingsChangeEvents = this._onChanges.bind(this);
    this._initBindings();
  }

  _initBindings() {

  }

  _onChanges() {
    this.state = _updateState();
  }

  componentWillMount() {
    RiderStore.addChangeListener(this._bindingsChangeEvents);
  }

  componentWillUnMount() {
    RiderStore.removeChangeListener(this._bindingsChangeEvents)
  }

  didStateChanged(nextState) {
    if (this.state.riders !== nextState.riders) return true;
    if (this.currentRider !== nextState.currentRider) return true;
    return false;
  }

  didPropsChanged(nextProps) {
    if (this.props !== nextProps) return true;
    return false;
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.didStateChanged(nextState)) return true;
    if (this.didPropsChanged(nextProps)) return true;
    return false;
  }

  render() {
    return(
      <div>Bientot la liste de tous les cavaliers</div>
    );
  }

}

export default RidersContainer;