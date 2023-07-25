class UserInfo {
    constructor(configInfoProfile) {
        this._profileName = document.querySelector(configInfoProfile.profileNameSelector);
        this._profileJob = document.querySelector(configInfoProfile.profileJobSelector);
        this._profileAvartar = document.querySelector(configInfoProfile.profileAvatarSelector);
    }

    getUserInfo() {
        return { username: this._profileName.textContent, userjob: this._profileJob.textContent }
    }

    setUserInfo({ username, userjob, linkavatar }) {
        this._profileAvartar.src = linkavatar;
        this._profileName.textContent = username;
        this._profileJob.textContent = userjob;
    }

    setId(id) {
        this._id = id;
    }

    getId() {
        return this._id;
    }

}

export { UserInfo };