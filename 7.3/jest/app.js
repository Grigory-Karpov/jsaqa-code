const { sortByName } = require('./app');

test('должен сортировать массив по алфавиту', () => {
  const input = ['иван', 'мария', 'алексей'];
  const expected = ['алексей', 'иван', 'мария'];
  expect(sortByName(input)).toEqual(expected);
});

test('должен возвращать 0, если имена одинаковые', () => {
   const input = ['иван', 'Иван']; 
  const expected = ['иван', 'Иван'];
  expect(sortByName(input)).toEqual(expected);
});