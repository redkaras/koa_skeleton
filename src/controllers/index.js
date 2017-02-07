exports.index = function* () {
  let commit = "";
  if (this.isAuthenticated()) {
    commit = this.passport.user;
  } else {
    commit = {};
  }
  this.body = yield this.render("basic", {
    version: "stats.appVersion",
    commit: JSON.stringify(commit),
    STYLE_URL: "STYLE_URL",
    SCRIPT_URL: "SCRIPT_URL_APP",
  });
};

exports.template = function *() {
  this.body = yield this.render("basic", {
    version: "stats.appVersion",
    commit: "stats.appCommit" + new Date(),
    STYLE_URL: "STYLE_URL",
    SCRIPT_URL: "SCRIPT_URL_APP",
  });
};
