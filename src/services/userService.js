import Api from "./api";

const UserServices = {
    login(data) {
        return Api().post(`/user/login`, data)
    },
    //admin
    // createUser(data, token) {
    createUser(data) {
        // const headers = { token: token };
        // const headers = { Authorization: `Bearer ${token}` };
        // return Api().post(`/user/add_user`, data, { headers })
        return Api().post(`/user/add_user`, data)
    },
    updateInfoUser(user_id, data) {
        return Api().post(`/user/update_info_user/${user_id}`, data)
    },
    updateStateUser(user_id, data) {
        return Api().post(`/user/update_state_user/${user_id}`, data)
    },
    changePassUser(user_id, data) {
        return Api().post(`/user/change_pass/${user_id}`, data);
    },
    getUsers() {
        return Api().get(`/user/read_all`);
    },
    deleteUser(user_id) {//xóa rule theo rule_id 
        return Api().delete(`/user/delete/${user_id}`);
    },
    //user
    updateInfo(data) {
        return Api().post(`/user/viewer/update_info`, data)
    },
    changPass(data) {
        return Api().post(`/user/viewer/change_pass`, data)
    }
}
export default UserServices;

// //user, authenticate, authoriry
// router.post("/user/login", userController.login)                      // trả về role, user_id, name, token chứa thông tin role
// //admin
// router.post("/user/add_user", userController.add_user)                                  //done
// router.post("/user/update_info_user/:user_id", userController.update_info_user)        //done
// router.post("/user/change_pass/:user_id", userController.update_password_user)          //done
// router.get("/user/read_all", userController.read_all)                                   //done
// router.delete("/user/delete/:user_id", userController.delete_user);                  //done
// //user
// router.post("/user/viewer/update_info", userController.update_info)         // done
// router.post("/user/viewer/change_pass", userController.update_password)         // done
// router.get("/jwt", AuthenticateJWT.auth, alertController.info)

