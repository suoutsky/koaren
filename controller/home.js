module.exports = {
  index: async (ctx, next) => {
    await ctx.render("home/index", { title: "iKcamp欢迎您" });
  },
  home: async (ctx, next) => {
    console.log(ctx.request.query);
    console.log(ctx.request.querystring);
    ctx.response.body = "<h1>HOME page</h1>";
  },
  homeParams: async (ctx, next) => {
    console.log(ctx.params);
    ctx.response.body = "<h1>HOME page /:id/:name</h1>";
  },
  cookie: async (ctx, next) => {
    ctx.cookies.set("nemo", "1234", {
      domain: "localhost",
      path: "/index", //cookie写入的路径
      maxAge: 1000 * 60 * 60 * 1,
      expires: new Date("2018-07-06"),
      httpOnly: false,
      overwrite: false
    });
  },
  login: async (ctx, next) => {
    await ctx.render("home/login", {
      btnName: "GoGoGo"
    });
  },
  sign: async (ctx, next) => {
    const { app } = ctx;
    let params = ctx.request.body;
    let name = params.name;
    let password = params.password;
    let res = await app.service.home.sign(name, password);
    ctx.cookies.set("nemo", "1234", {
      domain: "localhost",
      path: "/index", //cookie写入的路径
      maxAge: 360000,
      expires: new Date("2019-07-06"),
      httpOnly: false,
      overwrite: false
    });
    console.log(ctx.session);
    if (res.status == "-1") {
      await ctx.render("home/login", res.data);
    } else {
      ctx.state.title = "个人中心";
      await ctx.render("home/success", res.data);
    }
  },
  register: async (ctx, next) => {
    const { app } = ctx;
    let params = ctx.request.body;
    let { email, passwd, username, authType, authKey } = params;
    let res = await app.service.home.register(
      email,
      passwd,
      username,
      authType,
      authKey
    );
    if (res) {
      ctx.send(res);
    }
    // if (res.status == "-1") {
    //   await ctx.render("home/login", res.data);
    // } else {
    //   ctx.state.title = "个人中心";
    //   await ctx.render("home/success", res.data);
    // }
  }
};
