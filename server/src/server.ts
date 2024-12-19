import app from "./app";

// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
