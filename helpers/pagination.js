module.exports = (obj, countRecords, query) => {
  if (query.page) {
    obj.currentPage = parseInt(query.page);
  }
  if (query.limit) {
    obj.limitItems = parseInt(query.limit);
  }
  obj.skip = (obj.currentPage - 1) * obj.limitItems;
  obj.totalPage = Math.ceil(countRecords / obj.limitItems);
  return obj;
};
