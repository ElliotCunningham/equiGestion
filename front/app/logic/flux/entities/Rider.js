import Immutable from 'immutable';

const RiderRecord = Immutable.Record({
  _id: undefined,
  firstName: undefined,
  lastName: undefined,
  birthday: undefined,
  age: undefined,
  galop: undefined,
  licence: undefined,
  email: undefined,
  phone: undefined,
  phone1: undefined,
  proprio: false,
});

class Rider extends RiderRecord {

  constructor(props) {
    super(props);
  }

  getLicence() {
    return this.licence;
  }

}

export default Rider;