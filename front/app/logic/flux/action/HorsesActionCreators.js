import ActionTypes from '../constant/HorsesConstant';
import AppDispatcher from '../AppDispatcher';

// import HorsesHttpApi from '../../api/http/HorsesHttpApi';
import HorsesBddApi from '../../api/bdd/HorsesBddApi';

import Horse from '../entities/Horse';


class HorsesActionCreators {
  constructor() {
  this.init = false;
  this.initHorse();
  }

  initHorseBdd() {
    if (!this.init) {
      HorsesBddApi.initHorsesBddApi(this.HorsesBddChange);
      this.init = true;
    }
  }

  initHorse() {
    this.initHorseBdd();
    return HorsesBddApi.fetchAllDocuments()
      .then((res) => {
        const horses = res.rows.map((row) => row.doc);
        AppDispatcher.dispatch({
          type: ActionTypes.INIT_HORSE,
          data: horses
        });
      })
      .catch((err) => {
        console.error('error get all docs horse Bdd', err);
      });
  }

  // getAllHorses() {
  //   return HorsesBddApi.
  // }

  createHorse(horse) {
    this.initHorseBdd();
    const newHorse = new Horse(horse);
    return HorsesBddApi.createDocument(newHorse.toJS())
      .then((res) => {
        if (res.ok === true) {
          const horseCreated = newHorse.update('_rev', () => res.rev);
          AppDispatcher.dispatch({
            type: ActionTypes.CREATE_HORSE,
            data: horseCreated
          });
        }
      })
      .catch((err) => {
        console.log('error create horse in BDD', err);
        throw new Error(err);
      });
  }



  HorsesBddChange(change) {
    console.log('Users Bdd has changed', change);
  }

}

export default new HorsesActionCreators();
