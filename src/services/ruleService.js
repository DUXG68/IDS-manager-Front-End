import Api from "./api";

const RuleServices = {
    getRuleFromAgent(agent_id, token) {
        const headers = { Authorization: `Bearer ${token}` };
        return Api().get(`/rule/read_all/${agent_id}`, { headers });
    },
    deleteRule(rule_id, token) {
        const headers = { Authorization: `Bearer ${token}` };
        return Api().delete(`/rule/delete/${rule_id}`, { headers });
    },
    createManyRule(data, token) {
        const headers = { Authorization: `Bearer ${token}` };
        return Api().post("/rule/add_rule_many_agent", data, { headers })
    },
    updateRule(data, token) {
        const headers = { Authorization: `Bearer ${token}` };
        return Api().post("/rule/update", data, { headers })
    }
    ,
    updateRuleState(data, token) {
        const headers = { Authorization: `Bearer ${token}` };
        return Api().post("/rule/update_state", data, { headers })
    },
    saveAgentRule(data, token) {
        const headers = { Authorization: `Bearer ${token}` };
        return Api().post("/rule/save_agent", data, { headers })
    }
    // createRule(data) {
    //     return Api().post("/rule/add_rule", data)
    // },
    // createRuleManyAgent(data) {
    //     return Api().post("/rule/add_rule_many_agent", data)
    // }
    // ,


};

export default RuleServices;
