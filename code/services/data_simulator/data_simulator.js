deviceids=["EC-E8-CF-7D-70-72",
          "B3-E6-7C-33-85-15",
          "11-43-CE-47-EC-18"]

TOPIC="data/devicetype"

function data_simulator(req, resp) {
  ClearBlade.init({request:req});
  deviceids.forEach(function(id){
    generateData(id);
  });
  resp.success('Success');
}

function generateData(deviceid) {
  msg=ClearBlade.Messaging();
  payload={};
  payload.deviceid=deviceid;
  payload.temp=(getRandomArbitrary(900,1020)/10).toFixed(2);
  payload.battery=(getRandomArbitrary(900,1000)/10).toFixed(2);
  payload.steps=getRandomArbitrary(0,20).toFixed(0); //Need to increment
  payload.stress=getRandomArbitrary(0,10).toFixed(0);
  payload.heartrate=getRandomArbitrary(50,100).toFixed(0);
  msg.publish(TOPIC + "/" + payload.deviceid, JSON.stringify(payload));
}


function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}