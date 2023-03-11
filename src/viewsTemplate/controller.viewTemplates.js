export const signUp = (req, res) => {
  res.render("signup.handlebars");
};

export const login = (req, res) => {
  res.render("login.handlebars");
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout Error" });
    }
  });

  res.render("logout.handlebars");
};

export const forgotPassword = (req, res) => {
  res.render("forgotPassword.handlebars");
};
export const profile = (req, res) => {
  const { user } = req.session;
  res.render("profile.handlebars", { user });
};
