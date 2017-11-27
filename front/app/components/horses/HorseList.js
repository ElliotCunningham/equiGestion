import React, { Component, PropTypes } from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentEdit from 'material-ui/svg-icons/content/create';
import ContentRemove from 'material-ui/svg-icons/action/delete';

import HorseCard from './HorseCard';

class HorseList extends Component {

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      currentHorse: false,
    };

  }

  componentWillMount() {
  }

  componentWillUnMount() {
  }

  didStateChanged(nextState) {
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

  handleTouchCreate = () => {
    this.props.createHorse();
  }

  getListHorse = () => {
    return this.props.horses.map((horse) => {
      return <HorseCard horse={horse} id={horse._id} />
    });
  }

  render() {
    console.log('props', this.props);
    return(
      <div className="listeHorses" style={{ display: 'flex' }}>
        <div className="liste" style={{ float: 'left', width: '90%' }}>
          {this.getListHorse()}
        </div>

        <div className="action" style={{ float: 'right', width: '10%', display: 'block' }}>
          <FloatingActionButton onTouchTap={this.handleTouchCreate} style={{marginTop:'5%', marginLeft: 'auto'}}>
            <ContentAdd />
          </FloatingActionButton>
          <br/>
          <FloatingActionButton secondary={true} style={{marginTop:'5%', marginLeft: 'auto'}}>
            <ContentEdit />
          </FloatingActionButton>
          <br/>
          <FloatingActionButton style={{marginTop:'5%', marginLeft: 'auto', color: 'white'}}>
            <ContentRemove />
          </FloatingActionButton>
        </div>
      </div>
    );
  }


}

export default HorseList;
