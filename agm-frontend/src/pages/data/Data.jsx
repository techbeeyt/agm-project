import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import config from "../../config";
import item_list from "../../assets/json/item_list.json";
import { IoClose } from "react-icons/io5";

const Data = () => {
  const [file, setFile] = useState(null);
  const [date, setDate] = useState("");
  const [item, setItem] = useState("");

  const [itemNameSuggestion, setItemNameSuggestion] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const [result, setResult] = useState([]);
  const [selectedToEdit, setSelectedToEdit] = useState(null);
  const [dataToChange, setDataToChange] = useState({});

  const [status, setStatus] = useState("init"); // init || uploading || success || error

  const handleSubmit = async () => {
    try {
      if (!file || !date) {
        return alert("Please enter date and file");
      }
      const form = new FormData();
      form.append("date", date);
      form.append("itemName", item);
      form.append("file", file);

      setStatus("uploading");

      const response = await axios.post(
        config.API_URL + "/admin/upload",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setStatus("success");
      setResult(response.data.rows);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    const _tempCurrent = result[selectedToEdit];
    try {
      const res = await toast.promise(
        axios.delete(
          config.API_URL + `/admin/data/${result[selectedToEdit]._id}`,
          dataToChange,
          { withCredentials: true }
        ),
        {
          pending: "Deleting data...",
          success: "Deleted successfullt 👌",
          error: "Failed to delete 🤯",
        }
      );
      setResult((prev) => {
        let _temp = prev;
        _temp.splice(selectedToEdit, 1);
        return _temp;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const selectToEdit = (index) => {
    setSelectedToEdit(index);
    setDataToChange(result[index]);
    document.getElementById("edit_data_modal").showModal();
  };

  const changesOnChange = (event) => {
    setDataToChange((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const submitChange = async () => {
    const _tempCurrent = result[selectedToEdit];
    try {
      const res = await toast.promise(
        axios.put(
          config.API_URL + `/admin/data/${result[selectedToEdit]._id}`,
          dataToChange,
          { withCredentials: true }
        ),
        {
          pending: "Updating data...",
          success: "Updated successfullt 👌",
          error: "Failed to update 🤯",
        }
      );
      setResult((prev) => {
        let _temp = prev;
        _temp[selectedToEdit] = res.data.data;
        return _temp;
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 w-full flex flex-col justify-start items-center gap-4">
      <dialog id="edit_data_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-2 text-center">Update an Item</h3>
          <div className="flex flex-col gap-1">
            <label>State Name: </label>
            <input
              type="text"
              name="itemName"
              placeholder="State Name"
              className="input input-bordered"
              value={dataToChange?.itemName}
              onChange={changesOnChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>District Name: </label>
            <input
              type="text"
              name="districtName"
              placeholder="District Name"
              className="input input-bordered"
              value={dataToChange?.districtName}
              onChange={changesOnChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Market Name: </label>
            <input
              type="text"
              name="marketName"
              placeholder="Market Name"
              className="input input-bordered"
              value={dataToChange?.marketName}
              onChange={changesOnChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Variety: </label>
            <input
              type="text"
              name="variety"
              placeholder="Variety"
              className="input input-bordered"
              value={dataToChange?.variety}
              onChange={changesOnChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Group: </label>
            <input
              type="text"
              name="group"
              placeholder="Group"
              className="input input-bordered"
              value={dataToChange?.group}
              onChange={changesOnChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Arrivals (Tonnes): </label>
            <input
              type="text"
              name="arrivalsTonnes"
              placeholder="Arrivals (Tonnes)"
              className="input input-bordered"
              value={dataToChange?.arrivalsTonnes}
              onChange={changesOnChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Min Price (Rs./Quintal): </label>
            <input
              type="text"
              name="minPriceRsQuintal"
              placeholder="Min Price (Rs./Quintal)"
              className="input input-bordered"
              value={dataToChange?.minPriceRsQuintal}
              onChange={changesOnChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Max Price (Rs./Quintal): </label>
            <input
              type="text"
              name="maxPriceRsQuintal"
              placeholder="Max Price (Rs./Quintal)"
              className="input input-bordered"
              value={dataToChange?.maxPriceRsQuintal}
              onChange={changesOnChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Modal Price (Rs./Quintal): </label>
            <input
              type="text"
              name="modalPriceRsQuintal"
              placeholder="Modal Price (Rs./Quintal)"
              className="input input-bordered"
              value={dataToChange?.modalPriceRsQuintal}
              onChange={changesOnChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Reported Date: </label>
            <input
              type="text"
              name="reportedDate"
              placeholder="Reported Date"
              className="input input-bordered"
              value={dataToChange?.reportedDate}
              onChange={changesOnChange}
            />
          </div>

          <button
            className="btn btn-primary mt-4 w-full"
            onClick={submitChange}
          >
            Save Changes
          </button>
          <button
            className="btn btn-outline btn-error mt-2 w-full"
            onClick={() => handleDelete(dataToChange._id)}
          >
            Delete
          </button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      {result.length > 0 ? (
        <div className="shadow-xl w-full overflow-auto h-[90vh] relative">
          <div className="flex justify-center items-center pb-6 font-semibold text-green-600">
            Upload successfull
          </div>
          <div className="grid grid-cols-11 w-max">
            <div className="bg-gray-100 p-3 text-center sticky top-0 font-semibold">
              State Name
            </div>
            <div className="bg-gray-100 p-3 text-center sticky top-0 font-semibold">
              District Name
            </div>
            <div className="bg-gray-100 p-3 text-center sticky top-0 font-semibold">
              Market Name
            </div>
            <div className="bg-gray-100 p-3 text-center sticky top-0 font-semibold">
              Variety
            </div>
            <div className="bg-gray-100 p-3 text-center sticky top-0 font-semibold">
              Group
            </div>
            <div className="bg-gray-100 p-3 text-center sticky top-0 font-semibold">
              Arrivals (Tonnes)
            </div>
            <div className="bg-gray-100 p-3 text-center sticky top-0 font-semibold">
              Min Price (Rs./Quintal)
            </div>
            <div className="bg-gray-100 p-3 text-center sticky top-0 font-semibold">
              Max Price (Rs./Quintal)
            </div>
            <div className="bg-gray-100 p-3 text-center sticky top-0 font-semibold">
              Modal Price (Rs./Quintal)
            </div>
            <div className="bg-gray-100 p-3 text-center sticky top-0 font-semibold">
              Reported Date
            </div>
            <div className="bg-gray-100 p-3 text-center sticky top-0 font-semibold">
              Action
            </div>

            {result.map((item, index) => {
              return (
                <React.Fragment key={`row${index}`}>
                  <div
                    className={`${
                      index % 2 === 1 ? "bg-gray-50" : ""
                    } p-3 text-center`}
                  >
                    {item.stateName}
                  </div>
                  <div
                    className={`${
                      index % 2 === 1 ? "bg-gray-50" : ""
                    } p-3 text-center`}
                  >
                    {item.districtName}
                  </div>
                  <div
                    className={`${
                      index % 2 === 1 ? "bg-gray-50" : ""
                    } p-3 text-center`}
                  >
                    {item.marketName}
                  </div>
                  <div
                    className={`${
                      index % 2 === 1 ? "bg-gray-50" : ""
                    } p-3 text-center`}
                  >
                    {item.variety}
                  </div>
                  <div
                    className={`${
                      index % 2 === 1 ? "bg-gray-50" : ""
                    } p-3 text-center`}
                  >
                    {item.group}
                  </div>
                  <div
                    className={`${
                      index % 2 === 1 ? "bg-gray-50" : ""
                    } p-3 text-center`}
                  >
                    {item.arrivalsTonnes}
                  </div>
                  <div
                    className={`${
                      index % 2 === 1 ? "bg-gray-50" : ""
                    } p-3 text-center`}
                  >
                    {item.minPriceRsQuintal}
                  </div>
                  <div
                    className={`${
                      index % 2 === 1 ? "bg-gray-50" : ""
                    } p-3 text-center`}
                  >
                    {item.maxPriceRsQuintal}
                  </div>
                  <div
                    className={`${
                      index % 2 === 1 ? "bg-gray-50" : ""
                    } p-3 text-center`}
                  >
                    {item.modalPriceRsQuintal}
                  </div>
                  <div
                    className={`${
                      index % 2 === 1 ? "bg-gray-50" : ""
                    } p-3 text-center`}
                  >
                    {item.reportedDate}
                  </div>
                  <div
                    className={`${
                      index % 2 === 1 ? "bg-gray-50" : ""
                    } p-3 text-center`}
                  >
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                      onClick={() => {
                        selectToEdit(index);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-start items-start gap-4 shadow-lg px-20 py-6 rounded-md border border-gray-200">
          <h1 className="w-full text-center font-semibold">
            Upload Your Excel File
          </h1>
          <input
            type="date"
            className="input input-bordered input-success w-full accent-green-700"
            onChange={(e) => {
              setDate(e.target.value);
            }}
            value={date}
          />
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Item Name"
              className="input input-bordered input-success w-full"
              onChange={(e) => {
                const filtered = item_list.filter((item) => {
                  const regexp = new RegExp(e.target.value);
                  return item.item_name.match(regexp);
                });
                console.log(filtered);
                if (e.target.value.length > 0) {
                  setItemNameSuggestion(filtered);
                } else {
                  setItemNameSuggestion([]);
                }
                setItem(e.target.value);
              }}
              onFocus={() => setShowSuggestion(true)}
              // onBlur={() => setShowSuggestion(false)}
              value={item}
            />

            {showSuggestion ? (
              <div className="absolute top-[120%] left-0 w-full bg-white shadow-xl max-h-[200px] overflow-auto rounded">
                <div className="px-3 py-1 font-semibold flex justify-between">
                  <span>Suggestions</span>{" "}
                  <button onClick={() => setShowSuggestion(false)}>
                    <IoClose />
                  </button>
                </div>
                <div>
                  {itemNameSuggestion.map((item, index) => {
                    return (
                      <button
                        key={`item${index}`}
                        className="px-3 py-1 w-full text-left hover:bg-gray-50"
                        onClick={() => {
                          setItem(item.item_name);
                          setShowSuggestion(false);
                        }}
                      >
                        {item.item_name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>

          <input
            type="file"
            className="file-input file-input-bordered file-input-success"
            accept=".xlsx"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <button
            className="btn btn-primary w-full"
            onClick={handleSubmit}
            disabled={status === "uploading" || status === "success"}
          >
            {status === "init"
              ? "Upload"
              : status === "uploading"
              ? "Uploading..."
              : status === "success"
              ? "Uploaded"
              : "Upload"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Data;
