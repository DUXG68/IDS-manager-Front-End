import Api from "./api";

const AgentServices = {
    getAgents() {
        return Api().get(`/agent/read_all`);
    },
    getAgentsConnect() {
        return Api().get(`/agent/read_all_connect`);
    },
    deleteAgent(agent_id) {//xóa rule theo rule_id 
        return Api().delete(`/agent/delete/${agent_id}`);
    },
    createAgent(data) {
        return Api().post(`/agent/add`, data)
    },
    updateAgent(data) {
        return Api().post(`/agent/update/${data.agent_id}`, data)
    },
    updateApikeyAgent(data) {
        return Api().post(`/agent/update_apikey/${data.agent_id}`, data)
    },
    getStatusAgent(data) {
        return Api().post(`/agent/get_status`, data)
    }
}
export default AgentServices;
