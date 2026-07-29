$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location -Path $root
$replacements = @{
    'Ã¡'='á'; 'Ã©'='é'; 'Ã­'='í'; 'Ã³'='ó'; 'Ãº'='ú'; 'Ã±'='ñ'; 'Ã‘'='Ñ';
    'Â¡'='¡'; 'Â¿'='¿'; 'â€“'='–'; 'â€”'='—'; 'â€œ'='“'; 'â€'='"'; 'â€™'='’'; 'â€˜'='‘';
    'Ã¼'='ü'; 'Ã¨'='è'; 'Ã§'='ç'; 'Â·'='·'; 'Â«'='«'; 'Â»'='»'; 'Ã'='ÍREPLACE'
}

Get-ChildItem -Filter *.html | ForEach-Object {
    $path = $_.FullName
    $bak = "$path.bak_fixed"
    Copy-Item -Path $path -Destination $bak -Force
    $text = Get-Content -Raw -Path $path -Encoding UTF8
    $orig = $text
    foreach ($k in $replacements.Keys) {
        $v = $replacements[$k]
        $text = $text -replace [regex]::Escape($k), $v
    }
    if ($text -ne $orig) {
        Set-Content -Path $path -Value $text -Encoding UTF8
        Write-Output "Fixed patterns: $path (backup: $bak)"
    } else {
        Write-Output "No pattern fixes needed: $path"
    }
}
