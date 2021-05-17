export const StorageModule = {
  data: {},
  save: function (context, data) {
    if (!this.data[context]) {
      this.data[context] = [];
    }
    data.id = this.data[context].length + 1;
    this.data[context].push(data);
  }
};
