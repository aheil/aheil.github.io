<#
  Smoke test for the local preview (start it first with .\dev-docker\start.ps1).
  Usage:  .\dev-docker\test.ps1
  Exit code is 0 when all checks pass, 1 otherwise.
#>
$base   = "http://localhost:4000"
$failed = 0

function Get-Text($path) {
  try { (Invoke-WebRequest "$base$path" -UseBasicParsing -TimeoutSec 10).Content } catch { $null }
}

function Check($name, [bool]$ok) {
  if ($ok) { Write-Host "  PASS  $name" -ForegroundColor Green }
  else     { Write-Host "  FAIL  $name" -ForegroundColor Red; $script:failed++ }
}

$index = Get-Text "/"
if (-not $index) { Write-Host "Site not reachable. Run .\dev-docker\start.ps1 first." -ForegroundColor Red; exit 1 }

Write-Host "Testimonials"
Check "index contains <student-testimonials>"        ($index -match "<student-testimonials")
Check "index no longer contains the newsletter"      ($index -notmatch "substack\.com/embed")
Check "testimonials-data.js is served"               ((Get-Text "/assets/js/testimonials-data.js") -match "window\.TESTIMONIALS")
Check "testimonials.js is served"                    ((Get-Text "/assets/js/testimonials.js") -match "customElements\.define")

$css = Get-Text "/aheil.css"
Check "theme variables for light mode in aheil.css"  ($css -match "student-testimonials\s*\{[^}]*--st-bg")
Check "theme variables for dark mode in aheil.css"   ($css -match 'data-theme="dark"\]\s*student-testimonials')

Write-Host "Site"
Check "dev-docker folder is not published"           ($null -eq (Get-Text "/dev-docker/start.ps1"))
Check "legal page has no newsletter text"            ((Get-Text "/legal/") -notmatch "Substack")

if (Get-Command node -ErrorAction SilentlyContinue) {
  Write-Host "Syntax"
  $root = Split-Path -Parent $PSScriptRoot
  foreach ($f in "testimonials.js", "testimonials-data.js") {
    node --check (Join-Path $root "assets\js\$f") 2>$null
    Check "node --check $f" ($LASTEXITCODE -eq 0)
  }
}

if ($failed -gt 0) { Write-Host "$failed check(s) failed." -ForegroundColor Red; exit 1 }
Write-Host "All checks passed." -ForegroundColor Green
