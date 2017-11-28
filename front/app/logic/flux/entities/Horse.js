import Immutable from 'immutable';

const HorsesRecord = Immutable.Record({
  _id: undefined,
  _rev: undefined,
  firstName: undefined,
  lastName: undefined,
  birthday: undefined,
  ration: {},
  lastOut: {},
  lastRide: false,
  lastRider: false,
  vetoInfo: {},
  sha: {
    pere: '',
    mere: '',
    race: '',
  },
  created: new Date().toISOString(),
  updated: new Date().toISOString(),
});

class Horse extends HorsesRecord {
  constructor(props) {
    super(props);
  }

  getLastOutInfo() {
    const out = {
      lastOut: this.lastOut,
      lastRide: this.lastRide,
      lastRider: this.lastRider
    };

    return out;
  }

}

export default Horse;
