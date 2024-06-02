import React from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TbPlugConnected } from "react-icons/tb";
const AgentList = ({ agents, handleDeleteAgent, setContentForm, setShowForm, onCheckStatus }) => {
    return (
        <div className="">
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th scope="col" className="px-3 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                            STT
                        </th>
                        <th scope="col" className="px-3 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                            Host IP
                        </th>
                        <th scope="col" className="px-3 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                            Hostname
                        </th>
                        <th scope="col" className="px-3 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th scope="col" className="px-3 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {agents.map((agent, index) => (
                        <tr key={agent.agent_id} className="border-t  border-gray-300 hover:bg-gray-100">
                            <td className="p-2 text-base">{index + 1}</td>
                            {/* <td className="p-2 text-base">{agent.agent_id}</td> */}
                            <td className="p-2 text-base">{agent.host_ip}</td>
                            <td className="p-2 text-base">{agent.hostname}</td>
                            <td className={`p-2 text-base ${agent.status === 'Connected' ? 'text-green-500' : 'text-red-500'}`}>
                                {agent.status}
                            </td>
                            <td className="p-2 flex items-center">
                                <div className="flex space-x-2">
                                    <button
                                        className="flex items-center bg-blue-500 hover:bg-blue-700 text-white text-base font-bold py-1 px-2 rounded "
                                        onClick={() => {
                                            setContentForm(prevState => ({
                                                ...prevState,
                                                agent_id: agent.agent_id,
                                                host_ip: agent.host_ip,
                                                hostname: agent.hostname,
                                                apikey: agent.apikey,
                                                status: agent.status
                                            })); setShowForm({ infoForm: "Edit Agent", show: true });
                                        }}
                                    >
                                        <FaEdit className="mr-1" /> Edit
                                    </button>
                                    <button
                                        className="flex items-center bg-red-500 hover:bg-red-700 text-white text-base font-bold py-1 px-2 rounded"
                                        onClick={() => { handleDeleteAgent(agent.agent_id) }}
                                    >
                                        <MdDelete className="mr-1" />  Delete
                                    </button>
                                    <button
                                        className="flex items-center bg-purple-500 hover:bg-purple-700 text-white text-base font-bold py-1 px-2 rounded ml-2"
                                        onClick={() => onCheckStatus(agent)}
                                    >
                                        <TbPlugConnected className="mr-1" /> Connect
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AgentList;

