const loader = require("./loaders");
const { port } = require("./config");

const startSever = async () => {
  const app = await loader();
  app.listen(port, () => {
    console.log(`
      ################################################
      🛡️  Server listening on port: ${port} 🛡️ 
      ################################################
      `);
  });
};

startSever();
