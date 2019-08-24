class Service {
  async wrapWithTryCatch(call) {
    let status = 200;
    let result = {};
    try {
      result = await call();
    } catch (error) {
      status = 400;
      result = error;
    }
    return { status, result };
  }

  async wrapWithServerErrorTryCatch(call) {
    let status = 200;
    let result = {};
    try {
      result = await call();
    } catch (error) {
      status = 500;
      result = error;
    }
    return { status, result };
  }
}

module.exports = Service;
