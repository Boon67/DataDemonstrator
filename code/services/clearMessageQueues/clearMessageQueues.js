var _resp;

function clearMessageQueues(req, resp) {
    _resp = resp;
    //This erases the messages from the messagequeue to prevent overrunning storage on the micro instance.
    ClearBlade.init({ request: req });
    var topics;
    _getMessageTopics()
        .then(function (r) {
            topics = r;
            log("Topic Count:" + r.length);
            var msg = ClearBlade.Messaging();
            for (var i = 0; i < topics.length; i++) {
                msg.getAndDeleteMessageHistory(topics[i], 0, null, null, null, callback);
            }

        })
        .catch(function (result) { _resp.error(result) });
}

function _deleteTopic(topic) {
    var msg = ClearBlade.Messaging();
    d = Q.defer();
    var cb = function (err, result) {
        if (err) {
            d.reject(err);
        } else {
            d.resolve(result);
        }
    };
    log(topic);
    msg.getCurrentTopics(cb);
    return d.promise;
}


function _getMessageTopics() {
    var msg = ClearBlade.Messaging();
    d = Q.defer();
    var cb = function (err, result) {
        if (err) {
            d.reject(new Error(result));
        } else {
            d.resolve(result);
        }
    };
    msg.getCurrentTopics(cb);
    return d.promise;
}

function runQuery(q) {
    promiseQuery(q).then(function (r) {
        _resp.success(r);
    })
        .catch(function (err) {
            _resp.error(err);
        });
}
