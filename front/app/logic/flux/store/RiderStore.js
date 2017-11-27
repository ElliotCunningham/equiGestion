import ActionTypes from '../constant/RidersConstant';
import Rider from '../entities/Hosre';
import AppDispatcher from '../AppDispatcher';
import BaseStore from '../base/BaseStore';

class RiderStore extends BaseStore {
  constructor() {
    super('riders');
    this.riders = [];
    this.currentRider = false;
  }

  getAllRiders() {
    return this.riders;
  }

  getCurrentRiders() {
    return this.currentRider;
  }

  setRiderInStore(data) {
    const horse = new Rider(data);
    this.riders.push(horse);

    this.emitChange();
  }

  updateRiderInStore(horseUpdate) {
    const horse = new Rider(horseUpdate);

    this.riders = this.riders.map((ho) => {
      if (ho._id === horse._id) {
        ho = horse;
      }
      return ho;
    });

    this.emitChange();
  }

  initRidersInStore(riders) {
    this.riders = riders.map((ho) => {
      return new Rider(ho);
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