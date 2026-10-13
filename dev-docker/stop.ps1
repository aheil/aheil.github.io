<#
  Stops and removes the local Jekyll preview container.
  Usage:  .\dev-docker\stop.ps1
  Add -PurgeGems to also delete the cached gem volume (next start re-installs gems).
#>
param([switch]$PurgeGems)

docker rm -f aheil-jekyll *> $null
Write-Host "Stopped aheil-jekyll."

if ($PurgeGems) {
  docker volume rm aheil-gems *> $null
  Write-Host "Removed gem cache volume aheil-gems."
}
