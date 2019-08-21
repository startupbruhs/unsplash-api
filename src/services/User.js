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
    });

    return { status, result };
  }

  async login({ email, password }) {
    const { status, result } = await this.wrapWithTryCatch(async () => {
      const user = await User.findByCredentials(email, password);
      const token = await user.generateAuthToken();
      return { user, token };
    });

    return { status, result };
  }
}

module.exports = new User();
