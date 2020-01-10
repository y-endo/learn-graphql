const dummyToDos = [];
for (let i = 0; i < 10; i++) {
  dummyToDos.push({
    id: i,
    title: "タイトル" + i,
    description: "説明" + i,
    deadline: "2020-01-01",
    isComplete: false
  });
}

const resolvers = {
  Query: {
    todos: () => dummyToDos
  }
};

module.exports = resolvers;
