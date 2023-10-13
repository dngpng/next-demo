// fake db
import { faker } from "@faker-js/faker";

export type Foo = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  product: string;
  company: string;
  price: string;
};

const fooData: Foo[] = [];

function initFoo() {
  for (let i = 0; i < 20; i++) {
    fooData.push({
      id: faker.string.uuid(),
      product: faker.commerce.productName(),
      company: faker.company.name(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      createdBy: faker.person.firstName(),
      price: faker.commerce.price(),
    });
  }
}

export async function getFooList() {
  if (fooData.length === 0) {
    initFoo();
  }
  return await Promise.resolve(fooData);
}

export async function updateFoo(foo: Foo) {
  const index = fooData.findIndex((f) => f.id === foo.id);
  if (index === -1) {
    return Promise.reject(new Error("foo not found"));
  }
  fooData[index] = foo;
  return await Promise.resolve(foo);
}

export async function createFoo(foo: Foo) {
  fooData.push(foo);
  return await Promise.resolve(foo);
}

export async function deleteFoo(id: string) {
  const index = fooData.findIndex((f) => f.id === id);
  if (index === -1) {
    return Promise.reject(new Error("foo not found"));
  }
  fooData.splice(index, 1);
  return await Promise.resolve();
}
