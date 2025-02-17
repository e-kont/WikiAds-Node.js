var loggedIn = null

function init() {
    sessionId = null
}

function create(username, password) {
    return new User(username, password)
}

class User {
    constructor(username, password) {
        this.username = username
        this.password = password
    }
}

function login(user) {
    loggedIn = user;
}

function getUser() {
    return loggedIn
}

module.exports = {init, create, login, getUser}