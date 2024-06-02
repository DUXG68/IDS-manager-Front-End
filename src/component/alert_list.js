import React, { useState } from 'react';

const AlertList = ({ alerts, totalPages, searchTerms, setSearchTerms, currentPage, setCurrentPage }) => {


    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        console.log({ name, value })
        setSearchTerms(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const alertsPerPage = totalPages;
    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePrevious = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, alertsPerPage));
    };

    const handleFirst = () => {
        setCurrentPage(1);
    };

    const handleLast = () => {
        setCurrentPage(alertsPerPage);
    };

    return (
        <div className="overflow-y-hidden h-full w-full ">
            <div className="">
                <table className=" bg-white rounded-md shadow-md">
                    <thead className=''>
                        <tr className="bg-gray-200 text-gray-800">
                            <th className="px-2 py-2 text-sm">Timestamp</th>
                            <th className="px-2 py-2 text-sm">Hostname sensor</th>
                            <th className="px-2 py-2 text-sm">Incident Time</th>
                            <th className="px-2 py-2 text-sm">Sig Generator</th>
                            <th className="px-2 py-2 text-sm">Sig ID</th>
                            <th className="px-2 py-2 text-sm">Sig Rev</th>
                            <th className="px-2 py-2 text-sm">Message</th>
                            <th className="px-2 py-2 text-sm">Protocol</th>
                            <th className="px-2 py-2 text-sm">Source</th>
                            <th className="px-2 py-2 text-sm">Src Port</th>
                            <th className="px-2 py-2 text-sm">Destination</th>
                            <th className="px-2 py-2 text-sm">Des Port</th>
                        </tr>
                        <tr className="bg-gray-200 text-gray-800">
                            <th className="px-2 py-2" >
                                <input
                                    type="text"
                                    value={searchTerms.local_time}
                                    name="local_time"
                                    onChange={handleChange}
                                    placeholder={`Timestamp`}
                                    className="w-full px-1 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </th>
                            <th className="px-2 py-2 text-sm" >
                                <input
                                    type="text"
                                    value={searchTerms.rsyslog_hostname}
                                    name="rsyslog_hostname"
                                    onChange={handleChange}
                                    placeholder={`Hostname`}
                                    className="w-full px-1 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </th>
                            <th className="px-2 py-2 text-sm" >
                                <input
                                    type="text"
                                    value={searchTerms.time_incident}
                                    name="time_incident"
                                    onChange={handleChange}
                                    placeholder={`Incident Time`}
                                    className="w-full px-1 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </th>
                            <th className="px-2 py-2 text-sm" >
                                <input
                                    type="text"
                                    value={searchTerms.sig_generator}
                                    name="sig_generator"
                                    onChange={handleChange}
                                    placeholder={`Sig Generator`}
                                    className="w-full px-1 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </th>
                            <th className="px-2 py-2 text-sm">
                                <input
                                    type="text"
                                    value={searchTerms.sig_id}
                                    name="sig_id"
                                    onChange={handleChange}
                                    placeholder={`Sig ID`}
                                    className="w-full px-1 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </th>
                            <th className="px-2 py-2 text-sm">
                                <input
                                    type="text"
                                    value={searchTerms.sig_rev}
                                    name="sig_rev"
                                    onChange={handleChange}
                                    placeholder={`Sig Rev`}
                                    className="w-full px-1 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </th>
                            <th className="px-2 py-2 text-sm">
                                <input
                                    type="text"
                                    value={searchTerms.msg}
                                    name="msg"
                                    onChange={handleChange}
                                    placeholder={`Message`}
                                    className="w-full px-1 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </th>
                            <th className="px-2 py-2 text-sm">
                                <input
                                    type="text"
                                    value={searchTerms.proto}
                                    name="proto"
                                    onChange={handleChange}
                                    placeholder={`Protocol`}
                                    className="w-full px-1 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </th>
                            <th className="px-2 py-2 text-sm">
                                <input
                                    type="text"
                                    value={searchTerms.ip_src}
                                    name="ip_src"
                                    onChange={handleChange}
                                    placeholder={`Src IP`}
                                    className="w-full px-1 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </th>
                            <th className="px-2 py-2 text-sm">
                                <input
                                    type="text"
                                    value={searchTerms.srcport}
                                    name="srcport"
                                    onChange={handleChange}
                                    placeholder={`Src Port`}
                                    className="w-full px-1 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </th>
                            <th className="px-2 py-2 text-sm">
                                <input
                                    type="text"
                                    value={searchTerms.ip_dst}
                                    name="ip_dst"
                                    onChange={handleChange}
                                    placeholder={`Des IP`}
                                    className="w-full px-1 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </th>
                            <th className="px-2 py-2 text-sm">
                                <input
                                    type="text"
                                    value={searchTerms.dstport}
                                    name="dstport"
                                    onChange={handleChange}
                                    placeholder={`Des Port`}
                                    className="w-full px-1 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {alerts.map((alert, index) => (
                            <tr key={index} className="hover:bg-gray-100 border-t border-gray-300">
                                <td className="px-2 py-2 text-sm">{alert.local_time || ""}</td>
                                <td className="px-2 py-2 text-sm">{alert.rsyslog_hostname || ""}</td>
                                <td className="px-2 py-2 text-sm">{alert.time_incident || ""}</td>
                                <td className="px-2 py-2 text-sm">{alert.sig_generator || ""}</td>
                                <td className="px-2 py-2 text-sm">{alert.sig_id || ""}</td>
                                <td className="px-2 py-2 text-sm">{alert.sig_rev || ""}</td>
                                <td className="px-2 py-2 text-sm">{alert.msg || ""}</td>
                                <td className="px-2 py-2 text-sm">{alert.proto || ""}</td>
                                <td className="px-2 py-2 text-sm">{alert.ip_src || ""}</td>
                                <td className="px-2 py-2 text-sm">{alert.srcport || ""}</td>
                                <td className="px-2 py-2 text-sm">{alert.ip_dst || ""}</td>
                                <td className="px-2 py-2 text-sm">{alert.dstport || ""}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-center mt-4">
                    <button
                        className="px-2 py-2 mx-1 border rounded bg-gray-200"
                        onClick={handleFirst}
                        disabled={currentPage === 1}
                    >
                        First
                    </button>
                    <button
                        className="px-2 py-2 mx-1 border rounded bg-gray-200"
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                    >
                        &lt;
                    </button>
                    <span className="px-2 py-2 mx-1">
                        {currentPage} of {alertsPerPage}
                    </span>
                    <button
                        className="px-2 py-2 mx-1 border rounded bg-gray-200"
                        onClick={handleNext}
                        disabled={currentPage === alertsPerPage}
                    >
                        &gt;
                    </button>
                    <button
                        className="px-2 py-2 mx-1 border rounded bg-gray-200"
                        onClick={handleLast}
                        disabled={currentPage === alertsPerPage}
                    >
                        Last
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AlertList;
