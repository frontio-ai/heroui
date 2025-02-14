# HeroUI Contributing Guide

Hello!, I am very excited that you are interested in contributing with HeroUI. However, before submitting your contribution, be sure to take a moment and read the following guidelines.

- [Code of Conduct](https://github.com/heroui-inc/heroui/blob/canary/CODE_OF_CONDUCT.md)
- [Extraction request guidelines](#pull-request-guidelines)
- [Development Setup](#development-setup)
- [Tests](#tests)
- [Visual Changes](#visual-changes)
- [Documentation](#documentation)
- [Breaking Changes](#breaking-changes)
- [Becoming a maintainer](#becoming-a-maintainer)

### Tooling

- [PNPM](https://pnpm.io/) to manage packages and dependencies
- [Tsup](https://tsup.egoist.dev/) to bundle packages
- [Storybook](https://storybook.js.org/) for rapid UI component development and
  testing
- [Testing Library](https://testing-library.com/) for testing components and
  hooks
- [Changeset](https://github.com/atlassian/changesets) for changes
  documentation, changelog generation, and release management.


### Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

  e.g. `feat(components): add new prop to the avatar component`


If you are interested in the detailed specification you can visit
https://www.conventionalcommits.org/ or check out the
[Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

## Pull Request Guidelines

- The `main` branch is basically a snapshot of the latest production version. All development must be done in dedicated branches and will be merged to `canary` branch.
- Make sure that Github Actions are green
- It is good to have multiple small commits while working on the PR. We'll let GitHub squash it automatically before the merge.
- If you add a new feature:
  - Add the test case that accompanies it.
  - Provide a compelling reason to add this feature. Ideally, I would first open a suggestion topic and green it before working on it.
- If you correct an error:
  - If you are solving a special problem, add (fix #xxxx [, # xxx]) (# xxxx is the problem identification) in your PR title for a better launch record, for example update entities encoding / decoding (fix # 3899).
  - Provide a detailed description of the error in the PR. Favorite live demo.
  - Add the appropriate test coverage, if applicable.


### Steps to PR

1. Fork of the heroui repository and clone your fork

2. Create a new branch out of the `canary` branch. We follow the convention
   `[type/scope]`. For example `fix/dropdown-hook` or `docs/menu-typo`. `type`
   can be either `docs`, `fix`, `feat`, `build`, or any other conventional
   commit type. `scope` is just a short id that describes the scope of work.

3. Make and commit your changes following the
   [commit convention](https://github.com/heroui-inc/heroui/blob/main/CONTRIBUTING.md#commit-convention).
   As you canary, you can run `pnpm build --filter=<module>` and
   `pnpm test packages/<module>/<pkg>` e.g. `pnpm build --filter=avatar & pnpm test packages/components/avatar` to make sure everything works as expected.

   > To know more about the `--filter` option, please check the turborepo [docs](https://turborepo.org/docs/core-concepts/filtering).

4. Run `pnpm changeset` to create a detailed description of your changes. This
   will be used to generate a changelog when we publish an update.
   [Learn more about Changeset](https://github.com/atlassian/changesets/tree/master/packages/cli).
   Please note that you might have to run `git fetch origin main:master` (where
   origin will be your fork on GitHub) before `pnpm changeset` works.
5. Also, if you provide `jsx` snippets to the changeset, please turn off the
   live preview by doing the following at the beginning of the snippet:
   ` ```jsx live=false`

> If you made minor changes like CI config, prettier, etc, you can run
> `pnpm changeset add --empty` to generate an empty changeset file to document
> your changes.

## Development Setup

After cloning the repository, execute the following commands in the root folder:

1. Install dependencies

```bash
pnpm i --hoist

#or

pnpm install --hoist
```

We use [Turbo Repo](https://turborepo.org/) for the project management.

2. If you will be working on the components source code, you can use the following command to start the webpack dev server:

```bash
## Start the dev babel server of HeroUI core components
pnpm dev

## optional

pnpm sb ## this will start the storybook server for a faster development and testing.

pnpm dev:docs ## this will start the documentation next.js server and it will automatically detect the changes in the components.
```

- If you will be working just on the documentation source code / mdx, you can use the following commands to build
  HeroUI components and then start the next.js dev server:

```bash
## Build HeroUI source components
pnpm build

## Start the next.js documentation dev server
pnpm dev:docs
```

- You also can use Storybook to test the components and faster development:

```bash
pnpm sb
```

Remember that these commands must be executed in the root folder of the project.

3. Create a branch for your feature or fix:

```bash
# Move into a new branch for your feature
git checkout -b feat/thing
```

```bash
# Move into a new branch for your fix
git checkout -b fix/something
```

4. If your code passes all the tests, then push your feature/fix branch:

All commits that fix bugs or add features need a test.
You can run the nest command for component specific tests.

```bash
# Test current code

pnpm test

# or

npm run test
```

```bash
# Test isolated component code

pnpm test button

# or

npm run test button

```

5. Be sure the package builds.

```bash
# Build current code

pnpm build

# or

npm run build
```

> Note: ensure that you have at least Node.js 20.16.0 as well as pnpm 9.6.0 or higher installed on your machine to run the scripts

6. Send your pull request:

- Send your pull request to the `canary` branch
- Your pull request will be reviewed by the maintainers and the maintainers will decide if it is accepted or not
- Once the pull request is accepted, the maintainers will merge it to the `canary` branch

## Visual Changes

When making a visual change, please provide screenshots
and/or screencasts of the proposed change. This will help us to understand the
desired change easier.

Until HeroUI has a stable release new components will be created only for the core team.

## Documentation

Please update the docs with any API changes, the code and docs should always be in sync.

The main documentation lives in the `apps/docs/content` folder, the project uses MDX and all `HeroUI` are already imported.

## Breaking changes

Breaking changes should be accompanied with deprecations of removed functionality. The deprecated APIs themselves should not be removed until the minor release after that.

## Becoming a maintainer

If you are interested in becoming a HeroUI maintainer, start by
reviewing issues and pull requests. Answer questions for those in need of
troubleshooting. Join us in the
[Discord Community](https://discord.gg/9b6yyZKmH4) chat room.
Once we see you helping, either we will reach out and ask you if you want to
join or you can ask one of the current maintainers to add you. We will try our
best to be proactive in reaching out to those that are already helping out.

GitHub by default does not publicly state that you are a member of the
organization. Please feel free to change that setting for yourself so others
will know who's helping out. That can be configured on the [organization
list](https://github.com/orgs/heroui-inc/people) page.

Being a maintainer is not an obligation. You can help when you have time and be
less active when you don't. If you get a new job and get busy, that's alright.
