import { ItemCategoryT } from "../../types/category";
import { ItemT } from "../../types/item";
import { hasCategory } from "../../types/typeguards";

export default function ItemCard({
  item,
  handleClickCard,
}: {
  item: ItemCategoryT | ItemT;
  handleClickCard: (i: ItemCategoryT | ItemT) => void;
}) {
  return (
    <div
      className="flex w-full cursor-pointer rounded-lg border-2 border-[#F6FE9B] p-4"
      onClick={() => {
        handleClickCard(item);
      }}>
      {/* Image Section */}
      {item.image_url && (
        <div className="mr-4 flex-shrink-0">
          <img
            alt={`${item.name} image`}
            src={item.image_url}
            className="h-24 w-24 rounded-lg object-cover"
          />
        </div>
      )}

      {/* Content Section */}
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold">{item.name}</div>
          {!!(item as ItemT).status && (
            <div className="flex items-center gap-2 text-sm">
              <div
                className={`h-3 w-3 rounded-full ${
                  (item as ItemT).status === "published"
                    ? "bg-green-400"
                    : "bg-red-600"
                }`}
              />
            </div>
          )}
        </div>
        <div className="opacity-70">
          {hasCategory(item) ? item?.category?.name : item?.description}
        </div>
      </div>
      {/* <div className="mt-1 flex justify-end">
                    <button
                      className="flex items-center gap-2 rounded-lg text-sm text-[#F6FE9B] underline disabled:text-gray-500"
                      onClick={(e) => handleRemoval(e, item)}>
                      {type === "menu" ? "Remove" : "Delete"}
                      {type === "menu" ? <FaCircleMinus /> : <FaTrash />}
                    </button>
                  </div> */}
    </div>
  );
}
