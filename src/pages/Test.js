import React, { useEffect } from "react";
import AlertList from "../component/alert_list";

function Test() {

    const events = {
        total: 6,
        totalPages: 3,
        hits: [
            {
                timestamp: "2024-05-04T10:30:00Z",
                sig_generator: "Snort",
                sig_id: 1234,
                sig_rev: 1,
                msg: "Attempted Denial of Service",
                proto: "TCP",
                src: "192.168.1.100",
                srcport: 54321,
                dst: "10.0.0.1",
                dstport: 80
            },
            {
                timestamp: "2024-05-04T10:35:00Z",
                sig_generator: "Suricata",
                sig_id: 5678,
                sig_rev: 2,
                msg: "SQL Injection Attempt",
                proto: "HTTP",
                src: "192.168.2.50",
                srcport: 443,
                dst: "10.0.0.2",
                dstport: 8080
            },
            {
                timestamp: "2024-05-04T11:00:00Z",
                sig_generator: "Snort",
                sig_id: 9876,
                sig_rev: 3,
                msg: "Potential Exploit",
                proto: "UDP",
                src: "192.168.3.75",
                srcport: 12345,
                dst: "10.0.0.3",
                dstport: 3389
            },
            {
                timestamp: "2024-05-04T11:15:00Z",
                sig_generator: "Suricata",
                sig_id: 4321,
                sig_rev: 4,
                msg: "Cross-Site Scripting Attempt",
                proto: "HTTP",
                src: "192.168.4.120",
                srcport: 8080,
                dst: "10.0.0.4",
                dstport: 443
            },
            {
                timestamp: "2024-05-04T11:30:00Z",
                sig_generator: "Snort",
                sig_id: 5678,
                sig_rev: 1,
                msg: "Potential Brute Force Attack",
                proto: "SSH",
                src: "192.168.5.210",
                srcport: 22,
                dst: "10.0.0.5",
                dstport: 22
            },
            {
                timestamp: "2024-05-04T11:45:00Z",
                sig_generator: "Suricata",
                sig_id: 1234,
                sig_rev: 2,
                msg: "Malware Communication",
                proto: "DNS",
                src: "192.168.6.15",
                srcport: 5353,
                dst: "10.0.0.6",
                dstport: 53
            },
            {
                timestamp: "2024-05-04T12:00:00Z",
                sig_generator: "Snort",
                sig_id: 9876,
                sig_rev: 2,
                msg: "Attempted Remote Code Execution",
                proto: "TCP",
                src: "192.168.7.80",
                srcport: 4444,
                dst: "10.0.0.7",
                dstport: 8080
            },
            {
                timestamp: "2024-05-04T12:15:00Z",
                sig_generator: "Suricata",
                sig_id: 4321,
                sig_rev: 3,
                msg: "Unauthorized Access",
                proto: "FTP",
                src: "192.168.8.30",
                srcport: 21,
                dst: "10.0.0.8",
                dstport: 21
            },
            {
                timestamp: "2024-05-04T12:30:00Z",
                sig_generator: "Snort",
                sig_id: 5678,
                sig_rev: 3,
                msg: "Suspicious Network Activity",
                proto: "UDP",
                src: "192.168.9.150",
                srcport: 12345,
                dst: "10.0.0.9",
                dstport: 3389
            },
            {
                timestamp: "2024-05-04T12:45:00Z",
                sig_generator: "Suricata",
                sig_id: 1234,
                sig_rev: 3,
                msg: "Information Disclosure Attempt",
                proto: "HTTP",
                src: "192.168.10.200",
                srcport: 8080,
                dst: "10.0.0.10",
                dstport: 443
            },
            {
                timestamp: "2024-05-04T10:30:00Z",
                sig_generator: "Snort",
                sig_id: 1234,
                sig_rev: 1,
                msg: "Attempted Denial of Service",
                proto: "TCP",
                src: "192.168.1.100",
                srcport: 54321,
                dst: "10.0.0.1",
                dstport: 80
            },
            {
                timestamp: "2024-05-04T10:35:00Z",
                sig_generator: "Suricata",
                sig_id: 5678,
                sig_rev: 2,
                msg: "SQL Injection Attempt",
                proto: "HTTP",
                src: "192.168.2.50",
                srcport: 443,
                dst: "10.0.0.2",
                dstport: 8080
            },
            {
                timestamp: "2024-05-04T11:00:00Z",
                sig_generator: "Snort",
                sig_id: 9876,
                sig_rev: 3,
                msg: "Potential Exploit",
                proto: "UDP",
                src: "192.168.3.75",
                srcport: 12345,
                dst: "10.0.0.3",
                dstport: 3389
            },
            {
                timestamp: "2024-05-04T11:15:00Z",
                sig_generator: "Suricata",
                sig_id: 4321,
                sig_rev: 4,
                msg: "Cross-Site Scripting Attempt",
                proto: "HTTP",
                src: "192.168.4.120",
                srcport: 8080,
                dst: "10.0.0.4",
                dstport: 443
            },
            {
                timestamp: "2024-05-04T11:30:00Z",
                sig_generator: "Snort",
                sig_id: 5678,
                sig_rev: 1,
                msg: "Potential Brute Force Attack",
                proto: "SSH",
                src: "192.168.5.210",
                srcport: 22,
                dst: "10.0.0.5",
                dstport: 22
            },
            {
                timestamp: "2024-05-04T11:45:00Z",
                sig_generator: "Suricata",
                sig_id: 1234,
                sig_rev: 2,
                msg: "Malware Communication",
                proto: "DNS",
                src: "192.168.6.15",
                srcport: 5353,
                dst: "10.0.0.6",
                dstport: 53
            },
            {
                timestamp: "2024-05-04T12:00:00Z",
                sig_generator: "Snort",
                sig_id: 9876,
                sig_rev: 2,
                msg: "Attempted Remote Code Execution",
                proto: "TCP",
                src: "192.168.7.80",
                srcport: 4444,
                dst: "10.0.0.7",
                dstport: 8080
            },
            {
                timestamp: "2024-05-04T12:15:00Z",
                sig_generator: "Suricata",
                sig_id: 4321,
                sig_rev: 3,
                msg: "Unauthorized Access",
                proto: "FTP",
                src: "192.168.8.30",
                srcport: 21,
                dst: "10.0.0.8",
                dstport: 21
            },
            {
                timestamp: "2024-05-04T12:30:00Z",
                sig_generator: "Snort",
                sig_id: 5678,
                sig_rev: 3,
                msg: "Suspicious Network Activity",
                proto: "UDP",
                src: "192.168.9.150",
                srcport: 12345,
                dst: "10.0.0.9",
                dstport: 3389
            },
            {
                timestamp: "2024-05-04T12:45:00Z",
                sig_generator: "Suricata",
                sig_id: 1234,
                sig_rev: 3,
                msg: "Information Disclosure Attempt",
                proto: "HTTP",
                src: "192.168.10.200",
                srcport: 8080,
                dst: "10.0.0.10",
                dstport: 443
            }
        ]
    }




    useEffect(() => {
    }, [])

    return (
        <>
            <form onSubmit={generateRuleFunc} className="bg-white p-8 rounded shadow-md w-full max-w-md">
                {/* header */}
                <div className="mb-4">
                    <label className="block text-gray-700">Action:</label>
                    <select value={action} onChange={(e) => setAction(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
                        <option value="">Action</option>
                        <option value="alert">Alert</option>
                        <option value="log">Log</option>
                        <option value="pass">Pass</option>
                        <option value="drop">Drop</option>
                        <option value="reject">Reject</option>
                        <option value="sdrop">Sdrop</option>
                        {/* <option value="activate">Activate</option>
        <option value="dynamic">Dynamic</option> */}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Protocol:</label>
                    <select value={protocol} onChange={(e) => setProtocol(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
                        <option value="">Protocol</option>
                        <option value="tcp">TCP</option>
                        <option value="udp">UDP</option>
                        <option value="icmp">ICMP</option>
                        <option value="ip">IP</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Source IP:</label>
                    <input placeholder="Source IP" type="text" value={srcIP} onChange={(e) => setSrcIP(e.target.value)}
                        onBlur={(e) => {
                            let ip = e.target.value;
                            if (ip === '') { }
                            else if (ip.match(ipRegex) !== null || ip.match(ipRegex2) !== null || ip.match(ipRegex3) !== null || ip === '' || ip === 'any') { setSrcIP(ip) }
                            else { setSrcIP('') }
                        }} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Source Port:</label>
                    <input placeholder="Source Port" type="text" value={srcPort} onChange={(e) => setSrcPort(e.target.value)} onBlur={(e) => {
                        let value = e.target.value;
                        if (value === '' || value === 'any') {
                        } else if (!isNaN(parseInt(value))) {
                            if (parseInt(value) < 65535 && parseInt(value) > 1) {
                                setSrcPort(value);
                            } else {
                                setSrcPort('');
                            }
                        } else {
                            setSrcPort(value);
                        }
                    }} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Destination IP:</label>
                    <input placeholder="Destination IP" type="text" value={destIP} onChange={(e) => setDestIP(e.target.value)} onBlur={(e) => {
                        let ip = e.target.value;
                        if (ip === '') { }
                        else if (ip.match(ipRegex) !== null || ip.match(ipRegex2) !== null || ip.match(ipRegex3) !== null || ip === '' || ip === 'any') { setDestIP(ip) }
                        else { setDestIP('') }
                    }} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Destination Port:</label>
                    <input placeholder="Destination Port" type="text" value={destPort} onChange={(e) => setDestPort(e.target.value)} onBlur={(e) => {
                        let value = e.target.value;
                        if (value === '' || value === 'any') {
                        } else if (!isNaN(parseInt(value))) {
                            if (parseInt(value) <= 65535 && parseInt(value) >= 0) {
                                setDestPort(value);
                            } else {
                                setDestPort('');
                            }
                        } else {
                            setSrcPort(value);
                        }
                    }} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Snort ID:</label>
                    <input placeholder="Snort ID" type="text" value={sid} onChange={(e) => setSid(e.target.value)} onBlur={(e) => {
                        let value = e.target.value;
                        if (value !== "" && (isNaN(parseInt(value)) || parseInt(value) < 1)) {
                            setSid("")
                        }
                    }} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Rule Version:</label>
                    <input placeholder="Rule Version" type="text" value={rev} onChange={(e) => setRev(e.target.value)} onBlur={(e) => {
                        let value = e.target.value;
                        if (value !== "" && (isNaN(parseInt(value)) || parseInt(value) < 1)) {
                            setRev("")
                        }
                    }} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Rule Message:</label>
                    <input placeholder="Rule Message (\ Escape special characters)" type="text" value={msg} onChange={(e) => setMsg(e.target.value)} onBlur={(e) => {
                        let value = e.target.value;
                        if (value.match(/^(?:\w|\d|\.|\\\W|\s)+$/g) === null) {
                            setMsg("")
                        }
                    }} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Class Type:</label>
                    <input placeholder="Class-Type" type="text" value={classType} onChange={(e) => setClassType(e.target.value)} onBlur={(e) => {
                        let value = e.target.value;
                        if (value.match(/^(?:\w|\d|\.|\\\W|\s)+$/g) === null) {
                            setClassType("")
                        }
                    }} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Priority Rule:</label>
                    <select value={priority} onChange={(e) => setPriority(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
                        <option value="">Priority</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Generator ID:</label>
                    <input placeholder="Generator ID" type="text" value={gid} onChange={(e) => setGid(e.target.value)} onBlur={(e) => {
                        let value = e.target.value;
                        if (value.match(/^\d+$/g) === null) {
                            setGid("")
                        }
                    }} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                </div>

                {/* misc */}
                <div className="flex items-center space-x-4">
                    <label className="text-gray-700">Data Size</label>
                    <select className="border border-gray-300 rounded p-2 w-full">
                        <option>Data Size</option>
                        <option>&gt;</option>
                        <option>&lt;</option>
                        <option>=</option>
                    </select>
                    <input
                        type="number"
                        className="border border-gray-300 rounded p-2 w-full"
                        defaultValue="1"
                    />
                </div>
                <div className="flex items-center space-x-4">
                    <label className="text-gray-700">Reference</label>
                    <select className="border border-gray-300 rounded p-2 w-full">
                        <option>Reference</option>
                        <option>URL</option>
                        <option>CVE</option>
                        <option>BUG</option>
                        <option>MSB</option>
                        <option>NESS</option>
                        <option>ARAC</option>
                        <option>OSVD</option>
                        <option>MCAF</option>
                    </select>
                </div>

                <div className="flex items-center space-x-4">
                    <label className="text-gray-700">Threshold Tracking Type</label>
                    <select className="border border-gray-300 rounded p-2 w-full">
                        <option value="TRK BY">TRK BY</option>
                        <option value="by_src">by_src</option>
                        <option value="by_dst">by_dst</option>
                    </select>
                </div>
                <div className="flex items-center space-x-4">
                    <label className="text-gray-700">Count</label>
                    <input
                        type="number"
                        className="border border-gray-300 rounded p-2 w-full"
                        placeholder="Count #"
                    />
                    <span className="text-gray-700">Seconds</span>
                    <input
                        type="number"
                        className="border border-gray-300 rounded p-2 w-full"
                        placeholder="Seconds"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700">Generate Rule</button>
            </form>
        </>

    );
}

export default Test;
