import React, { useState, useEffect } from "react";
import AgentForm from "../component/agent_form";
import AgentList from "../component/agent_list";
import AgentServices from '../services/agentService';
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';


function Agent() {
    const notifySuccessVar = (success) => { toast.success(`${success}`) };
    const notifyError = () => toast.error("Thông tin chưa đầy đủ hoặc chưa chính xác");
    const notifyErrorVar = (error) => toast.error(`ERROR: ${error} `);
    const ipRegex = /^((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))$/;


    const [agents, setAgents] = useState([])
    const [showForm, setShowForm] = useState({ infoForm: "", show: false });
    const [contentForm, setContentForm] = useState({
        agent_id: '',
        host_ip: '',
        hostname: '',
        apikey: '',
        status: 'Disconnected'
    });

    const handleSubmitForm = (newAgent, infoForm) => {
        if (!ipRegex.test(newAgent.host_ip) || !newAgent.hostname.trim() || !newAgent.apikey.trim()) {//check info Form
            notifyErrorVar("Information is not correct format");
        } else {
            if (infoForm === "Add Agent") {
                const getAgentID = async (newAgent) => {
                    try {
                        const responseGetAgentID = await AgentServices.createAgent(newAgent)
                        if (responseGetAgentID.data.result.agent_id) {
                            notifySuccessVar("Create Agent Success!");
                            newAgent = { ...newAgent, agent_id: responseGetAgentID.data.result.agent_id }
                            setAgents([...agents, newAgent]);
                            setShowForm({ ...showForm, show: false });
                            setContentForm({
                                agent_id: '',
                                host_ip: '',
                                hostname: '',
                                apikey: '',
                                status: 'Disconnected'
                            })
                        } else { notifyErrorVar('Agent information already exists') }
                    } catch (error) {
                        notifyErrorVar(`Lỗi khi gọi API add agent:${error}`)
                    }
                };
                getAgentID(newAgent)

            } else {
                const updateAgent = async (newAgent) => {
                    try {
                        const updatedAgents = agents.map(agent => {
                            if (agent.agent_id === newAgent.agent_id) {
                                return { ...newAgent };
                            }
                            return agent;
                        });
                        const responseUpdateAgent = await AgentServices.updateAgent(newAgent)
                        if (responseUpdateAgent.data.result === "Success") {
                            setAgents(updatedAgents);
                            notifySuccessVar("Edit Agent Success!");
                            setShowForm({ ...showForm, show: false });
                            setContentForm({
                                agent_id: '',
                                host_ip: '',
                                hostname: '',
                                apikey: '',
                                status: 'Disconnected'
                            })
                        } else {
                            notifyErrorVar("Agent information already exists")
                        }
                    } catch (error) {
                        notifyErrorVar(`Lỗi khi gọi API edit agent:${error}`);
                    }
                };
                updateAgent(newAgent);
            }
        }
    };

    const handleDeleteAgent = (agent_id) => {
        confirmAlert({
            customUI: ({ onClose }) => (
                <div className="fixed inset-0 flex items-center justify-center overflow-auto z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                        <h1 className="text-xl font-bold mb-4">DELETE AGENT</h1>
                        <p className="text-gray-700 mb-4">Are you sure you want to delete Agent?</p>
                        <div className="flex justify-end">
                            <button
                                className="bg-red-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={() => {
                                    const filteredAgents = agents.filter(agent => agent.agent_id !== agent_id);
                                    setAgents(filteredAgents)
                                    const deleteAgent = async (agent_id) => { //gọi api xóa phần từ có rule_id trong db
                                        try {
                                            const resdelete = await AgentServices.deleteAgent(agent_id)
                                            console.log({ resdelete: resdelete })
                                        } catch (error) {
                                            notifyErrorVar(`Lỗi khi gọi API delete agent:${error}`)
                                        }
                                    };
                                    deleteAgent(agent_id);
                                    onClose();
                                    notifySuccessVar("Delete Agent Success!");
                                }}
                            >
                                Yes
                            </button>
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                                onClick={onClose}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )
        });
    };

    const handleCheckStatus = (agent) => {
        const checkAgentID = async (agent) => {
            try {
                const responseCheckAgentID = await AgentServices.getStatusAgent(agent)
                if (responseCheckAgentID.data.result === "success") {
                    const updateAgent = async (newAgent) => {
                        try {
                            const updatedAgents = agents.map(agent => {
                                if (agent.agent_id === newAgent.agent_id) {
                                    return { ...newAgent, status: "Connected" };
                                }
                                return agent;
                            });
                            const responseUpdateAgent = await AgentServices.updateAgent({ ...newAgent, status: "Connected" })
                            if (responseUpdateAgent.data.result === "Success") {
                                notifySuccessVar("Connected Success");
                                setAgents(updatedAgents);
                            } else {
                                notifyErrorVar("Update Fail")
                            }

                        } catch (error) {
                            notifyErrorVar(`Lỗi khi gọi API edit agent:${error}`)
                        }
                    };
                    updateAgent(agent);
                } else {
                    const updateAgent = async (newAgent) => {
                        try {
                            const updatedAgents = agents.map(agent => {
                                if (agent.agent_id === newAgent.agent_id) {
                                    return { ...newAgent, status: "Disconnected" };
                                }
                                return agent;
                            });
                            const responseUpdateAgent = await AgentServices.updateAgent({ ...newAgent, status: "Disconnected" })
                            if (responseUpdateAgent.data.result === "Success") {
                                setAgents(updatedAgents);
                            } else {
                                notifyErrorVar("Update Fail")
                            }
                        } catch (error) {
                            notifyErrorVar(`Lỗi khi gọi API edit agent:${error}`)
                        }
                    };
                    if (agent.status === "Connected") {
                        updateAgent(agent);
                    }
                    notifyErrorVar("Check status fail")
                }

            } catch (error) {
                notifyErrorVar(`Lỗi khi gọi API check agent:${error}`)
            }
        };

        checkAgentID(agent)
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                let responseAgent = []
                responseAgent = await AgentServices.getAgents()
                setAgents(responseAgent.data.result)
            } catch (error) {
                notifyErrorVar(`Lỗi khi gọi API :${error}`)
            }
        };
        fetchData();
    }, [])

    return (
        < >
            <ToastContainer position="top-center" />
            <div className="flex items-center justify-between  py-2  ">
                <h1 className="text-2xl font-bold m-4">Agent Management</h1>
                <button
                    className="text-base bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded"
                    onClick={() => setShowForm({ infoForm: "Add Agent", show: true })}
                >
                    + Add Agent
                </button>
            </div>
            {showForm.show && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-auto">
                        <AgentForm setContentForm={setContentForm} infoForm={showForm.infoForm} contentForm={contentForm} onSubmit={handleSubmitForm} onCancel={() => {
                            setShowForm({ ...showForm, show: false }); setContentForm({
                                agent_id: '',
                                host_ip: '',
                                hostname: '',
                                apikey: '',
                                status: 'Disconnected'
                            })
                        }} />
                    </div></div>
            )
            }


            <AgentList agents={agents} setContentForm={setContentForm} handleDeleteAgent={handleDeleteAgent} setShowForm={setShowForm} onCheckStatus={handleCheckStatus} />
        </>
    );
}

export default Agent;


