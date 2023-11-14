import Service from "./service.js";

const data = {
  username: `lucas-sa-${Date.now()}`,
  password: "my-secret-password",
};

const service = new Service({ filename: "./user.ndjson" });

await service.create(data);

const users = await service.read();

console.log("users", users);
