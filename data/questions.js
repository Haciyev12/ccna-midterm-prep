const MODULES = {
  1:  { title:"Networking Today",                    icon:"🌐", color:"#2563eb", questions:15 },
  2:  { title:"Basic Switch & Device Config",        icon:"⚙️",  color:"#059669", questions:15 },
  3:  { title:"Protocols and Models",                icon:"📋", color:"#7c3aed", questions:15 },
  4:  { title:"Physical Layer",                      icon:"🔌", color:"#d97706", questions:15 },
  6:  { title:"Data Link Layer",                     icon:"🔗", color:"#dc2626", questions:15 },
  8:  { title:"Network Layer",                       icon:"🗺️",  color:"#0891b2", questions:15 },
  16: { title:"Network Security Fundamentals",       icon:"🔒", color:"#be185d", questions:15 }
};

// ─── Topic Recaps ───────────────────────────────────────────────────────────
const MODULE_RECAP = {
  1: {
    sections: [
      {
        title: "Network Components",
        points: [
          "<strong>Hosts / End devices</strong> — any device that originates or receives data (PC, phone, server, printer). Every host has a unique address.",
          "<strong>Servers</strong> provide services (web, email, file). <strong>Clients</strong> request those services. In a <strong>peer-to-peer</strong> network a single device can be both at once.",
          "<strong>Intermediary devices</strong> connect and manage traffic between hosts: <em>switches</em> (LAN), <em>routers</em> (between networks), <em>wireless APs</em>, <em>firewalls</em>.",
          "<strong>Network media</strong> — the physical path: copper wire, fiber-optic cable, or wireless radio waves."
        ],
        table: {
          headers: ["Device", "Primary function"],
          rows: [
            ["Switch", "Connects devices inside a LAN using MAC addresses"],
            ["Router", "Connects different networks, forwards packets using IP addresses"],
            ["Wireless AP", "Extends a wired LAN wirelessly (802.11)"],
            ["Firewall", "Filters traffic between networks for security"]
          ]
        }
      },
      {
        title: "Network Types",
        points: [
          "<strong>LAN</strong> (Local Area Network) — small geographic area (office, home). Usually one organization owns it.",
          "<strong>WAN</strong> (Wide Area Network) — large geographic area, interconnects multiple LANs. ISPs operate WANs.",
          "<strong>Internet</strong> — worldwide collection of interconnected LANs and WANs. No single owner.",
          "<strong>Intranet</strong> — private internal network accessible only to an organization's members.",
          "<strong>Extranet</strong> — controlled access network for external parties (partners, suppliers, customers).",
          "<strong>SOHO</strong> — Small Office / Home Office network connecting a few devices to the internet."
        ],
        callout: { type: "trap", text: "Intranet ≠ Internet. An intranet is private; the internet is public and global." }
      },
      {
        title: "Key Trends & Terminology",
        points: [
          "<strong>BYOD</strong> (Bring Your Own Device) — policy that lets employees use personal devices on the corporate network.",
          "<strong>QoS</strong> (Quality of Service) — network policy that prioritizes time-sensitive traffic like voice and video over lower-priority data.",
          "<strong>Cloud</strong> — storing and accessing data/applications on internet-connected servers rather than local hardware.",
          "<strong>IoT</strong> (Internet of Things) — everyday objects embedded with connectivity (smart home, industrial sensors).",
          "<strong>Unicast</strong> = 1→1 &nbsp; | &nbsp; <strong>Multicast</strong> = 1→group &nbsp; | &nbsp; <strong>Broadcast</strong> = 1→all"
        ]
      }
    ]
  },
  2: {
    sections: [
      {
        title: "IOS Access & Modes",
        points: [
          "<strong>User EXEC mode</strong> — prompt <code>Router&gt;</code>. Limited monitoring only. Enter with a console/vty connection.",
          "<strong>Privileged EXEC mode</strong> — prompt <code>Router#</code>. Full access to all commands. Enter with <code>enable</code>.",
          "<strong>Global Config mode</strong> — prompt <code>Router(config)#</code>. Device-wide settings. Enter with <code>configure terminal</code>.",
          "<strong>Sub-config modes</strong> — Interface <code>(config-if)#</code>, Line <code>(config-line)#</code>.",
          "<code>exit</code> goes back one level. <code>end</code> or <kbd>Ctrl+Z</kbd> jumps straight back to privileged EXEC."
        ],
        callout: { type: "tip", text: "Mode hierarchy: User EXEC → Privileged EXEC → Global Config → Sub-config modes." }
      },
      {
        title: "Essential Configuration Commands",
        table: {
          headers: ["Command", "Mode", "Effect"],
          rows: [
            ["enable", "User EXEC", "Enter Privileged EXEC mode"],
            ["configure terminal", "Privileged EXEC", "Enter Global Config mode"],
            ["hostname &lt;name&gt;", "Global Config", "Set device hostname"],
            ["enable secret &lt;pw&gt;", "Global Config", "Set encrypted privileged password (MD5)"],
            ["service password-encryption", "Global Config", "Encrypt all plain-text passwords in config"],
            ["copy running-config startup-config", "Privileged EXEC", "Save RAM config to NVRAM"],
            ["show ip interface brief", "Privileged EXEC", "Summary of all interfaces and status"],
            ["no shutdown", "Interface Config", "Bring an interface up"]
          ]
        }
      },
      {
        title: "Switch Virtual Interface (SVI) & Remote Management",
        points: [
          "A Layer 2 switch doesn't route; it needs an <strong>SVI</strong> (Switch Virtual Interface) to be reachable via IP for remote management.",
          "The SVI is associated with <strong>VLAN 1</strong> by default: <code>interface vlan 1</code> → assign IP → <code>no shutdown</code>.",
          "<strong>SSH</strong> encrypts the remote session (use this). <strong>Telnet</strong> sends everything in plain text (avoid).",
          "<strong>Console</strong> access is direct, out-of-band, does not require network connectivity — used for initial setup."
        ],
        callout: { type: "trap", text: "enable secret and enable password are different. enable secret is MD5-encrypted and takes priority if both are set." }
      }
    ]
  },
  3: {
    sections: [
      {
        title: "Communication Rules (Protocols)",
        points: [
          "All communication requires agreed-upon <strong>protocols</strong> — rules governing message format, timing, encoding, delivery.",
          "<strong>Encoding</strong> — converting data into signals suitable for the medium.",
          "<strong>Encapsulation</strong> — wrapping data with headers (and trailers) as it moves down the stack.",
          "<strong>Message delivery options</strong>: Unicast (1→1), Multicast (1→group), Broadcast (1→all)."
        ]
      },
      {
        title: "OSI vs TCP/IP Model",
        table: {
          headers: ["OSI Layer", "TCP/IP Layer", "PDU", "Key protocols"],
          rows: [
            ["7 Application", "Application", "Data", "HTTP, FTP, DNS, DHCP, SMTP"],
            ["6 Presentation", "Application", "Data", "SSL/TLS, JPEG, MPEG"],
            ["5 Session", "Application", "Data", "NetBIOS, RPC"],
            ["4 Transport", "Transport", "Segment", "TCP, UDP"],
            ["3 Network", "Internet", "Packet", "IP, ICMP, ARP"],
            ["2 Data Link", "Network Access", "Frame", "Ethernet, 802.11"],
            ["1 Physical", "Network Access", "Bits", "Cables, signals, NIC"]
          ]
        },
        callout: { type: "tip", text: "Mnemonic (top→bottom): All People Seem To Need Data Processing." }
      },
      {
        title: "Encapsulation & PDUs",
        points: [
          "Data moves <strong>down</strong> the stack (encapsulation) at the sender, <strong>up</strong> the stack (de-encapsulation) at the receiver.",
          "Each layer adds its own header (Data Link also adds a trailer).",
          "PDU names: <strong>Data</strong> (App) → <strong>Segment</strong> (Transport) → <strong>Packet</strong> (Network) → <strong>Frame</strong> (Data Link) → <strong>Bits</strong> (Physical).",
          "<strong>TCP/IP Network Access layer</strong> = OSI Physical + Data Link. <strong>TCP/IP Internet</strong> = OSI Network."
        ],
        callout: { type: "trap", text: "ARP is a Network layer protocol in TCP/IP but Data Link in some contexts. On exams it maps to OSI Layer 3 (Internet layer in TCP/IP)." }
      }
    ]
  },
  4: {
    sections: [
      {
        title: "Physical Layer Fundamentals",
        points: [
          "The Physical layer <strong>encodes bits</strong> and creates the electrical, optical, or radio signals placed on the medium.",
          "<strong>Bandwidth</strong> — theoretical maximum capacity of the medium (bps). A property of the medium.",
          "<strong>Throughput</strong> — actual measured data rate. Always ≤ bandwidth. Affected by traffic, latency, device overhead.",
          "<strong>Latency</strong> — total time delay from source to destination (propagation + processing + queuing).",
          "<strong>Goodput</strong> — useful data throughput (total throughput minus protocol overhead).",
          "<strong>Attenuation</strong> — signal weakening over distance. Longer cable = more attenuation."
        ],
        callout: { type: "trap", text: "Bandwidth ≠ Throughput. Bandwidth is theoretical max; throughput is what you actually measure." }
      },
      {
        title: "Copper & Fiber Cabling",
        table: {
          headers: ["Cable type", "Max length", "Connector", "Key fact"],
          rows: [
            ["UTP (Cat5e/6)", "100 m", "RJ-45", "Most common, cheap, susceptible to EMI"],
            ["STP", "100 m", "RJ-45", "Shielded — better EMI resistance, more expensive"],
            ["Coaxial", "Varies", "BNC/F-type", "Used in cable TV, older Ethernet"],
            ["Single-mode fiber", "km range", "LC/SC/ST", "Laser, long distance, expensive"],
            ["Multi-mode fiber", "550 m", "LC/SC/ST", "LED, shorter distances, cheaper"]
          ]
        }
      },
      {
        title: "UTP Wiring & Wireless",
        points: [
          "<strong>Straight-through</strong> — both ends wired identically (T568A–T568A or T568B–T568B). Connects <em>unlike</em> devices: PC↔switch, router↔switch.",
          "<strong>Crossover</strong> — one end T568A, other T568B. Connects <em>like</em> devices: PC↔PC, switch↔switch.",
          "<strong>Rollover/console</strong> — flat cable, connects PC serial/USB to router/switch console port for management.",
          "<strong>Auto-MDIX</strong> — modern switches automatically adjust; makes cable type irrelevant in most cases.",
          "<strong>Crosstalk</strong> — interference from adjacent wire pairs' magnetic fields. Reduced by <em>twisting</em> wire pairs.",
          "Wireless 802.11 uses <strong>CSMA/CA</strong>. Commonly interfered with by <em>microwaves</em> and <em>cordless phones</em>."
        ]
      }
    ]
  },
  6: {
    sections: [
      {
        title: "Data Link Layer Structure",
        points: [
          "Data Link provides <strong>node-to-node</strong> (hop-to-hop) delivery on the same network segment.",
          "<strong>LLC sublayer</strong> (Logical Link Control) — identifies which Network layer protocol is being carried; implemented in software.",
          "<strong>MAC sublayer</strong> (Media Access Control) — physical addressing (MAC addresses) + controls access to the shared medium; implemented in hardware (NIC).",
          "<strong>Frame structure</strong>: Header (dest MAC, src MAC, type) | Data | Trailer (FCS/CRC for error detection).",
          "<strong>FCS/CRC</strong> in the trailer — used to detect transmission errors. If CRC fails, the frame is <em>discarded</em> (not corrected)."
        ]
      },
      {
        title: "Topologies & Media Access",
        table: {
          headers: ["Method", "Used by", "How it works"],
          rows: [
            ["CSMA/CD", "Legacy Ethernet (half-duplex)", "Listen before transmit; detect collision; back off and retry"],
            ["CSMA/CA", "802.11 WLAN (half-duplex)", "Listen before transmit; wait random time to avoid collision"],
            ["Full-duplex", "Modern switched Ethernet", "Simultaneous send and receive — no media arbitration needed"]
          ]
        },
        callout: { type: "trap", text: "Full-duplex connections do NOT need CSMA/CD or CSMA/CA — there is no possibility of collision." }
      },
      {
        title: "Switching Methods & MAC Addresses",
        points: [
          "<strong>Store-and-forward</strong> — buffers entire frame, checks CRC. Highest accuracy, higher latency.",
          "<strong>Cut-through</strong> — forwards after reading only the destination MAC. Lower latency, may forward corrupt frames.",
          "<strong>Fast-forward</strong> — a cut-through variant; the lowest-latency method.",
          "<strong>Fragment-free</strong> — reads first 64 bytes (most collisions produce fragments < 64 bytes) before forwarding. Compromise.",
          "Broadcast MAC = <code>FF:FF:FF:FF:FF:FF</code> — every device on the segment receives and processes it.",
          "Multicast MAC starts with <code>01:00:5E</code> — only devices in the multicast group process it."
        ]
      }
    ]
  },
  8: {
    sections: [
      {
        title: "IP Characteristics",
        points: [
          "<strong>Connectionless</strong> — IP does not establish a session before sending packets.",
          "<strong>Best-effort</strong> — IP does not guarantee delivery; no retransmission, no acknowledgement.",
          "<strong>Media-independent</strong> — IP works over any physical medium; the Network layer sets MTU.",
          "Reliability (if needed) is provided by upper layers — e.g., <strong>TCP</strong> at the Transport layer."
        ],
        callout: { type: "tip", text: "Remember: IP is C-B-M — Connectionless, Best-effort, Media-independent." }
      },
      {
        title: "IPv4 vs IPv6 Header Key Fields",
        table: {
          headers: ["Field", "IPv4", "IPv6 equivalent"],
          rows: [
            ["Address size", "32-bit (~4.3B addresses)", "128-bit (340 undecillion addresses)"],
            ["TTL / Hop Limit", "Time-to-Live (8-bit)", "Hop Limit (8-bit)"],
            ["Protocol", "Protocol field (TCP=6, UDP=17, ICMP=1)", "Next Header"],
            ["Priority", "Differentiated Services (DSCP)", "Traffic Class"],
            ["Header size", "20 bytes (variable)", "40 bytes fixed (simpler)"],
            ["Broadcast", "Supported", "No broadcast — uses multicast instead"],
            ["Config", "Manual / DHCP", "SLAAC or DHCPv6"]
          ]
        }
      },
      {
        title: "Routing & ARP",
        points: [
          "<strong>Default gateway</strong> — the router interface on the same network as the host. Used for ALL remote traffic.",
          "If the destination is on the <em>same</em> network: packet sent directly. If <em>remote</em>: packet sent to default gateway.",
          "<strong>ARP</strong> (Address Resolution Protocol) — maps a known IPv4 address to an unknown MAC address.",
          "ARP request is sent as a <strong>broadcast</strong> (FF:FF:FF:FF:FF:FF). ARP reply is unicast back to the requester.",
          "<strong>ARP cache</strong> — stores IP→MAC mappings temporarily. Use <code>arp -a</code> to view on Windows.",
          "IPv6 uses <strong>NDP</strong> (Neighbor Discovery Protocol) with <em>Neighbor Solicitation</em> and <em>Neighbor Advertisement</em> messages instead of ARP."
        ],
        callout: { type: "trap", text: "ARP only works on the LOCAL network. To reach a remote host, ARP finds the gateway's MAC, not the remote host's MAC." }
      }
    ]
  },
  16: {
    sections: [
      {
        title: "Threats, Vulnerabilities & Malware",
        table: {
          headers: ["Type", "How it spreads", "Key trait"],
          rows: [
            ["Virus", "Attached to files; needs user action", "Requires a host file to exist"],
            ["Worm", "Self-replicates over network; no user action", "Autonomous spread — exploits vulnerabilities"],
            ["Trojan horse", "Disguised as legitimate software", "User installs it voluntarily; no self-replication"],
            ["Spyware", "Bundled with software", "Secretly collects user data"],
            ["Ransomware", "Email attachments, drive-by downloads", "Encrypts files; demands payment"]
          ]
        },
        callout: { type: "trap", text: "Viruses need user action; worms do not. A Trojan looks legitimate — that's its defining trait." }
      },
      {
        title: "Attack Types",
        points: [
          "<strong>Reconnaissance</strong> — information gathering and network mapping before an attack. Tools: nslookup, fping, ping sweeps.",
          "<strong>Access attacks</strong> — exploit authentication weaknesses to gain unauthorized access.",
          "<strong>DoS</strong> (Denial of Service) — flood a target to make it unavailable to legitimate users.",
          "<strong>DDoS</strong> — Distributed DoS using multiple compromised hosts (botnet).",
          "<strong>Man-in-the-middle</strong> — intercepts communication between two parties without their knowledge.",
          "<strong>ARP spoofing</strong> — sends fake ARP replies to associate the attacker's MAC with a legitimate IP."
        ]
      },
      {
        title: "Mitigations & Device Security",
        points: [
          "<strong>Defense-in-depth</strong> — layered security; no single point of failure.",
          "<strong>Firewall</strong> — controls traffic between network zones. <em>Stateful Packet Inspection</em> tracks connection state to block unsolicited inbound traffic.",
          "<strong>IDS</strong> (Intrusion Detection) — detects and alerts. <strong>IPS</strong> (Intrusion Prevention) — detects and <em>blocks</em> in real time.",
          "<strong>AAA</strong>: Authentication (who?), Authorization (what can they do?), Accounting (track actions).",
          "<strong>SSH</strong> setup: unique hostname + IP domain name + RSA key pair + local user account.",
          "<code>login block-for [s] attempts [n] within [s]</code> — mitigates brute-force login attacks.",
          "<code>enable secret</code> uses MD5 encryption; stronger than <code>enable password</code>."
        ]
      }
    ]
  }
};

// ─── Quiz Questions (with hint + explanation + wrongExp) ───────────────────
const QUIZ_DATA = {
  1: [
    {
      q: "What term describes storing personal files on servers over the internet to provide access anywhere, anytime, and on any device?",
      options: ["Quality of service","Cloud","BYOD","Converged network"],
      answer: 1,
      hint: "Think about what services like Dropbox or Google Drive do — your files live on their servers, not your hard drive.",
      explanation: "Cloud computing stores data and applications on internet-connected servers accessible from any device, anywhere.",
      wrongExp: ["QoS manages the priority of network traffic — it does not store files.","","BYOD describes letting employees use personal devices on corporate networks — not a storage concept.","A converged network carries voice, video, and data on one infrastructure — unrelated to file storage."]
    },
    {
      q: "What term describes a network where one computer can be both client and server?",
      options: ["Cloud","Quality of service","BYOD","Peer-to-peer"],
      answer: 3,
      hint: "When friends share files directly between laptops without a dedicated server, what is that arrangement called?",
      explanation: "In a peer-to-peer (P2P) network, any device can simultaneously act as both a client (requesting services) and a server (providing services).",
      wrongExp: ["Cloud refers to internet-based computing/storage, not a local network topology.","QoS prioritizes traffic types — it has nothing to do with client/server roles.","BYOD is about using personal devices on corporate networks — unrelated to server roles.",""]
    },
    {
      q: "What term describes a private collection of LANs and WANs that belongs to an organization?",
      options: ["Internet","Peer-to-peer","Intranet","Extranet"],
      answer: 2,
      hint: "The key word is 'private' and 'belongs to an organization' — it is not publicly accessible.",
      explanation: "An intranet is a private network owned by an organization, accessible only to its employees/members.",
      wrongExp: ["The Internet is a global, public collection of interconnected networks — not private.","Peer-to-peer describes a network model where devices share roles, not a private organizational network.","","An extranet is similar but allows controlled access to external parties (vendors, partners) — not purely internal."]
    },
    {
      q: "What term refers to a network that provides secure access to corporate offices by suppliers, customers and collaborators?",
      options: ["Intranet","Extendednet","Internet","Extranet"],
      answer: 3,
      hint: "This network extends beyond the organization's walls to give controlled access to trusted outsiders.",
      explanation: "An extranet provides controlled, secure access to an organization's resources for external parties such as suppliers, customers, and partners.",
      wrongExp: ["An intranet is restricted to internal employees only — not accessible by outsiders.","'Extendednet' is not a real networking term.","The Internet is a global public network — not a controlled corporate access solution.",""]
    },
    {
      q: "Which device performs the function of determining the path that messages should take through internetworks?",
      options: ["A firewall","A web server","A router","A DSL modem"],
      answer: 2,
      hint: "This device operates at Layer 3 (Network layer) and uses IP routing tables to make forwarding decisions.",
      explanation: "Routers operate at Layer 3 and use routing tables to determine the best path for packets across interconnected networks.",
      wrongExp: ["A firewall controls traffic based on security rules — it does not determine routing paths.","A web server hosts web content — it does not make network routing decisions.","","A DSL modem connects a home to the ISP — it does not route between internetworks."]
    },
    {
      q: "What term describes the ability to use personal devices across a business or campus network?",
      options: ["Extranet","Intranet","BYOD","Internet"],
      answer: 2,
      hint: "This acronym literally stands for the concept of bringing something you own to work.",
      explanation: "BYOD (Bring Your Own Device) is a policy that allows users to connect their personal laptops, phones, and tablets to the corporate network.",
      wrongExp: ["Extranet provides access to external partners — not a device policy.","Intranet is an internal network type — not a device policy.","","The Internet is the global public network — not a corporate device access policy."]
    },
    {
      q: "What term describes a policy that allows network devices to manage the flow of data to give priority to voice and video?",
      options: ["Internet","Intranet","Extranet","Quality of service"],
      answer: 3,
      hint: "Voice and video require low latency — which technology ensures their packets are prioritized?",
      explanation: "QoS (Quality of Service) defines rules that prioritize time-sensitive traffic (voice, video) over less time-critical data (email, file transfers).",
      wrongExp: ["The Internet is a global network — not a traffic prioritization policy.","Intranet is a private organizational network — not traffic management.","Extranet is a controlled-access network — not a QoS concept.",""]
    },
    {
      q: "What is an ISP?",
      options: ["A standards body that develops cabling and wiring standards","A networking device that combines functionality of several devices","A protocol that establishes how computers within a local network communicate","An organization that enables individuals and businesses to connect to the Internet"],
      answer: 3,
      hint: "Think about who provides your home internet connection — that company is a ___.",
      explanation: "An ISP (Internet Service Provider) is a company that provides individuals and businesses with access to the Internet (e.g., Comcast, AT&T, Turkcell).",
      wrongExp: ["Standards bodies like IEEE or TIA/EIA develop cabling standards — they do not provide internet access.","A device combining multiple functions describes a multi-layer switch or UTM appliance — not an ISP.","A protocol defines communication rules — ISPs are organizations, not protocols.",""]
    },
    {
      q: "What type of network traffic requires QoS?",
      options: ["Video conferencing","On-line purchasing","Wiki","Email"],
      answer: 0,
      hint: "Which of these would be completely unusable with even one second of delay or choppy packet delivery?",
      explanation: "Video conferencing (and voice calls) are real-time applications — even small delays or jitter make them unusable, requiring QoS prioritization.",
      wrongExp: ["","Online purchasing is not time-sensitive — a 1-second delay has no impact on usability.","Wiki pages are static content — latency is not critical.","Email is store-and-forward — a few extra milliseconds of delay is imperceptible."]
    },
    {
      q: "What term describes a type of network used by people who work from home or from a small remote office?",
      options: ["BYOD","Converged network","Quality of service","SOHO network"],
      answer: 3,
      hint: "This acronym stands for the two types of small offices it serves: home and a small commercial office.",
      explanation: "SOHO (Small Office/Home Office) refers to networks of just a few devices in a residential or small commercial environment.",
      wrongExp: ["BYOD is a device-use policy — not a network size classification.","A converged network combines voice, video, and data services — not a size classification.","QoS prioritizes traffic types — not a network type.",""]
    },
    {
      q: "What is a characteristic of multicast messages?",
      options: ["They must be acknowledged","They are sent to a select group of hosts","They are sent to all hosts on a network","They are sent to a single destination"],
      answer: 1,
      hint: "Multi- means many. Think of a streaming video sent to subscribers only — not everyone, not just one person.",
      explanation: "Multicast sends one copy of a message to a specific group of subscribed hosts — more efficient than broadcast (which reaches everyone).",
      wrongExp: ["Multicast is a best-effort delivery method — no acknowledgements.","","Sending to ALL hosts is a broadcast — multicast is selective.","Sending to one host only is unicast."]
    },
    {
      q: "A networking technician set up a wireless network so patients can see other patients' medical records. Which network characteristic was violated?",
      options: ["Reliability","Quality of Service (QoS)","Scalability","Security"],
      answer: 3,
      hint: "Unauthorized access to private data is a classic failure of one of the four fundamental network characteristics.",
      explanation: "Security ensures that only authorized users can access network information. Exposing patient records to others is a clear security violation.",
      wrongExp: ["Reliability concerns network uptime/availability — not data access control.","QoS prioritizes traffic types — not access control.","Scalability refers to the ability to grow the network — not data protection.",""]
    },
    {
      q: "An employee needs to access confidential pricing from internal servers at the Head Office. What type of network would the employee access?",
      options: ["An intranet","The Internet","An extranet","A local area network"],
      answer: 0,
      hint: "The employee is accessing the organization's own internal servers — not an external partner's network.",
      explanation: "An intranet is the private internal network of an organization — internal employees access internal resources through it.",
      wrongExp: ["","The Internet is public — you would not store confidential pricing there.","An extranet gives external parties (like suppliers) access to your network — not internal employees.","A LAN is a physical network concept at one location — the Head Office and branch are in different locations."]
    },
    {
      q: "A large corporation lets users access network resources from personal laptops and smartphones. Which networking trend does this describe?",
      options: ["Cloud computing","Video conferencing","Bring your own device","Online collaboration"],
      answer: 2,
      hint: "The key phrase is 'personal laptops and smartphones' being brought to the corporate network.",
      explanation: "BYOD (Bring Your Own Device) is the trend of employees using personal devices — phones, tablets, laptops — on corporate networks.",
      wrongExp: ["Cloud computing refers to internet-based services and storage — not a device access policy.","Video conferencing is a communication method — not a device policy.","","Online collaboration is about working together on shared content — not a device policy."]
    },
    {
      q: "What term describes a technology that allows devices to connect to the LAN using an electrical outlet?",
      options: ["Extranet","Intranet","Powerline networking","Internet"],
      answer: 2,
      hint: "This technology uses the existing electrical wiring in the building as the network medium.",
      explanation: "Powerline networking uses electrical wiring as the network medium — a device plugs into an outlet and connects to the LAN through the power infrastructure.",
      wrongExp: ["Extranet is a controlled-access network for external parties — not a wiring technology.","Intranet is a private organizational network — not a connection technology.","","The Internet is the global public network — not a local connection technology."]
    }
  ],
  2: [
    {
      q: "Which interface allows remote management of a Layer 2 switch?",
      options: ["The AUX interface","The switch virtual interface","The first Ethernet port interface","The console port interface"],
      answer: 1,
      hint: "A Layer 2 switch doesn't have a routable interface — it needs a logical, virtual interface for IP communication.",
      explanation: "The SVI (Switch Virtual Interface) is a logical interface associated with a VLAN. Assigning an IP address to the SVI allows remote IP-based management of the switch.",
      wrongExp: ["The AUX port is an asynchronous serial port used for modem dial-in backup — not typical remote management.","","Ethernet ports on a switch are for connecting hosts — they don't carry management IP addresses by default.","The console port is a physical out-of-band port requiring a direct cable — not remote network access."]
    },
    {
      q: "Why would a Layer 2 switch need an IP address?",
      options: ["To enable the switch to receive frames from attached PCs","To enable the switch to send broadcast frames to attached PCs","To enable the switch to be managed remotely","To enable the switch to function as a default gateway"],
      answer: 2,
      hint: "Switches forward frames using MAC addresses — so why would they need an IP address at all?",
      explanation: "A switch needs an IP address only for remote management (Telnet, SSH, SNMP). It does not use the IP address for frame forwarding.",
      wrongExp: ["Switches receive frames regardless of whether they have an IP address — frame forwarding uses MAC addresses.","Switches forward broadcast frames based on their MAC destination — no IP needed.","","Layer 2 switches do not route between networks — that is a router's job. The switch IP is for management only."]
    },
    {
      q: "How is SSH different from Telnet?",
      options: ["SSH makes connections over the network, whereas Telnet is for out-of-band access","SSH provides security to remote sessions by encrypting messages and using user authentication","SSH must be configured over an active network connection, whereas Telnet is used for console connection","SSH requires PuTTY terminal emulation program"],
      answer: 1,
      hint: "Both SSH and Telnet provide remote CLI access — the key difference is what happens to the data in transit.",
      explanation: "SSH (Secure Shell) encrypts all session data including credentials. Telnet sends everything — including passwords — in plain text, making it insecure.",
      wrongExp: ["Both SSH and Telnet operate over the network — neither is 'out-of-band' by default.","","Both SSH and Telnet require an active network connection — neither uses the console port.","Many terminal emulators support SSH; PuTTY is just one option."]
    },
    {
      q: "What command will prevent all unencrypted passwords from displaying in plain text in a configuration file?",
      options: ["(config-line)# password secret","(config)# enable password secret","(config)# service password-encryption","(config)# enable secret Encrypted_Password"],
      answer: 2,
      hint: "You need ONE global command that encrypts ALL existing plain-text passwords throughout the config at once.",
      explanation: "service password-encryption applies a Type 7 (weak) encryption to all currently unencrypted passwords in the running config, including line passwords.",
      wrongExp: ["'password secret' is not valid syntax — and this would only affect one line, not all passwords.","enable password still stores the password in plain text unless service password-encryption is active.","","enable secret encrypts only the privileged EXEC password using MD5 — it does not encrypt other passwords."]
    },
    {
      q: "What command is used to verify the condition of the switch interfaces?",
      options: ["ping","ipconfig","show ip interface brief","traceroute"],
      answer: 2,
      hint: "You need a command that shows you a one-line-per-interface summary including IP address and line/protocol status.",
      explanation: "show ip interface brief displays a concise table of all interfaces with their IP addresses and up/down status — the fastest way to check interface health.",
      wrongExp: ["ping tests connectivity to a destination — it does not show interface configuration or status.","ipconfig is a Windows PC command, not an IOS command.","","traceroute traces the path to a destination — it does not show local interface status."]
    },
    {
      q: "Which command or key combination allows a user to return to the previous level in the command hierarchy?",
      options: ["Ctrl-Z","Ctrl-C","exit","end"],
      answer: 2,
      hint: "Think about going back just ONE level — not all the way back to the top.",
      explanation: "exit returns you exactly one level up in the configuration hierarchy (e.g., from interface config back to global config).",
      wrongExp: ["Ctrl-Z (same as 'end') returns you directly to Privileged EXEC mode — it skips intermediate levels.","Ctrl-C aborts the current command or running process — it doesn't navigate modes.","","end (and Ctrl-Z) jump directly back to Privileged EXEC, bypassing all intermediate config levels."]
    },
    {
      q: "An administrator is trying to configure the switch but receives an error message. What is the problem?",
      options: ["The entire command 'configure terminal' must be used","The administrator is already in global configuration mode","The administrator must connect via the console port","The administrator must first enter privileged EXEC mode before issuing the command"],
      answer: 3,
      hint: "The configure terminal command is only available from one specific mode — which mode is that?",
      explanation: "configure terminal can only be entered from Privileged EXEC mode (Router#). If the admin is in User EXEC mode (Router>), the command will be rejected.",
      wrongExp: ["IOS accepts abbreviated commands like 'conf t' — the full command is not required.","If already in global config, you wouldn't need to enter configure terminal again.","Console vs. network access doesn't determine which commands are available — mode does.",""]
    },
    {
      q: "After making configuration changes, an admin issues 'copy running-config startup-config'. What is the result?",
      options: ["The current IOS file will be replaced with the newly configured file","The new configuration will be loaded if the switch is restarted","The new configuration will be stored in flash memory","The configuration changes will be removed and the original configuration will be restored"],
      answer: 1,
      hint: "running-config is in RAM; startup-config is in NVRAM. Which direction is this copying?",
      explanation: "copy running-config startup-config saves the current running config (RAM) to NVRAM as the startup config — so it persists after a reload.",
      wrongExp: ["This command copies configuration, not IOS files. IOS images are managed separately.","","The startup-config is stored in NVRAM, not flash. Flash stores the IOS image.","This command SAVES changes — it does not restore or discard them. To discard, you would copy startup-config running-config."]
    },
    {
      q: "In the 'show running-config' command, which part of the syntax is represented by 'running-config'?",
      options: ["A prompt","A variable","The command","A keyword"],
      answer: 3,
      hint: "In IOS syntax: command = the action verb; keyword = a specific fixed parameter; variable = user-supplied value in italics.",
      explanation: "running-config is a keyword — a fixed, predefined parameter in the IOS command syntax. 'show' is the command; 'running-config' specifies what to show.",
      wrongExp: ["A prompt is the mode indicator (Router#) — not part of a command.","A variable would be shown in italics or angle brackets (e.g., <ip-address>) — running-config is fixed text.","'show' is the command verb. 'running-config' qualifies it — making it a keyword.",""]
    },
    {
      q: "What function does pressing the Tab key have when entering a command in IOS?",
      options: ["It moves the cursor to the beginning of the next line","It completes the remainder of a partially typed word in a command","It exits configuration mode and returns to user EXEC mode","It aborts the current command and returns to configuration mode"],
      answer: 1,
      hint: "This is the same tab-completion feature found in Linux/macOS terminal shells.",
      explanation: "Pressing Tab auto-completes a partially typed command keyword — as long as what you've typed is unambiguous. For example, 'conf' + Tab → 'configure'.",
      wrongExp: ["Tab does not move the cursor to a new line — Enter does that.","","Ctrl-Z exits configuration mode. Tab has nothing to do with mode navigation.","Ctrl-C aborts commands. Tab completes them."]
    },
    {
      q: "A network administrator enters 'service password-encryption' into global config mode. What does this accomplish?",
      options: ["Automatically encrypts passwords currently stored in NVRAM","Encrypts passwords as they are transmitted across WAN links","Provides an exclusive encrypted password for external service personnel","Enables a strong encryption algorithm for the enable secret password command"],
      answer: 0,
      hint: "This command works on the config file contents — think about what 'encryption' means for text stored in the config.",
      explanation: "service password-encryption applies Type 7 encryption to all plain-text passwords currently in the config and any set in the future, making the config file unreadable to casual observers.",
      wrongExp: ["","service password-encryption only encrypts the stored config — it does not encrypt data in transit over the network.","There is no such 'external service' feature — this command affects all password fields in the config.","enable secret always uses MD5 (Type 5) regardless of service password-encryption — they are independent."]
    },
    {
      q: "While solving a network issue, a technician made multiple changes to the router config. How can the technician discard the changes?",
      options: ["Issue the copy startup-config running-config command","Close and reopen the terminal emulation software","Issue the reload command without saving the running configuration","Delete the vlan.dat file and reboot the device"],
      answer: 2,
      hint: "The saved configuration is in NVRAM. What would reload the device with the NVRAM version instead of the changed RAM version?",
      explanation: "If you reload without saving, the router discards the running-config (RAM) and loads the startup-config (NVRAM) — reverting all unsaved changes.",
      wrongExp: ["copy startup-config running-config would also discard changes by overwriting RAM with NVRAM — this is actually valid, but the most common IOS method taught is reload.","Closing the terminal does nothing — the running config in RAM is unchanged.","","vlan.dat holds VLAN database information. Deleting it does not restore router configuration changes."]
    },
    {
      q: "Which two host names follow the guidelines for naming conventions on Cisco IOS devices? (Choose two)",
      options: ["HO Floor 17","SwBranch799","Branch2!","RM-3-Switch-2A4"],
      answer: [1, 3],
      multi: true,
      hint: "IOS hostnames must start with a letter, contain only letters/numbers/hyphens, and have NO spaces or special characters.",
      explanation: "SwBranch799 and RM-3-Switch-2A4 both follow the rules: start with a letter, use only letters, numbers, and hyphens, no spaces.",
      wrongExp: ["HO Floor 17 contains spaces — spaces are not allowed in IOS hostnames.","","Branch2! contains an exclamation mark — special characters are not allowed.",""]
    },
    {
      q: "What are two characteristics of RAM on a Cisco device? (Choose two)",
      options: ["The configuration that is actively running on the device is stored in RAM","The contents of RAM are lost during a power cycle","RAM is a component in Cisco switches but not in Cisco routers","RAM is able to store multiple versions of IOS and configuration files"],
      answer: [0, 1],
      multi: true,
      hint: "Think about the nature of RAM — it's volatile memory. Where does the 'running' config live?",
      explanation: "RAM stores the running-config (active configuration) and is volatile — its contents are lost when the device loses power. That's why you save to NVRAM.",
      wrongExp: ["","","Both Cisco routers AND switches use RAM to store the running configuration.","RAM stores only the currently running config. Flash memory stores IOS images and can hold multiple versions."]
    },
    {
      q: "A technician configures a switch with commands including 'interface vlan 1' and 'ip address'. What is the technician configuring?",
      options: ["Telnet access","Physical switchport access","Password encryption","SVI"],
      answer: 3,
      hint: "The interface vlan 1 command creates a logical interface — what type is it?",
      explanation: "Configuring 'interface vlan 1' and assigning an IP address creates and configures the Switch Virtual Interface (SVI) — used for remote management.",
      wrongExp: ["Telnet access is configured under 'line vty 0 4' — not under interface vlan.","Physical switchport access is configured under 'interface FastEthernet0/x'.","Password encryption uses 'service password-encryption' in global config — not interface mode.",""]
    }
  ],
  3: [
    {
      q: "Which statement is correct about network protocols?",
      options: ["They define how messages are exchanged between the source and the destination","Network protocols define the type of hardware that is used and how it is mounted in racks","They are only required for exchange of messages between devices on remote networks","They all function in the network access layer of TCP/IP"],
      answer: 0,
      hint: "Think about what a 'protocol' means in everyday conversation — it's a set of rules two parties agree to follow.",
      explanation: "Network protocols define the rules for message format, timing, encoding, error control, and delivery — governing how any two devices communicate.",
      wrongExp: ["","Hardware specifications and rack standards (like EIA/TIA) are separate from communication protocols.","Protocols are required for ALL network communication — including devices on the same LAN.","Different protocols function at different layers — HTTP at Application, TCP at Transport, IP at Network, etc."]
    },
    {
      q: "Which statement accurately describes TCP/IP encapsulation when a PC sends data to the network?",
      options: ["Data is sent from the internet layer to the network access layer","Packets are sent from the network access layer to the transport layer","Segments are sent from the transport layer to the internet layer","Frames are sent from the network access layer to the internet layer"],
      answer: 2,
      hint: "Encapsulation moves DOWN the stack. What PDU does the Transport layer produce? What does the Internet layer receive?",
      explanation: "The Transport layer creates Segments and passes them DOWN to the Internet (Network) layer, which encapsulates them into Packets.",
      wrongExp: ["Data moves from internet layer DOWN to network access — but the PDU names are wrong here.","Data moves UP during decapsulation at the receiver — on the sending side it moves down.","","Frames come FROM the network access layer — they don't go 'to' the internet layer (which is above it)."]
    },
    {
      q: "Which name is assigned to the transport layer PDU?",
      options: ["Data","Frame","Bits","Segment"],
      answer: 3,
      hint: "Remember the PDU ladder: Data → Segment → Packet → Frame → Bits. Which rung is Transport?",
      explanation: "The Transport layer PDU is called a Segment (TCP) or Datagram (UDP). The mnemonic: Do Some People Fear Birthdays? = Data, Segment, Packet, Frame, Bits.",
      wrongExp: ["'Data' is the PDU at the Application layer.","'Frame' is the PDU at the Data Link layer.","'Bits' is the PDU at the Physical layer.",""]
    },
    {
      q: "Which PDU format is used when bits are received from the network medium by the NIC of a host?",
      options: ["Segment","File","Packet","Frame"],
      answer: 3,
      hint: "The NIC operates at Layer 2. What PDU does Layer 2 handle?",
      explanation: "When the NIC receives bits off the wire, it assembles them into a Frame (Layer 2 PDU). The frame is then passed up to Layer 3.",
      wrongExp: ["A Segment is the Layer 4 (Transport) PDU — the NIC never handles segments directly.","'File' is not a networking PDU term.","A Packet is the Layer 3 (Network) PDU — assembled after the frame is decoded.",""]
    },
    {
      q: "What two criteria help select a network medium? (Choose two)",
      options: ["The distance the selected medium can successfully carry a signal","The environment where the selected medium is to be installed","The types of data that need to be prioritized","The number of intermediate devices installed in the network"],
      answer: [0, 1],
      multi: true,
      hint: "Think practical: what physical factors determine whether copper, fiber, or wireless is appropriate?",
      explanation: "Distance (how far the signal must travel) and environment (EMI levels, indoor/outdoor, hazardous areas) are key physical criteria for medium selection.",
      wrongExp: ["","","Data prioritization (QoS) is a software/policy concern — not a factor in choosing the physical medium.","The number of intermediate devices does not dictate which medium type to use."]
    },
    {
      q: "Which two OSI model layers have the same functionality as a single TCP/IP layer? (Choose two)",
      options: ["Session","Data link","Network","Transport","Physical"],
      answer: [1, 4],
      multi: true,
      hint: "The TCP/IP Network Access layer combines two OSI layers. Which OSI layers deal with hardware and physical transmission?",
      explanation: "TCP/IP's Network Access layer combines OSI Layer 1 (Physical) and Layer 2 (Data Link) into one layer.",
      wrongExp: ["Session (Layer 5) maps to TCP/IP Application — but it combines with Presentation and Application (Layers 5–7), not as a standalone equal.","","Network (Layer 3) maps directly to TCP/IP Internet layer — one-to-one, so it's not 'combined'.","Transport (Layer 4) maps directly to TCP/IP Transport — one-to-one.",""]
    },
    {
      q: "At which OSI layer is a source MAC address added to a PDU during encapsulation?",
      options: ["Transport layer","Presentation layer","Application layer","Data link layer"],
      answer: 3,
      hint: "MAC addresses are hardware addresses used for local delivery. Which layer handles local addressing and framing?",
      explanation: "Layer 2 (Data Link) adds the source and destination MAC addresses when creating the Frame. MAC addresses identify devices on the same local network.",
      wrongExp: ["Transport layer adds port numbers (source and destination) — not MAC addresses.","Presentation layer handles formatting, encryption, and compression — no addressing.","Application layer produces the data — no MAC addresses are added here.",""]
    },
    {
      q: "At which OSI layer is a source IP address added to a PDU during encapsulation?",
      options: ["Network layer","Application layer","Transport layer","Data link layer"],
      answer: 0,
      hint: "IP addresses are logical Layer 3 addresses. Which layer encapsulates data into a Packet with IP addressing?",
      explanation: "Layer 3 (Network) adds the source and destination IP addresses when creating the Packet. IP addresses provide logical, end-to-end addressing.",
      wrongExp: ["","Application layer generates data but does not add IP addressing.","Transport layer adds port numbers for process-to-process communication — not IP addresses.","Data Link layer adds MAC addresses — not IP addresses."]
    },
    {
      q: "At which OSI layer is a destination port number added to a PDU during encapsulation?",
      options: ["Network layer","Application layer","Data link layer","Transport layer"],
      answer: 3,
      hint: "Port numbers identify specific applications or services (e.g., port 80 for HTTP). Which layer handles process-to-process communication?",
      explanation: "Layer 4 (Transport) adds source and destination port numbers to identify the sending and receiving processes/applications.",
      wrongExp: ["Network layer adds IP addresses — not port numbers.","Application layer produces data — port numbers are added further down the stack.","Data Link layer adds MAC addresses — not port numbers.",""]
    },
    {
      q: "What is an advantage of network devices using open standard protocols?",
      options: ["A client host and server running different operating systems can successfully exchange data","Internet access can be controlled by a single ISP in each market","Network communications is confined to data transfers between devices from the same vendor","Competition and innovation are limited to specific types of products"],
      answer: 0,
      hint: "Open standards are published and available to everyone — so what becomes possible between devices from different manufacturers?",
      explanation: "Open standards enable interoperability — a Windows PC can communicate with a Linux server, a Cisco router can talk to a Juniper router, etc.",
      wrongExp: ["","A single ISP controlling the internet describes a monopoly — the opposite of what open standards promote.","Vendor-specific protocols restrict communication to same-vendor devices — open standards do the opposite.","Open standards increase competition and innovation by allowing any vendor to implement them."]
    },
    {
      q: "A web client is receiving a response from a web server. What is the correct order of the protocol stack?",
      options: ["HTTP, TCP, IP, Ethernet","HTTP, Ethernet, IP, TCP","Ethernet, IP, TCP, HTTP","Ethernet, TCP, IP, HTTP"],
      answer: 2,
      hint: "De-encapsulation moves UP the stack. Ethernet (Layer 2) is processed first when receiving, then IP, then TCP, then HTTP.",
      explanation: "When receiving, the frame is processed bottom-up: Ethernet (L2) → IP (L3) → TCP (L4) → HTTP (L7). This is de-encapsulation order.",
      wrongExp: ["HTTP→TCP→IP→Ethernet is the sending/encapsulation order — the question asks about receiving.","This mixes the layers out of order — HTTP cannot come before IP and TCP in any direction.","","Ethernet must come before TCP in the receiving stack — Ethernet is Layer 2, TCP is Layer 4."]
    },
    {
      q: "What three application layer protocols are part of the TCP/IP protocol suite? (Choose three)",
      options: ["DHCP","NAT","DNS","ARP","PPP","FTP"],
      answer: [0, 2, 5],
      multi: true,
      hint: "Application layer protocols are the ones end users and applications directly use. Think: what service does each acronym provide?",
      explanation: "DHCP (auto IP assignment), DNS (name resolution), and FTP (file transfer) are all Application layer protocols used directly by applications.",
      wrongExp: ["","NAT (Network Address Translation) is a Network layer function — it translates IP addresses at the router, not an Application layer protocol.","","ARP (Address Resolution Protocol) operates at Layer 3 (Network/Internet layer) — it resolves IP to MAC, not an Application protocol.","PPP (Point-to-Point Protocol) is a Data Link layer protocol used for WAN links — not Application layer.",""]
    },
    {
      q: "What method allows a computer to react when a server takes too long to respond?",
      options: ["Response timeout","Flow Control","Access method","Encapsulation"],
      answer: 0,
      hint: "What mechanism causes an application to give up and report an error when the other side doesn't reply within a set time?",
      explanation: "Response timeout defines how long a device waits for a reply. If the server doesn't respond in time, the host treats the request as failed.",
      wrongExp: ["","Flow control manages the rate of data transmission between sender and receiver — not about waiting for a response.","Access method controls HOW devices share media (e.g., CSMA/CD) — unrelated to server response time.","Encapsulation is the process of wrapping data with headers — not a timing mechanism."]
    },
    {
      q: "Which term describes the ability to use personal devices across a business network?",
      options: ["Extranet","Intranet","BYOD","Internet"],
      answer: 2,
      hint: "The acronym describes the action: you bring your own device.",
      explanation: "BYOD (Bring Your Own Device) allows employees to use their personal smartphones, tablets, and laptops on the corporate network.",
      wrongExp: ["Extranet provides external party access — not a device policy.","Intranet is a private network type — not a device policy.","","The Internet is the global public network — not a policy about device use."]
    },
    {
      q: "What is a characteristic of multicast messages?",
      options: ["They must be acknowledged","They are sent to a select group of hosts","They are sent to all hosts on a network","They are sent to a single destination"],
      answer: 1,
      hint: "The prefix 'multi' means many — but not all. Think of a streaming service delivering to only its subscribers.",
      explanation: "Multicast delivers one copy of a message to a specific group of subscribed hosts — more efficient than broadcast for group communication.",
      wrongExp: ["Multicast uses best-effort delivery — no acknowledgements.","","Broadcasting reaches ALL hosts. Multicast only reaches the subscribed group.","Unicast sends to a single destination. Multicast is for groups."]
    }
  ],
  4: [
    {
      q: "What is the purpose of the OSI physical layer?",
      options: ["Exchanging frames between nodes over physical network media","Controlling access to media","Performing error detection on received frames","Transmitting bits across the local media"],
      answer: 3,
      hint: "The Physical layer is the bottom layer — the most fundamental. It deals with actual signal transmission on the wire.",
      explanation: "The Physical layer (Layer 1) converts bits into signals (electrical, optical, or radio) and places them on the medium. It transmits raw bits.",
      wrongExp: ["Exchanging frames is Data Link (Layer 2) — frames are a Layer 2 concept.","Controlling media access is the MAC sublayer of Data Link (Layer 2).","Error detection using CRC/FCS is a Data Link layer function.",""]
    },
    {
      q: "What OSI physical layer term describes the capacity at which a medium can carry data?",
      options: ["Air","IEEE","EIA/TIA","Bandwidth"],
      answer: 3,
      hint: "This is the theoretical maximum speed of the medium — like a highway's maximum speed limit.",
      explanation: "Bandwidth is the maximum data capacity of a medium (measured in bps). It is a property of the physical medium, not the actual data rate.",
      wrongExp: ["Air is a physical medium type (for wireless) — not a measurement term.","IEEE is a standards organization (e.g., 802.3 Ethernet) — not a measurement.","EIA/TIA develops cabling standards — not a measurement term.",""]
    },
    {
      q: "What does the term 'attenuation' mean in data communications?",
      options: ["Time for a signal to reach its destination","Strengthening of a signal by a networking device","Loss of signal strength as distance increases","Time for latency in network connectivity"],
      answer: 2,
      hint: "Think of a loudspeaker — the further you stand from it, the quieter it gets. That effect on signals is called...?",
      explanation: "Attenuation is the progressive weakening of a signal as it travels along a medium. This is why cables have maximum length limits.",
      wrongExp: ["The time for a signal to travel is propagation delay — a component of latency, not attenuation.","Signal strengthening is done by amplifiers or repeaters — the opposite of attenuation.","","Latency is total delay — attenuation is signal strength loss over distance."]
    },
    {
      q: "What is a primary role of the Physical layer in transmitting data on the network?",
      options: ["Provide physical addressing to the devices","Create the signals that represent the bits in each frame on the media","Determine the path packets take through the network","Control data access to the media"],
      answer: 1,
      hint: "The Physical layer does the simplest, most fundamental job — converting 0s and 1s into actual physical signals.",
      explanation: "The Physical layer takes bits from the Data Link frame and creates the physical signals (voltage pulses, light pulses, or radio waves) that travel on the medium.",
      wrongExp: ["Physical addressing (MAC addresses) is a Data Link layer function.","","Path determination (routing) is a Network layer function.","Media access control is the MAC sublayer of the Data Link layer."]
    },
    {
      q: "What causes crosstalk within copper cable pairs?",
      options: ["The magnetic field around the adjacent pairs of wire","The reflection of the electrical wave back from the far end","The collision caused by two nodes trying to use media simultaneously","The use of braided wire to shield the adjacent wire pairs"],
      answer: 0,
      hint: "Crosstalk is interference between adjacent wire pairs. What physical phenomenon from one wire affects its neighbor?",
      explanation: "Current flowing through a wire generates a magnetic field. Adjacent wire pairs pick up this magnetic interference — called crosstalk. Twisting the pairs together reduces this effect.",
      wrongExp: ["","Signal reflection (echo) is a different issue called 'return loss' — not crosstalk.","Collisions are a media access issue (CSMA/CD) — not related to cable crosstalk.","Braided shielding is used to REDUCE interference from outside — it is not the cause of crosstalk."]
    },
    {
      q: "What OSI physical layer term describes the amount of time, including delays, for data to travel from one point to another?",
      options: ["Latency","Goodput","Bandwidth","Throughput"],
      answer: 0,
      hint: "If bandwidth is the speed limit, this is the actual travel time from A to B including all stops along the way.",
      explanation: "Latency is the total time delay — including propagation delay, processing delay, and queuing delay — for data to travel from source to destination.",
      wrongExp: ["","Goodput is the rate of useful data transferred (removing overhead) — not a time measurement.","Bandwidth is the maximum capacity of the medium — not a time measurement.","Throughput is the actual measured data rate — not a time measurement."]
    },
    {
      q: "What makes fiber preferable to copper for interconnecting buildings? (Choose two)",
      options: ["Lower installation cost","Easily terminated","Greater bandwidth potential","Limited susceptibility to EMI/RFI"],
      answer: [2, 3],
      multi: true,
      hint: "Fiber uses light, not electricity. What does that mean for interference and speed?",
      explanation: "Fiber supports much higher bandwidth over longer distances, and because it uses light (not electricity), it is immune to electromagnetic and radio frequency interference.",
      wrongExp: ["Fiber is significantly MORE expensive to install than copper — labor and connectors are specialized.","Fiber connectors require precision cleaving and polishing — copper (RJ-45) is far easier to terminate.","",""]
    },
    {
      q: "Why are two strands of fiber used for a single fiber optic connection?",
      options: ["They increase the speed at which the data can travel","They prevent crosstalk from causing interference","The two strands allow data to travel longer distances","They allow for full-duplex connectivity"],
      answer: 3,
      hint: "Light travels in only one direction in a fiber strand. How do you achieve simultaneous send AND receive?",
      explanation: "Each fiber strand carries light in one direction only. Two strands provide a full-duplex path — one for transmit, one for receive — enabling simultaneous two-way communication.",
      wrongExp: ["Using two strands does not double the speed per strand — each still operates at its rated speed.","Fiber does not suffer from crosstalk (unlike copper) — EMI immunity is a feature of one fiber, not a reason for two.","Distance capability depends on fiber type (single vs multimode) — not on using two strands.",""]
    },
    {
      q: "In addition to cable length, what two factors could interfere with UTP cables? (Choose two)",
      options: ["Electromagnetic interference","Crosstalk","Size of the network","Signal modulation technique"],
      answer: [0, 1],
      multi: true,
      hint: "UTP stands for Unshielded Twisted Pair — it has no shielding. What kinds of external and internal interference affect unshielded copper?",
      explanation: "EMI from external sources (motors, fluorescent lights) and crosstalk from adjacent wire pairs within the same cable are the two key interference sources for UTP.",
      wrongExp: ["","","Network size (number of devices) does not cause physical signal interference on a cable.","Signal modulation is the encoding method — it doesn't 'interfere' with a cable."]
    },
    {
      q: "Which procedure reduces the effect of crosstalk in copper cables?",
      options: ["Designing cable infrastructure to avoid crosstalk","Avoiding sharp bends during installation","Wrapping the bundle of wires with metallic shielding","Twisting opposing circuit wire pairs together"],
      answer: 3,
      hint: "The T in UTP stands for Twisted — the twist itself is the key design feature for crosstalk reduction.",
      explanation: "Twisting wire pairs together causes the magnetic fields of adjacent wires to cancel each other out (interference cancellation) — reducing crosstalk between pairs.",
      wrongExp: ["Infrastructure design can reduce external EMI but does not eliminate the internal crosstalk between pairs.","Avoiding bends prevents physical damage and signal reflection — not crosstalk.","Metallic shielding (as in STP) reduces external EMI — but twisting is what specifically reduces inter-pair crosstalk.",""]
    },
    {
      q: "What are two characteristics of fiber-optic cable? (Choose two)",
      options: ["It typically contains 4 pairs of fiber-optic wires","Each pair is wrapped in metallic foil","It is more expensive than UTP cabling","It is not affected by EMI or RFI"],
      answer: [2, 3],
      multi: true,
      hint: "Fiber uses light — how does that affect its cost compared to copper, and its relationship with electrical interference?",
      explanation: "Fiber is more expensive to purchase and install than UTP, but it is completely immune to EMI/RFI because it uses light rather than electrical signals.",
      wrongExp: ["Fiber does not use wire pairs — it uses glass or plastic strands that carry light pulses.","Metallic foil wrapping describes STP (Shielded Twisted Pair) copper cable — not fiber.","",""]
    },
    {
      q: "Which two devices commonly affect wireless networks? (Choose two)",
      options: ["Microwaves","Incandescent light bulbs","Cordless phones","External hard drives"],
      answer: [0, 2],
      multi: true,
      hint: "Think about which everyday devices operate in the same 2.4 GHz radio frequency range as 802.11 Wi-Fi.",
      explanation: "Microwave ovens and many cordless phones operate in the 2.4 GHz range — the same frequency as 802.11b/g/n Wi-Fi — causing interference.",
      wrongExp: ["","Incandescent bulbs emit light and heat — they do not emit radio frequency interference.","","External hard drives are USB/Thunderbolt peripherals — they do not emit wireless RF signals."]
    },
    {
      q: "What OSI physical layer term describes the measure of usable data transferred over a given period of time?",
      options: ["Fiber-optic cable","Air","Goodput","Copper cable"],
      answer: 2,
      hint: "This is throughput with the overhead removed — only the payload data that was actually useful to the application.",
      explanation: "Goodput is the rate of useful application data (not counting retransmissions, protocol headers, or overhead). Goodput ≤ Throughput ≤ Bandwidth.",
      wrongExp: ["Fiber-optic cable is a medium type — not a performance measurement.","Air is a medium for wireless signals — not a performance measurement.","","Copper cable is a medium type — not a performance measurement."]
    },
    {
      q: "What OSI physical layer term describes the process by which one wave modifies another wave?",
      options: ["EIA/TIA","Modulation","Air","IEEE"],
      answer: 1,
      hint: "Radio signals and wireless transmissions use this technique to encode data onto a carrier wave.",
      explanation: "Modulation is the process of varying a carrier signal's properties (amplitude, frequency, or phase) to encode data — used in wireless and other signaling methods.",
      wrongExp: ["EIA/TIA is a standards organization that develops cabling standards — not a signal process.","","Air is a medium — not a signal process.","IEEE is a standards organization (802.3, 802.11) — not a signal process."]
    },
    {
      q: "What OSI physical layer term describes the physical medium used for microwave transmissions?",
      options: ["Goodput","Air","Latency","Throughput"],
      answer: 1,
      hint: "Microwave transmissions travel through the atmosphere. What is that medium called?",
      explanation: "Air (atmosphere) is the physical medium for wireless/microwave transmissions. RF signals propagate through air between antennas.",
      wrongExp: ["Goodput is a data rate measurement — not a physical medium.","","Latency is a time delay measurement — not a physical medium.","Throughput is a data rate measurement — not a physical medium."]
    }
  ],
  6: [
    {
      q: "Which statement is true about CSMA/CD used in Ethernet?",
      options: ["A jamming signal causes only devices that caused the collision to execute a backoff algorithm","All network devices must listen before transmitting","When a device hears a carrier signal and transmits, a collision cannot occur","Devices involved in a collision get priority to transmit after the backoff period"],
      answer: 1,
      hint: "CSMA/CD: Carrier Sense = listen first. What does all devices 'listening before transmitting' prevent?",
      explanation: "In CSMA/CD, all devices MUST listen (carrier sense) before transmitting. If the medium is busy, they wait — this reduces (but doesn't eliminate) collisions.",
      wrongExp: ["When a collision is detected, ALL devices on the segment execute the backoff — not just the ones that collided.","","If two devices sense an idle medium simultaneously and both transmit, a collision STILL occurs — CSMA/CD detects it after the fact.","After a backoff, devices compete equally — there is no priority given to devices that were involved in a collision."]
    },
    {
      q: "Which statement describes an extended star topology?",
      options: ["End devices connected by a bus and each bus connects to a central device","Each end system connected to its respective neighbor via an intermediate device","All end and intermediate devices connected in a chain to each other","End devices connect to a central intermediate device, which in turn connects to other central intermediate devices"],
      answer: 3,
      hint: "An extended star is a star-of-stars. Think of a distribution switch connected to access switches, each with their own star of hosts.",
      explanation: "In an extended star, each central device (e.g., access switch) connects to its own group of end devices, then connects up to another central device (e.g., distribution switch) — creating a hierarchy.",
      wrongExp: ["Devices connected by a bus with a central hub describes a hybrid bus/star — not an extended star.","Connecting to neighbors in a ring/chain describes a ring topology.","Devices connected in a chain describes a bus or linear topology.",""]
    },
    {
      q: "Which switching method has the lowest level of latency?",
      options: ["Fast-forward","Cut-through","Store-and-forward","Fragment-free"],
      answer: 0,
      hint: "Which method starts forwarding the frame with the absolute minimum amount of data read?",
      explanation: "Fast-forward switching begins forwarding immediately after reading just the destination MAC address — it doesn't even wait to read the full header, giving the lowest possible latency.",
      wrongExp: ["","Cut-through is the broader category — fast-forward is a specific variant of cut-through with the lowest latency.","Store-and-forward buffers the ENTIRE frame before forwarding — highest accuracy but highest latency.","Fragment-free reads the first 64 bytes — more than fast-forward, so more latency."]
    },
    {
      q: "Which switching method uses the CRC value in a frame?",
      options: ["Fragment-free","Cut-through","Fast-forward","Store-and-forward"],
      answer: 3,
      hint: "The CRC is in the frame TRAILER — at the very end. Which method reads the entire frame, including the trailer?",
      explanation: "Store-and-forward buffers the complete frame and checks the CRC in the FCS (trailer) for errors before forwarding. Corrupt frames are discarded.",
      wrongExp: ["Fragment-free reads only the first 64 bytes — the CRC trailer is at the END of the frame and is never reached.","Cut-through forwards after reading the destination MAC — long before the CRC trailer is received.","Fast-forward is a cut-through variant — it never reads the CRC either.",""]
    },
    {
      q: "What action occurs if a switch receives a frame with destination MAC FF:FF:FF:FF:FF:FF?",
      options: ["The switch forwards it out all ports except the ingress port","The switch sends the frame to a connected router","The switch shares the MAC address table entry with connected switches","The switch does not forward the frame"],
      answer: 0,
      hint: "FF:FF:FF:FF:FF:FF is the broadcast address. What does a switch do with broadcasts?",
      explanation: "A broadcast frame is forwarded out ALL ports except the port it arrived on — ensuring every device on the segment receives it.",
      wrongExp: ["","Switches don't route — they forward frames. A broadcast stays within the broadcast domain.","Switches do not share MAC table entries with other switches — each switch builds its own table independently.","Not forwarding a broadcast would prevent ARP, DHCP, and other essential protocols from working."]
    },
    {
      q: "What is the function of the CRC value in the FCS field of a frame?",
      options: ["To verify the logical address in the frame","To compute the checksum header for the data field","To verify the integrity of the received frame","To verify the physical address in the frame"],
      answer: 2,
      hint: "CRC = Cyclic Redundancy Check. What does 'check' mean in this context — what is being verified?",
      explanation: "The receiver recomputes the CRC on the received frame. If the computed value matches the FCS field, the frame is intact. If not, the frame was corrupted in transit and is discarded.",
      wrongExp: ["The CRC checks for transmission errors — it has nothing to do with logical (IP) addresses.","The CRC is computed and stored in the trailer, not used to generate any header.","","The CRC checks data integrity, not MAC addresses. MAC addresses are in the header and can be checked separately."]
    },
    {
      q: "Which two functions are performed at the LLC sublayer? (Choose two)",
      options: ["Enables IPv4 and IPv6 to utilize the same network interface and media","Places information identifying which network layer protocol is being used","Integrates various physical technologies","Controls the NIC responsible for sending and receiving data"],
      answer: [0, 1],
      multi: true,
      hint: "LLC is the upper sublayer — it communicates with the Network layer above. What does it tell the Network layer?",
      explanation: "LLC identifies the upper-layer protocol (IPv4 or IPv6) being carried in the frame, allowing multiple Network protocols to share the same Data Link layer and media.",
      wrongExp: ["","","Integrating physical technologies is a Physical layer concern — LLC operates above the physical medium.","Controlling the NIC hardware is the MAC sublayer's job — LLC is software-based and sits above the MAC."]
    },
    {
      q: "Which two functions are performed at the MAC sublayer? (Choose two)",
      options: ["Places information identifying which network layer protocol is being used","Controls the NIC responsible for sending and receiving data","Provides a mechanism to allow multiple devices to communicate over a shared medium","Enables IPv4 and IPv6 to utilize the same network interface"],
      answer: [1, 2],
      multi: true,
      hint: "MAC = Media Access Control — the clue is in the name. What does 'media access' involve?",
      explanation: "The MAC sublayer controls the hardware NIC and provides media access control (CSMA/CD, CSMA/CA) to manage how multiple devices share the same medium.",
      wrongExp: ["Identifying the upper-layer protocol is an LLC function — not MAC.","","","Enabling IPv4 and IPv6 to share the interface is an LLC function."]
    },
    {
      q: "Which frame forwarding method receives the entire frame and performs a CRC check before forwarding?",
      options: ["Fast-forward switching","Fragment-free switching","Cut-through switching","Store-and-forward switching"],
      answer: 3,
      hint: "Only one method buffers the complete frame before making a forwarding decision.",
      explanation: "Store-and-forward reads the entire frame into a buffer, runs a CRC check, and only forwards the frame if error-free. This provides the highest reliability.",
      wrongExp: ["Fast-forward only reads the destination MAC — it does not buffer the full frame or check CRC.","Fragment-free reads the first 64 bytes — not the full frame with CRC trailer.","Cut-through forwards after reading destination MAC — no full-frame buffering or CRC check.",""]
    },
    {
      q: "What advantage does store-and-forward have over cut-through switching?",
      options: ["Frame forwarding using IPv4 Layer 3 and 4 information","Collision detecting","Frame error checking","Faster frame forwarding"],
      answer: 2,
      hint: "Store-and-forward is slower but does something cut-through skips entirely. What does it check?",
      explanation: "Store-and-forward performs CRC error checking — corrupt frames are discarded before forwarding. Cut-through forwards frames blindly without error checking.",
      wrongExp: ["Switches (Layer 2) do not use IP (Layer 3) or port (Layer 4) information for forwarding decisions — that's a router/firewall job.","Collision detection is a CSMA/CD function on the media — not a switching method feature.","","Cut-through has lower latency — not store-and-forward. The advantage of store-and-forward is accuracy, not speed."]
    },
    {
      q: "Which is a multicast MAC address?",
      options: ["5C-26-0A-4B-19-3E","00-26-0F-4B-00-3E","FF-FF-FF-FF-FF-FF","01-00-5E-00-00-03"],
      answer: 3,
      hint: "IPv4 multicast MAC addresses always begin with a specific OUI prefix. What is it?",
      explanation: "01-00-5E-xx-xx-xx is the IANA-assigned prefix for IPv4 multicast MAC addresses. The first byte 01 with its least significant bit set indicates a multicast address.",
      wrongExp: ["5C-26-0A-4B-19-3E is a standard unicast MAC address — the first byte (5C) has an even value, indicating unicast.","00-26-0F-4B-00-3E is a unicast MAC — first byte 00 = unicast.","FF-FF-FF-FF-FF-FF is the broadcast address — all 1s in every bit = broadcast to everyone.",""]
    },
    {
      q: "Which media communication type does NOT require media arbitration in the data link layer?",
      options: ["Deterministic","Full-duplex","Controlled Access","Half-duplex"],
      answer: 1,
      hint: "Arbitration is needed when devices share a medium and must take turns. When can both send and receive simultaneously without conflict?",
      explanation: "Full-duplex connections use separate wires for send and receive — there is no shared medium to arbitrate, so no CSMA/CD or CSMA/CA is needed.",
      wrongExp: ["Deterministic access (e.g., Token Ring) still requires a token-passing arbitration mechanism.","","Controlled access methods (token passing) still require arbitration — just in an orderly way.","Half-duplex requires arbitration (CSMA/CD) because only one device can transmit at a time on the shared medium."]
    },
    {
      q: "What action occurs if a switch receives a frame with the destination MAC address 01:00:5E:00:00:D9?",
      options: ["The switch forwards it out all ports except the ingress port","The switch does not forward the frame","The switch sends the frame to a connected router","The switch shares the MAC address table entry with connected switches"],
      answer: 0,
      hint: "The address starts with 01:00:5E — what type of MAC address is this, and how does a switch handle it?",
      explanation: "01:00:5E addresses are multicast. By default, switches treat unknown multicast like broadcast and flood it out all ports except the ingress port.",
      wrongExp: ["","A switch discards frames with errors — not multicast frames. Multicast frames must be forwarded.","Routers handle Layer 3 multicast routing. At Layer 2, the switch floods the frame.","Switches maintain independent MAC tables — they do not share entries with other switches."]
    },
    {
      q: "What are two actions performed by a Cisco switch? (Choose two)",
      options: ["Building a routing table based on the first IP address in the frame header","Using the source MAC addresses of frames to build and maintain a MAC address table","Examining the destination MAC address to add new entries to the MAC address table","Forwarding frames based on the destination MAC address"],
      answer: [1, 3],
      multi: true,
      hint: "A switch is a Layer 2 device. It builds its MAC table from SOURCE addresses and forwards based on DESTINATION addresses.",
      explanation: "Switches learn by recording SOURCE MAC addresses → port mappings. They forward by looking up DESTINATION MAC addresses in their MAC table.",
      wrongExp: ["Building routing tables using IP addresses is a router function — switches operate at Layer 2 using MAC addresses.","","New MAC table entries are added based on SOURCE MAC addresses in incoming frames — not destination addresses.",""]
    },
    {
      q: "Which characteristic describes the Frame Check Sequence (FCS) field in a data-link frame?",
      options: ["Error detection","Logical address","Data","Physical address"],
      answer: 0,
      hint: "FCS stands for Frame Check Sequence — what is 'checking' a frame for?",
      explanation: "The FCS field in the frame trailer contains a CRC value used by the receiver to detect transmission errors. If the CRC doesn't match, the frame is dropped.",
      wrongExp: ["","Logical addresses (IP) are carried in the Network layer header — not in the frame trailer.","The data/payload is in the middle of the frame — not in the trailer.","Physical addresses (MAC) are in the frame header — not in the trailer FCS field."]
    }
  ],
  8: [
    {
      q: "Which parameter does a router use to choose the path to the destination when multiple routes are available?",
      options: ["The higher metric value associated with the destination network","The lower metric value associated with the destination network","The higher gateway IP address","The lower gateway IP address"],
      answer: 1,
      hint: "A metric measures the 'cost' of a route — lower cost means a better (shorter or faster) path.",
      explanation: "Routers prefer routes with lower metric values — a lower metric indicates a better, less costly path to the destination.",
      wrongExp: ["A higher metric means a worse/costlier path — routers prefer LOWER metrics.","","Gateway IP addresses are not used to compare route quality — metrics are.","Gateway IP addresses are not routing comparison criteria — metrics are."]
    },
    {
      q: "What is a basic characteristic of the IP protocol?",
      options: ["Connectionless","Reliable end-to-end delivery","User data segmentation","Media dependent"],
      answer: 0,
      hint: "Remember the three IP characteristics: C-B-M. What does the 'C' stand for?",
      explanation: "IP is connectionless — it sends packets without establishing a session first. Each packet is independently routed to the destination.",
      wrongExp: ["","Reliable delivery (acknowledgements, retransmission) is provided by TCP at Layer 4 — not IP.","Segmentation is performed by TCP (Layer 4) — IP carries the segments as packets.","IP is specifically designed to be media-independent — it works over any physical medium."]
    },
    {
      q: "Which field in the IPv4 header is used to prevent a packet from traversing a network endlessly?",
      options: ["Sequence Number","Differentiated Services","Time-to-Live","Acknowledgment Number"],
      answer: 2,
      hint: "This field starts at a set value and decreases by 1 at each router hop. When it hits zero, the packet is dropped.",
      explanation: "TTL (Time-to-Live) is decremented by 1 at each router. When it reaches 0, the packet is discarded and an ICMP 'Time Exceeded' message is sent back — preventing routing loops.",
      wrongExp: ["Sequence numbers are a TCP field — not present in the IP header.","Differentiated Services (DSCP) is used for QoS traffic prioritization — not loop prevention.","","Acknowledgment numbers are a TCP field — not in the IP header."]
    },
    {
      q: "What IPv4 header field identifies the upper layer protocol carried in the packet?",
      options: ["Version","Protocol","Identification","Differentiated Services"],
      answer: 1,
      hint: "After the router strips the IP header, how does the receiving host know whether to pass the payload to TCP or UDP?",
      explanation: "The Protocol field (8-bit) identifies Layer 4: 6 = TCP, 17 = UDP, 1 = ICMP. The host uses this to pass the payload to the correct upper-layer process.",
      wrongExp: ["Version identifies IPv4 vs IPv6 — it does not identify the upper-layer protocol.","","Identification is used for fragmentation reassembly — not upper-layer protocol identification.","Differentiated Services is used for QoS prioritization — not protocol identification."]
    },
    {
      q: "Which characteristic describes an IPv6 enhancement over IPv4?",
      options: ["IPv6 is based on 128-bit flat addressing as opposed to 32-bit hierarchical","The IPv6 header is simpler than the IPv4 header, which improves packet handling","The IPv6 address space is four times bigger than IPv4","Both IPv4 and IPv6 support authentication, but only IPv6 supports privacy"],
      answer: 1,
      hint: "IPv6 removed several rarely-used IPv4 header fields to make routers process packets more efficiently.",
      explanation: "The IPv6 header is fixed at 40 bytes and has fewer fields than IPv4 (no checksum, no fragmentation fields) — routers process it faster and more efficiently.",
      wrongExp: ["IPv6 uses 128-bit hierarchical addressing — it IS hierarchical (network prefix + interface ID).","","IPv6 is 2^128 vs IPv4's 2^32 — that's ~79 octillion times larger, not just 4 times.","IPv4 also supports IPsec for authentication and privacy — it's optional in IPv4 but built into IPv6."]
    },
    {
      q: "What was the reason for creating and implementing IPv6?",
      options: ["To make reading a 32-bit address easier","To allow NAT support for private addressing","To provide more address space in the Internet Names Registry","To relieve IPv4 address depletion"],
      answer: 3,
      hint: "IPv4 has approximately 4.3 billion addresses — a number that was exhausted as the internet expanded globally.",
      explanation: "IPv6 was developed primarily to solve IPv4 address exhaustion. IPv6's 128-bit addressing provides a virtually unlimited supply of unique addresses.",
      wrongExp: ["IPv6 addresses are MORE complex to read (8 groups of hex digits) — readability was not the goal.","NAT was a workaround FOR IPv4 scarcity — IPv6 makes NAT unnecessary, not adds NAT support.","The Internet Names Registry manages domain names — IPv6 solves address space, not naming.",""]
    },
    {
      q: "What is one function of the ARP protocol?",
      options: ["Resolving an IPv4 address to a MAC address","Obtaining an IPv4 address automatically","Mapping a domain name to its IP address","Maintaining a table of domain names with their resolved IP addresses"],
      answer: 0,
      hint: "ARP = Address Resolution Protocol. When you know the IP but need the MAC — which protocol finds it?",
      explanation: "ARP resolves a known IPv4 address to an unknown MAC address by broadcasting a request and receiving a unicast reply from the device with that IP.",
      wrongExp: ["","Automatically obtaining an IP address is DHCP's job — not ARP.","Mapping domain names to IP addresses is DNS — not ARP.","Maintaining a domain name cache is a DNS resolver function — not ARP."]
    },
    {
      q: "Which destination address is used in an ARP request frame?",
      options: ["AAAA.AAAA.AAAA","255.255.255.255","0.0.0.0","FFFF.FFFF.FFFF"],
      answer: 3,
      hint: "An ARP request must reach every device on the segment — because any one of them might have the IP being queried. How do you reach all devices?",
      explanation: "ARP requests use the broadcast MAC address (FFFF.FFFF.FFFF) so every device on the local network receives the request. Only the device with the matching IP replies.",
      wrongExp: ["AAAA.AAAA.AAAA is not a standard address type.","255.255.255.255 is an IPv4 broadcast address — ARP operates at Layer 2 and uses the MAC broadcast.","0.0.0.0 is a source address placeholder (unassigned) — not used as a destination.",""]
    },
    {
      q: "What statement describes the function of ARP?",
      options: ["ARP discovers the MAC address of any host on the local network","ARP discovers the IP address of any host on the local network","ARP discovers the MAC address of any host on a different network","ARP discovers the IP address of any host on a different network"],
      answer: 0,
      hint: "ARP starts with a known IP and finds the unknown MAC — and it only works within one broadcast domain.",
      explanation: "ARP resolves IP→MAC on the LOCAL network. It cannot cross routers (routers don't forward broadcasts) — so ARP cannot find addresses on different networks.",
      wrongExp: ["","ARP resolves IP→MAC, not MAC→IP. Reverse ARP (RARP) does MAC→IP — but that's different.","ARP uses broadcasts which routers block — ARP cannot operate across network boundaries.","ARP operates at Layer 2/3 for MAC resolution — it does not discover IP addresses on remote networks."]
    },
    {
      q: "Which characteristic describes the default gateway of a host computer?",
      options: ["The physical address of the router interface on the same network as the host","The physical address of the switch interface connected to the host","The logical address of the router interface on the same network as the host","The logical address assigned to the switch interface connected to the router"],
      answer: 2,
      hint: "The default gateway is an IP address (logical) assigned to the router port that's in the same subnet as the host.",
      explanation: "The default gateway is the IP address (logical/Layer 3 address) of the router interface on the same local network as the host. It's the 'exit ramp' to remote networks.",
      wrongExp: ["The physical (MAC) address of the router is used in ARP at Layer 2 — but the default gateway is configured as an IP address.","The switch does not have an IP address for host-to-host forwarding — and the switch MAC is not the default gateway.","","A switch's SVI IP address can serve as a default gateway in a Layer 3 switch setup — but in this context, the question refers to a typical router scenario."]
    },
    {
      q: "A computer has to send a packet to a destination host in the same LAN. How will the packet be sent?",
      options: ["First sent to the default gateway, then to the destination host","Sent only to the default gateway","Sent directly to the destination host","Sent to the default gateway first, then possibly to the destination host"],
      answer: 2,
      hint: "If both devices are on the SAME network (same subnet), is a router needed at all?",
      explanation: "When source and destination are on the same subnet, the host sends the packet directly using ARP to get the destination's MAC address — no default gateway involved.",
      wrongExp: ["The default gateway is only used for REMOTE destinations. Same-network communication is direct.","The default gateway is never needed for same-LAN communication.","","The default gateway is not consulted at all for same-subnet communication."]
    },
    {
      q: "What will happen if the default gateway address is incorrectly configured on a host?",
      options: ["A ping to 127.0.0.1 would not be successful","The switch will not forward packets initiated by the host","The host cannot communicate with other hosts in the local network","The host cannot communicate with hosts in other networks"],
      answer: 3,
      hint: "The default gateway only affects how you reach OTHER networks. What still works fine even with a wrong gateway?",
      explanation: "A wrong default gateway only breaks communication with remote networks. Local LAN communication (same subnet) uses ARP directly and doesn't use the default gateway.",
      wrongExp: ["127.0.0.1 is the loopback address — it tests the local TCP/IP stack and never goes through the gateway.","The switch forwards frames based on MAC addresses — the switch is unaffected by the host's gateway configuration.","Local network communication uses direct ARP and does not involve the default gateway — so local communication still works.",""]
    },
    {
      q: "Which router component holds the routing table, ARP cache, and running configuration file?",
      options: ["Flash","NVRAM","ROM","RAM"],
      answer: 3,
      hint: "Running config, routing table, and ARP cache are all active, working data — they live in the same type of memory.",
      explanation: "RAM (volatile memory) stores the running configuration, routing tables, ARP cache, and active packet buffers. All are lost if the router loses power.",
      wrongExp: ["Flash stores the IOS image (and optionally backup configs) — not active runtime data.","NVRAM stores the startup configuration (persistent) — not active runtime tables.","ROM stores the bootstrap/POST code and a minimal IOS for recovery — not runtime operational data.",""]
    },
    {
      q: "Which field in an IPv4 packet header will typically stay the same during its transmission?",
      options: ["Time-to-Live","Destination Address","Packet Length","Flag"],
      answer: 1,
      hint: "Routers modify certain fields as a packet travels. Which field must remain constant for the packet to reach the right place?",
      explanation: "The destination IP address never changes during transit — it always identifies the final destination. TTL decrements at each hop; flags and packet length may change during fragmentation.",
      wrongExp: ["TTL decrements by 1 at every router hop — it changes constantly during transit.","","Packet Length can change if the packet is fragmented at a router.","Flags may be set during fragmentation (More Fragments flag) — they can change."]
    },
    {
      q: "When transporting real-time applications like streaming audio/video, which IPv6 header field maintains the same path for packets in the same conversation?",
      options: ["Flow Label","Traffic Class","Next Header","Differentiated Services"],
      answer: 0,
      hint: "Real-time streams need consistent, predictable routing — IPv6 has a field specifically designed to keep related packets on the same path.",
      explanation: "The Flow Label field in IPv6 allows routers to identify and handle all packets belonging to the same flow (conversation) identically — ensuring consistent path and quality for real-time traffic.",
      wrongExp: ["","Traffic Class (similar to IPv4 DSCP) indicates priority — but it doesn't ensure same-path routing for a flow.","Next Header identifies the next protocol (like IPv4's Protocol field) — not path consistency.","Differentiated Services is an IPv4 field — IPv6 uses Traffic Class instead."]
    }
  ],
  16: [
    {
      q: "Which malicious code attack is self-contained and tries to exploit a specific vulnerability in a system being attacked?",
      options: ["Worm","Virus","Trojan horse","Social engineering"],
      answer: 0,
      hint: "This type of malware needs no host file and spreads automatically by exploiting weaknesses — no user action required.",
      explanation: "A worm is a self-contained, self-replicating program that automatically exploits vulnerabilities to spread across networks without user interaction.",
      wrongExp: ["","A virus attaches to a legitimate file and requires user action (running the file) to spread.","A Trojan horse disguises itself as legitimate software — it doesn't self-replicate or exploit vulnerabilities automatically.","Social engineering manipulates people psychologically — it is not a piece of malicious code."]
    },
    {
      q: "What is the difference between a virus and a worm?",
      options: ["Worms require a host file but viruses do not","Viruses self-replicate but worms do not","Worms self-replicate but viruses do not","Viruses hide in legitimate programs but worms do not"],
      answer: 2,
      hint: "The defining trait of a worm is autonomous spreading without human help — what does a virus need to spread?",
      explanation: "Worms self-replicate and spread automatically across networks. Viruses require user action (opening an infected file) to spread — they cannot propagate on their own.",
      wrongExp: ["This is backwards — VIRUSES need a host file to attach to; worms are self-contained.","This is backwards — WORMS self-replicate autonomously; viruses need user action.","","Hiding in legitimate programs is actually a trait of both viruses (attaching to files) and Trojans (disguising as legitimate apps) — it's not what distinguishes them."]
    },
    {
      q: "Which example of malicious code would be classified as a Trojan horse?",
      options: ["Malware that automatically spreads from one system to another by exploiting a vulnerability","Malware that was written to look like a video game","Malware that attaches itself to a legitimate program and spreads when launched","Malware that requires manual user intervention to spread between systems"],
      answer: 1,
      hint: "Think of the Trojan horse myth — a gift that hid something dangerous inside. What's the key deception?",
      explanation: "A Trojan horse disguises itself as something desirable (a game, utility, etc.) — once installed by the trusting user, it executes its malicious payload.",
      wrongExp: ["Automatically spreading by exploiting vulnerabilities describes a worm.","","Attaching to a legitimate program that spreads when launched describes a virus.","Requiring manual user intervention just means it's not a worm — it doesn't specifically make it a Trojan."]
    },
    {
      q: "Which type of attack involves an adversary attempting to gather information about a network to identify vulnerabilities?",
      options: ["Man-in-the-middle","Reconnaissance","DoS","Dictionary"],
      answer: 1,
      hint: "This is the first phase of most attacks — before any damage is done, an attacker must first understand the target.",
      explanation: "Reconnaissance attacks gather information about the target network (hosts, open ports, OS versions, topology) before launching an actual attack. Tools: nslookup, ping sweep, port scanners.",
      wrongExp: ["Man-in-the-middle intercepts active communications — it happens AFTER the initial reconnaissance phase.","","DoS attacks disrupt service availability — they are disruptive, not information-gathering attacks.","A dictionary attack tries common passwords to gain authentication — not general network reconnaissance."]
    },
    {
      q: "Which attack involves a compromise of data that occurs between two end points?",
      options: ["Denial-of-service","Extraction of security parameters","Man-in-the-middle attack","Username enumeration"],
      answer: 2,
      hint: "The word 'between' is the key — something is happening in the middle of a communication, not at either endpoint.",
      explanation: "A man-in-the-middle (MITM) attack intercepts communication between two parties — the attacker can read, modify, or inject messages without either party knowing.",
      wrongExp: ["DoS attacks disrupt availability — they do not compromise data in transit between endpoints.","Extracting security parameters is a specific technique — not the general category for data interception.","","Username enumeration probes for valid usernames — it does not intercept data between endpoints."]
    },
    {
      q: "Which firewall feature ensures packets coming into a network are legitimate responses to requests from internal hosts?",
      options: ["URL filtering","Stateful packet inspection","Packet filtering","Application filtering"],
      answer: 1,
      hint: "This feature tracks connection state — it knows which connections were initiated from inside and only allows expected replies.",
      explanation: "Stateful Packet Inspection (SPI) maintains a state table of active connections. Inbound packets are only allowed if they match an established outbound connection — unsolicited packets are blocked.",
      wrongExp: ["URL filtering blocks access to specific websites — it does not track connection state.","","Packet filtering checks individual packets based on static rules (IP, port) — it has no memory of connection state.","Application filtering inspects application-layer content — it doesn't specifically validate that packets are responses to internal requests."]
    },
    {
      q: "What is the advantage of using SSH over Telnet?",
      options: ["SSH provides secure communications to access hosts","SSH operates faster than Telnet","SSH is easier to use","SSH supports authentication for a connection request"],
      answer: 0,
      hint: "The 'S' in SSH stands for Secure — what specific security capability does that provide that Telnet lacks?",
      explanation: "SSH encrypts the entire session including login credentials and all commands. Telnet sends everything in cleartext — anyone with packet capture can read the session.",
      wrongExp: ["","SSH is slightly slower due to encryption overhead — Telnet is faster (but insecure).","Telnet is arguably simpler to configure — SSH requires key generation and more setup.","Both SSH and Telnet support authentication — the difference is that SSH encrypts the credentials during transmission."]
    },
    {
      q: "Which three services are provided by the AAA framework? (Choose three)",
      options: ["Automation","Authorization","Autobalancing","Autoconfiguration","Accounting","Authentication"],
      answer: [1, 4, 5],
      multi: true,
      hint: "AAA is literally the acronym for its three components. Sound out each 'A' — what does each one stand for?",
      explanation: "AAA stands for: Authentication (verify identity — 'who are you?'), Authorization (define access — 'what can you do?'), Accounting (track activity — 'what did you do?').",
      wrongExp: ["Automation is not part of AAA — it describes automated processes or scripts.","","Autobalancing is not a security or networking AAA concept.","Autoconfiguration (like SLAAC in IPv6) is a network configuration feature — not an AAA service.","",""]
    },
    {
      q: "What is the purpose of the network security accounting function?",
      options: ["To keep track of the actions of a user","To require users to prove who they are","To provide challenge and response questions","To determine which resources a user can access"],
      answer: 0,
      hint: "In AAA, Authentication = who, Authorization = what, Accounting = ___? Think audit log.",
      explanation: "Accounting tracks and logs all actions performed by authenticated users — creating an audit trail for security review, compliance, and incident investigation.",
      wrongExp: ["","Requiring users to prove identity is Authentication — the first 'A' in AAA.","Challenge/response is an authentication mechanism — not accounting.","Determining resource access is Authorization — the second 'A' in AAA."]
    },
    {
      q: "What is considered the most effective way to mitigate a worm attack?",
      options: ["Change system passwords every 30 days","Ensure that AAA is configured in the network","Ensure all systems have the most current virus definitions","Download security updates and patch all vulnerable systems"],
      answer: 3,
      hint: "Worms spread by exploiting software vulnerabilities. What is the only thing that actually closes those vulnerabilities?",
      explanation: "Worms exploit known software vulnerabilities. The only definitive mitigation is patching those vulnerabilities — virus definitions help detect worms but don't eliminate the underlying weakness.",
      wrongExp: ["Password rotation helps against account compromise — but worms exploit software vulnerabilities, not weak passwords.","AAA controls access — but a worm exploiting an unpatched vulnerability bypasses AAA.","Antivirus definitions help detect known worms — but they don't close the underlying vulnerability that allows the worm to spread.",""]
    },
    {
      q: "What does the term 'vulnerability' mean?",
      options: ["A potential threat that a hacker creates","A computer that contains sensitive information","A weakness that makes a target susceptible to an attack","A known target or victim machine"],
      answer: 2,
      hint: "Remember the security triad: Threat (the attacker), Vulnerability (the weakness), Risk (the combination of both).",
      explanation: "A vulnerability is a weakness or flaw in a system — in software, configuration, or policy — that can be exploited by a threat actor to cause harm.",
      wrongExp: ["A threat is the potential danger or attacker — not the weakness itself.","A computer with sensitive data is an asset (or target) — not a vulnerability by itself.","","A known target is an asset at risk — but vulnerability specifically refers to the weakness, not the target."]
    },
    {
      q: "What is the objective of a network reconnaissance attack?",
      options: ["Disabling network systems or services","Unauthorized manipulation of data","Discovery and mapping of systems","Denying access to resources by legitimate users"],
      answer: 2,
      hint: "Reconnaissance comes before an attack — what does an attacker need to know before they can strike?",
      explanation: "Reconnaissance discovers and maps the target environment — identifying live hosts, open ports, OS versions, and network topology — to plan the actual attack.",
      wrongExp: ["Disabling systems describes a DoS attack — reconnaissance does no damage, it only gathers information.","Unauthorized data manipulation describes an access or integrity attack — reconnaissance is passive information gathering.","","Denying access describes a DoS/DDoS attack — reconnaissance is a preparation phase, not disruptive itself."]
    },
    {
      q: "What is an accurate description of redundancy?",
      options: ["Configuring a switch with proper security to ensure all traffic through an interface is filtered","Designing a network to use multiple virtual devices to ensure all traffic uses the best path","Designing a network to use multiple paths between switches to ensure there is no single point of failure","Configuring a router with a complete MAC address database to ensure all frames can be forwarded"],
      answer: 2,
      hint: "Redundancy means having backups. In a network, what specific design practice ensures one failure doesn't take everything down?",
      explanation: "Network redundancy means building multiple parallel paths so if one link or device fails, traffic automatically reroutes — eliminating single points of failure.",
      wrongExp: ["Filtering traffic on an interface describes security policy (ACLs) — not redundancy.","Virtual devices (like VSS or vPC) can be part of a redundancy design, but the key concept is multiple physical paths — not virtual devices.","","A complete MAC database describes switch operation — not redundancy design."]
    },
    {
      q: "Which three configuration steps must be performed to implement SSH access to a router? (Choose three)",
      options: ["A unique hostname","A user account","An IP domain name","An encrypted password","A password on the console line","An enable mode password"],
      answer: [0, 1, 2],
      multi: true,
      hint: "SSH requires a digital key pair (RSA). Key generation requires two pieces of router identity. Plus you need something to log in with.",
      explanation: "SSH setup requires: (1) unique hostname — part of the key identity, (2) IP domain name — used with hostname to generate the RSA key name, (3) local user account — required for SSH authentication. Then: crypto key generate rsa.",
      wrongExp: ["","","","An encrypted password (enable secret) is good practice but not required specifically for SSH setup.","Console line password is for console access — not required for SSH configuration.","Enable mode password is separate from SSH login — not a required SSH step."]
    },
    {
      q: "Which command will block login attempts on a router for 30 seconds if there are 2 failed attempts within 10 seconds?",
      options: ["login block-for 30 attempts 10 within 2","login block-for 2 attempts 30 within 10","login block-for 10 attempts 2 within 30","login block-for 30 attempts 2 within 10"],
      answer: 3,
      hint: "The syntax is: login block-for [block duration] attempts [number of failures] within [time window]. Match the numbers to the question.",
      explanation: "login block-for 30 attempts 2 within 10 = block for 30 seconds if 2 failed attempts occur within 10 seconds. Match: block=30s, attempts=2, window=10s.",
      wrongExp: ["This reads: block for 30s after 10 failed attempts within 2s — attempts and window are swapped.","This reads: block for 2s after 30 failed attempts within 10s — block duration and attempts are wrong.","This reads: block for 10s after 2 failed attempts within 30s — block and window are swapped.",""]
    }
  ]
};

const PREDICTED_QUESTIONS = [
  { module:1, q:"What is the main difference between a LAN and a WAN?", options:["A LAN is always wireless; a WAN uses only wired connections","A LAN spans a small geographical area; a WAN spans a large geographical area","A LAN is owned by an ISP; a WAN is privately owned","A LAN uses IP addressing; a WAN uses MAC addressing"], answer:1, hint:"Think geographic scale — one fits in a building, the other connects cities or countries.", explanation:"LAN covers a small area (home, office, campus). WAN spans large geographic areas, often connecting multiple LANs across cities or countries." },
  { module:1, q:"Which type of connection uses the telephone network to provide internet access?", options:["Cable","DSL","Fiber","Satellite"], answer:1, hint:"This technology's full name includes the words 'digital subscriber line' — what infrastructure does it reuse?", explanation:"DSL (Digital Subscriber Line) delivers internet over existing telephone copper wire infrastructure. Cable uses TV cable; fiber uses optical lines." },
  { module:2, q:"Which IOS mode provides access to ALL device commands including configuration and troubleshooting?", options:["User EXEC mode","Interface configuration mode","Global configuration mode","Privileged EXEC mode"], answer:3, hint:"The prompt ends with # — what mode is that?", explanation:"Privileged EXEC mode (Router#) gives complete access to all IOS commands. User EXEC (Router>) allows only limited monitoring." },
  { module:2, q:"What command saves the running configuration to NVRAM so it persists after a reload?", options:["copy startup-config running-config","copy running-config startup-config","write erase","copy running-config flash"], answer:1, hint:"running-config is in RAM; startup-config is in NVRAM. Which direction saves the work?", explanation:"copy running-config startup-config copies the active RAM config to NVRAM, making it permanent across reboots." },
  { module:3, q:"Which OSI layer is responsible for end-to-end communication and segmentation of data?", options:["Network layer (Layer 3)","Data Link layer (Layer 2)","Transport layer (Layer 4)","Session layer (Layer 5)"], answer:2, hint:"TCP lives at this layer — TCP handles segmentation, sequencing, and reliability.", explanation:"The Transport layer (Layer 4) performs segmentation, end-to-end error recovery, flow control, and process identification via port numbers." },
  { module:3, q:"In the TCP/IP model, which layer corresponds to BOTH Physical and Data Link layers of the OSI model?", options:["Internet layer","Transport layer","Application layer","Network Access layer"], answer:3, hint:"TCP/IP has 4 layers; OSI has 7. Which TCP/IP layer absorbs two OSI layers at the bottom?", explanation:"The TCP/IP Network Access (Link) layer combines the functionality of OSI's Physical (L1) and Data Link (L2) layers." },
  { module:4, q:"Which type of UTP cable is used to connect a PC directly to a switch port?", options:["Crossover cable","Rollover cable","Straight-through cable","Coaxial cable"], answer:2, hint:"Unlike devices (PC and switch) use which cable type?", explanation:"Straight-through cables connect unlike devices (PC to switch, router to switch). Crossover cables connect like devices." },
  { module:4, q:"What is the maximum distance for a standard Cat5e UTP cable segment?", options:["50 meters","100 meters","200 meters","500 meters"], answer:1, hint:"The IEEE 802.3 standard defines this limit for 10/100/1000BASE-T Ethernet.", explanation:"The IEEE standard specifies 100 meters maximum for UTP copper segments. Beyond this, attenuation causes signal degradation." },
  { module:6, q:"A switch receives a frame with a destination MAC not in its MAC table. What does it do?", options:["Drops the frame","Sends an error to the source","Floods the frame out all ports except the ingress port","Forwards it to the default gateway"], answer:2, hint:"When a switch doesn't know where to send a frame, it does what any cautious device would — sends it everywhere it can.", explanation:"Unknown unicast flooding: the switch sends the frame out all ports except the one it arrived on, hoping the destination device will respond and reveal its location." },
  { module:6, q:"At which OSI layer does a switch make forwarding decisions?", options:["Layer 1 – Physical","Layer 2 – Data Link","Layer 3 – Network","Layer 4 – Transport"], answer:1, hint:"Switches use MAC addresses — which layer are MAC addresses at?", explanation:"Switches are Layer 2 devices that forward frames based on destination MAC addresses in their MAC address table." },
  { module:8, q:"Which IPv4 packet header field is decremented by each router that processes the packet?", options:["Version","Protocol","Time-to-Live (TTL)","Header Checksum"], answer:2, hint:"This field starts at a set value (e.g., 64 or 128) and counts down toward zero with each hop.", explanation:"TTL is decremented by 1 at every router. When it reaches 0, the packet is dropped and an ICMP Time Exceeded message is returned — preventing infinite routing loops." },
  { module:8, q:"What happens when a host needs to communicate with a host on a REMOTE network?", options:["It sends the packet directly to the destination","It sends the packet to the default gateway with the destination IP address","It broadcasts to find the remote host's MAC","It uses ARP to find the remote host's MAC address directly"], answer:1, hint:"Can the host reach the remote network directly? What device bridges different networks?", explanation:"For remote communication, the host sends the frame to the default gateway's MAC address, while keeping the destination IP of the remote host. The router then forwards it toward the destination." },
  { module:16, q:"Which type of attack sends extremely large numbers of requests to a server to make it unavailable?", options:["Reconnaissance attack","Access attack","Denial of Service (DoS) attack","Man-in-the-middle attack"], answer:2, hint:"The attack's goal is to DENY legitimate users their service — what is that called?", explanation:"A DoS attack overwhelms a target system with traffic, consuming all resources so it can't serve legitimate requests. DDoS uses many compromised hosts to amplify the attack." },
  { module:16, q:"What is the purpose of 'login block-for 60 attempts 5 within 30' on a Cisco router?", options:["Block for 5s after 60 attempts in 30s","Block for 30s after 5 attempts in 60s","Block for 60s after 5 attempts in 30s","Block for 30s after 60 attempts in 5s"], answer:2, hint:"Read the syntax carefully: block-for [duration] attempts [number] within [window].", explanation:"block-for 60 = block for 60 seconds; attempts 5 = after 5 failures; within 30 = within a 30-second window. This blocks brute-force login attacks." }
];

const FLASHCARDS = [
  { q:"LAN vs WAN — key difference?", a:"LAN: small geographic area (home/office), typically one organization. WAN: large geographic area connecting multiple LANs across cities/countries." },
  { q:"Intranet vs Extranet vs Internet", a:"Intranet: private, internal employees only. Extranet: controlled access for external partners/suppliers. Internet: global, public, no single owner." },
  { q:"What are the 3 characteristics of IP?", a:"C-B-M: Connectionless (no prior session), Best-effort (no guaranteed delivery), Media-independent (works over any physical medium)." },
  { q:"OSI 7 layers — name them top to bottom", a:"Application, Presentation, Session, Transport, Network, Data Link, Physical. Mnemonic: All People Seem To Need Data Processing." },
  { q:"PDU names by layer", a:"Application → Data | Transport → Segment | Network → Packet | Data Link → Frame | Physical → Bits. Mnemonic: Do Some People Fear Birthdays?" },
  { q:"TCP/IP 4 layers and their OSI equivalents", a:"Application (OSI 5-7) | Transport (OSI 4) | Internet (OSI 3) | Network Access (OSI 1-2)" },
  { q:"User EXEC vs Privileged EXEC mode", a:"User EXEC (Router>) — limited monitoring only. Privileged EXEC (Router#) — full access. Enter with 'enable', exit with 'disable'." },
  { q:"How do you save config changes permanently?", a:"copy running-config startup-config — copies RAM (running) → NVRAM (startup). Changes survive reload." },
  { q:"service password-encryption vs enable secret", a:"service password-encryption: Type 7 (weak), encrypts ALL plain-text passwords. enable secret: Type 5 MD5, encrypts only the privileged EXEC password (stronger)." },
  { q:"What is an SVI and why is it needed?", a:"Switch Virtual Interface — a logical Layer 3 interface on a Layer 2 switch, associated with VLAN 1 by default. Needed to assign an IP address for remote (SSH/Telnet) management." },
  { q:"SSH vs Telnet", a:"SSH: encrypted (entire session), secure, port 22. Telnet: plain text (passwords visible), insecure, port 23. Always prefer SSH." },
  { q:"Bandwidth vs Throughput vs Latency vs Goodput", a:"Bandwidth: max capacity (theoretical). Throughput: actual measured rate. Latency: total delay source→destination. Goodput: useful data only (no overhead)." },
  { q:"What causes crosstalk, and how is it reduced?", a:"Caused by magnetic fields between adjacent wire pairs. Reduced by twisting the wire pairs together (the 'T' in UTP = Twisted)." },
  { q:"Straight-through vs Crossover cable", a:"Straight-through: unlike devices (PC↔switch, router↔switch). Crossover: like devices (PC↔PC, switch↔switch). Auto-MDIX makes the distinction irrelevant on modern gear." },
  { q:"Store-and-forward vs Cut-through switching", a:"Store-and-forward: buffers entire frame, checks CRC → accurate, higher latency. Cut-through: reads dest MAC only → low latency, no error check. Fast-forward is the lowest-latency cut-through variant." },
  { q:"Broadcast MAC vs Multicast MAC", a:"Broadcast: FF:FF:FF:FF:FF:FF — ALL devices receive. Multicast: starts with 01:00:5E — only subscribed group receives." },
  { q:"CSMA/CD vs CSMA/CA", a:"CSMA/CD: wired Ethernet (half-duplex) — detects collisions AFTER they occur, then backs off. CSMA/CA: wireless 802.11 — tries to AVOID collisions before transmitting." },
  { q:"IPv4 TTL field — what does it do?", a:"Decremented by 1 at each router hop. Dropped when TTL=0 → prevents routing loops. An ICMP Time Exceeded message is sent back to the source." },
  { q:"IPv4 Protocol field — what does it identify?", a:"Identifies the Layer 4 protocol in the payload: 6=TCP, 17=UDP, 1=ICMP. Tells the receiving host which upper-layer process to hand the payload to." },
  { q:"IPv4 vs IPv6 — key differences", a:"IPv4: 32-bit, ~4.3B addresses, broadcast, 20-byte variable header. IPv6: 128-bit, 340 undecillion addresses, no broadcast (uses multicast), 40-byte fixed header." },
  { q:"What is ARP and when is it used?", a:"Address Resolution Protocol — resolves a known IPv4 address to an unknown MAC address on the local network. Used every time a host needs to send a frame to an IP it knows." },
  { q:"ARP request vs ARP reply addressing", a:"Request: sent as broadcast (FF:FF:FF:FF:FF:FF) — all devices receive. Reply: sent as unicast back to the requester — only the requester gets it." },
  { q:"What replaces ARP in IPv6?", a:"NDP (Neighbor Discovery Protocol) using ICMPv6 Neighbor Solicitation (NS) and Neighbor Advertisement (NA) messages. Also handles router discovery and SLAAC." },
  { q:"Default gateway — what is it and when is it used?", a:"The IP address of the router interface on the same subnet as the host. Used ONLY for remote destinations — same-subnet traffic goes directly via ARP." },
  { q:"Virus vs Worm vs Trojan horse", a:"Virus: attaches to files, needs user action to spread. Worm: self-replicates, spreads automatically (no user action). Trojan: disguised as legitimate software, installed willingly." },
  { q:"DoS vs DDoS", a:"DoS: single source overwhelms a target. DDoS: Distributed — many compromised hosts (botnet) attack one target simultaneously, much harder to block." },
  { q:"What is a reconnaissance attack?", a:"Information gathering phase — maps the target network (hosts, ports, OS, topology) using tools like nslookup, ping sweep, port scanners. Prepares for the actual attack." },
  { q:"AAA framework — what do the three A's stand for?", a:"Authentication (who are you? — verify identity), Authorization (what can you do? — access rights), Accounting (what did you do? — activity logging)." },
  { q:"Stateful Packet Inspection (SPI)", a:"Firewall technique that tracks active connection state. Only allows inbound packets that are legitimate responses to internally initiated connections — blocks unsolicited traffic." },
  { q:"SSH setup — what 3 things are required?", a:"1. Unique hostname. 2. IP domain name (ip domain-name). 3. RSA key pair (crypto key generate rsa). Plus a local user account for authentication." },
  { q:"login block-for syntax", a:"login block-for [seconds to block] attempts [number of failures] within [time window in seconds]. Mitigates brute-force password attacks." },
  { q:"LLC vs MAC sublayers", a:"LLC (software): identifies upper-layer protocol (IPv4/IPv6). MAC (hardware/NIC): physical addressing + media access control (CSMA/CD, CSMA/CA)." },
  { q:"What does the FCS/CRC in a frame trailer do?", a:"Detects transmission errors — the receiver recomputes CRC; mismatch = frame discarded. It detects errors but does NOT correct them." },
  { q:"Loopback address — what is it for?", a:"127.0.0.1 (IPv4) / ::1 (IPv6) — tests the local TCP/IP stack. Packets never leave the NIC. Used to verify TCP/IP is installed and working." }
];
