$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location -Path $root
$pattern = 'Ã[¡ÁÂÉÍÓÚñº°]|Â|â|Ãº|Ã±|Ã¡|Ã©|Ã­|Ã³|Ãº|Ã“|Ã‘|Ã“|Ã‘'
Get-ChildItem -Filter *.html | ForEach-Object {
    $path = $_.FullName
    $text = Get-Content -Raw -Path $path -Encoding UTF8
    if ($text -match 'Ã|Â|â') {
        $bak = "$path.auto.bak"
        if (-not (Test-Path $bak)) { Copy-Item -Path $path -Destination $bak -Force }
        try {
            $bytes = [System.Text.Encoding]::GetEncoding(1252).GetBytes($text)
            $fixed = [System.Text.Encoding]::UTF8.GetString($bytes)
            if ($fixed -ne $text) {
                Set-Content -Path $path -Value $fixed -Encoding UTF8
                Write-Output "Re-encoded: $path (backup: $bak)"
            } else {
                Write-Output "No change after re-encode: $path"
            }
        } catch {
            Write-Output "Error processing: $path - $_"
        }
    } else {
        Write-Output "No mojibake: $path"
    }
}
