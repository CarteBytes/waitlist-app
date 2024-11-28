import { FaArrowDown, FaArrowUp, FaPlus } from "react-icons/fa6";

export default function ContentCard({
  el,
  index,
  handleClickCard,
  handleDelete,
  setModPageIndex,
  handleClickAdd,
  isLast,
  switchIndices,
}: {
  el: any;
  handleDelete: (pageIndex: number) => void;
  index: number;
  handleClickCard: Function;
  handleClickAdd: () => void;
  isLast?: boolean;
  setModPageIndex: (page: number | null) => void;
  switchIndices: (idxA: number, idxB: number) => void;
}) {
  const imageUrl = el?.hero_image ?? el?.category?.image_url ?? null;

  return (
    <>
      <div className={`flex h-8 items-center justify-center`}>
        <button
          className="flex items-center justify-center rounded-full bg-[#F6FE9B] p-2"
          onClick={() => {
            handleClickAdd();
            setModPageIndex(index);
          }}>
          <FaPlus className="text-lg text-black" />
        </button>
      </div>
      <div className="relative">
        <div
          className="flex w-full cursor-pointer rounded-lg border-2 border-[#F6FE9B] p-4"
          onClick={() => {
            handleClickCard(el);
          }}>
          {/* Image Section */}
          {imageUrl && (
            <div className="mr-4 flex-shrink-0">
              <img
                alt={"content image"}
                src={imageUrl}
                className="h-24 w-24 rounded-lg object-cover"
              />
            </div>
          )}

          {/* Content Section */}
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">{el.category?.name}</div>
              {!!el.status && (
                <div className="flex items-center gap-2 text-sm">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      el.status === "published" ? "bg-green-400" : "bg-red-600"
                    }`}
                  />
                </div>
              )}
            </div>
            <div className="opacity-70">{el.category?.description}</div>
          </div>

          <div className="flex items-center">
            {/* {index !== 0 && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  switchIndices(index, index - 1);
                }}
                className="mr-2 rounded-full bg-[#F6FE9B] p-2 text-xl text-black">
                <FaArrowUp />
              </button>
            )} */}
            {!isLast && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  switchIndices(index, index + 1);
                }}
                className="ml-2 rounded-full bg-[#F6FE9B] p-2 text-xl text-black">
                <FaArrowDown />
              </button>
            )}
          </div>
        </div>
        <div className="absolute bottom-[-24px] right-2">
          <button
            className="mr-1 mt-[-9px] text-sm text-[#F6FE9B] underline disabled:text-gray-500"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDelete(index);
            }}>
            Remove
          </button>
        </div>
      </div>
      {isLast && (
        <div className={`flex h-8 items-center justify-center`}>
          <button
            className="flex items-center justify-center rounded-full bg-[#F6FE9B] p-2"
            onClick={() => {
              handleClickAdd();
              setModPageIndex(index + 1);
            }}>
            <FaPlus className="text-lg text-black" />
          </button>
        </div>
      )}
    </>
  );
}
