TABLE="historian_raw";

function processRawDataMessage(req, resp) {
  ClearBlade.init({ request: req });
  row={};
  row.raw_data = req.params.body;
  row.timestamp = Math.floor(Date.now()/1000);
  row.deviceid=JSON.parse(req.params.body).deviceid

  var callback = function (err, data) {
    if (err) {
      resp.error("creation error : " + JSON.stringify(data));
    } else {
      resp.success(data);
    }
  };

  var col = ClearBlade.Collection({ collectionName: TABLE });
  col.create(row, callback);
}
