import ActionTypes from '../constant/HorsesConstant';
import Horse from '../entities/Horse';
import AppDispatcher from '../AppDispatcher';
import BaseStore from '../base/BaseStore';
import { Map } from 'immutable';

class HorseStore extends BaseStore {
  constructor() {
    super('horses');
    this.horses = new Map();
    this.currentHorse = false;
  }

  getAllHorses() {
    return this.horses;
  }

  getCurrentHorses() {
    return this.currentHorse;
  }

  setHorseInStore(data) {
    this.horses = this.horses.set(data._id, new Horse(data));

    this.emitChange();
  }

  updateHorseInStore(horseUpdate) {
    const horse = new Horse(horseUpdate);

    this.horses = this.horses.map((ho) => {
      if (ho._id === horse._id) {
        ho = horse;
      }
      return ho;
    });

    this.emitChange();
  }

  initHorsesInStore(horses) {
    this.horses = horses.map((ho) => {
      return new Horse(ho);
    });

    this.emitChange();
  }

  addMultipleHorsesInStore(data) {
    data.map((ho) => {
      const horse = new Horse(ho);
      this.horses.push(horse);
    });

    this.emitChange();
  }

  setCurrentHorseInStore(data) {
    this.currentHorse = new Horse(data);

    this.emitChange();
  }

}

const HorseStoreInstance = new HorseStore();

HorseStoreInstance.dispatchToken = AppDispatcher.register((action) => {
  switch(action.type) {

    case ActionTypes.CREATE_HORSE:
      HorseStoreInstance.setHorseInStore(action.data);
      break;

    default :
      return;
  }
});

export default HorseStoreInstance;
