import { mockData } from "../DummyData/mockData";
import React, { useState, useRef, useEffect } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import { Resources } from "../Resources";
import Pagination from "react-js-pagination";
import '../style.css'
import { useNavigate } from "react-router-dom";

const TableComponent = ({onRowClick}) =>{
  const itemsPerPage = 10;
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const navigate = useNavigate();

    const filteredData = mockData.filter((row) => {
      const matchesFilter =
        filterValue === "all" || row.profession.toLowerCase() === filterValue;
      const matchesSearch = row.first_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  
   


  
  const getDataForPage = () => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };
  

  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Users table",
    sheet: "Users",
  });

  // Event handler for page change
 
  return (
    <div className="">
      <div className="text-6xl font-extrabold  text-black font-mulish">
        Admin
      </div>

      <div className="mx-32 border-2 border-black  h-screen  bg-gradient-to-r from-amber-800 via-amber-1000  to-amber-1500 rounded-lg">
        <div className=" mx-5 my-4 flex flex-row justify-between">
          <input
            className="relative m-0 bg-white rounded border border-solid  bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="search name"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="flex flex-row">
            <button onClick={onDownload} className="mr-10">
              <img src={Resources.images.download}></img>
            </button>
            <select
              className="w-15 rounded"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            >
              <option value="all">All</option>
              <option value="developer">Developer</option>
              <option value="devops">Devops</option>
              <option value="designer">Designer</option>
              {/* Add more filter options based on your data */}
            </select>

            {/* <button onClick={handleExportCSV}>Export to CSV</button>
        <button onClick={handleExportExcel}>Export to Excel</button> */}
          </div>
        </div>

        <div class="flex flex-col ">
          <div class="overflow-x-auto ">
            <div class="inline-block min-w-full  ">
              <div class="overflow-hidden ">
                <table
                  class="min-w-full text-left text-sm font-light "
                  ref={tableRef}
                >
                  <thead class="border-b font-medium dark:border-neutral-500  ">
                    <tr>
                      <th scope="col" class="px-6 py-4">
                        S.No
                      </th>
                      <th scope="col" class="px-6 py-4">
                        Name
                      </th>
                      <th scope="col" class="px-6 py-4">
                        Email
                      </th>
                      <th scope="col" class="px-6 py-4">
                        Phone
                      </th>
                      <th scope="col" class="px-6 py-4">
                        Level
                      </th>
                      <th scope="col" class="px-6 py-4">
                        Profession
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getDataForPage()
                      .map((data
                        ) => (
                        <tr
                          key={data.id}
                          class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 bg-white"
                         onClick={()=>{onRowClick(data.id);navigate("/resume/" + `${data.id}`)
                          ;

                        }}
                        >
                          <td class="whitespace-nowrap px-6 py-4 font-medium"
                         >
                            {data.id}
                            
                          </td>
                          <td class="whitespace-nowrap px-6 py-4">
                            {data.first_name}
                          </td>
                          <td class="whitespace-nowrap px-6 py-4">
                            {data.email}
                          </td>
                          <td class="whitespace-nowrap px-6 py-4">
                            {data.phone_number}
                          </td>
                          <td class="whitespace-nowrap px-6 py-4">
                            {data.level}
                          </td>
                          <td class="whitespace-nowrap px-6 py-4">
                            {data.profession}
                          </td>
                          
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className="pagination-container">
                  <Pagination
                   
                   size = "lg"
                    activePage={activePage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={filteredData.length}
                    pageRangeDisplayed={2}
                    onChange={handlePageChange}
                    itemClass="pagination-item"
          linkClass="pagination-link"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}

export default TableComponent;
