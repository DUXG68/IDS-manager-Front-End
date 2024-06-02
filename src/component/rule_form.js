import React, { useState } from 'react';



const RuleForm = ({ agents, setContentForm, contentForm, infoForm, onSubmit, onCancel }) => {
    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        if (name === "agent_ids") {
            setContentForm(prevState => {
                const updatedAgentIds = checked
                    ? [...prevState.agent_ids, value]
                    : prevState.agent_ids.filter(id => id !== value);

                return {
                    ...prevState,
                    agent_ids: updatedAgentIds
                };
            });
        } else {
            setContentForm(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(contentForm, infoForm);
    };

    return (
        <div >
            <h2 className="text-2xl font-bold mb-4">{infoForm}</h2>
            <form onSubmit={handleSubmit}>
                {(infoForm === "Edit Rule") && (<>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Content Rule:</label>
                        <input type="text" name="content_rule" required value={contentForm.content_rule} onChange={handleChange} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                        <input type="text" name="description" required value={contentForm.description} onChange={handleChange} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    {/* <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Host IP:</label>
                        <input type="text" name="host_ip" required value={contentForm.host_ip} readOnly className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div> */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Rule State:</label>
                        <select name="rule_state" value={contentForm.rule_state || "disable"} onChange={handleChange} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="enable">Enable</option>
                            <option value="disable">Disable</option>
                        </select>
                    </div>

                    <div className="flex justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                        <button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
                    </div></>)}

                {(infoForm === "Add Rule") && (<>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Content Rule:</label>
                        <input type="text" name="content_rule" required value={contentForm.content_rule} onChange={handleChange} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                        <input type="text" name="description" required value={contentForm.description} onChange={handleChange} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Agent IP:</label>
                        {agents.map((agent) => (
                            <div key={agent.agent_id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={agent.agent_id}
                                    name="agent_ids"
                                    value={agent.agent_id}
                                    checked={contentForm.agent_ids.includes(agent.agent_id.toString())}
                                    onChange={handleChange}
                                    className="mr-2 leading-tight"
                                />
                                <label htmlFor={agent.agent_id} className="text-gray-700 text-sm">
                                    {agent.host_ip}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Rule State:</label>
                        <select name="rule_state" value={contentForm.rule_state || "disable"} onChange={handleChange} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="enable">Enable</option>
                            <option value="disable">Disable</option>
                        </select>
                    </div>

                    <div className="flex justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                        <button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
                    </div></>)}
            </form>
        </div>
    );
};

export default RuleForm;
