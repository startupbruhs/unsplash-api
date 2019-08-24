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
    });

    return { status, result };
  }

  isValidUpdate(updates) {
    const allowedUpdates = ["name", "email", "password"];
    const isValidOperation = updates.every(update =>
      allowedUpdates.includes(update)
    );
    return isValidOperation;
  }
}

module.exports = new User();
