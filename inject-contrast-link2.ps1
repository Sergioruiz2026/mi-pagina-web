$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location -Path $root
Get-ChildItem -Filter *.html | ForEach-Object {
    $path = $_.FullName
    $text = Get-Content -Raw -Path $path -ErrorAction Stop
    if ($text -notmatch 'contrast-utils\.css') {
        $new = $text -replace '(?i)</head>', "    <link rel='stylesheet' href='contrast-utils.css'>`r`n</head>"
        Set-Content -Path $path -Value $new -Encoding UTF8
        Write-Output "Updated: $path"
    } else {
        Write-Output "Already contains link: $path"
    }
}
