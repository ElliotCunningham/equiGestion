import React, { Component, PropTypes } from 'react';

import Dialog from 'material-ui/Dialog';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const nouritures = ['orge', 'avoine', 'granulé', 'vitamine'];
const rations = ['0.5 Litre', '1 Litre', '1.5 Litre', '2 Litre', '2.5 Litre', '3 Litre', '3.5 Litre', '4 Litre'];

class HorseFormModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      currentTab: 1,
      _id: `horse_${new Date().toISOString()}`,
      horse: false,
      nouriture: {
        matin: { type: '', qty: '' },
        midi: { type: '', qty: '' },
        soir: { type: '', qty: '' },
      },
    };
  }

  componentWillMount() {
  }

  componentWillUnMount() {
  }

  didStateChanged(nextState) {
    if (this.state.isOpen !== nextState) return true;
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

  openModal = () => {
    this.setState({ isOpen: true });
  }

  closeModal = () => {
    this.setState({ isOpen: false });
  }

  onChangeCurrentTab = (value) => {
    this.setState({ currentTab: value });
  }

  handleTouchSave = () => {
    this.props.createHorse(this.getDataHorse());
    this.closeModal();
  }

  selectFieldNouritureMatinChange = (event, index, value) => {
    this.setState((state) => {
      const nouriture = state.nouriture;
      nouriture.matin.type = value;
      nouriture.midi.type = value;
      nouriture.soir.type = value;

      return nouriture;
    });
  }

  SelectFieldRationMatinChange = (event, index, value) => {
    this.setState((state) => {
      const nouriture = state.nouriture;
      nouriture.matin.qty = value;
      nouriture.midi.qty = value;
      nouriture.soir.qty = value;
    });
  }

  selectFieldNouritureMidiChange = (event, index, value) => {
    this.setState((state) => {
      const nouriture = state.nouriture;
      nouriture.midi.type = value;
      return nouriture;
    });
  }

  SelectFieldRationMidiChange = (event, index, value) => {
    this.setState((state) => {
      const nouriture = state.nouriture;
      nouriture.midi.qty = value;
      return nouriture;
    });
  }

  selectFieldNouritureSoirChange = (event, index, value) => {
    this.setState((state) => {
      const nouriture = state.nouriture;
      nouriture.soir.type = value;
      return nouriture;
    });
  }

  SelectFieldRationSoirChange = () => {
    this.setState((state) => {
      const nouriture = state.nouriture;
      nouriture.soir.qty = value;
      return nouriture;
    });
  }

  getDataHorse = () => {
    return {
      _id: this.state._id,
      firstName: this.refs.firstNameTextField.getValue(),
      lastName: this.refs.lastNameTextField.getValue(),
      birthday: this.refs.datePicker.state.date,
      vetoInfo: this.getDateValueVeto(),
      ration: this.state.nouriture,
    };
  }

  getDateValueVeto() {
    console.log('refs date ==>', this.refs.datePickerGrippe);
    return {
      grippeEquine: this.refs.datePickerGrippe.state.date,
      rhinopneumonie: this.refs.datePickerRhinopneumonie.state.date,
      tetanos: this.refs.datePickerTetanos.state.date,
      lastVeto: this.refs.datePickerVisiteVeto.state.date
    }
  }

  getDataNouriture = () => {
    return nouritures.map((nouriture) => {
      return <MenuItem value={nouriture} primaryText={nouriture}></MenuItem>
    });
  }

  getDataRation = () => {
    return rations.map((ration) => {
      return <MenuItem value={ration} primaryText={ration}></MenuItem>
    });
  }

  getInformationForm = () => {
    return(
      <div className="infoForm">
        <TextField
          hintText="Nom du cheval"
          fullWidth={true}
          defaultValue={(this.state.horse) ?this.state.horse.firstName :""}
          ref="firstNameTextField"
          style={{marginTop: "3%", marginLeft: "auto"}}
        />
        <TextField
          hintText="Deuxiéme Nom"
          fullWidth={true}
          defaultValue={(this.state.horse) ?this.state.horse.lastName :""}
          ref="lastNameTextField"
          style={{marginTop: "3%", marginLeft: "auto"}}
        />

        <br/>

        <DatePicker hintText="Date de naissance" mode="landscape" ref="datePicker" style={{ marginTop: '3%' }}/>

        <br/>

        <div className="nouriture">
          <div style={{ display: 'flex' }}>
            <SelectField floatingLabelText="nouriture matin" value={this.state.nouriture.matin.type} onChange={this.selectFieldNouritureMatinChange} style={{ marginLeft: '2%' }}>
              {this.getDataNouriture()}
            </SelectField>
            <SelectField floatingLabelText="ration matin" value={this.state.nouriture.matin.qty} onChange={this.SelectFieldRationMatinChange} style={{ marginLeft: '2%' }}>
              {this.getDataRation()}
            </SelectField>
            <SelectField floatingLabelText="nouriture midi" value={this.state.nouriture.midi.type} onChange={this.selectFieldNouritureMidiChange} style={{ marginLeft: '2%' }}>
              {this.getDataNouriture()}
            </SelectField>
          </div>
          <div style={{ display: 'flex' }}>
            <SelectField floatingLabelText="ration midi" value={this.state.nouriture.midi.qty} onChange={this.SelectFieldRationMidiChange} style={{ marginLeft: '2%' }}>
              {this.getDataRation()}
            </SelectField>
            <SelectField floatingLabelText="nouriture soir" value={this.state.nouriture.soir.type} onChange={this.selectFieldNouritureSoirChange} style={{ marginLeft: '2%' }}>
              {this.getDataNouriture()}
            </SelectField>
            <SelectField floatingLabelText="ration soir" value={this.state.nouriture.soir.qty} onChange={this.SelectFieldRationSoirChange} style={{ marginLeft: '2%' }}>
              {this.getDataRation()}
            </SelectField>
          </div>
          <br/>
          <br/>
        </div>
      </div>
    );
  }

  getInformationVeto = () => {
    return(
      <div className="infoVeto">
        <div style={{ display: 'flex', marginTop: '5%' }}>
          <label style={{ marginTop: '2%' }}>Grippe équine</label>
          <DatePicker hintText="Date du vaccin grippe équine" mode="landscape" ref="datePickerGrippe" style={{ marginLeft: '20%'}}/>
        </div>
        <div style={{ display: 'flex', marginTop: '5%' }}>
          <label style={{ marginTop: '2%' }}>Rhinopneumonie</label>
          <DatePicker hintText="Date du vaccin rhinopneumonie" mode="landscape" ref="datePickerRhinopneumonie" style={{ marginLeft: '18%'}}/>
        </div>
        <div style={{ display: 'flex', marginTop: '5%' }}>
          <label style={{ marginTop: '2%' }}>Tétanos</label>
          <DatePicker hintText="Date du vaccin Tétanos" mode="landscape" ref="datePickerTetanos" style={{ marginLeft: '25%'}}/>
        </div>
        <div style={{ display: 'flex', marginTop: '5%' }}>
          <label style={{ marginTop: '2%' }}>Derniere visite véterinaire</label>
          <DatePicker hintText="Date derniére visite véto" mode="landscape" ref="datePickerVisiteVeto" style={{ marginLeft: '11%'}}/>
        </div>
        <br/>
        <br/>
        <br/>
      </div>
    );
  }

  getActions = () => {
    return [
      <FlatButton
        label="Annuler"
        primary={true}
        onClick={this.closeModal}
      />,
      <FlatButton
        label="Enregistrer"
        primary={true}
        onClick={this.handleTouchSave}
      />
    ];
  }

  render() {
    const actions = this.getActions();
    console.log('actions ==>', actions);
    return(
      <Dialog
        title="Nouveaux Cheval"
        actions={actions}
        modal={false}
        contentStyle={{maxWidth: 'none', width: '90%'}}
        open={this.state.isOpen}
      >
        <Tabs value={this.state.currentTab} onChange={this.onChangeCurrentTab}>
          <Tab label="information cheval" value={1}>
            {this.getInformationForm()}
          </Tab>
          <Tab label="info véterinaire" value={2}>
            {this.getInformationVeto()}
          </Tab>
        </Tabs>
      </Dialog>
    );
  }



}

export default HorseFormModal;
