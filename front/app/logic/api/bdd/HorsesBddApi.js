import PouchDbApi from '../../base/PouchDbApi';

class HorsesBddApi extends PouchDbApi {
  constructor() {
    super('horses');
  }

  initHorsesBddApi(callBack) {
    this._startChangeListenner(callBack);
  }


  getDocumentById(id) {
    return this.getDocById(id);
  }

  createDocument(doc) {
    return this.createDoc(doc);
  }

  updateDocument(doc) {
    return this.updateDoc(doc);
  }

  deleteDocument(doc) {
    return this.removeDoc(doc);
  }

  createDocumentWithoutId(doc) {
    return this.createDocWithoutId
  }

  bulkInsertDocuments(docs) {
    return this.bulkInsertDoc(docs);
  }

  bulkDeleteDocuments(docs) {
    return this.bulkDeleteDoc(docs);
  }

  fetchAllDocuments(option = false) {
    return this.fetchAllDocs(option);
  }

  destryBdd() {
    return this.destroyDataBase();
  }

}

export default new HorsesBddApi();
