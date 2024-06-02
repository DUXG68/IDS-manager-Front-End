import React, { useEffect, useState } from 'react';
import { Cell, LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import randomColor from 'randomcolor';
import AlertServices from "../services/alertService";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const CombinedCharts = ({ data }) => {
    // const colors = randomColor({ count: data.length, format: 'hex' });
    const colors = ['#11d8b7', '#2b5b8c', '#f7ca02', '#ede253', '#ce6b2d', '#55e057', '#23ede6', '#23bca3', '#c9aa46', '#5dd3c1', '#898ddd', '#0d3068', '#b9e562', '#5dc435', '#e5a179', '#f2189b', '#cf76e8', '#e89c66', '#f9b6c5', '#cce6ff', '#b471fc', '#1b1fa0', '#f788e4', '#ce1c87', '#5ce892', '#0d126b', '#5532b5', '#63f9ac', '#d5ff63', '#1eed33', '#4619a8', '#2bdb57', '#fcf800', '#f9dd8e', '#efa7e8', '#ade6ff', '#c832ff', '#84bfd8', '#aced09', '#fc9cc4', '#e9fcab', '#0e6e8c', '#cdaaff', '#e499ef', '#277ab2', '#85c7ea', '#139657', '#f9918b', '#dd6cb4', '#3766f2', '#db3d89', '#f49e84', '#b22964', '#8e9b1a', '#c45e15', '#ef8da7', '#f2b7b3', '#4f0ddd', '#e582a8', '#39c42d', '#9bd2f2', '#f7b559', '#7316dd', '#997fd1', '#c19234', '#64e822', '#5c82c4', '#d38443', '#cfffaf', '#4c23a3', '#ac91e2', '#f4947a', '#ed6c1c', '#8df4b3', '#6f099b', '#038238', '#fcbaca', '#a7f98b', '#122f7c', '#6cef40', '#c95272', '#7fa2f4', '#e291bf', '#ff9a8e', '#05751e', '#a1f4a7', '#dffca9', '#74ef4f', '#b1f49c', '#d39308', '#f7a8e6', '#0474d1', '#77ce52', '#a2e0f2', '#b0ce42', '#250a70', '#978cf7', '#6d7cdb', '#9976db', '#aafff6']
    return (
        <div className='bg-gray-200'>
            <div className="flex justify-center items-center h-full  ">
                <h2 className="text-lg font-bold  opacity-50">Classification Chart</h2>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <div>
                    <PieChart width={600} height={390}>
                        <Pie
                            data={data}
                            dataKey="doc_count" // value
                            nameKey="key" // key
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            label
                        >
                            {
                                data.map((entry, index) => (
                                    <Cell key={`pie-cell-${index}`} fill={colors[index]} />
                                ))
                            }
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
                <div>
                    <BarChart
                        width={600}
                        height={390}
                        data={data}
                        layout="vertical"
                        margin={{ right: 30, left: 30, top: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="key" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="doc_count" layout="horizontal" fill="#000000" >
                            {
                                data.map((entry, index) => (
                                    <Cell key={`bar-cell-${index}`} fill={colors[index]} />
                                ))
                            }
                        </Bar>
                    </BarChart>
                </div>
            </div>
        </div>
    );
};

// dataKey="key_as_string"
// dataKey="doc_count
const LineChartComponent = ({ data }) => {
    return (

        <div className='bg-gray-200'>
            <div className="flex justify-center items-center h-full ">
                <h2 className="text-lg font-bold  opacity-50">Statis Chart</h2>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <div>
                    <LineChart
                        width={600}
                        height={245}
                        data={data}
                        margin={{ right: 30, left: 30, top: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="key_as_string" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="doc_count" stroke="#000000" />
                    </LineChart>
                </div >
                <div>
                    <BarChart
                        width={600}
                        height={245}
                        data={data}
                        margin={{ right: 30, left: 30, top: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="key_as_string" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="doc_count" fill="#8884d8" />
                    </BarChart>
                </div>

            </div >
        </div>



    );
};


function Dashboard() {
    const navigation = useNavigate();
    const notifyErrorVar = (error) => toast.error(`ERROR: ${error} `);
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeSelect = [{
        name: "Day",
        type: "1",
        interval: "1h"
    }, {
        name: "Week",
        type: "7",
        interval: "1d"
    }, {
        name: "Month",
        type: "30",
        interval: "1d"
    }]
    const [countAlerts, setCountAlerts] = useState([]);
    const [classAlerts, setClassAlerts] = useState([]);

    // const alertData = [
    //     { time: "2024-05-17", count: 42 },
    //     { time: "2024-05-18", count: 68 },
    //     { time: "2024-05-19", count: 15 },
    //     { time: "2024-05-20", count: 91 },
    //     { time: "2024-05-21", count: 33 },
    //     { time: "2024-05-22", count: 77 },
    //     { time: "2024-05-23", count: 54 },
    //     { time: "2024-05-20", count: 200 },
    //     { time: "2024-05-21", count: 33 },
    //     { time: "2024-05-22", count: 77 },
    //     { time: "2024-05-23", count: 54 }
    // ]
    // const sigData = [
    //     { sig: "1002", count: 42 },
    //     { sig: "1004", count: 68 },
    //     { sig: "1003", count: 15 },
    //     { sig: "412", count: 91 },
    //     { sig: "1421", count: 33 },
    //     { sig: "2521", count: 77 },
    //     { sig: "7520", count: 54 },
    //     { sig: "2024", count: 200 },
    //     { sig: "25", count: 33 },
    //     { sig: "5542", count: 77 },
    //     { sig: "2104", count: 54 }
    // ]



    var intervalId
    useEffect(() => {
        const colors = randomColor({
            count: 100,
            format: 'hex'
        });

        console.log(colors);
        const fetchData = async () => {
            try {
                if (currentIndex == 0) {
                    navigation("/dashboard/0")
                    let responseAlert = await AlertServices.getAlertsCount(timeSelect[currentIndex])
                    let responseClass = await AlertServices.getAlertsClass(timeSelect[currentIndex])
                    console.log(responseClass.data.result)
                    if (typeof (responseAlert.data.result) != "string" || typeof (responseClass.data.result) != "string") {
                        setCountAlerts(responseAlert.data.result)
                        setClassAlerts(responseClass.data.result)
                    } else {
                        notifyErrorVar(responseAlert.data.result)
                    }
                } else {
                    let responseAlert = await AlertServices.getAlertsCount(timeSelect[currentIndex])
                    let responseClass = await AlertServices.getAlertsClass(timeSelect[currentIndex])
                    if (typeof (responseAlert.data.result) != "string" || typeof (responseClass.data.result) != "string") {
                        setCountAlerts(responseAlert.data.result)
                        setClassAlerts(responseClass.data.result)
                    } else {
                        notifyErrorVar(responseAlert.data.result)
                    }
                }
            } catch (error) {
                notifyErrorVar(`Lỗi khi gọi API :${error}`)
            }
        };
        fetchData();
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = setInterval(fetchData, 5000);
        } else {
            intervalId = setInterval(fetchData, 5000);
        }

        // const intervalId = setInterval(fetchData, 5000);

        return () => clearInterval(intervalId);

    }, [currentIndex])


    const handleChangeType = (e) => {
        e.preventDefault();
        const indexType = e.target.selectedIndex;
        console.log({ indexType })
        setCurrentIndex(indexType)
        navigation(`/dashboard/${indexType}`);
    };

    return (
        < >
            <ToastContainer position="top-center" />
            <div className="flex items-center justify-between py-3">
                <h1 className="text-2xl font-bold m-4">Dashboard</h1>
                <div className="flex items-center border-2 border-gray-400 rounded mr-8">
                    <select className="py-1 px-2 bg-white border-none rounded focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChangeType}>
                        {timeSelect.map((time, index) => (
                            <option key={index} value={index}>{time.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <LineChartComponent data={countAlerts} />
            <CombinedCharts data={classAlerts} />


        </>
    );
}

export default Dashboard;


