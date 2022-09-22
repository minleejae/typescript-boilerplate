import { DataSource } from "typeorm";

//각자 db 만들고 개인 테스트해야함
const myDataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "dlalswo8",
  database: "haru",
  entities: ["src/entity/*.js"],
  logging: true,
  synchronize: true,
});

export default myDataSource;
