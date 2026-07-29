$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location -Path $root
Get-ChildItem -Filter *.html | ForEach-Object {
    $path = $_.FullName
    $bak = "$path.readability.bak"
    Copy-Item -Path $path -Destination $bak -Force
    $text = Get-Content -Raw -Path $path -Encoding UTF8

    # Add section-with-bg to panel-gradient containers (simple string replacement)
    $text = $text -replace 'class="([^"]*panel-gradient[^"]*)"', 'class="$1 section-with-bg"'

    # Add class to divs with inline linear-gradient style
    $text = [regex]::Replace($text, '<div\s+([^>]*?)style="([^"]*linear-gradient[^"]*)"', '<div class="section-with-bg" $1style="$2"', 'IgnoreCase')

    # Add improve-readability to headings without class
    $text = [regex]::Replace($text, '<(h[1-6])\b(?![^>]*\bclass=)', '<$1 class="improve-readability"', 'IgnoreCase')

    # Add improve-readability to p tags without class
    $text = [regex]::Replace($text, '<(p)\b(?![^>]*\bclass=)', '<$1 class="improve-readability"', 'IgnoreCase')

    Set-Content -Path $path -Value $text -Encoding UTF8
    Write-Output "Patched safely: $path (backup: $bak)"
}
