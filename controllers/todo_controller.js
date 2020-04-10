const User = require('../models/user_model');
const Todo = require('../models/todo_model');

exports.createTodo = async (req, res) => {
   const { todo } = req.body;
   if (!todo) {
      // go back
      return res.status(500).json({
         message: 'Todo cannot created'
      });
   } else {
      try {
         const user = await User.findOne({ email: req.user.email });
         if (user) {
            const todoCreated = await Todo.create({
               todo: todo,
               createdBy: req.user._id
            }).catch(err => {
               console.log(err);
               return res.status(500).json({
                  message: 'Error occured while creating'
               });
            });
            await user.todos.push(todoCreated._id);
            await user.save();
            console.log(user);
            return res.status(200).json({
               message: 'TODO Created'
            });
         } else {
            return res.status(500).json({
               message: 'User not found in the database'
            });
         }
      } catch (error) {
         console.log(error);
         return res.status(500).json({
            message: 'Error occured while finding user'
         });
      }
   }
};

exports.getTodos = async (req, res) => {
   const user = await User.findOne({ email: req.user.email })
      .populate('todos')
      .catch(err => {
         console.log('Error while finding user', err);
         return res.status(500).json({
            message: 'Error occured while finding user'
         });
      });
   if (user) {
      return res.status(200).json({
         message: 'TODO',
         data: {
            todos: user.todos
         }
      });
   }
};

exports.deleteTodo = async (req, res) => {
   const { id } = req.params;
   // find the todo if exist
   // delete that todo from the todo collection
   // delete that todo from the user.todos []
   const todo = await Todo.findById(id).catch(error => {
      console.log('Cannot find todo', error);
      return res.status(500).json({
         message: 'Cannot find todo'
      });
   });
   if (!todo) {
      return res.status(500).json({
         message: 'No todo found'
      });
   } else {
      // find the user
      await User.findByIdAndUpdate(req.user._id, {
         $pull: { todos: id }
      }).catch(err => {
         console.log(err);
         return res.status(500).json({
            message: 'Cannot remove todo from user todos array'
         });
      });
      await todo.remove();
      console.log('Todo has been removed');
      return res.status(200).json({
         message: 'Todo has been removed'
      });
   }
};
