import ActionTypes from '../constant/RidersConstant';
import Rider from '../entities/Rider';
import AppDispatcher from '../AppDispatcher';
import BaseStore from '../base/BaseStore';

import { Map } from 'immutable';

class RiderStore extends BaseStore {
  constructor() {
    super('riders');
    this.riders = new Map();
    this.currentRider = false;
  }

  getAllRiders() {
    return this.riders;
  }

  getCurrentRider() {
    return this.currentRider;
  }

  setRiderInStore(data) {
    this.riders = this.riders.set(data._id, new Rider(data));

    this.emitChange();
  }

  updateRiderInStore(data) {
    this.riders = this.riders.update(data._id, new Rider(data));

    this.emitChange();
  }

  initRidersInStore(riders) {
    riders.map((rider) => {
      this.riders = this.riders.set(rider.id, new Rider(rider));
    });

    this.emitChange();
  }

  addMultipleRidersInStore(data) {
    data.map((ho) => {
      const horse = new Rider(ho);
      this.riders.push(horse);
    });

    this.emitChange();
  }

  setCurrentRiderInStore(data) {
    this.currentRider = new Rider(data);

    this.emitChange();
  }

}

const RiderStoreInstance = new RiderStore();

RiderStoreInstance.dispatchToken = AppDispatcher.register((action) => {
  switch(action.type) {

    case ActionTypes.CREATE_HORSE:
      RiderStoreInstance.setRiderInStore(action.data);
      break;

    default :
      return;
  }
});

export default RiderStoreInstance;
