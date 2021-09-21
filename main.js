const axios = require('axios');
const { JSDOM } = require('jsdom');
const { to } = require('await-to-js');
const progress = require('cli-progress');
const randomUserAgent = require('random-useragent');
const Bottleneck = require('bottleneck');

async function main(total = 10) {
  console.log(`Voting ${total} times...`);
  // Wait 6secs in between votes because of Poll Daddy's rate limits.
  // @see {@link https://bit.ly/2W0xzsN}
  const limiter = new Bottleneck({ maxConcurrent: 1, minTime: 6000 });
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
  await Promise.all(
    Array(total).fill(null).map((_, id) =>
      limiter.schedule({ id }, async () => {
        const cfg = { headers: { 'User-Agent': randomUserAgent.getRandom() } };
        const { data: html } = await axios.get('https://poll.fm/10924113', cfg);
        const doc = new JSDOM(html).window.document;
        const btn = doc.querySelector('.vote-button');
        const data = JSON.parse(btn.dataset.vote);
        await axios.get('https://poll.fm/vote', {
          params: {
            va: 20,
            pt: 0,
            r: 0,
            p: 10924113,
            a: '50270630,',
            o: '',
            t: data.t,
            token: data.n,
            pz: 1,
          },
          ...cfg
        });
      })
    )
  );
  bar.stop();
  console.log(`Voted ${count}/${total} times.`);
}

main(50);
