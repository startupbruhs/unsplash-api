const router = new require("express").Router();

router.get("/test", async (_, res) => {
  res.send({
    success: 1,
    data: [
      { title: "title", desc: "desc...", created: "3 minutes ago" },
      {
        title: "Longer title",
        desc: "Longer desc...",
        created: "5 minutes ago"
      },
      {
        title: "Longer titleeeee",
        desc: "Longer deeeeeeesc...",
        created: "10 minutes ago"
      }
    ]
  });
});

module.exports = router;
