import Api from "./api";

const UserServices = {
    login(data) {
        return Api().post(`/user/login`, data)
    },
    //admin
    createUser(data, token) {
        const headers = { Authorization: `Bearer ${token}` };
        return Api().post(`/user/add_user`, data, { headers })
    },
    updateInfoUser(user_id, data, token) {
        const headers = { Authorization: `Bearer ${token}` };
        return Api().post(`/user/update_info_user/${user_id}`, data, { headers })
    },
    updateStateUser(user_id, data, token) {
        const headers = { Authorization: `Bearer ${token}` };
        return Api().post(`/user/update_state_user/${user_id}`, data, { headers })
    },
    changePassUser(user_id, data, token) {
        const headers = { Authorization: `Bearer ${token}` };
        return Api().post(`/user/change_pass/${user_id}`, data, { headers });
    },
    getUsers(token) {
        const headers = { Authorization: `Bearer ${token}` };
        return Api().get(`/user/read_all`, { headers });
    },
    deleteUser(user_id, token) {
        const headers = { Authorization: `Bearer ${token}` };
        return Api().delete(`/user/delete/${user_id}`, { headers });
    },
    //user
    updateInfo(data, token) {
        const headers = { Authorization: `Bearer ${token}` };
        return Api().post(`/user/viewer/update_info`, data, { headers })
    },
    changPass(data, token) {
        const headers = { Authorization: `Bearer ${token}` };
        return Api().post(`/user/viewer/change_pass`, data, { headers })
    }
}
export default UserServices;

