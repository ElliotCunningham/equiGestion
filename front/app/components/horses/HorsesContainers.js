import React, { Component, PropTypes } from 'react';

import HorsesActionCreators from '../../logic/flux/action/HorsesActionCreators';
import HorseStore from '../../logic/flux/store/HorseStore';

import SharedToolBar from '../Shared/SharedToolBar';
import HorseList from './HorseList';
import HorseFormModal from './HorseFormModal';

const _createHosre = (data) => {
  return HorsesActionCreators.createHorse(data);
}

const _updateState = () => {
  const horses = HorseStore.getAllHorses();
  const currentHorse = HorseStore.getCurrentHorses();

  return {
    horses,
    currentHorse
  };
}

class HorsesContainer extends Component {

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = _updateState();
    this._bindingChangeEvents = this._onChanges.bind(this);
    this._initBindings();
  }

  _initBindings = () => {

  }

  _onChanges() {
    this.setState(_updateState());
  }

  handleNavigation = () => {
    console.log(this.router);
    this.router.push('/');
  }

  componentWillMount() {
    this.router = this.context.router;
    HorseStore.addChangeListener(this._bindingChangeEvents);
  }

  componentWillUnMount() {
    HorseStore.removeChangeListener(this._bindingChangeEvents);
  }

  didStateChanged(nextState) {
    if (this.state.horses !== nextState.horses) return true;
    if (this.currentHorse !== nextState.currentHorse) return true;
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

  createHorse = (data) => {
    this.refs.horseFormModal.openModal();
    // _createHosre(data);
  }

  handleCreateHorse = (horse) => {
    console.log(horse);
    _createHosre(horse);
  }

  render() {
    console.log(this.state);
    return(
      <div>
        <HorseFormModal
          ref="horseFormModal"
          createHorse={this.handleCreateHorse}
        />
        <SharedToolBar
          nbData={5}
          name="Cheveaux"
          handleNavigation={this.handleNavigation}
        />
        <HorseList
          createHorse={this.createHorse}
          horses={this.state.horses}
        />
      </div>
    );
  }

}

export default HorsesContainer;
