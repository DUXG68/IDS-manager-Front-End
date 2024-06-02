import Api from "./api";

const RuleServices = {//ở UI sẽ dùng async await để gọi api

    createNewCourse(teacherId, token) {
        const headers = { Authorization: `Bearer ${token}` };
        return Api().post(
            `/course/create-course`,
            { teacherId: teacherId },
            {
                headers,
            }
        );
    },
    //cách truyền body và token
    postFeedback(data, token) {
        const headers = { Authorization: `Bearer ${token}` };
        return Api().post("/api/Feedback/create", data, { headers });
    },
    // ***************************************************************************
    getRuleFromAgent(agent_id) {
        return Api().get(`/rule/read_all/${agent_id}`);
    },
    deleteRule(rule_id) {//xóa rule theo rule_id 
        return Api().delete(`/rule/delete/${rule_id}`);
    },
    createRule(data) {//tạo rule và trả về rule_id
        return Api().post("/rule/add_rule", data)
    },
    createManyRule(data) {//tạo rule và trả về rule_id
        return Api().post("/rule/add_rule_many_agent", data)
    },
    createRuleManyAgent(data) {
        return Api().post("/rule/add_rule_many_agent", data)
    }
    ,
    updateRule(data) {//tạo rule và trả về rule_id
        return Api().post("/rule/update", data)
    }
    ,
    updateRuleState(data) {//cập nhật state thay đổi
        return Api().post("/rule/update_state", data)
    },
    saveAgentRule(data) {//chưa hoàn thành do cần thêm api của agent truyền hết thông tin của agent
        return Api().post("/rule/save_agent", data)
    }


};

export default RuleServices;
