import User from "./model.js";

export async function getUsers() {
  return User.find({}).lean();
}

export async function addUser(data) {
  const doc = new User({
    name: data.name,
    phone: data.phone,
    address: data.address,
    gender: data.gender,
    age: data.age,
    username: data.username,
    password: data.password,
  });

  await doc.save();
  return doc.toObject();
}