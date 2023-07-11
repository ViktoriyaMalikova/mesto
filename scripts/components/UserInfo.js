class UserInfo {
    constructor(configInfoProfile) {
        this._profileName = document.querySelector(configInfoProfile.profileNameSelector);
        this._profileJob = document.querySelector(configInfoProfile.profileJobSelector);
    }

    getUserInfo() {
        return { username: this._profileName.textContent, userjob: this._profileJob.textContent }

    }

    setUserInfo(dataUser) {
        this._profileName.textContent = dataUser.username;
        this._profileJob.textContent = dataUser.userjob;
    }

}

export { UserInfo };