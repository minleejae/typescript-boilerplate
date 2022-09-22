import express, { Request, Response, NextFunction } from "express";
import myDataSource from "./app-data-source";
import { User } from "./entity/user";

// establish database connection
myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const app = express();
app.use(express.json());

app.get("/welcome", (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome!!@");
});

app.get("/users/:id", async function (req: Request, res: Response) {
  console.log("params:", req.params.id);
  const results = await myDataSource.getRepository(User).findOneBy({
    id: Number(req.params.id),
  });
  console.log("GET user", results);
  return res.send(results);
});

// register routes
app.get("/users", async function (req: Request, res: Response) {
  const users = await myDataSource.getRepository(User).find();
  res.json(users);
});

app.post("/users", async function (req: Request, res: Response) {
  console.log(req.body);
  const user = await myDataSource.getRepository(User).create(req.body);
  const results = await myDataSource.getRepository(User).save(user);
  return res.send(results);
});

app.put("/users/:id", async function (req: Request, res: Response) {
  const user = await myDataSource.getRepository(User).findOneBy({
    id: Number(req.params.id),
  });
  if (user === null) return;
  myDataSource.getRepository(User).merge(user, req.body);
  const results = await myDataSource.getRepository(User).save(user);
  return res.send(results);
});

app.delete("/users/:id", async function (req: Request, res: Response) {
  const results = await myDataSource.getRepository(User).delete(req.params.id);
  return res.send(results);
});

app.listen("1234", () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: 1234🛡️
  ################################################
`);
});
