TABLE = "historian";

function processDataMessage(req, resp) {
  ClearBlade.init({ request: req });
  dataObj = JSON.parse(req.params.body);
  row = {};
  row.deviceid = dataObj.deviceid
  row.temp = parseFloat(dataObj.temp);
  row.stress = parseInt(dataObj.stress);
  row.battery = parseFloat(dataObj.battery);
  row.heartrate = parseInt(dataObj.heartrate);
  row.steps = parseInt(dataObj.steps);
  row.timestamp = Math.floor(Date.now() / 1000);
  log(JSON.stringify(row));

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
