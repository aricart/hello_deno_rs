import { Hello } from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.171.0/testing/asserts.ts";

Deno.test("add test", () => {
  const h = new Hello();
  // call a fn in rust
  h.hello();
  // get a string from rust
  assertEquals(h.helloPtr(), "hello world");
  h.close();
});
