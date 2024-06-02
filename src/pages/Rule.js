import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert';
import RuleList from '../component/rule_list';
import RuleForm from '../component/rule_form';
import RuleServices from '../services/ruleService'
import AgentServices from '../services/agentService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FaSave } from "react-icons/fa";

// import { useNavigate, useParams } from 'react-router-dom'
const RulePage = () => {
    const navigation = useNavigate()
    // const { indexAgent } = useParams()
    const ipRegex = /^((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))$/;
    const notifySuccessVar = (e) => { toast.success(e) };
    const notifyError = () => toast.error("Thông tin chưa đầy đủ hoặc chưa chính xác");
    const notifyErrorVar = (error) => toast.error(`ERROR: ${error} `);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [agents, setAgents] = useState([]);
    const [rules, setRules] = useState([]);
    const [showForm, setShowForm] = useState({ infoForm: "", show: false, memo_id: 0 });
    const [contentForm, setContentForm] = useState({
        rule_id: '',
        content_rule: '',
        host_ip: '',
        rule_state: 'disable',
        description: 'Fill in additional description',
        agent_id: 0,
        agent_ids: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                let responseAgent = []
                let responseRule = []
                if (agents.length === 0) {
                    navigation("/rule/0")
                    // responseAgent = await AgentServices.getAgentsConnect()
                    responseAgent = await AgentServices.getAgents()
                    setAgents(responseAgent.data.result)
                    responseRule = await RuleServices.getRuleFromAgent(responseAgent.data.result[currentIndex].agent_id)
                    setRules(responseRule.data.result)
                } else {
                    responseRule = await RuleServices.getRuleFromAgent(agents[currentIndex].agent_id)
                    setRules(responseRule.data.result)
                }
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        };
        fetchData();

    }, [currentIndex])


    const handleRuleForm = (newRule, infoForm) => {
        if (!newRule.content_rule.trim() || !ipRegex.test(newRule.host_ip)) {
            notifyError();
        } else {
            if (infoForm === "Add Rule") {
                const getRuleID = async (newRule) => {
                    if (newRule.agent_ids.length !== 0) {
                        try {
                            const responseGetRuleID = await RuleServices.createManyRule(newRule)
                            if (responseGetRuleID.data.result.rule_id) {
                                newRule = { ...newRule, rule_id: responseGetRuleID.data.result.rule_id }
                                setRules([...rules, newRule]);
                                setShowForm({ ...showForm, show: false });
                                setContentForm({
                                    rule_id: '',
                                    content_rule: '',
                                    host_ip: '',
                                    rule_state: 'disable',
                                    description: 'Fill in additional description',
                                    agent_id: 0,
                                    agent_ids: []
                                })
                            } else if (responseGetRuleID.data.result === "Success!") {
                                setShowForm({ ...showForm, show: false });
                                setContentForm({
                                    rule_id: '',
                                    content_rule: '',
                                    host_ip: '',
                                    rule_state: 'disable',
                                    description: 'Fill in additional description',
                                    agent_id: 0,
                                    agent_ids: []
                                })
                                notifySuccessVar(responseGetRuleID.data.result)
                            } else {
                                notifyErrorVar(responseGetRuleID.data.result)
                            }
                        } catch (error) {
                            notifyErrorVar(`Lỗi khi gọi API: add rule ${error}`);
                        }
                    } else {
                        notifyErrorVar("Please fill Agents")
                    }
                    ;
                }
                getRuleID(newRule);
            } else {
                const UpdateRule = async () => {
                    try {
                        const updatedRules = rules.map(rule => {
                            if (rule.rule_id === newRule.rule_id) {
                                return { ...newRule };
                            }
                            return rule;
                        });
                        setRules(updatedRules);
                        const responseUpdateRule = await RuleServices.updateRule(newRule)
                        notifySuccessVar("Edit Rule Success!");
                        setShowForm({ ...showForm, show: false });
                        setContentForm({
                            rule_id: '',
                            content_rule: '',
                            host_ip: '',
                            rule_state: 'disable',
                            description: 'Fill in additional description',
                            agent_id: 0,
                            agent_ids: []
                        })
                    } catch (error) {
                        notifyErrorVar(error)
                        console.error('Lỗi khi gọi API: edit rule', error);
                    }
                };
                UpdateRule();

            }
        }
    };

    const handleDeleteRule = (rule_id) => {
        confirmAlert({
            customUI: ({ onClose }) => (
                <div className="fixed inset-0 flex items-center justify-center overflow-auto z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                        <h1 className="text-xl font-bold mb-4">DELETE RULE</h1>
                        <p className="text-gray-700 mb-4">Are you sure you want to delete Rule?</p>
                        <div className="flex justify-end">
                            <button
                                className="bg-red-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={() => {
                                    const filteredRules = rules.filter(rule => rule.rule_id !== rule_id);
                                    setRules(filteredRules)
                                    console.log("Delete Rule")
                                    const deleteRule = async () => { //gọi api xóa phần từ có rule_id trong db
                                        try {
                                            await RuleServices.deleteRule(rule_id)
                                        } catch (error) {
                                            console.error('Lỗi khi gọi API: delete rule', error);
                                        }
                                    };
                                    deleteRule();
                                    onClose();
                                    notifySuccessVar("Delete Rule Success!");
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

    const handleStateRule = (rule_id, rule_state) => {
        const updateState = async () => {
            try {
                rule_state = rule_state === "disable" ? "enable" : "disable";
                await RuleServices.updateRuleState({ rule_id: rule_id, rule_state: rule_state })
                const updatedRules = rules.map(rule => {
                    if (rule.rule_id === rule_id) {
                        return { ...rule, rule_state };
                    }
                    return rule;
                });
                setRules(updatedRules)


            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        };
        updateState();
    }

    const handleChangeAgent = (e) => {
        e.preventDefault();
        const indexAgent = e.target.selectedIndex;
        console.log({ indexAgent })
        setCurrentIndex(indexAgent)
        navigation(`/rule/${indexAgent}`);
        //chỉnh sửa params tương ứng với index
    };

    const handleSaveAgentRule = (currentIndex) => {
        const saveRuleAgent = async () => {
            try {
                const agentInfo = agents[currentIndex]
                const res = await RuleServices.saveAgentRule(agentInfo)
                if (res.data.result === "success") {
                    notifySuccessVar("Save Success")
                } else {
                    notifyErrorVar("Check the agent's INFORMATION or CONNECT")
                }
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
                notifyErrorVar(error)
            }
        };
        saveRuleAgent();


    }

    return (
        <div >
            <ToastContainer position="top-center" />
            <div className="w-full ">
                <div className="flex items-center justify-between  py-2 ">
                    <h1 className="text-2xl font-bold m-4 ">Rule Management</h1>
                    <button
                        className="text-base bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded"
                        onClick={() => { if (agents.length !== 0) { setShowForm({ infoForm: "Add Rule", show: true }) } else { notifyErrorVar("Null Agents") } }}
                    >

                        + Add Rule
                    </button>
                </div>

                <div className="flex justify-between items-center py-4 bg-gray-200">
                    <div className="flex items-center border-[2px] border-gray-400 rounded ml-8 ">
                        <select className=" py-1 px-1" onChange={handleChangeAgent}>
                            {agents.length !== 0 ? agents.map(agent => (
                                <option key={agent.agent_id} value={agent.agent_id}>{agent.hostname} - {agent.host_ip}</option>
                            )) : <option >Null - Null</option>}
                        </select>
                    </div>
                    <button
                        className="flex items-center text-base bg-blue-500 hover:bg-blue-700 text-white font-bold mr-8 py-2 px-4 rounded-full"
                        onClick={() => { if (agents.length !== 0) { handleSaveAgentRule(currentIndex) } else { notifyErrorVar("Null Agents") } }}
                    >

                        <FaSave className="mr-1" />  Save to Agent
                    </button>
                </div>
            </div>
            <div >
                <RuleList handleStateRule={handleStateRule} handleDeleteRule={handleDeleteRule} setContentForm={setContentForm} setShowForm={setShowForm} rules={rules} />
                {showForm.show && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
                            <RuleForm agents={agents} setContentForm={setContentForm} contentForm={{ ...contentForm, host_ip: agents[currentIndex].host_ip, agent_id: agents[currentIndex].agent_id }} infoForm={showForm.infoForm} onSubmit={handleRuleForm} onCancel={() => {
                                setShowForm({ ...showForm, show: false }); setContentForm({
                                    rule_id: '',
                                    content_rule: '',
                                    host_ip: '',
                                    rule_state: 'disable',
                                    description: 'Fill in additional description',
                                    agent_id: 0,
                                    agent_ids: []
                                })
                            }} />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default RulePage;