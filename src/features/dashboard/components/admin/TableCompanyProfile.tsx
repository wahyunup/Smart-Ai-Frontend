import type { TableCompanyProfilePageProps } from "../../../../shared/types/type";

const TableCompanyProfile = ({
  label,
  value,
  icon,
  name,
  onchange,
  editPreviewImage,
  previewImage,
}: TableCompanyProfilePageProps) => {
  return (
    <>
      <div className="border-b border-gray-300 text-sm p-5 justify-between flex">
        <div className="flex items-center">
          <span className="font-semibold w-70">{label}</span>

      {name === "imageProfile" ? (
            <>
              <label
                htmlFor="imageProfile"
                className="py-2 px-8 rounded-xl text-gray-500 cursor-pointer border border-dashed w-fit border-gray-300 flex"
              >
                {editPreviewImage ? (
                  <img src={editPreviewImage} className="h-16" />
                ) : previewImage ? (
                  <img
                    src={`https://145.79.15.190${previewImage}`}
                    className="h-16"
                  />
                ) : (
                  "upload file"
                )}
              </label>

              <input
                onChange={onchange}
                className="hidden"
                type="file"
                name={name}
                id="imageProfile"
              />
            </>
          ) : (
            /* --- Normal text field --- */
            <span className={`${!icon ? "text-gray-500" : ""} text-wrap`}>
              {value}
            </span>
          )}
        </div>
        <div className="cursor-pointer">{icon}</div>
      </div>
    </>
  );
};

export default TableCompanyProfile;
