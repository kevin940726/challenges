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

    console.log(pr);

    await octokit.repos.createStatus({
      owner: repo.owner.login,
      repo: repo.name,
      sha: pr.head.sha,
      state: 'success',
      target_url: `https://codesandbox.io/s/github/${repo.full_name}/tree/${pr.head.ref}/challenges/example-challenge`,
      description: 'CodeSandbox preview',
      context: 'CodeSandbox',
    });
  } catch (err) {
    core.setFailed(err.message);
    return;
  }
}

main();
