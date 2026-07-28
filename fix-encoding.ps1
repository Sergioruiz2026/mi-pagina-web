$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location -Path $root
$files = Get-ChildItem -Filter *.html
foreach ($f in $files) {
    $path = $f.FullName
    $text = Get-Content -Raw -Path $path -Encoding UTF8
    if ($text -match "Ã") {
        # Reinterpretar: tomar los caracteres actuales como Latin1 bytes y decodificar como UTF8
        $latinBytes = [System.Text.Encoding]::GetEncoding('ISO-8859-1').GetBytes($text)
        $fixed = [System.Text.Encoding]::UTF8.GetString($latinBytes)
        Set-Content -Path $path -Value $fixed -Encoding UTF8
        Write-Output "Fixed encoding: $path"
    } else {
        Write-Output "No change: $path"
    }
}
