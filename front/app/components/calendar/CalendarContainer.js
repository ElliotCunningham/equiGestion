import React, {Component, PropTypes} from 'react';

const _updateState = () => {

  return {

  };
}

class CalendarContainer extends Component {

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = _updateState();
    this._bindingChangeEvents = this._onChanges.bind(this);
  }

  _onChanges() {
    this.setState(_updateState());
  }

  handleNavigation = () => {
    this.router.push('/');
  }

  componentWillMount() {
    this.router = this.context.router;
    // HorseStore.addChangeListener(this._bindingChangeEvents);
  }

  componentWillUnMount() {
    // HorseStore.deleteChangeListenner(this._bindingChangeEvents);
  }

  didStateChanged(nextState) {
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

  render() {
    return(
      <div className="calendar_container" style={{ width: '100%', heigth: '100%' }}>
        Bientot le Calendrier.
      </div>
    );
  }

}

export default CalendarContainer;
