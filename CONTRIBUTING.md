# Contributing guide

## Contents

- [Commit messages](#commit-messages)

## Commit messages

Each commit message must be in the format that includes a **type**, an optional **scope** and a **subject**:
```
type(scope?): subject  #scope is optional
```

Limit the whole message to 72 characters or less!

Example:

```
build(npm): add react package
```

### Type

Must be one of the following:

* **build**: Changes that affect the build system or external dependencies (example scopes: npm)
* **chore**: Changes that don't really fall under any other type
* **ci**: Changes to the CI configuration files and scripts
* **docs**: Documentation only changes
* **feat**: A new feature
* **fix**: A bug fix
* **perf**: A code change that improves performance
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **revert**: Revert a previous commit
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **test**: Adding missing tests or correcting existing tests

### Scope

A scope may be provided to a commit’s type, to provide additional contextual information and is contained within a parenthesis

### Subject

The subject contains a succinct description of the change:

* use the present tense ("Add feature" not "Added feature")
* use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* don't capitalise the first letter
* don't use a fullstop (.) at the end. <- Not this
