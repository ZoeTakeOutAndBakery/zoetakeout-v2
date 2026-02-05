import { defineField, defineType } from "sanity";

export default defineType({
  name: "hours",
  title: "Hours",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "open", title: "Open", type: "string" }),
    defineField({ name: "close", title: "Close", type: "string" }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
});
