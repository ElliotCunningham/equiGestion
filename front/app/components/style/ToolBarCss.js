import * as Colors from 'material-ui/styles/colors';

const toolBarCss = {
  toolbar: {
    title: {
      textAlign: 'center',
      color: Colors.blue500,
    },
    toolbarGroupStyles: {
      display: 'flex',
      flex: 1,
      justifyContent: 'flex-end'
    },
    altFloatingBgColor: Colors.blueGrey100,
    altFloatingBgAddColor: Colors.pink400,
    underlineStyle: {
      borderColor: Colors.white
    }
  },
};

export default toolBarCss;