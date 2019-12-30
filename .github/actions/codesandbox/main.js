const core = require('@actions/core');
const github = require('@actions/github');

async function main() {
  try {
    const githubToken = core.getInput('github-token', { required: true });

    const octokit = new github.GitHub(githubToken);
    const { repository: repo, pull_request: pr } = github.context.payload;

    // Do nothing if its not a pr
    if (!pr) {
      console.log(
        'The event that triggered this action was not a pull request, skipping.'
      );
      return;
    }

    await octokit.checks.create({
      owner: repo.owner.login,
      repo: repo.name,
      name: 'codesandbox-preview',
      head_sha: pr.head.sha,
      details_url: `https://codesandbox.io/s/github/${repo.full_name}/tree/${pr.head.ref}/challenges/example-challenge`,
      status: 'completed',
      conclusion: 'success',
    });
  } catch (err) {
    core.setFailed(err.message);
    return;
  }
}

main();
