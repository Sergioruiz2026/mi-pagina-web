$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location -Path $root
$checkChars = @([char]0x00C3, [char]0x00C2, [char]0x00E2) # Ã, Â, â
Get-ChildItem -Filter *.html | ForEach-Object {
    $path = $_.FullName
    $text = Get-Content -Raw -Path $path -Encoding UTF8
    $has = $false
    foreach ($c in $checkChars) { if ($text.IndexOf($c) -ge 0) { $has = $true; break } }
    if ($has) {
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
        Write-Output "No mojibake detected: $path"
    }
}
