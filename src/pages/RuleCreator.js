import React, { useState, useEffect } from 'react';
import { FaArrowRight } from "react-icons/fa";
function RuleCreator() {

    const ipRegex = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/g;
    const ipRegex2 = /\d\d?\d?\.\d\d?\d?\.\d\d?\d?\.\d\d?\d?\/\d\d?/g;
    const ipRegex3 = /^(?:\!|\(|\$){1,2}(?:\.|\,|\w|\_|\d|\s|\!|\(|\))+\)?$/g;

    const [action, setAction] = useState('');
    const [protocol, setProtocol] = useState('');
    const [srcIP, setSrcIP] = useState('');
    const [srcPort, setSrcPort] = useState('');
    const [destIP, setDestIP] = useState('');
    const [destPort, setDestPort] = useState('');
    const [sid, setSid] = useState('');
    const [rev, setRev] = useState('');
    const [msg, setMsg] = useState('');
    const [classType, setClassType] = useState('');
    const [priority, setPriority] = useState('');
    const [gid, setGid] = useState('');
    //tcp 
    const [tcpFlag, setTcpFlags] = useState({ ack: "", syn: "", psh: "", rst: "", fin: "", urg: "", criteria: "" });
    const [httpReqMethod, setHttpReqMethod] = useState('');
    const [httpResCode, setHttpResCode] = useState('');
    const [tcpFlow, setTcpFlow] = useState('');
    const [tcpState, setTcpState] = useState('');
    //udp
    const [udpFlow, setUdpFlow] = useState('');
    //icmp
    const [icmpTypeSign, setIcmpTypeSign] = useState('');
    const [icmpType, setIcmpType] = useState('');
    const [icmpCodeSign, setIcmpCodeSign] = useState('');
    const [icmpCode, setIcmpCode] = useState('');
    //ip
    const [ttlSign, setTtlSign] = useState('');
    const [ttl, setTtl] = useState('');
    const [ipProtocolSign, setIpProtocolSign] = useState('');
    const [ipProtocol, setIpProtocol] = useState('');

    //content match
    const [contentFlag, setContentFlags] = useState({ nocase: "", uri: "", not: "" });
    const [contentHx, setContentHx] = useState("");
    const [content, setContent] = useState("");
    const [offset, setOffset] = useState("");
    const [depth, setDepth] = useState("");
    const [contentArr, setContentArr] = useState([]);

    //regex match 
    const [regexFlag, setRegexFlag] = useState({ nocase: "", dotal: "", newline: "", whitespace: "", greedy: "" });
    const [regex, setRegex] = useState("");
    const [regexArr, setRegexArr] = useState([]);
    //misc options
    const [dsizeSign, setDsizeSign] = useState('');
    const [dsize, setDsize] = useState('');
    const [refType, setRefType] = useState('');
    const [ref, setRef] = useState('');
    const [thresholdType, setThresholdType] = useState('');
    const [thresholdTrack, setThresholdTrack] = useState('');
    const [thresholdCount, setThresholdCount] = useState('');
    const [thresholdSeconds, setThresholdSeconds] = useState('');
    const [reset, setReset] = useState(0);
    const [generatedRule, setGeneratedRule] = useState('');

    const copyRule = () => {
        const unsecuredCopyToClipboard = (text) => { const textArea = document.createElement("textarea"); textArea.value = text; document.body.appendChild(textArea); textArea.focus(); textArea.select(); try { document.execCommand('copy') } catch (err) { console.error('Unable to copy to clipboard', err) } document.body.removeChild(textArea) };
        if (window.isSecureContext && navigator.clipboard) {
            navigator.clipboard.writeText(generatedRule);
            alert('Rule copied to clipboard!');
        } else {
            unsecuredCopyToClipboard(generatedRule);
            alert('Rule copied to clipboard!');
        }
        // navigator.clipboard.writeText(generatedRule);
        // alert('Rule copied to clipboard!');

    };

    const removeRegex = () => {
        if (regexArr.length === 0) return;
        const newItems = regexArr.slice(0, -1);
        setRegexArr(newItems);
    };

    const addRegex = ({ regex, regexFlag }) => {
        const newItem = { regex, regexFlag };
        setRegexArr([...regexArr, newItem]);
    };

    const removeContent = () => {
        if (contentArr.length === 0) return;
        const newItems = contentArr.slice(0, -1);
        setContentArr(newItems);
    };

    const addContent = ({ contentFlag, contentHx, offset, depth }) => {
        const newItem = { contentFlag, contentHx, offset, depth };
        setContentArr([...contentArr, newItem]);
    };

    useEffect(() => {

        //header navigation
        var rule = `${action} ${protocol} ${srcIP === "" ? "any" : srcIP} ${(srcPort === "" || protocol === "ip" || protocol === "icmp") ? "any" : srcPort} -> ${destIP !== "" ? destIP : "any"} ${(destPort === "" || protocol === "ip" || protocol === "icmp") ? "any" : destPort} (${msg !== "" ? `msg:"${msg}"; ` : ""}${sid !== "" ? `sid:${sid}; ` : ""}${classType !== "" ? `classtype:${classType}; ` : ""}${priority !== "" ? `priority:${priority}; ` : ""}${gid !== "" ? `gid:${gid}; ` : ""}${rev !== "" ? `rev:${rev}; ` : ""}`;

        //protocol option
        if (protocol === "tcp") {
            let flag = `${tcpFlag.criteria}${tcpFlag.ack}${tcpFlag.syn}${tcpFlag.psh}${tcpFlag.rst}${tcpFlag.fin}${tcpFlag.urg}`
            let http = `${httpReqMethod === "" ? "" : `content:"${httpReqMethod}"; http_method; `}${httpResCode === "" ? "" : `content:"${httpResCode}"; http_stat_code; `}`
            rule += `${http}${flag === "" ? "" : `flags:${flag}; `}${tcpFlow === "" ? "" : `flow:${tcpFlow}${tcpState === "" ? "" : `,${tcpState}`};`} `
        } else if (protocol === "udp") {
            rule += `${udpFlow === "" ? "" : `flow:${udpFlow}; `} `
        } else if (protocol === "icmp") {
            rule += `${icmpTypeSign === "" || icmpType === "" ? "" : `itype:${icmpTypeSign == "=" ? "" : icmpTypeSign}${icmpType}; `}${icmpCodeSign === "" || icmpCode === "" ? "" : `icode:${icmpCodeSign == "=" ? "" : icmpCodeSign}${icmpCode}; `} `
        } else if (protocol === "ip") {
            rule += `${ttlSign === "" || ttl === "" ? "" : `ttl:${ttlSign == "=" ? "" : ttlSign}${ttl}; `}${ipProtocolSign === "" || ipProtocol === "" ? "" : `ip_proto:${ipProtocolSign == "=" ? "" : ipProtocolSign}${ipProtocol}; `} `
        }

        //content

        if (contentArr.length > 0) {
            let ct = ""
            contentArr.forEach(element => {
                ct += `content:${element.contentFlag.not === "" ? "" : "!"}"${element.contentHx}";${element.offset === "" ? "" : ` offset:${element.offset};`}${element.depth === "" ? "" : ` depth:${element.depth};`}${element.contentFlag.nocase === "" ? "" : " nocase;"}${element.contentFlag.uri === "" ? "" : " http_uri;"} `
            })
            rule += `${ct}`
        }

        //regex
        if (regexArr.length > 0) {
            let re = ""
            regexArr.forEach(element => {
                re += `pcre:"/${element.regex}/${element.regexFlag.nocase}${element.regexFlag.dotal}${element.regexFlag.newline}${element.regexFlag.whitespace}${element.regexFlag.greedy}"; `
            })
            rule += `${re}`
        }
        // misc
        rule += `${dsize === "" || dsizeSign === "" ? "" : `dsize:${dsizeSign === "=" ? "" : dsizeSign}${dsize}; `}${refType === "" || ref === "" ? "" : `reference:${refType},${ref}; `}${thresholdType === "" || thresholdTrack === "" || thresholdCount === "" || thresholdSeconds === "" ? "" : `threshold:type ${thresholdType}, track ${thresholdTrack}, count ${thresholdCount}, seconds ${thresholdSeconds}; `}`


        setGeneratedRule(`${rule})`);

    }, [reset])

    return (
        <>
            <div className="min-h-screen flex flex-col  bg-white py-2">
                <h1 className="text-2xl font-bold m-4 py-2">Snort Rule Generator</h1>
                <div className="bg-gray-200 p-4 rounded shadow-md w-full">

                    {/* Header  */}
                    <div className="grid grid-cols-8 gap-5 mb-4">
                        <select value={action} onChange={(e) => { setAction(e.target.value); setReset((prev) => (prev + 1)); }} className="text-sm mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" >
                            <option value="">Action</option>
                            <option value="alert">Alert</option>
                            <option value="log">Log</option>
                            <option value="pass">Pass</option>
                            <option value="drop">Drop</option>
                            <option value="reject">Reject</option>
                            <option value="sdrop">Sdrop</option>
                        </select>
                        <select value={protocol} onChange={(e) => { setProtocol(e.target.value); setReset((prev) => (prev + 1)); }} className="text-sm mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" >
                            <option value="">Protocol</option>
                            <option value="tcp">TCP</option>
                            <option value="udp">UDP</option>
                            <option value="icmp">ICMP</option>
                            <option value="ip">IP</option>
                        </select>
                        <input readOnly={protocol === ""} placeholder="Source IP" type="text" value={srcIP} onChange={(e) => { setSrcIP(e.target.value) }}
                            onBlur={(e) => {
                                let ip = e.target.value;
                                if (ip === '') { }
                                else if (ip.match(ipRegex) !== null || ip.match(ipRegex2) !== null || ip.match(ipRegex3) !== null || ip === '' || ip === 'any') { setSrcIP(ip) }
                                else {
                                    e.target.classList.add('animate-shake');
                                    setTimeout(() => {
                                        e.target.classList.remove('animate-shake');
                                    }, 500); setSrcIP('')
                                }
                                setReset((prev) => (prev + 1));
                            }} className={`${protocol === "" ? "bg-gray-200" : ""} text-sm mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`} />

                        <div className="col-span-2 flex justify-between items-center">

                            <input readOnly={protocol === "ip" || protocol === "icmp" || protocol === ""} placeholder="Source Port" type="text" value={srcPort} onChange={(e) => { setSrcPort(e.target.value) }} onBlur={(e) => {
                                let value = e.target.value;
                                if (value === '' || value === 'any') {
                                } else if (!isNaN(parseInt(value))) {
                                    if (parseInt(value) <= 65535 && parseInt(value) >= 1) {
                                        setSrcPort(value);
                                    } else {
                                        e.target.classList.add('animate-shake');
                                        setTimeout(() => {
                                            e.target.classList.remove('animate-shake');
                                        }, 500); setSrcPort('');
                                    }
                                } else {
                                    setSrcPort(value);
                                }
                                setReset((prev) => (prev + 1));
                            }} className={`${protocol === "ip" || protocol === "icmp" || protocol === "" ? "bg-gray-200" : ""} text-sm mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`} />
                            <FaArrowRight className="text-black text-4xl mx-1" />

                            <input readOnly={protocol === ""} placeholder="Destination IP" type="text" value={destIP} onChange={(e) => { setDestIP(e.target.value) }} onBlur={(e) => {
                                let ip = e.target.value;
                                if (ip === '') { }
                                else if (ip.match(ipRegex) !== null || ip.match(ipRegex2) !== null || ip.match(ipRegex3) !== null || ip === '' || ip === 'any') { setDestIP(ip) }
                                else {
                                    e.target.classList.add('animate-shake');
                                    setTimeout(() => {
                                        e.target.classList.remove('animate-shake');
                                    }, 500); setDestIP('')
                                }
                                setReset((prev) => (prev + 1));
                            }} className={`${protocol === "" ? "bg-gray-200" : ""} text-sm mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`} />
                        </div>

                        <input readOnly={protocol === "ip" || protocol === "icmp" || protocol === ""} placeholder="Destination Port" type="text" value={destPort} onChange={(e) => { setDestPort(e.target.value) }} onBlur={(e) => {
                            let value = e.target.value;
                            if (value === '' || value === 'any') {
                            } else if (!isNaN(parseInt(value))) {
                                if (parseInt(value) <= 65535 && parseInt(value) >= 0) {
                                    setDestPort(value);
                                } else {
                                    e.target.classList.add('animate-shake');
                                    setTimeout(() => {
                                        e.target.classList.remove('animate-shake');
                                    }, 500); setDestPort('');
                                }
                            } else {
                                setDestPort(value);
                            }
                            setReset((prev) => (prev + 1));
                        }} className={`${protocol === "ip" || protocol === "icmp" || protocol === "" ? "bg-gray-200" : ""} text-sm mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`} />

                        <div className='flex items-center'>
                            <label className="text-gray-700 mr-[5px]">SID: </label>
                            <input readOnly={protocol === ""} placeholder="Snort ID" type="text" value={sid} onChange={(e) => { setSid(e.target.value) }} onBlur={(e) => {
                                let value = e.target.value;
                                if (value !== "" && (isNaN(parseInt(value)) || parseInt(value) < 1)) {
                                    e.target.classList.add('animate-shake');
                                    setTimeout(() => {
                                        e.target.classList.remove('animate-shake');
                                    }, 500); setSid("")
                                }
                                setReset((prev) => (prev + 1));
                            }} className={`${protocol === "" ? "bg-gray-200" : ""} text-sm mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`} />
                        </div>

                        <div className='flex items-center'>
                            <label className="text-gray-700 mr-[5px]">REV: </label>
                            <input readOnly={protocol === ""} placeholder="Rule Version" type="text" value={rev} onChange={(e) => { setRev(e.target.value) }} onBlur={(e) => {
                                let value = e.target.value;
                                if (value !== "" && (isNaN(parseInt(value)) || parseInt(value) < 1)) {
                                    e.target.classList.add('animate-shake');
                                    setTimeout(() => {
                                        e.target.classList.remove('animate-shake');
                                    }, 500); setRev("")
                                }
                                setReset((prev) => (prev + 1));
                            }} className={`${protocol === "" ? "bg-gray-200" : ""} text-sm mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`} />
                        </div>
                    </div>
                    <div className="grid grid-cols-8 gap-4 mb-4">
                        <div className='flex items-center col-span-5'>
                            <label className="text-gray-700 mr-[5px]">Message: </label>
                            <input readOnly={protocol === ""} placeholder="Rule Message (\ Escape special characters)" type="text" value={msg} onChange={(e) => { setMsg(e.target.value) }} onBlur={(e) => {
                                let value = e.target.value;
                                if (value === "") { } else if (value.match(/^(?:\w|\d|\.|\\\W|\s)+$/g) === null) {
                                    e.target.classList.add('animate-shake');
                                    setTimeout(() => {
                                        e.target.classList.remove('animate-shake');
                                    }, 500); setMsg("")
                                }
                                setReset((prev) => (prev + 1));
                            }} className={`${protocol === "" ? "bg-gray-200" : ""} text-sm mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`} />
                        </div>

                        <div className='flex items-center'>
                            <label className="text-gray-700 mr-[5px]">Class Type: </label>
                            <input readOnly={protocol === ""} placeholder="Class-Type" type="text" value={classType} onChange={(e) => { setClassType(e.target.value) }} onBlur={(e) => {
                                let value = e.target.value;
                                if (value === "") { } else if (value.match(/^(?:\w|\d|\.|\\\W|\s)+$/g) === null) {
                                    e.target.classList.add('animate-shake');
                                    setTimeout(() => {
                                        e.target.classList.remove('animate-shake');
                                    }, 500); setClassType("")
                                }
                                setReset((prev) => (prev + 1));
                            }} className={`${protocol === "" ? "bg-gray-200" : ""} text-sm mt-1 block w-full px-3 py-2 border  border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`} />
                        </div>

                        <div className='flex items-center'>
                            <label className="text-sm text-gray-700 mr-[5px]">Priority: </label>
                            <select disabled={protocol === ""} value={priority} onChange={(e) => { setPriority(e.target.value); setReset((prev) => (prev + 1)); }} className={`${protocol === "" ? "bg-gray-200" : ""} text-sm mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`} >
                                <option value="">Priority</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>

                        <div className='flex items-center'>
                            <label className="text-gray-700 mr-[5px]">GID: </label>
                            <input readOnly={protocol === ""} placeholder="Generator ID" type="text" value={gid} onChange={(e) => { setGid(e.target.value) }} onBlur={(e) => {
                                let value = e.target.value;
                                if (value === "") { } else if (value.match(/^\d+$/g) === null) {
                                    e.target.classList.add('animate-shake');
                                    setTimeout(() => {
                                        e.target.classList.remove('animate-shake');
                                    }, 500); setGid("")
                                }
                                setReset((prev) => (prev + 1));
                            }} className={`${protocol === "" ? "bg-gray-200" : ""} text-sm mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`} />
                        </div>

                    </div>

                    < div className=" mt-2 p-4 bg-white rounded shadow-md w-full " >
                        <div className='flex items-center'>
                            <input
                                type="text"

                                value={generatedRule}
                                readOnly
                                className="p-2 border rounded-md flex-grow ml-2"
                            />
                            <button onClick={copyRule} className=" bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700">Copy Rule</button>
                        </div>
                    </ div>
                    {/* Options */}
                    <div className="grid grid-cols-2 grid-rows-2 gap-2">
                        {/* ----------------------------------------------------------------------------------- */}

                        {/* Protocol Match */}
                        {protocol === "" && (
                            <div className="bg-yellow-100 p-2 rounded">
                                <h2 className="text-lg text-center font-bold mb-2">Protocol Match</h2>


                            </div>
                        )}
                        {/* tcp*/}
                        {protocol === "tcp" && (
                            <div className="bg-yellow-100 p-2 rounded">
                                <h2 className="text-lg text-center font-bold mb-2">TCP</h2>

                                {/* First row: HTTP request method and HTTP request code */}

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className='flex items-center'>
                                        <label className="text-gray-700 mr-[5px]">Method: </label>
                                        <select value={httpReqMethod} onChange={(e) => { if (httpResCode !== "") { setHttpResCode(""); setHttpReqMethod(e.target.value); } else { setHttpReqMethod(e.target.value); } setReset((prev) => (prev + 1)); }} className="text-sm mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" >
                                            <option value="">HTTP Request Method</option>
                                            <option value="GET">GET</option>
                                            <option value="POST">POST</option>
                                            <option value="HEAD">HEAD</option>
                                            <option value="TRACE">TRACE</option>
                                            <option value="PUT">PUT</option>
                                            <option value="DELETE">DELETE</option>
                                            <option value="CONNECT">CONNECT</option>
                                        </select>
                                    </div>

                                    <div className='flex items-center'>
                                        <label className="text-gray-700 mr-[5px]">Code: </label>
                                        <select value={httpResCode} onChange={(e) => { if (httpReqMethod !== "") { setHttpReqMethod(""); setHttpResCode(e.target.value); } else { setHttpResCode(e.target.value); } setReset((prev) => (prev + 1)); }} className="text-sm mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" >
                                            <option value="">HTTP Response Code</option>
                                            <option value="100">100 Continue</option>
                                            <option value="101">101 Switching Protocols</option>
                                            <option value="200">200 OK</option>
                                            <option value="201">201 Created</option>
                                            <option value="202">202 Acctepted</option>
                                            <option value="203">203 Non-authoritative Information</option>
                                            <option value="204">204 No Content</option>
                                            <option value="205">205 Reset Content</option>
                                            <option value="206">206 Partial Content</option>
                                            <option value="300">300 Multiple Choices</option>
                                            <option value="301">301 Moved Permanently</option>
                                            <option value="302">302 Found</option>
                                            <option value="303">303 See Other</option>
                                            <option value="304">304 Not Modified</option>
                                            <option value="305">305 Use Proxy</option>
                                            <option value="306">306 No Longer User</option>
                                            <option value="307">307 Temporary Redirect</option>
                                            <option value="400">400 Bad Request</option>
                                            <option value="401">401 Unauthorized</option>
                                            <option value="402">402 Payment Required</option>
                                            <option value="403">403 Forbidden</option>
                                            <option value="404">404 Not Found</option>
                                            <option value="406">406 Not Acceptable</option>
                                            <option value="407">407 Proxy Authentication is Required</option>
                                            <option value="408">408 Request Time Out</option>
                                            <option value="409">409 Conflict</option>
                                            <option value="410">410 Gone</option>
                                            <option value="411">411 Length Required</option>
                                            <option value="412">412 Precondition Failed</option>
                                            <option value="413">413 Payload Too Large</option>
                                            <option value="415">415 Unsupported Media Type</option>
                                            <option value="416">416 Range Not Satisfiable</option>
                                            <option value="417">417 Expectation Failed</option>
                                            <option value="500">500 Internal Server Error</option>
                                            <option value="501">501 Not Implemented</option>
                                            <option value="502">502 Bad Gateway</option>
                                            <option value="503">503 Service Unavailable</option>
                                            <option value="504">504 Gateway Timeout</option>
                                            <option value="505">505 HTTP Version Not Supported</option>
                                        </select></div>
                                </div>

                                {/* Second row: Flags */}

                                <div className="grid grid-cols-8 gap-4 mb-4">
                                    <div className="flex items-center">
                                        <input type="checkbox" id="ack" name="ack" value={tcpFlag.ack}
                                            checked={tcpFlag.ack !== ""}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setTcpFlags(prev => ({ ...prev, ack: "A" }))
                                                } else {
                                                    setTcpFlags(prev => ({ ...prev, ack: "" }))
                                                }
                                                setReset((prev) => (prev + 1));
                                            }}
                                            className="text-sm mr-2" />
                                        <label htmlFor="ack" className="text-gray-700">ACK</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="syn" name="syn"
                                            value={tcpFlag.syn}
                                            checked={tcpFlag.syn !== ""}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setTcpFlags(prev => ({ ...prev, syn: "S" }))
                                                } else {
                                                    setTcpFlags(prev => ({ ...prev, syn: "" }))
                                                }
                                                setReset((prev) => (prev + 1));
                                            }}
                                            className="text-sm mr-2" />
                                        <label htmlFor="syn" className="text-gray-700">SYN</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="psh" name="psh"
                                            value={tcpFlag.psh}
                                            checked={tcpFlag.psh !== ""}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setTcpFlags(prev => ({ ...prev, psh: "P" }))
                                                } else {
                                                    setTcpFlags(prev => ({ ...prev, psh: "" }))
                                                }
                                                setReset((prev) => (prev + 1));
                                            }}
                                            className="text-sm mr-2" />
                                        <label htmlFor="psh" className="text-gray-700">PSH</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="rst" name="rst"
                                            value={tcpFlag.rst}
                                            checked={tcpFlag.rst !== ""}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setTcpFlags(prev => ({ ...prev, rst: "R" }))
                                                } else {
                                                    setTcpFlags(prev => ({ ...prev, rst: "" }))
                                                }
                                                setReset((prev) => (prev + 1));
                                            }}
                                            className="mr-2" />
                                        <label htmlFor="rst" className="text-sm text-gray-700">RST</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="fin" name="fin"
                                            value={tcpFlag.fin}
                                            checked={tcpFlag.fin !== ""}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setTcpFlags(prev => ({ ...prev, fin: "F" }))
                                                } else {
                                                    setTcpFlags(prev => ({ ...prev, fin: "" }))
                                                }
                                                setReset((prev) => (prev + 1));
                                            }}
                                            className="mr-2" />
                                        <label htmlFor="fin" className="text-sm text-gray-700">FIN</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="urg" name="urg"
                                            value={tcpFlag.urg}
                                            checked={tcpFlag.urg !== ""}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setTcpFlags(prev => ({ ...prev, urg: "U" }))
                                                } else {
                                                    setTcpFlags(prev => ({ ...prev, urg: "" }))
                                                }
                                                setReset((prev) => (prev + 1));
                                            }}
                                            className="mr-2" />
                                        <label htmlFor="urg" className="text-sm text-gray-700">URG</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="plus" name="plus"
                                            value={tcpFlag.criteria}
                                            checked={tcpFlag.criteria === "+"}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setTcpFlags(prev => ({ ...prev, criteria: "+" }))
                                                } else {
                                                    setTcpFlags(prev => ({ ...prev, criteria: "" }))
                                                }
                                                setReset((prev) => (prev + 1));
                                            }}

                                            className="mr-2" />
                                        <label htmlFor="plus" className="text-sm text-gray-700">+</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="any" name="any"
                                            value={tcpFlag.criteria}
                                            checked={tcpFlag.criteria === "*"}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setTcpFlags(prev => ({ ...prev, criteria: "*" }))
                                                } else {
                                                    setTcpFlags(prev => ({ ...prev, criteria: "" }))
                                                }
                                                setReset((prev) => (prev + 1));
                                            }}
                                            className="mr-2" />
                                        <label htmlFor="any" className="text-sm text-gray-700">*</label>
                                    </div>
                                </div>

                                {/* Third row: Direction and TCP State */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className='flex items-center'>
                                        <label className="text-gray-700 mr-[5px]">Direction: </label>
                                        <select value={tcpFlow} onChange={(e) => { setTcpFlow(e.target.value); setReset((prev) => (prev + 1)); }} className="text-sm mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" >
                                            <option value="">Direction</option>
                                            <option value="from_server">From Server</option>
                                            <option value="from_client">From Client</option>
                                            <option value="to_server">To Server</option>
                                            <option value="to_client">To Client</option>
                                        </select>
                                    </div>

                                    <div className='flex items-center'>
                                        <label className="text-gray-700 mr-[5px]">State: </label>
                                        <select value={tcpState} onChange={(e) => { setTcpState(e.target.value); setReset((prev) => (prev + 1)); }} className="text-sm mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" >
                                            <option value="">TCP State</option>
                                            <option value="established">Established</option>
                                            <option value="stateless">Stateless</option>
                                            <option value="not_established">Not Established</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/*udp*/}
                        {protocol === "udp" && (
                            <div className="bg-yellow-100 p-2 rounded">
                                <h2 className="text-lg text-center font-bold mb-2">UDP</h2>
                                <div className='flex items-center'>
                                    <label className="text-gray-700 mr-[5px]">Direction: </label>
                                    <select value={udpFlow} onChange={(e) => { setUdpFlow(e.target.value); setReset((prev) => (prev + 1)); }} className="text-sm mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" >
                                        <option value="">Direction</option>
                                        <option value="from_server">From Server</option>
                                        <option value="to_server">To Server</option>
                                        <option value="to_client">To Client</option>
                                        <option value="from_client">From Client</option>
                                    </select>
                                </div>
                            </div>
                        )}
                        {/*icmp*/}
                        {protocol === "icmp" && (
                            <div className="bg-yellow-100 p-2 rounded">
                                <h2 className=" text-lg font-bold mb-2 text-center">ICMP</h2>

                                {/* First row: ICMP type and input */}
                                <div className=" grid grid-cols-7 gap-4 mb-4">
                                    <label className="flex items-center text-gray-700 mr-[5px]">ICMP Type: </label>
                                    <select value={icmpTypeSign} onChange={(e) => { setIcmpTypeSign(e.target.value); setReset((prev) => (prev + 1)); }} className="text-sm col-span-3 mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" >
                                        <option value="">ICMP Type</option>
                                        <option value=">">&gt;</option>
                                        <option value="<">&lt;</option>
                                        <option value="=">=</option>
                                    </select>

                                    <input placeholder="ICMP Type" value={icmpType} onChange={(e) => { setIcmpType(e.target.value); }} onBlur={(e) => {
                                        let value = e.target.value;
                                        if (value == "") { }
                                        else if (value.match(/^\d+$/g) === null) {
                                            e.target.classList.add('animate-shake');
                                            setTimeout(() => {
                                                e.target.classList.remove('animate-shake');
                                            }, 500); setIcmpType("");
                                        }
                                        setReset((prev) => (prev + 1));
                                    }} className="text-sm col-span-3 mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" />

                                </div>

                                {/* Second row: ICMP code and input */}
                                <div className="grid grid-cols-7 gap-4 mb-4">
                                    <label className="flex text-gray-700 mr-[5px] items-center">ICMP Code: </label>
                                    <select value={icmpCodeSign} onChange={(e) => { setIcmpCodeSign(e.target.value); setReset((prev) => (prev + 1)); }} className="text-sm col-span-3 mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" >
                                        <option value="">ICMP Code</option>
                                        <option value=">">&gt;</option>
                                        <option value="<">&lt;</option>
                                        <option value="=">=</option>
                                    </select>

                                    <input placeholder="ICMP Code" value={icmpCode} onChange={(e) => { setIcmpCode(e.target.value); }} onBlur={(e) => {
                                        let value = e.target.value;
                                        if (value == "") { }
                                        else if (value.match(/^\d+$/g) === null) {
                                            e.target.classList.add('animate-shake');
                                            setTimeout(() => {
                                                e.target.classList.remove('animate-shake');
                                            }, 500); setIcmpCode("");
                                        }
                                        setReset((prev) => (prev + 1));
                                    }} className="text-sm col-span-3 mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" />
                                </div>
                            </div>
                        )}
                        {/*ip*/}
                        {protocol === "ip" && (
                            <div className="bg-yellow-100 p-2 rounded">
                                <h2 className="text-lg font-bold mb-2 text-center">IP</h2>

                                {/* First row: ttl and input */}
                                <div className="grid grid-cols-7 gap-4 mb-4">
                                    <label className="flex items-center text-gray-700 mr-[5px]">TLL: </label>
                                    <select value={ttlSign} onChange={(e) => { setTtlSign(e.target.value); setReset((prev) => (prev + 1)); }} className="col-span-3 mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" >
                                        <option value="">TTL</option>
                                        <option value=">">&gt;</option>
                                        <option value="<">&lt;</option>
                                        <option value="=">=</option>
                                    </select>

                                    <input placeholder="TTL" value={ttl} onChange={(e) => { setTtl(e.target.value); }} onBlur={(e) => {
                                        let value = e.target.value;
                                        if (value == "") { }
                                        else if (value.match(/^\d+$/g) === null) {
                                            e.target.classList.add('animate-shake');
                                            setTimeout(() => {
                                                e.target.classList.remove('animate-shake');
                                            }, 500); setTtl("");
                                        }
                                        setReset((prev) => (prev + 1));
                                    }} className="text-sm col-span-3 mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" />
                                </div>

                                {/* Second row: IP protocol and input */}
                                <div className="grid grid-cols-7 gap-4 mb-4">
                                    <label className="flex items-center text-gray-700 mr-[5px]">IP Protocol: </label>
                                    <select value={ipProtocolSign} onChange={(e) => { setIpProtocolSign(e.target.value); setReset((prev) => (prev + 1)); }} className="col-span-3 mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" >
                                        <option value="">IP Protocol</option>
                                        <option value=">">&gt;</option>
                                        <option value="<">&lt;</option>
                                        <option value="=">=</option>
                                    </select>

                                    <input placeholder="IP Protocol" value={ipProtocol} onChange={(e) => { setIpProtocol(e.target.value); }} onBlur={(e) => {
                                        let value = e.target.value;
                                        if (value == "") { }
                                        else if (value.match(/^\d+$/g) === null) {
                                            e.target.classList.add('animate-shake');
                                            setTimeout(() => {
                                                e.target.classList.remove('animate-shake');
                                            }, 500); setIpProtocol("");
                                        }
                                        setReset((prev) => (prev + 1));
                                    }} className="col-span-3 mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" />
                                </div>
                            </div>
                        )}

                        {/* Content Match */}
                        <div className="bg-blue-100 p-2 rounded">
                            <h2 className="text-lg text-center font-bold mb-2">Content Match</h2>

                            {/* Content Match input field */}
                            <div className="mb-1">
                                <label className="block text-gray-700">Content Match:</label>
                                <input placeholder="Content Match" type="text" value={content} onChange={(e) => { setContent(e.target.value); }} onBlur={(e) => {
                                    let value = e.target.value;
                                    var finalContent = '';
                                    if (value === "") {
                                    } else {
                                        var finalContent = '';
                                        var isSpecialChar = false;

                                        for (var i = 0; i < value.length; i++) {
                                            var char = value[i];
                                            if (/[`~!@#$%^&*()\-_=+\]\[}{|;:'",<.>/?\s]/.test(char)) {
                                                var hexValue = char.charCodeAt(0).toString(16);
                                                if (!isSpecialChar) {
                                                    finalContent += '|';
                                                }
                                                finalContent += hexValue + ' ';
                                                isSpecialChar = true;
                                            } else {
                                                if (isSpecialChar) {
                                                    finalContent = finalContent.slice(0, -1) + '|';
                                                    isSpecialChar = false;
                                                }
                                                finalContent += char;
                                            }
                                        }

                                        if (isSpecialChar) {
                                            finalContent = finalContent.slice(0, -1) + '|';
                                        }

                                        setContentHx(finalContent);
                                        setContent(value);
                                    }
                                    setReset((prev) => (prev + 1));
                                }} className="mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            {/* Offset and depth fields */}
                            <div className="mb-1 flex items-center">
                                <div className="w-1/3 mr-2 flex items-center">
                                    <label className="block text-gray-700 mr-1">Offset:</label>
                                    <input placeholder="Offset" type="text" value={offset} onChange={(e) => { setOffset(e.target.value); }} onBlur={(e) => {
                                        let value = e.target.value;
                                        if (value == "") { }
                                        else if (value.match(/^\d+$/g) === null) {
                                            e.target.classList.add('animate-shake');
                                            setTimeout(() => {
                                                e.target.classList.remove('animate-shake');
                                            }, 500); setOffset("");
                                        }
                                        setReset((prev) => (prev + 1));
                                    }} className="mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div className="w-1/3 ml-2 flex items-center">
                                    <label className="block text-gray-700 mr-1">Depth:</label>
                                    <input placeholder="Depth" type="text" value={depth} onChange={(e) => { setDepth(e.target.value); }} onBlur={(e) => {
                                        let value = e.target.value;
                                        if (value == "") { }
                                        else if (value.match(/^\d+$/g) === null) {
                                            e.target.classList.add('animate-shake');
                                            setTimeout(() => {
                                                e.target.classList.remove('animate-shake');
                                            }, 500); setDepth("");
                                        }
                                        setReset((prev) => (prev + 1));
                                    }} className="mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                {/* Checkboxes */}
                                <div className="flex items-center px-1 py-4 ">
                                    <input type="checkbox" id="nocase" name="nocase" value={contentFlag.nocase}
                                        checked={contentFlag.nocase !== ""}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setContentFlags(prev => ({ ...prev, nocase: "nocase" }))
                                            } else {
                                                setContentFlags(prev => ({ ...prev, nocase: "" }))
                                            }
                                            setReset((prev) => (prev + 1));
                                        }} className="mr-2" />
                                    <label htmlFor="nocase" className="text-gray-700">No Case</label>
                                </div>
                                <div className="flex items-center px-1 py-4">
                                    <input type="checkbox" id="uri" name="uri" value={contentFlag.uri}
                                        checked={contentFlag.uri !== ""}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setContentFlags(prev => ({ ...prev, uri: "http_uri" }))
                                            } else {
                                                setContentFlags(prev => ({ ...prev, uri: "" }))
                                            }
                                            setReset((prev) => (prev + 1));
                                        }} className="mr-2" />
                                    <label htmlFor="uri" className="text-gray-700">URI</label>
                                </div>
                                <div className="flex items-center px-1 py-4">
                                    <input type="checkbox" id="not" name="not" value={contentFlag.not}
                                        checked={contentFlag.not !== ""}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setContentFlags(prev => ({ ...prev, not: "!" }))
                                            } else {
                                                setContentFlags(prev => ({ ...prev, not: "" }))
                                            }
                                            setReset((prev) => (prev + 1));
                                        }} className="mr-2" />
                                    <label htmlFor="not" className="text-gray-700">Not</label>

                                </div>
                            </div>


                            {/* Buttons */}
                            <div className="flex justify-end">
                                <button onClick={() => { removeContent(); setReset((prev) => (prev + 1)); }} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Back</button>
                                <button onClick={(e) => {

                                    if (!content.replace(/\s/g, '').length) {
                                        e.target.classList.add('animate-shake'); setTimeout(() => { e.target.classList.remove('animate-shake'); }, 500)
                                    } else { addContent({ contentFlag, contentHx, offset, depth }); setReset((prev) => (prev + 1)); }
                                }} className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
                            </div>
                        </div>

                        {/* Misc Options */}
                        <div className="bg-gray-100 p-2 rounded">
                            <h2 className="text-lg text-center font-bold mb-2">Misc Options</h2>

                            <div className="grid grid-cols-2 grid-rows-1 gap-3">
                                <div className="flex items-center space-x-4 mb-4">
                                    <label className="text-gray-700">Data Size:</label>
                                    <select value={dsizeSign} onChange={(e) => { setDsizeSign(e.target.value); setReset((prev) => (prev + 1)); }} className="border border-gray-800 rounded p-2 w-full">
                                        <option value="">Data Size</option>
                                        <option value=">">&gt;</option>
                                        <option value="<">&lt;</option>
                                        <option value="=">=</option>
                                    </select>
                                    <input
                                        placeholder="Size Payload" value={dsize} onChange={(e) => { setDsize(e.target.value); }} onBlur={(e) => {
                                            let value = e.target.value;
                                            if (value === "") { } else if (value.match(/^\d+$/g) === null) {
                                                e.target.classList.add('animate-shake');
                                                setTimeout(() => {
                                                    e.target.classList.remove('animate-shake');
                                                }, 500); setDsize("");
                                            }
                                            setReset((prev) => (prev + 1));
                                        }}
                                        className="border border-gray-800 rounded p-2 w-full"

                                    />
                                </div>
                                <div className="flex items-center space-x-4 mb-4">
                                    <label className="text-gray-700">Reference:</label>
                                    <select value={refType} onChange={(e) => { setRefType(e.target.value); setReset((prev) => (prev + 1)); }} className="text-sm border border-gray-800 rounded p-2 w-full">
                                        <option value="">Reference</option>
                                        <option value="url">URL</option>
                                        <option value="cve">CVE</option>
                                        <option value="bug">BUG</option>
                                        <option value="msb">MSB</option>
                                        <option value="ness">NESS</option>
                                        <option value="arac">ARAC</option>
                                        <option value="osvd">OSVD</option>
                                        <option value="mcaf">MCAF</option>
                                    </select>
                                    <input placeholder="Infomation"
                                        value={ref} onChange={(e) => { setRef(e.target.value); }}
                                        className="border border-gray-800 rounded p-2 w-full"
                                        onBlur={(e) => {
                                            let value = e.target.value;
                                            if (value.match(/(?:\"|\'|\;|\:|\)|\(|\\|\||\`|\$|\&|\^|\%|\#|\!|\+|\=|\[|\]|\}|\{)/g) !== null) {
                                                e.target.classList.add('animate-shake');
                                                setTimeout(() => {
                                                    e.target.classList.remove('animate-shake');
                                                }, 500); setRef("");
                                            }
                                            setReset((prev) => (prev + 1));
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-5 grid-rows-2 gap-3">
                                <div className="flex col-span-3 items-center space-x-4 mb-2">
                                    <label className="text-gray-700">Threshold Type:</label>
                                    <select value={thresholdType} onChange={(e) => { setThresholdType(e.target.value); setReset((prev) => (prev + 1)); }} className="border border-gray-800 rounded p-2 w-full">
                                        <option value="">Threshold Type</option>
                                        <option value="threshold">Threshold</option>
                                        <option value="limit">Limit</option>
                                        <option value="both">Both</option>
                                    </select>
                                </div>
                                <div className="flex col-span-2 items-center space-x-4 mb-2">
                                    <label className="text-gray-700">Track By:</label>
                                    <select value={thresholdTrack} onChange={(e) => { setThresholdTrack(e.target.value); setReset((prev) => (prev + 1)); }} className="border border-gray-800 rounded p-2 w-full">
                                        <option value="">Track By</option>
                                        <option value="by_src">By Source</option>
                                        <option value="by_dst">By Destination</option>
                                    </select>
                                </div>
                                <div className="flex  col-span-4 items-center space-x-4 ">
                                    <label className="text-gray-700">Count:</label>
                                    <input
                                        value={thresholdCount} onChange={(e) => { setThresholdCount(e.target.value); }} onBlur={(e) => {
                                            let value = e.target.value;
                                            if (value === "") { } else if (value.match(/^\d+$/g) === null) {
                                                e.target.classList.add('animate-shake');
                                                setTimeout(() => {
                                                    e.target.classList.remove('animate-shake');
                                                }, 500); setThresholdCount("");
                                            }
                                            setReset((prev) => (prev + 1));
                                        }}
                                        className="border border-gray-800 rounded p-2 w-full"
                                        placeholder="Count #"
                                    />
                                    <span className="text-gray-700">Seconds:</span>
                                    <input
                                        value={thresholdSeconds} onChange={(e) => { setThresholdSeconds(e.target.value); }} onBlur={(e) => {
                                            let value = e.target.value;
                                            if (value === "") { } else if (value.match(/^\d+$/g) === null) {
                                                e.target.classList.add('animate-shake');
                                                setTimeout(() => {
                                                    e.target.classList.remove('animate-shake');
                                                }, 500); setThresholdSeconds("");
                                            }
                                            setReset((prev) => (prev + 1));
                                        }}
                                        className="border border-gray-800 rounded p-2 w-full"
                                        placeholder="Seconds"
                                    />

                                </div>
                            </div>
                        </div>

                        {/* Regex Match */}
                        <div className="bg-green-100 p-2 rounded">
                            <h2 className="text-lg text-center font-bold mb-2">Regex Match</h2>

                            {/* Regex Match input field */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Regex Match:</label>
                                <input placeholder="Regex Match" type="text" value={regex} onChange={(e) => { setRegex(e.target.value) }} className="mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
                            </div>

                            {/* Checkboxes */}
                            <div className="mb-4 flex">
                                <div className="flex items-center mr-6 mb-2">
                                    <input type="checkbox" id="dotal" name="dotal" value={regexFlag.dotal}
                                        checked={regexFlag.dotal !== ""}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setRegexFlag(prev => ({ ...prev, dotal: "s" }))
                                            } else {
                                                setRegexFlag(prev => ({ ...prev, dotal: "" }))
                                            }
                                            setReset((prev) => (prev + 1));
                                        }} className="mr-1" />
                                    <label htmlFor="dotal" className="text-gray-700">Dotall (/s)</label>
                                </div>
                                <div className="flex items-center mb-2 mr-6">
                                    <input type="checkbox" id="nocase" name="nocase" value={regexFlag.nocase}
                                        checked={regexFlag.nocase !== ""}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setRegexFlag(prev => ({ ...prev, nocase: "i" }))
                                            } else {
                                                setRegexFlag(prev => ({ ...prev, nocase: "" }))
                                            }
                                            setReset((prev) => (prev + 1));
                                        }} className="mr-1" />
                                    <label htmlFor="nocase" className="text-gray-700">No Case</label>
                                </div>
                                <div className="flex items-center mb-2 mr-6">
                                    <input type="checkbox" id="greedy" name="greedy" value={regexFlag.greedy}
                                        checked={regexFlag.greedy !== ""}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setRegexFlag(prev => ({ ...prev, greedy: "G" }))
                                            } else {
                                                setRegexFlag(prev => ({ ...prev, greedy: "" }))
                                            }
                                            setReset((prev) => (prev + 1));
                                        }} className="mr-1" />
                                    <label htmlFor="greedy" className="text-gray-700">Greedy (/G)</label>
                                </div>
                                <div className="flex items-center mb-2 mr-6">
                                    <input type="checkbox" id="newline" name="newline" value={regexFlag.newline}
                                        checked={regexFlag.newline !== ""}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setRegexFlag(prev => ({ ...prev, newline: "m" }))
                                            } else {
                                                setRegexFlag(prev => ({ ...prev, newline: "" }))
                                            }
                                            setReset((prev) => (prev + 1));
                                        }} className="mr-1" />
                                    <label htmlFor="newline" className="text-gray-700">Newline (/m)</label>
                                </div>
                                <div className="flex items-center mb-2 mr-6">
                                    <input type="checkbox" id="whitespace" name="whitespace" value={regexFlag.whitespace}
                                        checked={regexFlag.whitespace !== ""}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setRegexFlag(prev => ({ ...prev, whitespace: "x" }))
                                            } else {
                                                setRegexFlag(prev => ({ ...prev, whitespace: "" }))
                                            }
                                            setReset((prev) => (prev + 1));
                                        }} className="mr-1" />
                                    <label htmlFor="whitespace" className="text-gray-700">Whitespace (/x)</label>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end">
                                <button onClick={() => { removeRegex(); setReset((prev) => (prev + 1)); }} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Back</button>
                                <button onClick={(e) => {
                                    if (!regex.replace(/\s/g, '').length) {
                                        e.target.classList.add('animate-shake'); setTimeout(() => { e.target.classList.remove('animate-shake'); }, 500)
                                    } else { addRegex({ regex, regexFlag }); setReset((prev) => (prev + 1)); }
                                }} className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
                            </div>
                        </div>
                    </div>
                </div >

            </div >

        </>


    );
}

export default RuleCreator;