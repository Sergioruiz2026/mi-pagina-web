$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location -Path $root
Get-ChildItem -Filter *.html.bak | ForEach-Object {
    $bak = $_.FullName
    $orig = $bak -replace '\.bak$',''
    Copy-Item -Path $bak -Destination $orig -Force
    Write-Output "Restored: $orig"
}
