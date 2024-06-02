import React, { useEffect, useState } from "react";
import AlertList from "../component/alert_list";
import AlertServices from "../services/alertService";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";

function Alert() {
    const navigation = useNavigate();
    const [events, setEvents] = useState({
        total: 0,
        totalPages: 1,
        hits: []
    });
    const [search, setSearch] = useState(1);
    const notifyErrorVar = (error) => toast.error(`ERROR: ${error} `);
    const [currentPage, setCurrentPage] = useState(1);

    const [searchTerms, setSearchTerms] = useState({
        rsyslog_hostname: '',
        time_incident: '',
        sig_generator: '',
        sig_id: '',
        sig_rev: '',
        msg: '',
        proto: '',
        ip_src: '',
        srcport: '',
        ip_dst: '',
        dstport: '',
        local_time: ''
    });
    var intervalId
    useEffect(() => {
        const fetchData = async () => {
            try {
                let responseAlert = []
                responseAlert = await AlertServices.getAlerts(searchTerms, currentPage)
                if (responseAlert.data.result.total > 0) {
                    navigation(`/alert/${currentPage}`);
                    setEvents(
                        {
                            total: responseAlert.data.result.total,
                            totalPages: responseAlert.data.result.totalPages,
                            hits: responseAlert.data.result.hits
                        })
                } else {
                    navigation(`/alert/1`);
                    let responseAlertf = []
                    responseAlertf = await AlertServices.getAlerts(searchTerms, 1)
                    setEvents(
                        {
                            total: responseAlertf.data.result.total,
                            totalPages: responseAlertf.data.result.totalPages,
                            hits: responseAlertf.data.result.hits
                        })
                }
            } catch (error) {
                notifyErrorVar(`Lỗi khi gọi API :${error}`)
            }
            console.log("interval")
        };
        fetchData();
        if (intervalId) {
            clearInterval(intervalId)
            intervalId = setInterval(fetchData, 5000)
        } else {
            intervalId = setInterval(fetchData, 5000)
        }


        return () => clearInterval(intervalId); // Cleanup interval on component unmount


        // intervalId = setInterval(fetchData, 5000); // Fetch every 5 seconds
    }, [search, currentPage])

    const handleSearch = () => {
        setCurrentPage(1)
        setSearch(pre => pre + 1)
    }

    return (
        <>
            <ToastContainer position="top-center" />
            <div className="flex items-center justify-between  py-2 overflow-hidden">
                <h1 className="text-2xl font-bold m-4 ">Alert Management</h1>
                <button
                    className="text-base flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 my-4 mr-[50px]  rounded"
                    onClick={handleSearch}
                >
                    <FaSearch className="mr-2" />   Search
                </button>
            </div>

            <AlertList alerts={(events.total > 0) ? events.hits : []} totalPages={(events.total > 0) ? events.totalPages : 1} searchTerms={searchTerms} setSearchTerms={setSearchTerms} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </>

    );
}

export default Alert;
