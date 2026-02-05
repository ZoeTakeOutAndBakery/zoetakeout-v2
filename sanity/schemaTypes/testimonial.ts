import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text" }),
    defineField({ name: "author", title: "Author", type: "string" }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
});
