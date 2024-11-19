import expressAsyncHandler from "express-async-handler";

export const signupHandler = expressAsyncHandler(async (req, res) => {
  // res.send("abc");
});

export const loginHandler = expressAsyncHandler(async (req, res) => {
  res.send("abc");
});
