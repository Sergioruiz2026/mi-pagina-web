$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location -Path $root
$files = Get-ChildItem -Filter *.html
foreach ($f in $files) {
    $path = $f.FullName
    $text = Get-Content -Raw -Path $path -Encoding UTF8

    # Add section-with-bg to panel-gradient containers
    $text = $text -replace '(<div[^>]*class\s*=\s*"[^"]*panel-gradient[^"]*")', { param($m) $s=$m.Value; if ($s -match 'section-with-bg') { $s } else { $s -replace 'class\s*=\s*"([^"]*)"', 'class="$1 section-with-bg"' } }

    # Add section-with-bg to inline gradient divs
    $text = $text -replace '<div\s+([^>]*?)style\s*=\s*"([^"]*linear-gradient[^"]*)"', { param($m) if ($m.Value -match 'section-with-bg') { $m.Value } else { '<div class="section-with-bg" ' + $m.Groups[1].Value + 'style="' + $m.Groups[2].Value + '"' } }

    # Function to add or append class improve-readability for a tag
    function AddClassToTag([string]$inputText, [string]$tag) {
        $pattern = "<($tag)([^>]*)>"
        return [regex]::Replace($inputText, $pattern, [System.Text.RegularExpressions.MatchEvaluator]::new({ param($m)
            $tagName = $m.Groups[1].Value
            $attrs = $m.Groups[2].Value
            if ($attrs -match 'class\s*=') {
                $newAttrs = [regex]::Replace($attrs, 'class\s*=\s*"([^"]*)"', 'class="$1 improve-readability"', 1)
                return '<' + $tagName + $newAttrs + '>'
            } else {
                return '<' + $tagName + ' class="improve-readability"' + $attrs + '>'
            }
        }))
    }

    # Apply to headings and paragraphs
    $text = AddClassToTag $text 'h1'
    $text = AddClassToTag $text 'h2'
    $text = AddClassToTag $text 'h3'
    $text = AddClassToTag $text 'h4'
    $text = AddClassToTag $text 'h5'
    $text = AddClassToTag $text 'h6'
    $text = AddClassToTag $text 'p'

    Set-Content -Path $path -Value $text -Encoding UTF8
    Write-Output "Patched: $path"
}
