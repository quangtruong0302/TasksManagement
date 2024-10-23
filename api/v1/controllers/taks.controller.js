const Task = require("../models/task.model");
const paginationHelper = require("../../../helpers/pagination");
const searchHelper = require("../../../helpers/search");
const User = require("../models/user.model");

// [GET] /api/v1/tasks
module.exports.index = async (req, res) => {
  const find = {
    $or: [{ createdBy: req.user.id }, { listUser: req.user.id }],
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
  }
  const sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  }

  const objSearch = searchHelper(req.query);
  if (req.query.keyword) {
    find.title = objSearch.regex;
  }
  const countTask = await Task.countDocuments(find);
  const objPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 3,
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

// [PATCH] /api/v1/tasks/change-status/:id
module.exports.changeStatus = async (req, res) => {
  try {
    await Task.updateOne(
      { _id: req.params.id, deleted: false },
      { status: req.body.status }
    );
    const id = req.params.id;
    res.json({
      code: 200,
      message: "Cập nhật trạng thái thành công!",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Không tồn tại",
    });
  }
};

// [PATCH] /api/v1/tasks/change-multi
module.exports.changeMulti = async (req, res) => {
  const { ids, key, value } = req.body;
  try {
    switch (key) {
      case "status":
        await Task.updateMany({ _id: { $in: ids } }, { status: value });
        res.json({
          code: 200,
          message: "Cập nhật thành công",
        });
        break;
      case "delete":
        await Task.updateMany(
          { _id: { $in: ids } },
          { deleted: true, deletedAt: new Date() }
        );
        res.json({
          code: 200,
          message: "Cập nhật thành công",
        });
        break;
      default:
        res.json({
          code: 400,
          message: "Không tồn tại",
        });
        break;
    }
  } catch (error) {
    res.json({
      code: 400,
      message: "Không tồn tại",
    });
  }
};

// [POST] /api/v1/task/create
module.exports.create = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;
    const task = new Task(req.body);
    const data = await task.save();
    res.json({
      code: 200,
      massage: "Tạo thành công",
      data: data,
    });
  } catch (error) {
    res.json({
      code: 400,
      massage: "Lỗi",
      data: data,
    });
  }
};

// [PATCH] /api/v1/task/edit/:id
module.exports.edit = async (req, res) => {
  try {
    await Task.updateOne({ _id: req.params.id }, { ...req.body });
    res.json({
      code: 200,
      message: "Cập nhật thành công",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Lỗi!",
    });
  }
};

// [DELETE] /api/v1/task/delete/:id
module.exports.delete = async (req, res) => {
  try {
    await Task.updateOne(
      { _id: req.params.id },
      {
        deleted: true,
        deletedAt: new Date(),
      }
    );

    res.json({
      code: 200,
      message: "Xoá thành công",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Lỗi!",
    });
  }
};
