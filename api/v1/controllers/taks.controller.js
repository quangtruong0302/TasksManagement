const Task = require("../models/task.model");
const paginationHelper = require("../../../helpers/pagination");
// [GET] /api/v1/tasks
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
  }
  const sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  }

  const countTask = await Task.countDocuments(find);
  const objPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 2,
    },
    countTask,
    req.query
  );
  const tasks = await Task.find(find)
    .sort(sort)
    .limit(objPagination.limitItems)
    .skip(objPagination.skip);
  res.json(tasks);
};

// [GET] /api/v1/tasks/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      deleted: false,
    });
    res.json(task);
  } catch (error) {
    res.json("Không tìm thấy");
  }
};
