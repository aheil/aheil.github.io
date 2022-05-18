
## tl;dr

##

```
C:\dev\portfolYOU>git fetch upstream
fatal: 'upstream' does not appear to be a git repository
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```git remote add upstream https://github.com/


```
C:\dev\portfolYOU>git remote -v
origin  git@github.com:aheil/portfolYOU.git (fetch)
origin  git@github.com:aheil/portfolYOU.git (push)
```

git remote add upstream https://github.com/YoussefRaafatNasry/portfolYOU

[Configure a remote for a fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/configuring-a-remote-for-a-fork)

C:\dev\portfolYOU>git remote -v
origin  git@github.com:aheil/portfolYOU.git (fetch)
origin  git@github.com:aheil/portfolYOU.git (push)
upstream        https://github.com/YoussefRaafatNasry/portfolYOU(fetch)
upstream        https://github.com/YoussefRaafatNasry/portfolYOUr (push)

dann syncing a fork: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork

