import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator } from 'material-ui';

import RaisedButton from 'material-ui/RaisedButton';
import * as Colors from 'material-ui/styles/colors';

import ToolBarCss from '../style/ToolBarCss';

/**
* Classe  SharedToolBar
* @extends {Component}
*/
class SharedToolBar extends Component {

  /**
  * @property  {number} nbControls - Nombre de Controls présent dans la BDD
  * @property {object} styles - Object comprenant les styles Css de la vue.
  */
  static propTypes = {
    name: PropTypes.string.isRequired,
    nbData: PropTypes.number.isRequired,
  };

  /**
  * @property  {object} muiTheme - Theme graphique global Material UI
  * @property  {function} getStyles - Fonction de récup des styles ( selon theme )
  * @property  {object} router - Router React de l'application
  */
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };

  /**
  * Props Constructor
  * @param  {number} props.nbControls - Nombre de Controls présent dans la BDD
  * @param {object} props.styles - Object comprenant les styles Css de la vue.
  */
  constructor(props) {
    super(props);
  }

  /**
  * Quand le composant est monté on recupére le style du composant
  * @return {void}
  */
  componentWillMount() {
    /** on recupére les styles du container et les passe a la variable style du constructor de la classe*/
    this.styles = ToolBarCss;
  }

  /**
  * vérifie si la vue du composant a besoin de se mettre a jour
  * @param  {object} nextProps - Object avec toutes les nouvelles props du composant.
  * @param  {object} nextState - Object avec le nouveaux state du composant.
  * @param  {object} nextContext - Object avec tous le context du composant.
  * @return {booleen} - return true si il y a besoin d'une mise a jour du composant.
  */
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.nbData !== this.props.nbData;
  }

  /**
  * Renvoie la vue de la classe créer par React.
  * @type {return}
  * @return {object} html - renvoie la vue du composant
  */
  render() {
    return (
      <div style={this.style}>
        <Toolbar>

          <ToolbarGroup style={{ ...this.styles.toolbarGroupStyles, ...{justifyContent: 'flex-start'} }} key={0} >
            <ToolbarTitle text={`${this.props.name}  (${this.props.nbData})`} style={this.styles.title}/>
            <ToolbarSeparator />
          </ToolbarGroup>

          <ToolbarGroup style={this.styles.toolbarGroupStyles} key={3} >
            <RaisedButton
              label="Retour"
              secondary={true}
              onTouchTap={this.props.handleNavigation.bind(this)}
              style={{ lineHeight: '1em', backgroundColor: Colors.pinkA200 }}
            />
          </ToolbarGroup>

      </Toolbar>
      </div>
    );
  }

}

export default SharedToolBar;