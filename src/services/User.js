const userModel = require("../models/user");
const Service = require("./Service");

class User extends Service {
  constructor() {
    super();
    this.model = userModel;
  }

  async create(data) {
    const { status, result } = await this.wrapWithTryCatch(async () => {
      const user = new this.model(data);
      await user.save();
      const token = await user.generateAuthToken();
      return { user, token };
    }, 400);

    return { status, result };
  }

  async login({ email, password }) {
    const { status, result } = await this.wrapWithTryCatch(async () => {
      const user = await User.findByCredentials(email, password);
      const token = await user.generateAuthToken();
      return { user, token };
    }, 400);

    return { status, result };
  }

  async updateUser(request) {
    const updates = Object.keys(request.body);

    if (!this.isValidUpdate(updates)) {
      return { status: 400, result: "Invalid updates" };
    }

    const { status, result } = await this.wrapWithTryCatch(async () => {
      const user = request.user;
      updates.forEach(update => (user[update] = request.body[update]));
      await user.save();
      return { user };
    }, 500);

    return { status, result };
  }

  isValidUpdate(updates) {
    const allowedUpdates = ["name", "email", "password"];
    const isValidOperation = updates.every(update =>
      allowedUpdates.includes(update)
    );
    return isValidOperation;
  }

  async logout(request) {
    const { status, result } = await this.wrapWithTryCatch(async () => {
      request.user.tokens = request.user.tokens.filter(
        token => token.token !== request.token
      );
      await request.user.save();
      return {};
    }, 500);
    return { status, result };
  }

  async logoutEverywhere(request) {
    const { status, result } = await this.wrapWithTryCatch(async () => {
      request.user.tokens = [];
      await request.user.save();
      return {};
    }, 500);
    return { status, result };
  }

  async deleteUser(user) {
    const { status, result } = await this.wrapWithTryCatch(async () => {
      await user.remove();
      return { user };
    }, 500);
    return { status, result };
  }
}

module.exports = new User();
