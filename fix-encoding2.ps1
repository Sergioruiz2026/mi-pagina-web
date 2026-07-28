$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location -Path $root
$files = Get-ChildItem -Filter *.html
foreach ($f in $files) {
    $path = $f.FullName
    $bak = "$path.bak"
    if (-not (Test-Path $bak)) {
        Copy-Item -Path $path -Destination $bak
        Write-Output "Backup created: $bak"
    }
    $text = Get-Content -Raw -Path $path -Encoding UTF8
    # Convert: treat current characters as Windows-1252 bytes, decode as UTF8
    $bytes = [System.Text.Encoding]::GetEncoding(1252).GetBytes($text)
    $fixed = [System.Text.Encoding]::UTF8.GetString($bytes)
    Set-Content -Path $path -Value $fixed -Encoding UTF8
    Write-Output "Re-encoded: $path"
}
