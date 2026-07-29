$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location -Path $root
$files = Get-ChildItem -Filter *.html
foreach ($f in $files) {
    $path = $f.FullName
    $text = Get-Content -Raw -Path $path -Encoding UTF8
    if ($text -match 'Ã|â') {
        $bak = "$path.bak3"
        if (-not (Test-Path $bak)) { Copy-Item -Path $path -Destination $bak }
        $bytes = [System.Text.Encoding]::GetEncoding(1252).GetBytes($text)
        $fixed = [System.Text.Encoding]::UTF8.GetString($bytes)
        Set-Content -Path $path -Value $fixed -Encoding UTF8
        Write-Output "Fixed encoding: $path (backup: $bak)"
    } else {
        Write-Output "No change needed: $path"
    }
}
