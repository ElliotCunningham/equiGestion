import React, { Component } from 'react';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const nouritures = ['orge', 'avoine', 'granulé', 'vitamine'];
const rations = ['0.5 Litre', '1 Litre', '1.5 Litre', '2 Litre', '2.5 Litre', '3 Litre', '3.5 Litre', '4 Litre'];
const races = ['pure sang', 'selle francais', 'connemara', 'irish sport horse', 'selle espagnole'];
const robes = ['alezan', 'baie', 'pie', 'café', 'gris', 'noir'];

class HorseCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isExpand: false,
      currentTab: 1,
      horse: {}
    };
  }

  componentWillMount() {
    this.setState({ horse: this.props.horse.toJS() });
  }

  componentWillUnMount() {

  }

  didStateChanged(nextState) {
    return true;
  }

  didPropsChanged(nextProps) {
    return false;
  }

  shouldComponentUpdate(nextProps, nextContext, nextState) {
    // if (this.didStateChanged(nextState)) return true;
    // if (this.didPropsChanged(nextProps)) return true;
    return true;
  }

  handleReduceCard = () => {
    this.setState({ isExpand: false });
  }

  onChangeCurrentTab = (value) => {
    this.setState({ currentTab: value });
  }

  getAgeHorse = () => {
    return Math.round((new Date() - new Date(this.props.horse.birthday)) * 0.00000000003171);
  }

  handleExpandChange = (value) => {
    if (value) this.props.setCurrentHorse(this.props.horse);
    this.setState({isExpand: value});
  }

  getDataNouriture = () => {
    return nouritures.map((nouriture) => {
      return <MenuItem value={nouriture} primaryText={nouriture} key={nouriture}></MenuItem>
    });
  }

  getDataRation = () => {
    return rations.map((ration) => {
      return <MenuItem value={ration} primaryText={ration} key={ration}></MenuItem>
    });
  }

  getDataRaces = () => {
    return races.map((race) => {
      return <MenuItem value={race} primaryText={race} key={race}></MenuItem>
    });
  }

  getDataRobes = () => {
    return robes.map((robe) => {
      return <MenuItem value={robe} primaryText={robe} key={robe}></MenuItem>
    });
  }

  selectFieldNouritureMatinChange = (event, index, value) => {
    this.setState((state) => {
      const horse = state.horse;
      horse.ration.matin.type = value;
      horse.ration.midi.type = value;
      horse.ration.soir.type = value;
      return horse;
    });
  }

  SelectFieldRationMatinChange = (event, index, value) => {
    this.setState((state) => {
      const horse = state.horse;
      horse.ration.matin.qty = value;
      horse.ration.midi.qty = value;
      horse.ration.soir.qty = value;
      return horse;
    });
  }

  selectFieldNouritureMidiChange = (event, index, value) => {
    this.setState((state) => {
      const horse = state.horse;
      horse.ration.midi.type = value;
      return horse;
    });
  }

  SelectFieldRationMidiChange = (event, index, value) => {
    this.setState((state) => {
      const horse = state.horse;
      horse.ration.midi.qty = value;
      return horse;
    });
  }

  selectFieldNouritureSoirChange = (event, index, value) => {
    this.setState((state) => {
      const horse = state.horse;
      horse.ration.soir.type = value;
      return horse;
    });
  }

  SelectFieldRationSoirChange = (event, index, value) => {
    this.setState((state) => {
      const horse = state.horse;
      horse.ration.soir.qty = value;
      return horse;
    });
  }

  selectFieldRaceChange = (event, index, value) => {
    this.setState((state) => {
      const horse = state.horse;
      horse.race = value;
      return horse;
    });
  }

  selectFieldRobeChange = (event, index, value) => {
    this.setState((state) => {
      const horse = state.horse;
      horse.robe = value;
      return horse;
    });
  }

  handleTouchSave = () => {
    this.props.updateHorse(this.getDataHorse());
    this.handleReduceCard();
  }

  getDataHorse = () => {
    return {
      _id: this.state.horse._id,
      _rev: this.state.horse._rev,
      firstName: this.refs.firstNameTextField.getValue(),
      lastName: this.refs.lastNameTextField.getValue(),
      birthday: this.refs.datePicker.state.date,
      vetoInfo: this.getDateValueVeto(),
      ration: this.state.horse.ration,
      race: this.state.horse.race,
      pere: this.refs.pereTextField.getValue(),
      mere: this.refs.mereTextField.getValue(),
      robe: this.state.horse.robe,
    };
  }

  getDateValueVeto() {
    return {
      grippeEquine: this.refs.datePickerGrippe.state.date,
      rhinopneumonie: this.refs.datePickerRhinopneumonie.state.date,
      tetanos: this.refs.datePickerTetanos.state.date,
      lastVeto: this.refs.datePickerVisiteVeto.state.date
    }
  }

  getInformationForm = () => {
    return(
      <div className="infoForm">
        <TextField
          hintText="Nom du cheval"
          fullWidth={true}
          defaultValue={this.state.horse.firstName}
          ref="firstNameTextField"
          style={{marginTop: "3%", marginLeft: "auto"}}
        />
        <TextField
          hintText="Deuxiéme Nom"
          fullWidth={true}
          defaultValue={this.state.horse.lastName}
          ref="lastNameTextField"
          style={{marginTop: "3%", marginLeft: "auto"}}
        />

        <br/>

        <DatePicker defaultDate={new Date(this.state.horse.birthday)} hintText="Date de naissance" mode="landscape" ref="datePicker" style={{ marginTop: '3%' }}/>

        <br/>

        <div className="nouriture">
          <div style={{ display: 'flex' }}>
            <SelectField floatingLabelText="nouriture matin" value={this.state.horse.ration.matin.type} onChange={this.selectFieldNouritureMatinChange} style={{ marginLeft: '2%' }}>
              {this.getDataNouriture()}
            </SelectField>
            <SelectField floatingLabelText="ration matin" value={this.state.horse.ration.matin.qty} onChange={this.SelectFieldRationMatinChange} style={{ marginLeft: '2%' }}>
              {this.getDataRation()}
            </SelectField>
            <SelectField floatingLabelText="nouriture midi" value={this.state.horse.ration.midi.type} onChange={this.selectFieldNouritureMidiChange} style={{ marginLeft: '2%' }}>
              {this.getDataNouriture()}
            </SelectField>
          </div>
          <div style={{ display: 'flex' }}>
            <SelectField floatingLabelText="ration midi" value={this.state.horse.ration.midi.qty} onChange={this.SelectFieldRationMidiChange} style={{ marginLeft: '2%' }}>
              {this.getDataRation()}
            </SelectField>
            <SelectField floatingLabelText="nouriture soir" value={this.state.horse.ration.soir.type} onChange={this.selectFieldNouritureSoirChange} style={{ marginLeft: '2%' }}>
              {this.getDataNouriture()}
            </SelectField>
            <SelectField floatingLabelText="ration soir" value={this.state.horse.ration.soir.qty} onChange={this.SelectFieldRationSoirChange} style={{ marginLeft: '2%' }}>
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
          <DatePicker defaultDate={new Date(this.state.horse.vetoInfo.grippeEquine)} hintText="Date du vaccin grippe équine" mode="landscape" ref="datePickerGrippe" style={{ marginLeft: '20%'}}/>
        </div>
        <div style={{ display: 'flex', marginTop: '5%' }}>
          <label style={{ marginTop: '2%' }}>Rhinopneumonie</label>
          <DatePicker defaultDate={new Date(this.state.horse.vetoInfo.rhinopneumonie)} hintText="Date du vaccin rhinopneumonie" mode="landscape" ref="datePickerRhinopneumonie" style={{ marginLeft: '18%'}}/>
        </div>
        <div style={{ display: 'flex', marginTop: '5%' }}>
          <label style={{ marginTop: '2%' }}>Tétanos</label>
          <DatePicker defaultDate={new Date(this.state.horse.vetoInfo.tetanos)} hintText="Date du vaccin Tétanos" mode="landscape" ref="datePickerTetanos" style={{ marginLeft: '25%'}}/>
        </div>
        <div style={{ display: 'flex', marginTop: '5%' }}>
          <label style={{ marginTop: '2%' }}>Derniere visite véterinaire</label>
          <DatePicker defaultDate={new Date(this.state.horse.vetoInfo.lastVeto)} hintText="Date derniére visite véto" mode="landscape" ref="datePickerVisiteVeto" style={{ marginLeft: '11%'}}/>
        </div>
        <br/>
        <br/>
        <br/>
      </div>
    );
  }

  getInfoSha() {
    return(
      <div className="infoSha">
        <div style={{ display: 'flex', marginTop: '5%' }}>
          <label style={{ marginTop: '5%' }}>Race de l'équidé : </label>
          <SelectField floatingLabelText="selectioner la race" onChange={this.selectFieldRaceChange} value={this.state.horse.race}>
            {this.getDataRaces()}
          </SelectField>
        </div>
        <div style={{ display: 'flex', marginTop: '5%' }}>
          <label style={{ marginTop: '5%' }}> Robe de l'équidé : </label>
          <SelectField floatingLabelText="selectioner la robe" onChange={this.selectFieldRobeChange} value={this.state.horse.robe}>
            {this.getDataRobes()}
          </SelectField>
        </div>
        <div style={{ marginTop: '5%' }}>
          <TextField
            hintText="Pére du cheval"
            fullWidth={true}
            defaultValue={this.state.horse.pere}
            ref="pereTextField"
            style={{marginTop: "3%", marginLeft: "auto"}}
          />
          <TextField
            hintText="Mére du cheval"
            fullWidth={true}
            defaultValue={this.state.horse.mere}
            ref="mereTextField"
            style={{marginTop: "3%", marginLeft: "auto"}}
          />
        </div>
      </div>
    );
  }

  render() {
    return(
      <div className="horseCard">
        <Card expanded={this.state.isExpand} onExpandChange={this.handleExpandChange}>
          <CardHeader
            title={`${this.props.horse.firstName} ${this.props.horse.lastName}`}
            subtitle={`${this.props.horse.race} ${this.props.horse.robe} de ${this.getAgeHorse()} ans`}
            avatar="image/horse.jpg"
            actAsExpander={true}
            showExpandableButton={true}
          />
          {/* <CardMedia
            expandable={true}
            overlay={<CardTitle title={`${this.props.horse.firstName} ${this.props.horse.lastName}`} subtitle={`${this.props.horse.race} ${this.props.horse.robe} de ${this.getAgeHorse()} ans`} />}
          >
            <img src="image/quaterBarbaste.jpg" alt={this.props.horse.firstName} />
          </CardMedia> */}
          <CardText expandable={true}>
            <Tabs value={this.state.currentTab} onChange={this.onChangeCurrentTab}>
              <Tab label="information cheval" value={1}>
                {this.getInformationForm()}
              </Tab>
              <Tab label="info véterinaire" value={2}>
                {this.getInformationVeto()}
              </Tab>
              <Tab label="info sha" value={3}>
                {this.getInfoSha()}
              </Tab>
            </Tabs>
            <div className="card_actions" style={{ marginLeft: '70%' }}>
              <FlatButton secondary={true} label="Fermer" onTouchTap={this.handleReduceCard} />
              <FlatButton primary={true} label="Enregistrer" onTouchTap={this.handleTouchSave} />
            </div>
          </CardText>
        </Card>
      </div>
    );
  }

}

export default HorseCard;
