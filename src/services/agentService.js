import Api from "./api";
// const headers = { Authorization: `Bearer ${token}` };
//         return Api().post(`/user/add_user`, data, { headers })
const AgentServices = {
    getAgents(token) {
        const headers = { Authorization: `Bearer ${token}` };
        return Api().get(`/agent/read_all`, { headers });
    },
    // getAgentsConnect() {
    //     const headers = { Authorization: `Bearer ${token}` };
    //     return Api().get(`/agent/read_all_connect`);
    // },
    deleteAgent(agent_id, token) {
        const headers = { Authorization: `Bearer ${token}` };
        return Api().delete(`/agent/delete/${agent_id}`, { headers });
    },
    createAgent(data, token) {
        const headers = { Authorization: `Bearer ${token}` };
        return Api().post(`/agent/add`, data, { headers })
    },
    updateAgent(data, token) {
        const headers = { Authorization: `Bearer ${token}` };
        return Api().post(`/agent/update/${data.agent_id}`, data, { headers })
    },
    // updateApikeyAgent(data) {
    //      const headers = { Authorization: `Bearer ${token}` };
    //     return Api().post(`/agent/update_apikey/${data.agent_id}`, data)
    // },
    getStatusAgent(data, token) {
        const headers = { Authorization: `Bearer ${token}` };
        return Api().post(`/agent/get_status`, data, { headers })
    }
}
export default AgentServices;
