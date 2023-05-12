import { capitalize } from "~/utils/string";
import { db } from "~/utils/firebase";
import { collection } from "firebase/firestore";

describe("Common Utils", () => {
  test("change first char", () => {
    expect(capitalize("hi name")).toBe("Hi name");
  });

  test("users collection count", async () => {
    const collectionRef = collection(db, "users");
    expect(collectionRef.type).toEqual("collection");
  });
});
