const userModel = require("../models/user");
const Service = require("./Service");
const HTTPStatus = require("http-status");

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
    }, HTTPStatus.INTERNAL_SERVER_ERROR);

    return { status, result };
  }

  async login({ email, password }) {
    const { status, result } = await this.wrapWithTryCatch(async () => {
      const user = await this.model.findByCredentials(email, password);
      console.log(user);
      const token = await user.generateAuthToken();
      return { user, token };
    }, HTTPStatus.UNPROCESSABLE_ENTITY);

    return { status, result };
  }

  async updateUser(request) {
    const updates = Object.keys(request.body);

    const { status, result } = await this.wrapWithTryCatch(async () => {
      const user = request.user;
      updates.forEach(update => (user[update] = request.body[update]));
      await user.save();
      return { user };
    }, HTTPStatus.INTERNAL_SERVER_ERROR);

    return { status, result };
  }

  async logout(request) {
    const { status, result } = await this.wrapWithTryCatch(async () => {
      request.user.tokens = request.user.tokens.filter(
        token => token.token !== request.token
      );
      await request.user.save();
      return {};
    }, HTTPStatus.INTERNAL_SERVER_ERROR);
    return { status, result };
  }

  async logoutEverywhere(request) {
    const { status, result } = await this.wrapWithTryCatch(async () => {
      request.user.tokens = [];
      await request.user.save();
      return {};
    }, HTTPStatus.INTERNAL_SERVER_ERROR);
    return { status, result };
  }

  async deleteUser(user) {
    const { status, result } = await this.wrapWithTryCatch(async () => {
      await user.remove();
      return { user };
    }, HTTPStatus.INTERNAL_SERVER_ERROR);
    return { status, result };
  }
}

module.exports = new User();
