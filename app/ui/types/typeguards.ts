import { ItemCategoryT } from "./category";
import { ItemT } from "./item";

export function hasCategory(item: ItemT | ItemCategoryT): item is ItemT {
  return "category" in item && item.category !== undefined;
}
