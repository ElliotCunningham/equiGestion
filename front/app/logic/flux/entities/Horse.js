import Immutable from 'immutable';

const HorsesRecord = Immutable.Record({
  _id: undefined,
  _rev: undefined,
  firstName: '',
  lastName: '',
  birthday: '',
  ration: {},
  lastOut: {},
  lastRide: false,
  lastRider: false,
  vetoInfo: {},
  race: '',
  pere: '',
  mere: '',
  robe: '',
  image: false,
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
