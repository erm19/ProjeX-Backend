import expressAsyncHandler from "express-async-handler";

export const signupHandler = expressAsyncHandler(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  const companyName = req.body.companyName;
  const companyId = req.body.companyId;
  const companyRole = req.body.companyRole;
  const officeName = req.body.officeName;
  const licenceNum = req.body.licenceNum;

  res.send(true);
});

export const loginHandler = expressAsyncHandler(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  res.send("abc");
});

export const logoutHandler = expressAsyncHandler(async (req, res) => {
  res.send(true);
});
