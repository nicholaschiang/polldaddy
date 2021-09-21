const axios = require('axios');
const to = require('await-to-js');

async function main() {
  const [err, res] = await to(axios.post({
    url: 'https://prebid-server.rubiconproject.com/openrtb2/auction',
    data:
      {"id":"2df59b64-63ab-4da7-b335-98e3860c5e35","test":0,"cur":["USD"],"source":{"tid":"2df59b64-63ab-4da7-b335-98e3860c5e35","ext":{"schain":{"complete":1,"ver":"1.0","nodes":[{"asi":"outbrain.com","sid":"00b194f0e7340e0e266280fea4996c8243","hp":1}]}}},"tmax":5000,"imp":[{"id":"5d5e8993394ce40004d20f8eh8589727660","secure":1,"ext":{"rubicon5d4bdc509db69a0004884a6a":{"accountId":19668,"siteId":278242,"zoneId":1389838,"floor":5,"inventory":{"publisher_id":["6232"],"source_id":["248358"],"widget_name":["AR_3"]},"video":{"playerHeight":"315","playerWidth":"560","size_id":203,"mimes":["video/mp4","application/javascript","video/webm"],"protocols":[2,3,5,6],"api":[2],"linearity":1,"maxduration":60}},"prebid":{"auctiontimestamp":1632251219859}},"video":{"playerSize":[[560,315]],"context":"outstream","mimes":["video/mp4","application/javascript","video/webm"],"protocols":[2,3,5,6],"maxduration":60,"minduration":0,"startdelay":0,"linearity":1,"api":[2],"placement":3,"playerHeight":"${player.height}","playerWidth":"${player.width}","size_id":203,"w":"560","h":"315"},"bidfloor":5}],"ext":{"prebid":{"channel":{"name":"pbjs","version":"v5.7.0"},"cache":{"vastxml":{"returnCreative":false}},"targeting":{"includewinners":true,"includebidderkeys":false,"pricegranularity":{"ranges":[{"max":20,"increment":0.1}]}},"bidders":{"rubicon":{"integration":"pbjs"}},"aliases":{"rubicon5d4bdc509db69a0004884a6a":"rubicon"}}},"site":{"page":"https://www.mercurynews.com/2021/09/20/vote-now-bay-area-news-group-boys-athlete-of-the-week-11/","ext":{"data":{"publisher_id":["6232"],"source_id":["248358"],"widget_name":["AR_3"]}}},"regs":{"ext":{"us_privacy":"1YNY"}},"user":{"ext":{"data":{}}}},
  }));
  debugger;
}

main();
