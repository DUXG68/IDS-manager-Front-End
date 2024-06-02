import React from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
const RuleList = ({ handleStateRule, handleDeleteRule, setContentForm, setShowForm, rules }) => {

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-400">
                <thead className="bg-gray-200">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                            STT
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                            State
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white  ">
                    {rules.map((rule, index) => (
                        <tr className="border-t border-gray-300 hover:bg-gray-100" key={rule.rule_id}>
                            <td className="px-6 py-4 whitespace-nowrap text-base">{index + 1}</td>
                            <td className="max-w-xs overflow-hidden px-6 py-4 whitespace-pre-wrap text-base">{rule.description}</td>
                            {/* <td className="px-6 py-4 whitespace-nowrap">{rule.rule_state}</td> */}
                            <td className={`px-6 py-4 whitespace-nowrap font-bold text-base ${rule.rule_state === 'enable' ? 'text-green-500' : 'text-red-500'}`}>
                                {rule.rule_state.toUpperCase()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-base font-medium">
                                <div className="flex space-x-2">
                                    <button onClick={() => {
                                        ; setContentForm(prevState => ({
                                            ...prevState,
                                            rule_id: rule.rule_id,
                                            host_ip: rule.host_ip,
                                            rule_state: rule.rule_state,
                                            description: rule.description,
                                            content_rule: rule.content_rule,
                                            agent_id: rule.agent_id
                                        })); setShowForm({ infoForm: "Edit Rule", show: true });
                                    }} className="flex items-center bg-blue-500 hover:bg-blue-700 text-white text-base font-bold py-1 px-2 rounded "><FaEdit className="mr-1" /> Edit</button>
                                    <button className="flex items-center bg-red-500 hover:bg-red-700 text-white text-base font-bold py-1 px-2 rounded" onClick={() => handleDeleteRule(rule.rule_id)}><MdDelete className="mr-1" /> Delete</button>
                                    <button className={`ml-2 text-base font-bold ${rule.rule_state === 'enable' ? 'bg-gray-500 hover:bg-gray-700' : 'bg-green-500 hover:bg-green-700'} text-white px-2 py-1 rounded`} onClick={() => handleStateRule(rule.rule_id, rule.rule_state)}>{rule.rule_state === 'enable' ? 'Disable' : 'Enable'}</button>

                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
};

export default RuleList;
