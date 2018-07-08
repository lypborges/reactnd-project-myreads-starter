import * as BooksHelper from "./BooksHelper";

describe("BooksHelper", () => {
  const booksSearched = [
    {
      id: 1
    },
    {
      id: 2
    }
  ];

  test("return booksSearched with updated shelf", () => {
    const books = [
      {
        id: 1,
        shelf: "read"
      }
    ];
    const [book1, book2] = BooksHelper.setShelf(booksSearched, books);
    expect(book1.shelf).toBe("read");
    expect(book2.shelf).toBe("none");
  });

  test("return an empty array if books is empty", () => {
    const books = [];
    const result = BooksHelper.setShelf([], books);
    expect(result).toEqual([]);
  });
});
