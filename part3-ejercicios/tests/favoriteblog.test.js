const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

describe('favoriteBlog', () => {
  test('returns the blog with the most likes', () => {
    const blogs = [
      { title: 'Blog 1', author: 'Author 1', likes: 5 },
      { title: 'Blog 2', author: 'Author 2', likes: 10 },
      { title: 'Blog 3', author: 'Author 3', likes: 3 }
    ];

    const result = listHelper.favoriteBlog(blogs);
    const expected = { title: 'Blog 2', author: 'Author 2', likes: 10 };

    assert.deepStrictEqual(result, expected); 
  });
});
1