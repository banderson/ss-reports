#!/bin/bash
// >&/dev/null; exec node --harmony-async-await $0 $@
// vi:syntax=javascript

// NOTE: this is used in the context of the auto-release script, not here
// Just including here for future reference of what I ran for the numbers

const connect = require('../lib/connect')
const getCommits = require('../lib/commits')
const {branchSynced, getRepo} = require('../lib/repo')

const prs = async () => {
  const github = await connect()
  // const repoDetails = await getRepo()
  github.search.issues({
    q: 'type:pr base:master is:merged in:title spacesword',
    per_page: 100,
    page: 1,
    // owner: repoDetails.user,
    // repo: repoDetails.repo,
    // number: process.argv[2]
  }, (err, response) => {
    if (err) {
      console.error('It broke', err)
      process.exit(1)
    }

    let adds = 0, subs = 0, files = 0, comms = 0

    let others = [
      {repository_url: 'HubSpot/MeetingsUI', number: 93},
      {repository_url: 'HubSpot/AdsUI', number: 544},
      {repository_url: 'HubSpot/AdsUI', number: 579},
      {repository_url: 'HubSpot/AdsUI', number: 587},
      {repository_url: 'HubSpot/AdsUI', number: 599},
      {repository_url: 'HubSpot/Atlas', number: 4},
      {repository_url: 'HubSpot/Social', number: 896},
      {repository_url: 'HubSpot/Social', number: 938},
      {repository_url: 'HubSpot/Social', number: 999},
      {repository_url: 'HubSpot/Social', number: 898},
      {repository_url: 'HubSpot/Social', number: 919},
      {repository_url: 'HubSpot/Social', number: 1151},
      {repository_url: 'HubSpot/FileManagerUI', number: 6},
      {repository_url: 'HubSpot/FileManagerUI', number: 10},
      {repository_url: 'HubSpot/FileManagerUI', number: 53},
      {repository_url: 'HubSpot/FileManagerUI', number: 71}, // ¯\_(ツ)_/¯
      {repository_url: 'HubSpot/FileManagerUI', number: 86}, // ¯\_(ツ)_/¯
      {repository_url: 'HubSpot/FileManagerUI', number: 94}, // ¯\_(ツ)_/¯ 
      {repository_url: 'HubSpot/ZorseDashboardUI', number: 163},
    ]

    let PRs = [...response.items, ...others].forEach(async (pr) => {
      const [owner, repo] = pr.repository_url.split('/').slice(-2)
      // console.log(`https://git.hubteam.com/${owner}/${repo}/pull/${pr.number}`)
      // console.log(repo)

      let number, commits, additions, deletions, changed_files
      try {
        ({number, commits, additions, deletions, changed_files} = await github.pullRequests.get({owner, repo, number: pr.number}));
        adds += parseInt(additions, 10)
        subs += parseInt(deletions, 10)
        files += parseInt(changed_files, 10)
        comms += parseInt(commits, 10)

        if (deletions == 0) {
          console.log(repo, number, 'is a liar')
        }
        
      } catch(e) {
        console.error('It failied :(', e)
      }
      
      console.log(JSON.stringify({repo, number, additions, deletions, adds, subs, files, comms}))
    })
  })
}

prs()
