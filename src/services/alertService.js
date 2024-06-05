import Api from "./api";

const AlertServices = {
    getAlerts(data, currentPage, token) {
        const headers = { Authorization: `Bearer ${token}` };
        return Api().post(`/alert/get_all/${currentPage}`, data, { headers })
    },
    getAlertsCount(data, token) {
        const headers = { Authorization: `Bearer ${token}` };
        return Api().post(`/alert/statis_time`, data, { headers })
    },
    getAlertsClass(data, token) {
        const headers = { Authorization: `Bearer ${token}` };
        return Api().post(`/alert/statis_sid`, data, { headers })
    }

}
export default AlertServices;
