* Link API: https://tasks-management-final.vercel.app/
* Link test API(Post Man): https://www.postman.com/api222-2058/workspace/task-management/request/38423278-2f10c1eb-4a8b-4c11-8ee6-173b605c5397?action=share&creator=38423278&ctx=documentation


* USER:
- register       : [POST]   /api/v1/users/register
- login          : [POST]   /api/v1/users/login
- forgot password: [POST]   /api/v1/users/password/fogot
- otp password   : [POST]   /api/v1/users/password/otp
- reset password : [POST]   /api/v1/users/password/reset
- detail         : [GET]    /api/v1/users/detail
- list user      : [GET]    /api/v1/user/list-user

  
* TASK:
- index          : [GET]    /api/v1/tasks
- detail         : [GET]    /api/v1/tasks/detail/:id
- change-status  : [PATCH]  /api/v1/tasks/change-status/:id
- change-multi   : [PATCH]  /api/v1/tasks/change-multi
- create         : [POST]   /api/v1/task/create
- edit           : [PATCH]  /api/v1/task/edit/:id
- delete         : [DELETE] /api/v1/task/delete/:id
