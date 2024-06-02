import React, { useState } from 'react';
import cryptoRandomString from 'crypto-random-string';
const AgentForm = ({ setContentForm, infoForm, contentForm, onSubmit, onCancel }) => {

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        console.log({ name, value })
        setContentForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const generateApiKeyForm = () => {
        let generatedKey = cryptoRandomString({ length: 32, type: 'alphanumeric' });
        setContentForm(prevState => ({
            ...prevState,
            apikey: generatedKey
        }));
    };

    const copyApiKey = () => {
        navigator.clipboard.writeText(contentForm.apikey);
        alert('API Key copied to clipboard!');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(contentForm, infoForm);
    };

    return (
        <div className="container mx-auto mt-10 bg-white ">
            <h2 className="text-2xl mb-4">{infoForm}</h2>
            <form form onSubmit={handleSubmit} >
                <div className="mb-4">
                    <label htmlFor="hostIp" className="block text-sm font-medium text-gray-700">Host IP:</label>
                    <input
                        type="text"
                        name="host_ip"
                        required
                        value={contentForm.host_ip} onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="hostname" className="block text-sm font-medium text-gray-700">Hostname:</label>
                    <input
                        type="text"
                        name="hostname"
                        required
                        value={contentForm.hostname} onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">API Key:</label>
                    <input
                        type="text"
                        name="apikey"
                        required
                        value={contentForm.apikey} onChange={handleChange}
                        // readOnly
                        className="mt-1 p-2 border rounded-md flex-grow ml-2"
                    />
                    <button type="button" onClick={copyApiKey} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md ml-2">Copy</button>
                </div>
                <div className="mb-6">
                    <button type="button" onClick={generateApiKeyForm} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mr-2">Generate API Key</button>
                    <button type="submit" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2">Submit</button>
                    <button type="button" onClick={onCancel} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
                </div>
            </form >
        </div >
    );
};

export default AgentForm;
