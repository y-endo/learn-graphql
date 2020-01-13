const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/learn-graphql', { useNewUrlParser: true, useUnifiedTopology: true });
const database = mongoose.connection;

database.on('error', console.error.bind(console, '接続エラー'));
database.once('open', () => {
  console.log('接続');
});

const UserSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    age: Number
  },
  { collection: 'users' }
);
const UserModel = mongoose.model('User', UserSchema);

const resolvers = {
  Query: {
    users: async () => {
      const users = await UserModel.find();

      return users;
    }
  },
  Mutation: {
    addUser: async (_, args, context) => {
      const user = new UserModel({ ...args });
      await user.save();
      context.pubsub.publish('userAdded', {
        userAdded: {
          id: user.id,
          name: user.name,
          age: user.age
        }
      });
      return user;
    }
  },
  Subscription: {
    userAdded: {
      subscribe: (_, __, context) => context.pubsub.asyncIterator('userAdded')
    }
  }
};

module.exports = resolvers;
