class Service {
  async wrapWithTryCatch(call, errorStatus) {
    let status = 200;
    let result = {};
    try {
      result = await call();
    } catch (error) {
      status = errorStatus;
      result = error;
    }
    return { status, result };
  }
}

module.exports = Service;
