var wishlist;

function init() {
    wishlist = [] // List of favorite ads
}

function create(id, title, description, cost, img, username, sessionId) {
    return new Favorite(id, title, description, cost, img, username, sessionId)
}

function save(favorite) {
    wishlist.push(favorite)
}

function find(ad) {
    for (let favorite of wishlist) {
        if (favorite.id == ad.id && favorite.sessionId == ad.sessionId) {
            return true;
        }
    }
    return false;
}

function getWishlist() {
    return wishlist;
}

class Favorite {
    constructor(id, title, description, cost, img, username, sessionId) {
        this.id = id
        this.title = title
        this.description = description
        this.cost = cost
        this.img = img
        this.username = username
        this.sessionId = sessionId
    }
}

module.exports = {init, create, save, find, getWishlist}