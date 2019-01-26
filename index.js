const fetch = require('node-fetch');

const TOKEN = process.env.SLACK_API_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;
const SLACK_API_BASE = 'https://slack.com/api';

function fetchChannel() {
  // return fetch(`${SLACK_API_BASE}/channels.info?token=${TOKEN}&channel=${CHANNEL_ID}&pretty=1`)
  return fetch(`${SLACK_API_BASE}/groups.info?token=${TOKEN}&channel=${CHANNEL_ID}&pretty=1`)
    .then(res => res.json())
    .then((res) => {
      if (!res.ok) throw new Error(res.error);
      // return res.channel;
      return res.group;
    });
}

function fetchMembers(ids) {
  return Promise.all(ids.map((id) => {
    return fetch(`${SLACK_API_BASE}/users.info?token=${TOKEN}&user=${id}&pretty=1`)
      .then(res => res.json())
      .then((res) => {
        if (!res.ok) throw new Error(res.error);
        return res.user;
      });
  }))
    .then(users => users.filter(x => !x.deleted));
}

(async () => {
  const channel = await fetchChannel();
  const members = await fetchMembers(channel.members);
  // const names = members.map(x => x.real_name).sort();
  const names = members.map(x => `${x.real_name} <${x.profile.email}>`).sort();
  console.log(names);
})()
  .catch(err => console.error(err));

