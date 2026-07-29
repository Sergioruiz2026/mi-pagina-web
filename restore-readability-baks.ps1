$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location -Path $root
Get-ChildItem -Filter *.html.readability.bak | ForEach-Object {
    $bak = $_.FullName
    $orig = $bak -replace '\.readability\.bak$',''
    Copy-Item -Path $bak -Destination $orig -Force
    Write-Output "Restored from readability backup: $orig"
}
