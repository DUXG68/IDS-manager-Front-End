import React from 'react';

const SearchForm = ({ searchTerm, handleSearchChange, handleSearchSubmit }) => {
    return (
        // <div className="sticky top-0 bg-white p-4 mb-4">
        //     <h1 className="text-3xl font-bold m-4">Alert Management</h1>
        //     <input
        //         type="text"
        //         value={searchTerm}
        //         onChange={handleSearchChange}
        //         placeholder="Search by timestamp, message, source, etc..."
        //         className="w-full px-4 py-2 border border-gray-300 rounded-md mr-2"
        //     />
        //     <button
        //         type="button"
        //         onClick={handleSearchSubmit}
        //         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        //     >
        //         Search
        //     </button>
        // </div>
        <>
            <h1 className="text-3xl font-bold m-4">Alert Management</h1>
            <div className="flex items-center mb-4">

                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search by timestamp, message, source, etc..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md mr-2"
                />
                <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Search
                </button>
            </div>
        </>

    );
};

export default SearchForm;
