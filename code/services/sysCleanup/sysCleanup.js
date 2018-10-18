COLLECTIONS = ["historian_raw","historian"]
function sysCleanup(req, resp) {
  ClearBlade.init({request:req})

  for(i in COLLECTIONS){
    collection = ClearBlade.Collection({collectionName:COLLECTIONS[i]}).remove({},function(){})
  }
}