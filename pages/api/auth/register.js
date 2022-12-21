const handler = (req, res) => {
  if (req.method === "POST") {
  } else {
    res.status(404).json({ message: "Route not found." });
  }
};

export default handler;
