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

    const matches = pr.title.match(/^\[([^\]]+)\]/);

    if (!matches) {
      console.log(
        "The title of the PR doesn't have a corresponding challenge, skipping."
      );
      return;
    }

    const challenges = matches[1];

    if (!challenges) {
      console.log('Empty challenge, skipping.');
      return;
    }

    await Promise.all(
      challenges
        .split(',')
        .map(challenge => challenge.trim())
        .filter(Boolean)
        .map(challenge =>
          octokit.repos.createStatus({
            owner: repo.owner.login,
            repo: repo.name,
            sha: pr.head.sha,
            state: 'success',
            target_url: `https://codesandbox.io/s/github/${repo.full_name}/tree/${pr.head.ref}/challenges/${challenge}`,
            description: 'CodeSandbox preview',
            context: `${challenge} CodeSandbox`,
          })
        )
    );
  } catch (err) {
    core.setFailed(err.message);
    return;
  }
}

main();
