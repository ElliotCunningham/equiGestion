import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const galops = ['aucun', 'galop 1', 'galop 2', 'galop3', 'galop 4', 'galop 5', 'galop 6', 'galop 7'];

class RiderFormModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
        isOpen: true,
        currentTab: 1,
        birthday: new Date(),
        galop: '',
    };
    this._initBindings();
  }

  _initBindings = () => {

  }

  componentWillMount() {

  }

  componentWillUnMount() {

  }

  didStateChanged(nextState) {
    if (this.state.isOpen !== nextState.isOpen) return true;
    if (this.state.currentTab !== nextState.currentTab) return true;
    if (this.state.birthday !== nextState.birthday) return true;
    if (this.state.galop !== nextState.galop) return true;
    return false;
  }

  didPropsChanged(nextProps) {
    if (this.props !== nextProps) return true;
    return false;
  }

  shouldComponentUpdate(nextProps, nextContext, nextState) {
    if (this.didStateChanged(nextState)) return true;
    if (this.didPropsChanged(nextProps)) return true;
    return false;
  }

  handleOpenModal = () => {
    this.setState({ isOpen: true });
  }

  handleCloseModal = () => {
    this.setState({ isOpen: false });
  }

  handleTouchSave = () => {
    console.log('on enregistre en Bdd les infos');
    this.handleCloseModal();
  }

  onChangeCurrentTab = (value) => {
    this.setState({ currentTab: value });
  }

  handleSelectFieldGalopChange = (index, target, value) => {
    console.log('value ==>', value);
    this.setState({ galop: value });
  }

  getModalActions() {
    return [
      <FlatButton
        label="Annuler"
        primary={true}
        onClick={this.handleCloseModal}
      />,
      <FlatButton
        label="Enregistrer"
        primary={true}
        onClick={this.handleTouchSave}
      />
    ];
  }

  getDataGalop = () => {
    return galops.map((galop, index) => {
      return <MenuItem value={index} primaryText={galop} key={index}></MenuItem>
    })
  }

  getInfoRider() {
    return(
      <div>
        <TextField
          hintText="Nom du cavalier"
          fullWidth={true}
          defaultValue={(this.state.rider) ?this.state.rider.lastName :""}
          ref="lastNameTextField"
          style={{marginTop: "3%", marginLeft: "auto"}}
        />
        <TextField
          hintText="Prenom du cavalier"
          fullWidth={true}
          defaultValue={(this.state.rider) ?this.state.rider.firstName :""}
          ref="firstNameTextField"
          style={{marginTop: "3%", marginLeft: "auto"}}
        />
        <div style={{ display: 'flex', marginTop: '5%' }}>
          <label style={{ marginTop: '2%' }}>Date de naissance</label>
          <DatePicker defaultDate={this.state.birthday} hintText="Date de naissance" mode="landscape" ref="datePickerBirthday" style={{ marginLeft: '20%'}}/>
        </div>
        <div style={{ display: 'flex', marginTop: '5%' }}>
          <label style={{ marginTop: '5%' }}>Galop du Cavaliers : </label>
          <SelectField  style={{ marginLeft: '20%' }}floatingLabelText="selectioner le galop" onChange={this.handleSelectFieldGalopChange} value={this.state.galop}>
            {this.getDataGalop()}
          </SelectField>
        </div>
      </div>
    );
  }

  render() {
    console.log('this.state ===>', this.state);
    return(
      <Dialog
        title="Nouveaux Cheval"
        actions={this.getModalActions()}
        modal={false}
        contentStyle={{maxWidth: 'none', width: '90%'}}
        open={this.state.isOpen}
      >
        <Tabs value={this.state.currentTab} onChange={this.onChangeCurrentTab}>

          <Tab label="information cavalier" value={1}>
            {this.getInfoRider()}
          </Tab>

          <Tab label="information de contact" value={2}>

          </Tab>

          <Tab label="information propriétaire" value={3}>

          </Tab>

        </Tabs>
      </Dialog>
    );
  }

}

export default RiderFormModal;
