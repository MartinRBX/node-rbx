const getUserProfile = require('./getUserProfile.js')
const EventEmitter = require('events');


class UserStatusChangeEvent extends EventEmitter {
    constructor(userId, opts) {
        super()
        var settings = settings || {}
        this.interval;
        this.intervalWait = settings.interval || 5000;
        this.init(userId);
    }


    init(userId) {
        getUserStatus(userId).then(status => {
            if (!status) return;
            global.Statuses[userId] = status;
        })

        this.interval = setInterval(() => {
            getUserStatus(userId).then(userStatus => {
                if (!userStatus) return;

                if (userStatus != global.Statuses[userId]) {
                    this.emit('change', userStatus, global.Statuses[userId]);
                    global.Statuses[userId] = userStatus;
                }
            })
        }, this.intervalWait)
    }


    stop() {
        clearInterval(this.interval)
        return true;
    }
}


module.exports = UserStatusChangeEvent;
async function getUserStatus(id) {
    var newPromise = new Promise(function (resolve, reject) {
        var userId = id//.valueOf()
        getUserProfile(userId).then(profile => {
            if (!profile || !profile.Status) resolve(null);
            let status = profile.Status
            resolve(status);
        })
    })

    return newPromise
}