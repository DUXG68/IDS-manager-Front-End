import Api from "./api";

const AlertServices = {
    getAlerts(data, currentPage) {
        return Api().post(`/alert/get_all/${currentPage}`, data)
    },
    getAlertsCount(data) {
        return Api().post(`/alert/statis_time`, data)
    },
    getAlertsClass(data, currentPage) {
        return Api().post(`/alert/statis_sid`, data)
    }

}
export default AlertServices;
