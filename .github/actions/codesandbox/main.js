const core = require('@actions/core');
const github = require('@actions/github');

async function main() {
  try {
    const githubToken = core.getInput('github-token', { required: true });

    const octokit = new github.GitHub(githubToken);
    const context = github.context;
    const issue = context.issue;

    console.log(context);

    // Do nothing if its not a pr
    if (!context.payload.pull_request) {
      console.log(
        'The event that triggered this action was not a pull request, skipping.'
      );
      return;
    }

    const pull_request = context.payload.pull_request;
    console.log(pull_request);

    await octokit.checks.create({
      owner: issue.owner,
      repo: issue.repo,
      name: 'codesandbox',
      head_sha: context.sha,
      details_url: `https://codesandbox.io/s/github/${issue.owner}/${issue.repo}/tree/${context.sha}/challenges/example-challenge`,
    });
  } catch (err) {
    core.setFailed(err.message);
    return;
  }
}

main();
