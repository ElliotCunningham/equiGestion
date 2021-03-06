import React, { Component, PropTypes } from 'react';

import HorsesActionCreators from '../../logic/flux/action/HorsesActionCreators';
import HorseStore from '../../logic/flux/store/HorseStore';

import SharedToolBar from '../Shared/SharedToolBar';
import HorseList from './HorseList';
import HorseFormModal from './HorseFormModal';

const _createHosre = (data) => {
  return HorsesActionCreators.createHorse(data);
}

const _updateHorse = (data) => {
  return HorsesActionCreators.updateHorse(data);
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

  editHorse = (horse) => {
    this.refs.horseFormModal.openModalWithHorse(horse);
  }

  handleCreateHorse = (horse) => {
    console.log(horse);
    _createHosre(horse);
  }

  handleUpdateHorse = (horse) => {
    console.log(horse);
    _updateHorse(horse);
  }

  render() {
    console.log(this.state.horses.toJS());
    return(
      <div>
        <HorseFormModal
          ref="horseFormModal"
          createHorse={this.handleCreateHorse}
        />
        <SharedToolBar
          nbData={this.state.horses.size || 0}
          name="Cheveaux"
          handleNavigation={this.handleNavigation}
        />
        <HorseList
          createHorse={this.createHorse}
          updateHorse={this.handleUpdateHorse}
          editHorse={this.editHorse}
          horses={this.state.horses}
        />
      </div>
    );
  }

}

export default HorsesContainer;
