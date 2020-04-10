const express = require('express');
const router = express.Router();
const jwtVerifyGuard = require('../../middlewares/jwt_verify');
const todoController = require('../../controllers/todo_controller');

router.post('/create', jwtVerifyGuard.verifyJWT, todoController.createTodo);
router.get('/all', jwtVerifyGuard.verifyJWT, todoController.getTodos);
router.delete(
   '/delete/:id',
   jwtVerifyGuard.verifyJWT,
   todoController.deleteTodo
);

module.exports = router;
