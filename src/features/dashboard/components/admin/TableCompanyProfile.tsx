import type { TableCompanyProfilePageProps } from "../../../../shared/types/type";

const TableCompanyProfile = ({
  label,
  value,
  icon,
  // image,
}: TableCompanyProfilePageProps) => {
  return (
    <>
      <div className="border-b border-gray-300 text-sm p-5 justify-between flex">
        <div className="flex">
          <span className="font-semibold w-70">{label}</span>
          {value ? (
            <span className={`${!icon ? "text-gray-500" : ""} text-wrap`}>
              {value}
            </span>
          ) : (
            <>
              <label
                htmlFor="photo-profile"
                className="py-2 px-8 rounded-xl text-gray-500 cursor-pointer border border-dashed w-fit border-gray-300">
                upload file
              </label>
              <input
                className="hidden"
                type="file"
                name="photo-profile"
                id="photo-profile"
              />
            </>
          )}
        </div>
        <button className="cursor-pointer">{icon}</button>
      </div>
    </>
  );
};

export default TableCompanyProfile;
