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

  handleExpand = () => {
    this.setState({isExpand: true});
  };

  handleReduce = () => {
    this.setState({isExpand: false});
  };

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
        </Card>
      </div>
    );
  }

}

export default HorseCard;
