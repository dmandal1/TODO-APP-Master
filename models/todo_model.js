const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema(
    {
        todo: {
            type: String,
            required: true,
            trim: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model('Todo', todoSchema);
