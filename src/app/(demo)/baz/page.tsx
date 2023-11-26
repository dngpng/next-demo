import { revalidatePath } from "next/cache";
import ListSorter from "./list-sorter";

// fake data with uuid as id and name and rank
const items = [
  {
    id: "foo",
    name: "foo",
    rank: 3,
  },
  {
    id: "bar",
    name: "bar",
    rank: 1,
  },
  {
    id: "baz",
    name: "baz",
    rank: 2,
  },
];

// fake async data fetch with 1s delay
const fetchData = async () => {
  return await new Promise<{ id: string; name: string; rank: number }[]>(
    (resolve) => setTimeout(() => resolve(items), 1000)
  );
};

export default async function BazPage() {
  const data = await fetchData();

  // server action to (fake) update the order
  const updateOrder = async (newOrder: string[]) => {
    "use server";
    items.forEach((item) => {
      item.rank = newOrder.indexOf(item.id) + 1;
    });
    revalidatePath("/baz");
  };

  return (
    <ListSorter updater={updateOrder}>
      {data
        .sort((a, b) => a.rank - b.rank)
        .map(({ id, name, rank }) => (
          <div key={id}>
            {name}{" "}
            <span className="text-sm ml-2 capitalize">
              (Saved Rank: {rank})
            </span>
          </div>
        ))}
    </ListSorter>
  );
}
