<#
  Starts the local Jekyll preview in Docker (no local Ruby needed).
  Usage (from anywhere):  .\dev-docker\start.ps1
  Site:                   http://localhost:4000
  Stop:                   .\dev-docker\stop.ps1
#>
$ErrorActionPreference = "Stop"

$repo      = Split-Path -Parent $PSScriptRoot
$container = "aheil-jekyll"
$image     = "ruby:3.3"
$port      = 4000

docker info *> $null
if ($LASTEXITCODE -ne 0) { throw "Docker is not running. Start Docker Desktop first." }

# Remove a previous container with the same name
docker rm -f $container *> $null

# Gems are cached in the named volume 'aheil-gems', so only the first start is slow
$inner = "bundle check || bundle install; " +
         "bundle exec jekyll serve --host 0.0.0.0 --force_polling --config _config.yml,dev-docker/jekyll.local.yml"

docker run -d --name $container -p "${port}:4000" `
  -v "${repo}:/srv" -v aheil-gems:/usr/local/bundle -w /srv `
  $image bash -c $inner | Out-Null
if ($LASTEXITCODE -ne 0) { throw "Could not start the container." }

Write-Host "Starting Jekyll (first run installs gems and can take a few minutes)..."
for ($i = 0; $i -lt 90; $i++) {
  Start-Sleep -Seconds 4
  if (-not (docker ps -q -f "name=$container")) {
    docker logs --tail 40 $container
    throw "Container stopped unexpectedly (see log above)."
  }
  try {
    if ((Invoke-WebRequest "http://localhost:$port/" -UseBasicParsing -TimeoutSec 5).StatusCode -eq 200) {
      Write-Host "Ready: http://localhost:$port/"
      exit 0
    }
  } catch { }
}
throw "Timed out waiting for the site. Check logs with: docker logs $container"
