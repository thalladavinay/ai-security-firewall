rule Suspicious_PowerShell
{
    meta:
        description = "Detects suspicious PowerShell usage"

    strings:
        $ps1 = "powershell"
        $ps2 = "Invoke-Expression"
        $ps3 = "IEX"

    condition:
        any of them
}

rule Suspicious_CMD
{
    meta:
        description = "Detects suspicious CMD commands"

    strings:
        $cmd1 = "cmd.exe"
        $cmd2 = "whoami"
        $cmd3 = "net user"

    condition:
        any of them
}