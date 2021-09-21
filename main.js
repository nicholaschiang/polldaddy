const axios = require('axios');
const { to } = require('await-to-js');
const progress = require('cli-progress');
const Bottleneck = require('bottleneck');

async function main(total = 100) {
  console.log(`Voting ${total} times...`);
  const limiter = new Bottleneck({ maxConcurrent: 100 });
  let count = 0;
  const bar = new progress.SingleBar({}, progress.Presets.shades_classic);
  bar.start(total, count);
  limiter.on('done', () => bar.update((count += 1)));
  limiter.on('failed', async (error, jobInfo) => {
    console.error(`Job (${jobInfo.options.id}) failed:`, error);
    if (jobInfo.retryCount < 10) {
      console.log(`Retrying job (${jobInfo.options.id}) in 100ms...`);
      return 100;
    }
  });
  limiter.on('retry', (error, jobInfo) => {
    console.log(`Now retrying job (${jobInfo.options.id})...`);
  });
  await Promise.all(Array(total).fill(null).map((_, id) => limiter.schedule({ id }, axios, {
      method: 'get',
      url: 'https://poll.fm/vote',
      params: {
        va: 20,
        pt: 0,
        r: 0,
        p: 10924113,
        a: '50270630,',
        o: '',
        //t: 10427, // Changes
        //token: 'b1ef6dc64e1be8eb1b8496f5ed989126', // Changes
        //pz: 152, // Changes
      },
    })));
  bar.stop();
  console.log(`Voted ${count}/${total} times.`);
}

main(500);
