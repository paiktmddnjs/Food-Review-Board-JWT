export const ROUTES = {
  // Public Routes
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",

  // Board Routes (Nested under HOME)
  BOARD: "board", // Access: /board
  TOP_POSTS: "top", // Access: /top

  // Dynamic Routes
  BOARD_DETAIL: (id = ":id") => `board/${id}`, // Access: /board/:id
  EDIT: (id = ":id") => `edit/${id}`, // Access: /edit/:id

  // Write Routes (Nested under HOME)
  WRITE: "write", // Access: /write
  WRITE_EDIT: (id = ":id") => `write/${id}`, // Access: /write/:id
};