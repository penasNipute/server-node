// src/utils/generate-slug.ts
function slugify(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").toLowerCase();
}

export {
  slugify
};
