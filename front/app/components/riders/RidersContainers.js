import React, { Component, PropTypes } from 'react';

import RidersActionCreators from '../../logic/flux/action/RidersActionCreators';
import RiderStore from '../../logic/flux/store/RiderStore';

import RiderFormModal from './RiderFormModal';
import SharedToolBar from '../Shared/SharedToolBar';

const _updateState = () => {
  const riders = RiderStore.getAllRiders();
  const currentRider = RiderStore.getCurrentRider();

  return {
    riders,
    currentRider
  };
}

class RidersContainers extends Component {

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };

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
    this.router = this.context.router;
    RiderStore.addChangeListener(this._bindingsChangeEvents);
  }

  componentWillUnMount() {
    RiderStore.removeChangeListener(this._bindingsChangeEvents)
  }

  handleNavigation = () => {
    this.router.push('/');
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
    console.log('the state ===>', this.state);
    return(
      <div className="riders_container" style={{ width: '100%', heigth: '100%' }}>
        <RiderFormModal/>
        <SharedToolBar
          name="Cavaliers"
          nbData={this.state.riders.size}
          handleNavigation={this.handleNavigation}
        />
      </div>
    );
  }

}

export default RidersContainers;
