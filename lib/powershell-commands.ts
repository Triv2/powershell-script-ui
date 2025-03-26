import type { Command } from "./types"

// Comprehensive PowerShell commands organized by category
export const powershellCommands: Record<string, Command[]> = {
  "File System": [
    {
      name: "Get-ChildItem",
      description: "Gets the items and child items in a specified location",
      parameters: [
        {
          name: "Path",
          type: "path",
          description: "Path to the location",
          required: false,
          placeholder: "C:\\path\\to\\folder",
        },
        {
          name: "Filter",
          type: "string",
          description: "Filter items by name",
          required: false,
          placeholder: "*.txt",
        },
        {
          name: "Recurse",
          type: "boolean",
          description: "Get items in all child containers",
          required: false,
        },
        {
          name: "Depth",
          type: "number",
          description: "Maximum number of levels to recurse",
          required: false,
        },
        {
          name: "Force",
          type: "boolean",
          description: "Get hidden items",
          required: false,
        },
      ],
    },
    {
      name: "Get-Content",
      description: "Gets the content of a file",
      parameters: [
        {
          name: "Path",
          type: "path",
          description: "Path to the file",
          required: true,
          placeholder: "C:\\path\\to\\file.txt",
        },
        {
          name: "TotalCount",
          type: "number",
          description: "Number of lines to get from the beginning",
          required: false,
        },
        {
          name: "Tail",
          type: "number",
          description: "Number of lines to get from the end",
          required: false,
        },
        {
          name: "Encoding",
          type: "select",
          description: "Encoding of the file",
          required: false,
          options: ["ASCII", "UTF8", "UTF7", "UTF32", "Unicode", "BigEndianUnicode", "Default", "OEM"],
        },
      ],
    },
    {
      name: "Set-Content",
      description: "Sets content in a file",
      parameters: [
        {
          name: "Path",
          type: "path",
          description: "Path to the file",
          required: true,
          placeholder: "C:\\path\\to\\file.txt",
        },
        {
          name: "Value",
          type: "string",
          description: "Content to write to the file",
          required: true,
        },
        {
          name: "Force",
          type: "boolean",
          description: "Forces the command to run without asking for user confirmation",
          required: false,
        },
        {
          name: "Encoding",
          type: "select",
          description: "Encoding of the file",
          required: false,
          options: ["ASCII", "UTF8", "UTF7", "UTF32", "Unicode", "BigEndianUnicode", "Default", "OEM"],
        },
      ],
    },
    {
      name: "Copy-Item",
      description: "Copies an item from one location to another",
      parameters: [
        {
          name: "Path",
          type: "path",
          description: "Path to the item to copy",
          required: true,
          placeholder: "C:\\path\\to\\source",
        },
        {
          name: "Destination",
          type: "path",
          description: "Path to the new location",
          required: true,
          placeholder: "C:\\path\\to\\destination",
        },
        {
          name: "Recurse",
          type: "boolean",
          description: "Copy subdirectories recursively",
          required: false,
        },
        {
          name: "Force",
          type: "boolean",
          description: "Overwrite existing items",
          required: false,
        },
      ],
    },
    {
      name: "Move-Item",
      description: "Moves an item from one location to another",
      parameters: [
        {
          name: "Path",
          type: "path",
          description: "Path to the item to move",
          required: true,
          placeholder: "C:\\path\\to\\source",
        },
        {
          name: "Destination",
          type: "path",
          description: "Path to the new location",
          required: true,
          placeholder: "C:\\path\\to\\destination",
        },
        {
          name: "Force",
          type: "boolean",
          description: "Overwrite existing items",
          required: false,
        },
      ],
    },
    {
      name: "Remove-Item",
      description: "Deletes the specified items",
      parameters: [
        {
          name: "Path",
          type: "path",
          description: "Path to the item to remove",
          required: true,
          placeholder: "C:\\path\\to\\item",
        },
        {
          name: "Recurse",
          type: "boolean",
          description: "Remove subdirectories recursively",
          required: false,
        },
        {
          name: "Force",
          type: "boolean",
          description: "Force removal of read-only items",
          required: false,
        },
        {
          name: "Confirm",
          type: "boolean",
          description: "Prompt for confirmation before executing",
          required: false,
        },
      ],
    },
    {
      name: "New-Item",
      description: "Creates a new item",
      parameters: [
        {
          name: "Path",
          type: "path",
          description: "Path to the new item",
          required: true,
          placeholder: "C:\\path\\to\\new-item",
        },
        {
          name: "ItemType",
          type: "select",
          description: "Type of item to create",
          required: true,
          options: ["File", "Directory", "SymbolicLink", "Junction", "HardLink"],
        },
        {
          name: "Value",
          type: "string",
          description: "Content to add to the new item",
          required: false,
        },
        {
          name: "Force",
          type: "boolean",
          description: "Create intermediate directories if needed",
          required: false,
        },
      ],
    },
    {
      name: "Rename-Item",
      description: "Renames an item in a specified location",
      parameters: [
        {
          name: "Path",
          type: "path",
          description: "Path to the item to rename",
          required: true,
          placeholder: "C:\\path\\to\\item",
        },
        {
          name: "NewName",
          type: "string",
          description: "New name for the item",
          required: true,
        },
        {
          name: "Force",
          type: "boolean",
          description: "Rename even if a file with the new name exists",
          required: false,
        },
      ],
    },
    {
      name: "Test-Path",
      description: "Determines whether all elements of a path exist",
      parameters: [
        {
          name: "Path",
          type: "path",
          description: "Path to test",
          required: true,
          placeholder: "C:\\path\\to\\test",
        },
        {
          name: "PathType",
          type: "select",
          description: "Type of path to test",
          required: false,
          options: ["Any", "Container", "Leaf"],
        },
        {
          name: "IsValid",
          type: "boolean",
          description: "Test if the path syntax is valid",
          required: false,
        },
      ],
    },
  ],
  Networking: [
    {
      name: "Test-Connection",
      description: "Sends ICMP echo request packets to one or more computers",
      parameters: [
        {
          name: "ComputerName",
          type: "string",
          description: "Computer to test connection to",
          required: true,
          placeholder: "server01 or 192.168.1.1",
        },
        {
          name: "Count",
          type: "number",
          description: "Number of echo requests to send",
          required: false,
          defaultValue: 4,
        },
        {
          name: "Quiet",
          type: "boolean",
          description: "Return only success or failure",
          required: false,
        },
        {
          name: "TimeoutSeconds",
          type: "number",
          description: "Timeout in seconds",
          required: false,
          defaultValue: 2,
        },
      ],
    },
    {
      name: "Invoke-WebRequest",
      description: "Gets content from a web page on the Internet",
      parameters: [
        {
          name: "Uri",
          type: "string",
          description: "URI of the web resource",
          required: true,
          placeholder: "https://example.com",
        },
        {
          name: "Method",
          type: "select",
          description: "HTTP method to use",
          required: false,
          options: ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH"],
        },
        {
          name: "OutFile",
          type: "path",
          description: "Save response to file",
          required: false,
          placeholder: "C:\\path\\to\\output.html",
        },
        {
          name: "Headers",
          type: "string",
          description: "Headers as a hashtable (@{Header1='Value1'})",
          required: false,
        },
        {
          name: "Body",
          type: "string",
          description: "Body of the request",
          required: false,
        },
        {
          name: "UseBasicParsing",
          type: "boolean",
          description: "Use basic parsing instead of DOM",
          required: false,
          defaultValue: true,
        },
      ],
    },
    {
      name: "Get-NetIPAddress",
      description: "Gets IP address configuration",
      parameters: [
        {
          name: "IPAddress",
          type: "string",
          description: "Filter by IP address",
          required: false,
        },
        {
          name: "InterfaceIndex",
          type: "number",
          description: "Filter by interface index",
          required: false,
        },
        {
          name: "AddressFamily",
          type: "select",
          description: "Filter by address family",
          required: false,
          options: ["IPv4", "IPv6"],
        },
      ],
    },
    {
      name: "Get-NetRoute",
      description: "Gets IP routing table information",
      parameters: [
        {
          name: "DestinationPrefix",
          type: "string",
          description: "Filter by destination prefix",
          required: false,
        },
        {
          name: "InterfaceIndex",
          type: "number",
          description: "Filter by interface index",
          required: false,
        },
        {
          name: "AddressFamily",
          type: "select",
          description: "Filter by address family",
          required: false,
          options: ["IPv4", "IPv6"],
        },
      ],
    },
    {
      name: "Get-NetTCPConnection",
      description: "Gets TCP connections",
      parameters: [
        {
          name: "LocalAddress",
          type: "string",
          description: "Filter by local address",
          required: false,
        },
        {
          name: "LocalPort",
          type: "number",
          description: "Filter by local port",
          required: false,
        },
        {
          name: "RemoteAddress",
          type: "string",
          description: "Filter by remote address",
          required: false,
        },
        {
          name: "RemotePort",
          type: "number",
          description: "Filter by remote port",
          required: false,
        },
        {
          name: "State",
          type: "select",
          description: "Filter by connection state",
          required: false,
          options: [
            "Closed",
            "Listen",
            "SynSent",
            "SynReceived",
            "Established",
            "FinWait1",
            "FinWait2",
            "CloseWait",
            "Closing",
            "LastAck",
            "TimeWait",
            "DeleteTCB",
          ],
        },
      ],
    },
    {
      name: "Resolve-DnsName",
      description: "Performs a DNS name query resolution",
      parameters: [
        {
          name: "Name",
          type: "string",
          description: "DNS name to resolve",
          required: true,
          placeholder: "example.com",
        },
        {
          name: "Type",
          type: "select",
          description: "DNS query type",
          required: false,
          options: ["A", "AAAA", "CNAME", "MX", "NS", "PTR", "SOA", "SRV", "TXT"],
        },
        {
          name: "Server",
          type: "string",
          description: "DNS server to query",
          required: false,
        },
      ],
    },
  ],
  "System Management": [
    {
      name: "Get-Process",
      description: "Gets the processes that are running on the local computer",
      parameters: [
        {
          name: "Name",
          type: "string",
          description: "Process name to filter by",
          required: false,
        },
        {
          name: "Id",
          type: "number",
          description: "Process ID to filter by",
          required: false,
        },
        {
          name: "IncludeUserName",
          type: "boolean",
          description: "Include the user name of the process owner",
          required: false,
        },
      ],
    },
    {
      name: "Stop-Process",
      description: "Stops one or more running processes",
      parameters: [
        {
          name: "Name",
          type: "string",
          description: "Process name to stop",
          required: false,
        },
        {
          name: "Id",
          type: "number",
          description: "Process ID to stop",
          required: false,
        },
        {
          name: "Force",
          type: "boolean",
          description: "Forces the process to stop",
          required: false,
        },
        {
          name: "Confirm",
          type: "boolean",
          description: "Prompt for confirmation before executing",
          required: false,
        },
      ],
    },
    {
      name: "Start-Process",
      description: "Starts one or more processes on the local computer",
      parameters: [
        {
          name: "FilePath",
          type: "path",
          description: "Path to the executable",
          required: true,
          placeholder: "C:\\Windows\\System32\\notepad.exe",
        },
        {
          name: "ArgumentList",
          type: "string",
          description: "Arguments to pass to the process",
          required: false,
        },
        {
          name: "WorkingDirectory",
          type: "path",
          description: "Working directory for the process",
          required: false,
        },
        {
          name: "Verb",
          type: "select",
          description: "Verb to use when starting the process",
          required: false,
          options: ["Open", "Edit", "Print", "RunAs"],
        },
        {
          name: "WindowStyle",
          type: "select",
          description: "Window style for the process",
          required: false,
          options: ["Normal", "Hidden", "Minimized", "Maximized"],
        },
        {
          name: "Wait",
          type: "boolean",
          description: "Wait for the process to exit before continuing",
          required: false,
        },
      ],
    },
    {
      name: "Get-Service",
      description: "Gets the services on the computer",
      parameters: [
        {
          name: "Name",
          type: "string",
          description: "Service name to filter by",
          required: false,
        },
        {
          name: "DisplayName",
          type: "string",
          description: "Display name to filter by",
          required: false,
        },
        {
          name: "Include",
          type: "select",
          description: "Include services with specific status",
          required: false,
          options: ["Running", "Stopped"],
        },
      ],
    },
    {
      name: "Start-Service",
      description: "Starts one or more stopped services",
      parameters: [
        {
          name: "Name",
          type: "string",
          description: "Service name to start",
          required: true,
        },
        {
          name: "Force",
          type: "boolean",
          description: "Force the service to start",
          required: false,
        },
        {
          name: "Confirm",
          type: "boolean",
          description: "Prompt for confirmation before executing",
          required: false,
        },
      ],
    },
    {
      name: "Stop-Service",
      description: "Stops one or more running services",
      parameters: [
        {
          name: "Name",
          type: "string",
          description: "Service name to stop",
          required: true,
        },
        {
          name: "Force",
          type: "boolean",
          description: "Force the service to stop",
          required: false,
        },
        {
          name: "Confirm",
          type: "boolean",
          description: "Prompt for confirmation before executing",
          required: false,
        },
      ],
    },
    {
      name: "Restart-Service",
      description: "Stops and then starts one or more services",
      parameters: [
        {
          name: "Name",
          type: "string",
          description: "Service name to restart",
          required: true,
        },
        {
          name: "Force",
          type: "boolean",
          description: "Force the service to restart",
          required: false,
        },
        {
          name: "Confirm",
          type: "boolean",
          description: "Prompt for confirmation before executing",
          required: false,
        },
      ],
    },
    {
      name: "Get-EventLog",
      description: "Gets the events in an event log",
      parameters: [
        {
          name: "LogName",
          type: "select",
          description: "Name of the event log",
          required: true,
          options: ["Application", "System", "Security"],
        },
        {
          name: "Newest",
          type: "number",
          description: "Number of the most recent events to get",
          required: false,
        },
        {
          name: "EntryType",
          type: "select",
          description: "Entry type to filter by",
          required: false,
          options: ["Error", "Warning", "Information", "SuccessAudit", "FailureAudit"],
        },
        {
          name: "Source",
          type: "string",
          description: "Source to filter by",
          required: false,
        },
      ],
    },
  ],
  "Windows Management": [
    {
      name: "Get-ComputerInfo",
      description: "Gets a consolidated object of system and operating system properties",
      parameters: [
        {
          name: "Property",
          type: "string",
          description: "Properties to include in the output",
          required: false,
        },
      ],
    },
    {
      name: "Get-Disk",
      description: "Gets one or more disks visible to the operating system",
      parameters: [
        {
          name: "Number",
          type: "number",
          description: "Disk number to filter by",
          required: false,
        },
      ],
    },
    {
      name: "Get-Volume",
      description: "Gets the specified Volume object",
      parameters: [
        {
          name: "DriveLetter",
          type: "string",
          description: "Drive letter to filter by",
          required: false,
        },
      ],
    },
    {
      name: "Get-Partition",
      description: "Gets the partition objects for all partitions visible on all disks",
      parameters: [
        {
          name: "DiskNumber",
          type: "number",
          description: "Disk number to filter by",
          required: false,
        },
        {
          name: "DriveLetter",
          type: "string",
          description: "Drive letter to filter by",
          required: false,
        },
      ],
    },
    {
      name: "Get-WmiObject",
      description: "Gets instances of WMI classes",
      parameters: [
        {
          name: "Class",
          type: "string",
          description: "WMI class name",
          required: true,
          placeholder: "Win32_OperatingSystem",
        },
        {
          name: "ComputerName",
          type: "string",
          description: "Computer to query",
          required: false,
        },
        {
          name: "Filter",
          type: "string",
          description: "WQL query filter",
          required: false,
        },
      ],
    },
    {
      name: "Get-CimInstance",
      description: "Gets the CIM instances of a class from a CIM server",
      parameters: [
        {
          name: "ClassName",
          type: "string",
          description: "CIM class name",
          required: true,
          placeholder: "Win32_OperatingSystem",
        },
        {
          name: "ComputerName",
          type: "string",
          description: "Computer to query",
          required: false,
        },
        {
          name: "Filter",
          type: "string",
          description: "WQL query filter",
          required: false,
        },
      ],
    },
    {
      name: "Restart-Computer",
      description: "Restarts the operating system on local and remote computers",
      parameters: [
        {
          name: "ComputerName",
          type: "string",
          description: "Computer to restart",
          required: false,
        },
        {
          name: "Force",
          type: "boolean",
          description: "Force restart",
          required: false,
        },
        {
          name: "Confirm",
          type: "boolean",
          description: "Prompt for confirmation before executing",
          required: false,
        },
      ],
    },
    {
      name: "Stop-Computer",
      description: "Stops (shuts down) local and remote computers",
      parameters: [
        {
          name: "ComputerName",
          type: "string",
          description: "Computer to shut down",
          required: false,
        },
        {
          name: "Force",
          type: "boolean",
          description: "Force shutdown",
          required: false,
        },
        {
          name: "Confirm",
          type: "boolean",
          description: "Prompt for confirmation before executing",
          required: false,
        },
      ],
    },
  ],
  Security: [
    {
      name: "Get-Acl",
      description: "Gets the security descriptor for a resource",
      parameters: [
        {
          name: "Path",
          type: "path",
          description: "Path to the resource",
          required: true,
          placeholder: "C:\\path\\to\\resource",
        },
      ],
    },
    {
      name: "Set-Acl",
      description: "Changes the security descriptor of a specified resource",
      parameters: [
        {
          name: "Path",
          type: "path",
          description: "Path to the resource",
          required: true,
          placeholder: "C:\\path\\to\\resource",
        },
        {
          name: "AclObject",
          type: "string",
          description: "ACL object to apply",
          required: true,
        },
      ],
    },
    {
      name: "Get-Credential",
      description: "Gets a credential object based on a user name and password",
      parameters: [
        {
          name: "UserName",
          type: "string",
          description: "User name for the credential",
          required: false,
        },
        {
          name: "Message",
          type: "string",
          description: "Message to display in the credential request dialog box",
          required: false,
        },
      ],
    },
    {
      name: "ConvertTo-SecureString",
      description: "Converts encrypted standard strings to secure strings",
      parameters: [
        {
          name: "String",
          type: "string",
          description: "String to convert",
          required: true,
        },
        {
          name: "AsPlainText",
          type: "boolean",
          description: "Convert plain text to secure string",
          required: false,
        },
        {
          name: "Force",
          type: "boolean",
          description: "Force the conversion",
          required: false,
        },
      ],
    },
    {
      name: "New-LocalUser",
      description: "Creates a local user account",
      parameters: [
        {
          name: "Name",
          type: "string",
          description: "Name for the user account",
          required: true,
        },
        {
          name: "Password",
          type: "string",
          description: "Password for the user account (as SecureString)",
          required: true,
        },
        {
          name: "Description",
          type: "string",
          description: "Description of the user account",
          required: false,
        },
        {
          name: "AccountExpires",
          type: "string",
          description: "Date when the account expires",
          required: false,
        },
        {
          name: "AccountNeverExpires",
          type: "boolean",
          description: "Indicates that the account never expires",
          required: false,
        },
        {
          name: "PasswordNeverExpires",
          type: "boolean",
          description: "Indicates that the password never expires",
          required: false,
        },
      ],
    },
    {
      name: "Get-LocalUser",
      description: "Gets local user accounts",
      parameters: [
        {
          name: "Name",
          type: "string",
          description: "Name of the user account to get",
          required: false,
        },
      ],
    },
  ],
  "Remote Management": [
    {
      name: "Enter-PSSession",
      description: "Starts an interactive session with a remote computer",
      parameters: [
        {
          name: "ComputerName",
          type: "string",
          description: "Computer to connect to",
          required: true,
        },
        {
          name: "Credential",
          type: "string",
          description: "Credentials to use for the connection",
          required: false,
        },
      ],
    },
    {
      name: "Exit-PSSession",
      description: "Ends an interactive session with a remote computer",
      parameters: [],
    },
    {
      name: "Invoke-Command",
      description: "Runs commands on local and remote computers",
      parameters: [
        {
          name: "ComputerName",
          type: "string",
          description: "Computer to run the command on",
          required: false,
        },
        {
          name: "ScriptBlock",
          type: "string",
          description: "Commands to run",
          required: true,
          placeholder: "{ Get-Process }",
        },
        {
          name: "Credential",
          type: "string",
          description: "Credentials to use for the connection",
          required: false,
        },
        {
          name: "ArgumentList",
          type: "string",
          description: "Arguments to pass to the script block",
          required: false,
        },
      ],
    },
    {
      name: "New-PSSession",
      description: "Creates a persistent connection to a local or remote computer",
      parameters: [
        {
          name: "ComputerName",
          type: "string",
          description: "Computer to connect to",
          required: true,
        },
        {
          name: "Credential",
          type: "string",
          description: "Credentials to use for the connection",
          required: false,
        },
      ],
    },
    {
      name: "Remove-PSSession",
      description: "Closes one or more PowerShell sessions",
      parameters: [
        {
          name: "Id",
          type: "number",
          description: "ID of the session to remove",
          required: false,
        },
        {
          name: "Name",
          type: "string",
          description: "Name of the session to remove",
          required: false,
        },
      ],
    },
  ],
  "Module Management": [
    {
      name: "Get-Module",
      description: "Gets the modules that have been imported or that can be imported into the current session",
      parameters: [
        {
          name: "Name",
          type: "string",
          description: "Name of the module to get",
          required: false,
        },
        {
          name: "ListAvailable",
          type: "boolean",
          description: "Get modules that are available but not imported",
          required: false,
        },
      ],
    },
    {
      name: "Import-Module",
      description: "Adds modules to the current session",
      parameters: [
        {
          name: "Name",
          type: "string",
          description: "Name of the module to import",
          required: true,
        },
        {
          name: "Force",
          type: "boolean",
          description: "Force import of the module",
          required: false,
        },
      ],
    },
    {
      name: "Remove-Module",
      description: "Removes modules from the current session",
      parameters: [
        {
          name: "Name",
          type: "string",
          description: "Name of the module to remove",
          required: true,
        },
        {
          name: "Force",
          type: "boolean",
          description: "Force removal of the module",
          required: false,
        },
      ],
    },
    {
      name: "Find-Module",
      description: "Finds modules in a repository that match specified criteria",
      parameters: [
        {
          name: "Name",
          type: "string",
          description: "Name of the module to find",
          required: false,
        },
        {
          name: "Repository",
          type: "string",
          description: "Repository to search",
          required: false,
          defaultValue: "PSGallery",
        },
      ],
    },
    {
      name: "Install-Module",
      description: "Downloads one or more modules from a repository, and installs them on the local computer",
      parameters: [
        {
          name: "Name",
          type: "string",
          description: "Name of the module to install",
          required: true,
        },
        {
          name: "Repository",
          type: "string",
          description: "Repository to install from",
          required: false,
          defaultValue: "PSGallery",
        },
        {
          name: "Scope",
          type: "select",
          description: "Scope of the installation",
          required: false,
          options: ["CurrentUser", "AllUsers"],
        },
        {
          name: "Force",
          type: "boolean",
          description: "Force installation of the module",
          required: false,
        },
      ],
    },
  ],
  Utility: [
    {
      name: "Write-Host",
      description: "Writes customized output to the host",
      parameters: [
        {
          name: "Object",
          type: "string",
          description: "Objects to display in the host",
          required: true,
        },
        {
          name: "ForegroundColor",
          type: "select",
          description: "Text color",
          required: false,
          options: [
            "Black",
            "DarkBlue",
            "DarkGreen",
            "DarkCyan",
            "DarkRed",
            "DarkMagenta",
            "DarkYellow",
            "Gray",
            "DarkGray",
            "Blue",
            "Green",
            "Cyan",
            "Red",
            "Magenta",
            "Yellow",
            "White",
          ],
        },
        {
          name: "BackgroundColor",
          type: "select",
          description: "Background color",
          required: false,
          options: [
            "Black",
            "DarkBlue",
            "DarkGreen",
            "DarkCyan",
            "DarkRed",
            "DarkMagenta",
            "DarkYellow",
            "Gray",
            "DarkGray",
            "Blue",
            "Green",
            "Cyan",
            "Red",
            "Magenta",
            "Yellow",
            "White",
          ],
        },
        {
          name: "NoNewline",
          type: "boolean",
          description: "Do not add a newline after the output",
          required: false,
        },
      ],
    },
    {
      name: "Write-Output",
      description: "Sends objects to the next command in the pipeline",
      parameters: [
        {
          name: "InputObject",
          type: "string",
          description: "Objects to send down the pipeline",
          required: true,
        },
      ],
    },
    {
      name: "Write-Error",
      description: "Writes an object to the error stream",
      parameters: [
        {
          name: "Message",
          type: "string",
          description: "Error message",
          required: true,
        },
        {
          name: "Category",
          type: "select",
          description: "Error category",
          required: false,
          options: [
            "NotSpecified",
            "OpenError",
            "CloseError",
            "DeviceError",
            "DeadlockDetected",
            "InvalidArgument",
            "InvalidData",
            "InvalidOperation",
            "InvalidResult",
            "InvalidType",
            "MetadataError",
            "NotImplemented",
            "NotInstalled",
            "ObjectNotFound",
            "OperationStopped",
            "OperationTimeout",
            "SyntaxError",
            "ParserError",
            "PermissionDenied",
            "ResourceBusy",
            "ResourceExists",
            "ResourceUnavailable",
            "ReadError",
            "WriteError",
            "FromStdErr",
            "SecurityError",
          ],
        },
      ],
    },
    {
      name: "Select-Object",
      description: "Selects specified properties of an object or set of objects",
      parameters: [
        {
          name: "Property",
          type: "string",
          description: "Properties to select",
          required: false,
        },
        {
          name: "First",
          type: "number",
          description: "Number of objects to select from the beginning",
          required: false,
        },
        {
          name: "Last",
          type: "number",
          description: "Number of objects to select from the end",
          required: false,
        },
        {
          name: "Unique",
          type: "boolean",
          description: "Select only unique objects",
          required: false,
        },
      ],
    },
    {
      name: "Where-Object",
      description: "Selects objects from a collection based on their property values",
      parameters: [
        {
          name: "FilterScript",
          type: "string",
          description: "Script block to filter objects",
          required: true,
          placeholder: "{ $_.Name -like '*test*' }",
        },
      ],
    },
    {
      name: "ForEach-Object",
      description: "Performs an operation on each item in a collection",
      parameters: [
        {
          name: "Process",
          type: "string",
          description: "Script block to process each object",
          required: true,
          placeholder: "{ $_.Name }",
        },
      ],
    },
    {
      name: "Sort-Object",
      description: "Sorts objects by property values",
      parameters: [
        {
          name: "Property",
          type: "string",
          description: "Properties to sort by",
          required: true,
        },
        {
          name: "Descending",
          type: "boolean",
          description: "Sort in descending order",
          required: false,
        },
      ],
    },
    {
      name: "Measure-Object",
      description: "Calculates the numeric properties of objects",
      parameters: [
        {
          name: "Property",
          type: "string",
          description: "Properties to measure",
          required: false,
        },
        {
          name: "Average",
          type: "boolean",
          description: "Calculate the average",
          required: false,
        },
        {
          name: "Sum",
          type: "boolean",
          description: "Calculate the sum",
          required: false,
        },
        {
          name: "Maximum",
          type: "boolean",
          description: "Calculate the maximum",
          required: false,
        },
        {
          name: "Minimum",
          type: "boolean",
          description: "Calculate the minimum",
          required: false,
        },
      ],
    },
    {
      name: "Compare-Object",
      description: "Compares two sets of objects",
      parameters: [
        {
          name: "ReferenceObject",
          type: "string",
          description: "Reference objects",
          required: true,
        },
        {
          name: "DifferenceObject",
          type: "string",
          description: "Difference objects",
          required: true,
        },
        {
          name: "Property",
          type: "string",
          description: "Properties to compare",
          required: false,
        },
      ],
    },
  ],
  "Variables and Environment": [
    {
      name: "Get-Variable",
      description: "Gets the variables in the current console",
      parameters: [
        {
          name: "Name",
          type: "string",
          description: "Name of the variable to get",
          required: false,
        },
      ],
    },
    {
      name: "Set-Variable",
      description: "Sets a variable and its value",
      parameters: [
        {
          name: "Name",
          type: "string",
          description: "Name of the variable to set",
          required: true,
        },
        {
          name: "Value",
          type: "string",
          description: "Value to assign to the variable",
          required: true,
        },
        {
          name: "Force",
          type: "boolean",
          description: "Force setting the variable",
          required: false,
        },
      ],
    },
    {
      name: "Remove-Variable",
      description: "Deletes a variable and its value",
      parameters: [
        {
          name: "Name",
          type: "string",
          description: "Name of the variable to remove",
          required: true,
        },
        {
          name: "Force",
          type: "boolean",
          description: "Force removal of the variable",
          required: false,
        },
      ],
    },
    {
      name: "Get-ChildItem",
      description: "Gets the items and child items in a specified location",
      parameters: [
        {
          name: "Path",
          type: "path",
          description: "Path to the location",
          required: false,
          placeholder: "Env:",
        },
      ],
    },
    {
      name: "Get-Item",
      description: "Gets the item at the specified location",
      parameters: [
        {
          name: "Path",
          type: "path",
          description: "Path to the item",
          required: true,
          placeholder: "Env:PATH",
        },
      ],
    },
    {
      name: "Set-Item",
      description: "Changes the value of an item to the value specified in the command",
      parameters: [
        {
          name: "Path",
          type: "path",
          description: "Path to the item",
          required: true,
          placeholder: "Env:PATH",
        },
        {
          name: "Value",
          type: "string",
          description: "New value for the item",
          required: true,
        },
        {
          name: "Force",
          type: "boolean",
          description: "Force setting the item",
          required: false,
        },
      ],
    },
  ],
}

