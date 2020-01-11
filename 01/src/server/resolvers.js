const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/learn-graphql-01', { useNewUrlParser: true, useUnifiedTopology: true });
const database = mongoose.connection;

database.on('error', console.error.bind(console, '接続エラー'));
database.once('open', () => {
  console.log('接続');
});

const ToDoSchema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    description: String,
    deadline: String,
    isComplete: Boolean
  },
  { collection: 'ToDos' }
);
const ToDo = mongoose.model('ToDo', ToDoSchema);

const dummyToDos = [];
for (let i = 0; i < 10; i++) {
  dummyToDos.push({
    id: i,
    title: 'タイトル' + i,
    description: '説明' + i,
    deadline: '2020-01-01',
    isComplete: false
  });
}

const resolvers = {
  Query: {
    todos: async () => {
      const todos = await ToDo.find();

      return todos;
    }
  }
};

module.exports = resolvers;
