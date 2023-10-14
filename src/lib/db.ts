// fake db
import { faker } from "@faker-js/faker";

export type Foo = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  product: string;
  company: string;
  price: number;
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
      price: faker.number.float({ min: 100, max: 1000, precision: 0.01 }),
    });
  }
}

export async function getFooList({
  search = "",
  pageIndex = 0,
  pageSize = 10,
  sort = { id: "createdAt", desc: true },
}: {
  search?: string;
  pageIndex?: number;
  pageSize?: number;
  sort?: { id: string; desc: boolean };
}) {
  if (fooData.length === 0) {
    initFoo();
  }

  const filteredData = search
    ? fooData.filter(
        (f) =>
          f.product.toLowerCase().includes(search.toLowerCase()) ||
          f.company.toLowerCase().includes(search.toLowerCase())
      )
    : fooData;

  const sortedData = sort
    ? filteredData.sort((a, b) => {
        const f = sort.id as keyof Foo;
        if (!sort.desc) {
          return a[f] > b[f] ? 1 : -1;
        } else {
          return a[f] < b[f] ? 1 : -1;
        }
      })
    : filteredData;

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const pagedData = sortedData.slice(
    pageIndex * pageSize,
    (pageIndex + 1) * pageSize
  );

  return await new Promise<{ data: Foo[]; totalPages: number }>((resolve) =>
    setTimeout(() => resolve({ data: pagedData, totalPages }), 300)
  );
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
