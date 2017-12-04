import React, { Component } from 'react';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class HorseCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isExpand: false
    }
  }

  componentWillMount() {

  }

  componentWillUnMount() {

  }

  didStateChanged(nextState) {
    return true;
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

  getAgeHorse = () => {
    return Math.round((new Date() - new Date(this.props.horse.birthday)) * 0.00000000003171);
  }

  handleExpandChange = (value) => {
    console.log(value);
    if (value) this.props.setCurrentHorse(this.props.horse);
  }

  render() {
    return(
      <div className="horseCard">
        <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
          <CardHeader
            title={this.props.horse.firstName}
            subtitle={this.props.horse.lastName}
            avatar="image/horse.jpg"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardMedia
            expandable={true}
            overlay={<CardTitle title={`${this.props.horse.firstName} ${this.props.horse.lastName}`} subtitle={`${this.props.horse.race} ${this.props.horse.robe} de ${this.getAgeHorse()} ans`} />}
          >
            <img src="image/quaterBarbaste.jpg" alt={this.props.horse.firstName} />
          </CardMedia>
          <CardText expandable={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        </Card>
      </div>
    );
  }

}

export default HorseCard;
