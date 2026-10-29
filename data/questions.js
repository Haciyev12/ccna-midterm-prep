const MODULES = {
  1: {
    title: "Networking Today",
    description: "Networks, internet connections, topologies, network components, BYOD, cloud, and IoT.",
    color: "#3B82F6",
    icon: "🌐",
    keyTopics: ["Host Roles & End Devices","Intermediary Devices & Media","LAN vs WAN","Internet / Intranet / Extranet","Network Topologies","Internet Connection Types","BYOD / Cloud / QoS / IoT"]
  },
  2: {
    title: "Basic Switch & End Device Configuration",
    description: "Cisco IOS access, navigation, command structure, and basic device setup.",
    color: "#10B981",
    icon: "⚙️",
    keyTopics: ["IOS Access Methods","User vs Privileged EXEC Mode","Global Configuration Mode","Basic Device Commands","Password Configuration","SSH vs Telnet","Switch Virtual Interface (SVI)"]
  },
  3: {
    title: "Protocols and Models",
    description: "Communication protocols, TCP/IP model, OSI model, encapsulation, and PDUs.",
    color: "#8B5CF6",
    icon: "📋",
    keyTopics: ["Communication Rules & Protocols","TCP/IP Protocol Suite","OSI Reference Model","Encapsulation & PDUs","Standards Organizations","Protocol Interaction"]
  },
  4: {
    title: "Physical Layer",
    description: "Physical media, bandwidth, copper cabling, fiber optics, and wireless media.",
    color: "#F59E0B",
    icon: "🔌",
    keyTopics: ["Physical Layer Purpose","Bandwidth vs Throughput vs Latency","UTP Cabling (STP, Coax)","Straight-through vs Crossover","Fiber-Optic Cabling","Wireless Media","Encoding & Signaling"]
  },
  6: {
    title: "Data Link Layer",
    description: "Data link sublayers, topologies, MAC addressing, frame structure, and media access.",
    color: "#EF4444",
    icon: "🔗",
    keyTopics: ["LLC & MAC Sublayers","Physical vs Logical Topologies","WAN Topologies","Half vs Full Duplex","CSMA/CD & CSMA/CA","Frame Structure & Fields","Layer 2 Addresses"]
  },
  8: {
    title: "Network Layer",
    description: "IP characteristics, IPv4/IPv6 headers, routing, ARP, and default gateway.",
    color: "#06B6D4",
    icon: "🗺️",
    keyTopics: ["IP Characteristics (Connectionless, Best-Effort)","IPv4 Header Fields","IPv6 Overview & Header","IPv4 vs IPv6","Host Routing & Default Gateway","Introduction to Routing","ARP Process"]
  },
  16: {
    title: "Network Security Fundamentals",
    description: "Security threats, network attacks, mitigations, device security, SSH, and AAA.",
    color: "#DC2626",
    icon: "🔒",
    keyTopics: ["Types of Threats & Vulnerabilities","Malware (Virus, Worm, Trojan)","Reconnaissance & Access Attacks","DoS Attacks","Defense-in-Depth","Firewalls & Endpoint Security","SSH Configuration & AAA"]
  }
};

const QUIZ_DATA = {
  1: [
    {
      q: "What term describes storing personal files on servers over the internet to provide access anywhere, anytime, and on any device?",
      options: ["Quality of service","Cloud","BYOD","Converged network"],
      answer: 1
    },
    {
      q: "What term describes a network where one computer can be both client and server?",
      options: ["Cloud","Quality of service","BYOD","Peer-to-peer"],
      answer: 3
    },
    {
      q: "What term describes a private collection of LANs and WANs that belongs to an organization?",
      options: ["Internet","Peer-to-peer","Intranet","Extranet"],
      answer: 2
    },
    {
      q: "What term refers to a network that provides secure access to corporate offices by suppliers, customers and collaborators?",
      options: ["Intranet","Extendednet","Internet","Extranet"],
      answer: 3
    },
    {
      q: "Which device performs the function of determining the path that messages should take through internetworks?",
      options: ["A firewall","A web server","A router","A DSL modem"],
      answer: 2
    },
    {
      q: "What term describes the ability to use personal devices across a business or campus network?",
      options: ["Extranet","Intranet","BYOD","Internet"],
      answer: 2
    },
    {
      q: "What term describes a policy that allows network devices to manage the flow of data to give priority to voice and video?",
      options: ["Internet","Intranet","Extranet","Quality of service"],
      answer: 3
    },
    {
      q: "What is an ISP?",
      options: [
        "A standards body that develops cabling and wiring standards for networking",
        "A networking device that combines the functionality of several different networking devices",
        "A protocol that establishes how computers within a local network communicate",
        "An organization that enables individuals and businesses to connect to the Internet"
      ],
      answer: 3
    },
    {
      q: "What type of network traffic requires QoS?",
      options: ["Video conferencing","On-line purchasing","Wiki","Email"],
      answer: 0
    },
    {
      q: "What term describes a type of network used by people who work from home or from a small remote office?",
      options: ["BYOD","Converged network","Quality of service","SOHO network"],
      answer: 3
    },
    {
      q: "What term describes a technology that allows devices to connect to the LAN using an electrical outlet?",
      options: ["Extranet","Intranet","Powerline networking","Internet"],
      answer: 2
    },
    {
      q: "What is a characteristic of multicast messages?",
      options: [
        "They must be acknowledged",
        "They are sent to a select group of hosts",
        "They are sent to all hosts on a network",
        "They are sent to a single destination"
      ],
      answer: 1
    },
    {
      q: "A large corporation has modified its network to allow users to access network resources from their personal laptops and smartphones. Which networking trend does this describe?",
      options: ["Cloud computing","Video conferencing","Bring your own device","Online collaboration"],
      answer: 2
    },
    {
      q: "A networking technician is working on the wireless network at a medical clinic. The technician accidentally sets up the wireless network so that patients can see medical records of other patients. Which of the four network characteristics has been violated?",
      options: ["Reliability","Quality of Service (QoS)","Scalability","Security"],
      answer: 3
    },
    {
      q: "An employee at a branch office is creating a quote for a customer and needs to access confidential pricing information from internal servers at the Head Office. What type of network would the employee access?",
      options: ["An intranet","The Internet","An extranet","A local area network"],
      answer: 0
    }
  ],
  2: [
    {
      q: "Which interface allows remote management of a Layer 2 switch?",
      options: ["The AUX interface","The switch virtual interface","The first Ethernet port interface","The console port interface"],
      answer: 1
    },
    {
      q: "Why would a Layer 2 switch need an IP address?",
      options: [
        "To enable the switch to receive frames from attached PCs",
        "To enable the switch to send broadcast frames to attached PCs",
        "To enable the switch to be managed remotely",
        "To enable the switch to function as a default gateway"
      ],
      answer: 2
    },
    {
      q: "How is SSH different from Telnet?",
      options: [
        "SSH makes connections over the network, whereas Telnet is for out-of-band access",
        "SSH provides security to remote sessions by encrypting messages and using user authentication",
        "SSH must be configured over an active network connection, whereas Telnet is used for console connection",
        "SSH requires PuTTY terminal emulation program"
      ],
      answer: 1
    },
    {
      q: "What command will prevent all unencrypted passwords from displaying in plain text in a configuration file?",
      options: [
        "(config-line)# password secret",
        "(config)# enable password secret",
        "(config)# service password-encryption",
        "(config)# enable secret Encrypted_Password"
      ],
      answer: 2
    },
    {
      q: "What command is used to verify the condition of the switch interfaces?",
      options: ["ping","ipconfig","show ip interface brief","traceroute"],
      answer: 2
    },
    {
      q: "Which command or key combination allows a user to return to the previous level in the command hierarchy?",
      options: ["Ctrl-Z","Ctrl-C","Exit","End"],
      answer: 2
    },
    {
      q: "What are two characteristics of RAM on a Cisco device? (Choose two)",
      options: [
        "The configuration that is actively running on the device is stored in RAM",
        "The contents of RAM are lost during a power cycle",
        "RAM is a component in Cisco switches but not in Cisco routers",
        "RAM is able to store multiple versions of IOS and configuration files"
      ],
      answer: [0, 1],
      multi: true
    },
    {
      q: "An administrator is trying to configure the switch but receives an error message. What is the problem?",
      options: [
        "The entire command, configure terminal, must be used",
        "The administrator is already in global configuration mode",
        "The administrator must connect via the console port to access global configuration mode",
        "The administrator must first enter privileged EXEC mode before issuing the command"
      ],
      answer: 3
    },
    {
      q: "After making configuration changes on a Cisco switch, a network administrator issues a copy running-config startup-config command. What is the result?",
      options: [
        "The current IOS file will be replaced with the newly configured file",
        "The new configuration will be loaded if the switch is restarted",
        "The new configuration will be stored in flash memory",
        "The configuration changes will be removed and the original configuration will be restored"
      ],
      answer: 1
    },
    {
      q: "In the show running-config command, which part of the syntax is represented by running-config?",
      options: ["A prompt","A variable","The command","A keyword"],
      answer: 3
    },
    {
      q: "What function does pressing the Tab key have when entering a command in IOS?",
      options: [
        "It moves the cursor to the beginning of the next line",
        "It completes the remainder of a partially typed word in a command",
        "It exits configuration mode and returns to user EXEC mode",
        "It aborts the current command and returns to configuration mode"
      ],
      answer: 1
    },
    {
      q: "A technician configures a switch with these commands. What is the technician configuring?",
      options: ["Telnet access","Physical switchport access","Password encryption","SVI"],
      answer: 3
    },
    {
      q: "A network administrator enters the service password-encryption command into the configuration mode of a router. What does this command accomplish?",
      options: [
        "This command automatically encrypts passwords in configuration files that are currently stored in NVRAM",
        "This command encrypts passwords as they are transmitted across serial WAN links",
        "This command provides an exclusive encrypted password for external service personnel",
        "This command enables a strong encryption algorithm for the enable secret password command"
      ],
      answer: 0
    },
    {
      q: "While trying to solve a network issue, a technician made multiple changes to the current router configuration file. What action can the technician take to discard the changes?",
      options: [
        "Issue the copy startup-config running-config command",
        "Close and reopen the terminal emulation software",
        "Issue the reload command without saving the running configuration",
        "Delete the vlan.dat file and reboot the device"
      ],
      answer: 2
    },
    {
      q: "Which two host names follow the guidelines for naming conventions on Cisco IOS devices? (Choose two)",
      options: ["HO Floor 17","SwBranch799","Branch2!","RM-3-Switch-2A4"],
      answer: [1, 3],
      multi: true
    }
  ],
  3: [
    {
      q: "Which statement is correct about network protocols?",
      options: [
        "They define how messages are exchanged between the source and the destination",
        "Network protocols define the type of hardware that is used and how it is mounted in racks",
        "They are only required for exchange of messages between devices on remote networks",
        "They all function in the network access layer of TCP/IP"
      ],
      answer: 0
    },
    {
      q: "Which statement accurately describes a TCP/IP encapsulation process when a PC is sending data to the network?",
      options: [
        "Data is sent from the internet layer to the network access layer",
        "Packets are sent from the network access layer to the transport layer",
        "Segments are sent from the transport layer to the internet layer",
        "Frames are sent from the network access layer to the internet layer"
      ],
      answer: 2
    },
    {
      q: "Which name is assigned to the transport layer PDU?",
      options: ["Data","Frame","Bits","Segment"],
      answer: 3
    },
    {
      q: "Which PDU format is used when bits are received from the network medium by the NIC of a host?",
      options: ["Segment","File","Packet","Frame"],
      answer: 3
    },
    {
      q: "What two criteria are used to help select a network medium from various network media? (Choose two)",
      options: [
        "The distance the selected medium can successfully carry a signal",
        "The environment where the selected medium is to be installed",
        "The types of data that need to be prioritized",
        "The number of intermediate devices installed in the network"
      ],
      answer: [0, 1],
      multi: true
    },
    {
      q: "Which two OSI model layers have the same functionality as a single layer of the TCP/IP model? (Choose two)",
      options: ["Session","Data link","Network","Transport","Physical"],
      answer: [1, 4],
      multi: true
    },
    {
      q: "At which OSI layer is a source MAC address added to a PDU during the encapsulation process?",
      options: ["Transport layer","Presentation layer","Application layer","Data link layer"],
      answer: 3
    },
    {
      q: "At which OSI layer is a destination MAC address added to a PDU during the encapsulation process?",
      options: ["Network layer","Transport layer","Data link layer","Application layer"],
      answer: 2
    },
    {
      q: "At which OSI layer is a source IP address added to a PDU during the encapsulation process?",
      options: ["Network layer","Application layer","Transport layer","Data link layer"],
      answer: 0
    },
    {
      q: "At which OSI layer is a destination IP address added to a PDU during the encapsulation process?",
      options: ["Network layer","Presentation layer","Application layer","Transport layer"],
      answer: 0
    },
    {
      q: "At which OSI layer is a destination port number added to a PDU during the encapsulation process?",
      options: ["Network layer","Application layer","Data link layer","Transport layer"],
      answer: 3
    },
    {
      q: "What is an advantage of network devices using open standard protocols?",
      options: [
        "A client host and server running different operating systems can successfully exchange data",
        "Internet access can be controlled by a single ISP in each market",
        "Network communications is confined to data transfers between devices from the same vendor",
        "Competition and innovation are limited to specific types of products"
      ],
      answer: 0
    },
    {
      q: "A web client is receiving a response for a web page from a web server. What is the correct order of the protocol stack?",
      options: ["HTTP, TCP, IP, Ethernet","HTTP, Ethernet, IP, TCP","Ethernet, IP, TCP, HTTP","Ethernet, TCP, IP, HTTP"],
      answer: 2
    },
    {
      q: "What three application layer protocols are part of the TCP/IP protocol suite? (Choose three)",
      options: ["DHCP","NAT","DNS","ARP","PPP","FTP"],
      answer: [0, 2, 5],
      multi: true
    },
    {
      q: "Which method allows a computer to react accordingly when it requests data from a server and the server takes too long to respond?",
      options: ["Response timeout","Flow Control","Access method","Encapsulation"],
      answer: 0
    }
  ],
  4: [
    {
      q: "What is the purpose of the OSI physical layer?",
      options: [
        "Exchanging frames between nodes over physical network media",
        "Controlling access to media",
        "Performing error detection on received frames",
        "Transmitting bits across the local media"
      ],
      answer: 3
    },
    {
      q: "What OSI physical layer term describes the capacity at which a medium can carry data?",
      options: ["Air","IEEE","EIA/TIA","Bandwidth"],
      answer: 3
    },
    {
      q: "What OSI physical layer term describes the amount of time, including delays, for data to travel from one point to another?",
      options: ["Latency","Goodput","Bandwidth","Throughput"],
      answer: 0
    },
    {
      q: "What OSI physical layer term describes the measure of usable data transferred over a given period of time?",
      options: ["Fiber-optic cable","Air","Goodput","Copper cable"],
      answer: 2
    },
    {
      q: "What is a primary role of the Physical layer in transmitting data on the network?",
      options: [
        "Provide physical addressing to the devices",
        "Create the signals that represent the bits in each frame on to the media",
        "Determine the path packets take through the network",
        "Control data access to the media"
      ],
      answer: 1
    },
    {
      q: "What does the term 'attenuation' mean in data communication?",
      options: [
        "Time for a signal to reach its destination",
        "Strengthening of a signal by a networking device",
        "Loss of signal strength as distance increases",
        "Time for latency in network connectivity"
      ],
      answer: 2
    },
    {
      q: "Which characteristic describes crosstalk?",
      options: [
        "The weakening of the network signal over long cable lengths",
        "The distortion of the transmitted messages from signals carried in adjacent wires",
        "The distortion of the network signal from fluorescent lighting",
        "The loss of wireless signal over excessive distance from the access point"
      ],
      answer: 1
    },
    {
      q: "With the use of unshielded twisted-pair copper wire in a network, what causes crosstalk within the cable pairs?",
      options: [
        "The magnetic field around the adjacent pairs of wire",
        "The reflection of the electrical wave back from the far end of the cable",
        "The collision caused by two nodes trying to use the media simultaneously",
        "The use of braided wire to shield the adjacent wire pairs"
      ],
      answer: 0
    },
    {
      q: "What makes fiber preferable to copper cabling for interconnecting buildings? (Choose two)",
      options: [
        "Lower installation cost",
        "Easily terminated",
        "Greater bandwidth potential",
        "Limited susceptibility to EMI/RFI"
      ],
      answer: [2, 3],
      multi: true
    },
    {
      q: "Why are two strands of fiber used for a single fiber optic connection?",
      options: [
        "They increase the speed at which the data can travel",
        "They prevent crosstalk from causing interference on the connection",
        "The two strands allow the data to travel for longer distances without degrading",
        "They allow for full-duplex connectivity"
      ],
      answer: 3
    },
    {
      q: "What are two characteristics of fiber-optic cable? (Choose two)",
      options: [
        "It typically contains 4 pairs of fiber-optic wires",
        "Each pair of cables is wrapped in metallic foil",
        "It is more expensive than UTP cabling is",
        "It is not affected by EMI or RFI"
      ],
      answer: [2, 3],
      multi: true
    },
    {
      q: "In addition to the cable length, what two factors could interfere with the communication carried over UTP cables? (Choose two)",
      options: [
        "Electromagnetic interference",
        "Crosstalk",
        "Size of the network",
        "Signal modulation technique"
      ],
      answer: [0, 1],
      multi: true
    },
    {
      q: "Which procedure is used to reduce the effect of crosstalk in copper cables?",
      options: [
        "Designing a cable infrastructure to avoid crosstalk interference",
        "Avoiding sharp bends during installation",
        "Wrapping the bundle of wires with metallic shielding",
        "Twisting opposing circuit wire pairs together"
      ],
      answer: 3
    },
    {
      q: "Which two devices commonly affect wireless networks? (Choose two)",
      options: [
        "Microwaves",
        "Incandescent light bulbs",
        "Cordless phones",
        "External hard drives"
      ],
      answer: [0, 2],
      multi: true
    },
    {
      q: "What OSI physical layer term describes the process by which one wave modifies another wave?",
      options: ["EIA/TIA","Modulation","Air","IEEE"],
      answer: 1
    }
  ],
  6: [
    {
      q: "Which statement is true about the CSMA/CD access method that is used in Ethernet?",
      options: [
        "A jamming signal causes only devices that caused the collision to execute a backoff algorithm",
        "All network devices must listen before transmitting",
        "When a device hears a carrier signal and transmits, a collision cannot occur",
        "Devices involved in a collision get priority to transmit after the backoff period"
      ],
      answer: 1
    },
    {
      q: "Which statement describes an extended star topology?",
      options: [
        "End devices are connected together by a bus and each bus connects to a central intermediate device",
        "Each end system is connected to its respective neighbor via an intermediate device",
        "All end and intermediate devices are connected in a chain to each other",
        "End devices connect to a central intermediate device, which in turn connects to other central intermediate devices"
      ],
      answer: 3
    },
    {
      q: "Which switching method has the lowest level of latency?",
      options: ["Fast-forward","Cut-through","Store-and-forward","Fragment-free"],
      answer: 0
    },
    {
      q: "Which switching method uses the CRC value in a frame?",
      options: ["Fragment-free","Cut-through","Fast-forward","Store-and-forward"],
      answer: 3
    },
    {
      q: "What action will occur if a switch receives a frame with the destination MAC address FF:FF:FF:FF:FF:FF?",
      options: [
        "The switch forwards it out all ports except the ingress port",
        "The switch sends the frame to a connected router because the destination MAC address is not local",
        "The switch shares the MAC address table entry with any connected switches",
        "The switch does not forward the frame"
      ],
      answer: 0
    },
    {
      q: "What action will occur if a switch receives a frame with the destination MAC address 01:00:5E:00:00:D9?",
      options: [
        "The switch forwards it out all ports except the ingress port",
        "The switch does not forward the frame",
        "The switch sends the frame to a connected router",
        "The switch shares the MAC address table entry with connected switches"
      ],
      answer: 0
    },
    {
      q: "What is the function of the CRC value that is found in the FCS field of a frame?",
      options: [
        "To verify the logical address in the frame",
        "To compute the checksum header for the data field in the frame",
        "To verify the integrity of the received frame",
        "To verify the physical address in the frame"
      ],
      answer: 2
    },
    {
      q: "What is the purpose of the FCS field in a frame?",
      options: [
        "To determine if errors occurred in the transmission and reception",
        "To verify the logical address of the sending node",
        "To obtain the MAC address of the sending node",
        "To compute the CRC header for the data field"
      ],
      answer: 0
    },
    {
      q: "Which two functions are performed at the LLC sublayer of the OSI data link layer? (Choose two)",
      options: [
        "Enables IPv4 and IPv6 to utilize the same network interface and media",
        "Places information in the frame that identifies which network layer protocol is being used",
        "Integrates various physical technologies",
        "Controls the NIC responsible for sending and receiving data on the physical medium"
      ],
      answer: [0, 1],
      multi: true
    },
    {
      q: "Which two functions are performed at the MAC sublayer of the OSI data link layer? (Choose two)",
      options: [
        "Places information in the frame that identifies which network layer protocol is being used",
        "Controls the NIC responsible for sending and receiving data on the physical medium",
        "Provides a mechanism to allow multiple devices to communicate over a shared medium",
        "Enables IPv4 and IPv6 to utilize the same network interface and media"
      ],
      answer: [1, 2],
      multi: true
    },
    {
      q: "Which frame forwarding method receives the entire frame and performs a CRC check to detect errors before forwarding the frame?",
      options: ["Fast-forward switching","Fragment-free switching","Cut-through switching","Store-and-forward switching"],
      answer: 3
    },
    {
      q: "What advantage does the store-and-forward switching method have compared with cut-through?",
      options: [
        "Frame forwarding using IPv4 Layer 3 and 4 information",
        "Collision detecting",
        "Frame error checking",
        "Faster frame forwarding"
      ],
      answer: 2
    },
    {
      q: "Which is a multicast MAC address?",
      options: ["5C-26-0A-4B-19-3E","00-26-0F-4B-00-3E","FF-FF-FF-FF-FF-FF","01-00-5E-00-00-03"],
      answer: 3
    },
    {
      q: "Which media communication type does NOT require media arbitration in the data link layer?",
      options: ["Deterministic","Full-duplex","Controlled Access","Half-duplex"],
      answer: 1
    },
    {
      q: "What two actions are performed by a Cisco switch? (Choose two)",
      options: [
        "Building a routing table based on the first IP address in the frame header",
        "Using the source MAC addresses of frames to build and maintain a MAC address table",
        "Examining the destination MAC address to add new entries to the MAC address table",
        "Forwarding frames using the destination MAC address"
      ],
      answer: [1, 3],
      multi: true
    }
  ],
  8: [
    {
      q: "Which parameter does the router use to choose the path to the destination when there are multiple routes available?",
      options: [
        "The higher metric value associated with the destination network",
        "The lower metric value associated with the destination network",
        "The higher gateway IP address to get to the destination network",
        "The lower gateway IP address to get to the destination network"
      ],
      answer: 1
    },
    {
      q: "What is a basic characteristic of the IP protocol?",
      options: ["Connectionless","Reliable end-to-end delivery","User data segmentation","Media dependent"],
      answer: 0
    },
    {
      q: "Which statement describes a feature of the IP protocol?",
      options: [
        "IP relies on upper layer services to handle situations of missing or out-of-order packets",
        "IP encapsulation is modified based on network media",
        "IP relies on Layer 2 protocols for transmission error control",
        "MAC addresses are used during the IP packet encapsulation"
      ],
      answer: 0
    },
    {
      q: "Which field in the IPv4 header is used to prevent a packet from traversing a network endlessly?",
      options: ["Sequence Number","Differentiated Services","Time-to-Live","Acknowledgment Number"],
      answer: 2
    },
    {
      q: "What IPv4 header field identifies the upper layer protocol carried in the packet?",
      options: ["Version","Protocol","Identification","Differentiated Services"],
      answer: 1
    },
    {
      q: "Which characteristic describes an IPv6 enhancement over IPv4?",
      options: [
        "IPv6 addresses are based on 128-bit flat addressing as opposed to IPv4 which is based on 32-bit hierarchical addressing",
        "The IPv6 header is simpler than the IPv4 header is, which improves packet handling",
        "The IPv6 address space is four times bigger than the IPv4 address space",
        "Both IPv4 and IPv6 support authentication, but only IPv6 supports privacy capabilities"
      ],
      answer: 1
    },
    {
      q: "What was the reason for the creation and implementation of IPv6?",
      options: [
        "To make reading a 32-bit address easier",
        "To allow NAT support for private addressing",
        "To provide more address space in the Internet Names Registry",
        "To relieve IPv4 address depletion"
      ],
      answer: 3
    },
    {
      q: "What is one advantage that the IPv6 simplified header offers over IPv4?",
      options: [
        "Little requirement for processing checksums",
        "Smaller-sized header",
        "Efficient packet handling",
        "Smaller-sized source and destination IP addresses"
      ],
      answer: 2
    },
    {
      q: "Why is NAT not needed in IPv6?",
      options: [
        "Because IPv6 has integrated security, there is no need to hide the IPv6 addresses of internal networks",
        "The problems induced by NAT are solved because the IPv6 header improves packet handling by intermediate routers",
        "The end-to-end connectivity problems caused by NAT are solved because the number of routes increases",
        "Any host or user can get a public IPv6 network address because the number of available IPv6 addresses is extremely large"
      ],
      answer: 3
    },
    {
      q: "What is one function of the ARP protocol?",
      options: [
        "Resolving an IPv4 address to a MAC address",
        "Obtaining an IPv4 address automatically",
        "Mapping a domain name to its IP address",
        "Maintaining a table of domain names with their resolved IP addresses"
      ],
      answer: 0
    },
    {
      q: "What is the purpose of ARP in an IPv4 network?",
      options: [
        "To forward data onward based on the destination IP address",
        "To build the MAC address table in a switch from the information that is gathered",
        "To forward data onward based on the destination MAC address",
        "To obtain a specific MAC address when an IP address is known"
      ],
      answer: 3
    },
    {
      q: "Which destination address is used in an ARP request frame?",
      options: ["AAAA.AAAA.AAAA","255.255.255.255","0.0.0.0","FFFF.FFFF.FFFF"],
      answer: 3
    },
    {
      q: "What statement describes the function of the Address Resolution Protocol?",
      options: [
        "ARP is used to discover the MAC address of any host on the local network",
        "ARP is used to discover the IP address of any host on the local network",
        "ARP is used to discover the MAC address of any host on a different network",
        "ARP is used to discover the IP address of any host on a different network"
      ],
      answer: 0
    },
    {
      q: "Which characteristic describes the default gateway of a host computer?",
      options: [
        "The physical address of the router interface on the same network as the host computer",
        "The physical address of the switch interface connected to the host computer",
        "The logical address of the router interface on the same network as the host computer",
        "The logical address assigned to the switch interface connected to the router"
      ],
      answer: 2
    },
    {
      q: "A computer has to send a packet to a destination host in the same LAN. How will the packet be sent?",
      options: [
        "The packet will first be sent to the default gateway, and then from the default gateway it will be sent directly to the destination host",
        "The packet will be sent only to the default gateway",
        "The packet will be sent directly to the destination host",
        "The packet will be sent to the default gateway first, and then depending on the response from the gateway, it may be sent to the destination host"
      ],
      answer: 2
    }
  ],
  16: [
    {
      q: "Which malicious code attack is self-contained and tries to exploit a specific vulnerability in a system being attacked?",
      options: ["Worm","Virus","Trojan horse","Social engineering"],
      answer: 0
    },
    {
      q: "What is the difference between a virus and a worm?",
      options: [
        "Worms require a host file but viruses do not",
        "Viruses self-replicate but worms do not",
        "Worms self-replicate but viruses do not",
        "Viruses hide in legitimate programs but worms do not"
      ],
      answer: 2
    },
    {
      q: "Which example of malicious code would be classified as a Trojan horse?",
      options: [
        "Malware that can automatically spread from one system to another by exploiting a vulnerability in the target",
        "Malware that was written to look like a video game",
        "Malware that attaches itself to a legitimate program and spreads to other programs when launched",
        "Malware that requires manual user intervention to spread between systems"
      ],
      answer: 1
    },
    {
      q: "Which type of attack involves an adversary attempting to gather information about a network to identify vulnerabilities?",
      options: ["Man-in-the-middle","Reconnaissance","DoS","Dictionary"],
      answer: 1
    },
    {
      q: "Which attack involves a compromise of data that occurs between two end points?",
      options: ["Denial-of-service","Extraction of security parameters","Man-in-the-middle attack","Username enumeration"],
      answer: 2
    },
    {
      q: "Which firewall feature is used to ensure that packets coming into a network are legitimate responses to requests initiated from internal hosts?",
      options: ["URL filtering","Stateful packet inspection","Packet filtering","Application filtering"],
      answer: 1
    },
    {
      q: "What is the advantage of using SSH over Telnet?",
      options: [
        "SSH provides secure communications to access hosts",
        "SSH operates faster than Telnet",
        "SSH is easier to use",
        "SSH supports authentication for a connection request"
      ],
      answer: 0
    },
    {
      q: "What feature of SSH makes it more secure than Telnet for a device management connection?",
      options: [
        "Login information and data encryption",
        "Random one-time port connection",
        "Confidentiality with IPsec",
        "Stronger password requirement"
      ],
      answer: 0
    },
    {
      q: "Which three services are provided by the AAA framework? (Choose three)",
      options: ["Automation","Authorization","Autobalancing","Autoconfiguration","Accounting","Authentication"],
      answer: [1, 4, 5],
      multi: true
    },
    {
      q: "What is the purpose of the network security accounting function?",
      options: [
        "To keep track of the actions of a user",
        "To require users to prove who they are",
        "To provide challenge and response questions",
        "To determine which resources a user can access"
      ],
      answer: 0
    },
    {
      q: "What is considered the most effective way to mitigate a worm attack?",
      options: [
        "Change system passwords every 30 days",
        "Ensure that AAA is configured in the network",
        "Ensure that all systems have the most current virus definitions",
        "Download security updates from the operating system vendor and patch all vulnerable systems"
      ],
      answer: 3
    },
    {
      q: "What does the term vulnerability mean?",
      options: [
        "A potential threat that a hacker creates",
        "A computer that contains sensitive information",
        "A weakness that makes a target susceptible to an attack",
        "A known target or victim machine"
      ],
      answer: 2
    },
    {
      q: "What is the objective of a network reconnaissance attack?",
      options: [
        "Disabling network systems or services",
        "Unauthorized manipulation of data",
        "Discovery and mapping of systems",
        "Denying access to resources by legitimate users"
      ],
      answer: 2
    },
    {
      q: "What is an accurate description of redundancy?",
      options: [
        "Configuring a switch with proper security to ensure that all traffic forwarded through an interface is filtered",
        "Designing a network to use multiple virtual devices to ensure that all traffic uses the best path through the internetwork",
        "Designing a network to use multiple paths between switches to ensure there is no single point of failure",
        "Configuring a router with a complete MAC address database to ensure that all frames can be forwarded to the correct destination"
      ],
      answer: 2
    },
    {
      q: "Which three configuration steps must be performed to implement SSH access to a router? (Choose three)",
      options: [
        "A unique hostname",
        "A user account",
        "An IP domain name",
        "An encrypted password",
        "A password on the console line",
        "An enable mode password"
      ],
      answer: [0, 1, 2],
      multi: true
    }
  ]
};

const PREDICTED_QUESTIONS = [
  {
    module: 1,
    q: "What is the main difference between a LAN and a WAN?",
    options: [
      "A LAN is always wireless; a WAN uses only wired connections",
      "A LAN spans a small geographical area; a WAN spans a large geographical area",
      "A LAN is owned by an ISP; a WAN is privately owned",
      "A LAN uses IP addressing; a WAN uses MAC addressing"
    ],
    answer: 1,
    explanation: "LAN (Local Area Network) covers a small area like a home or office. WAN (Wide Area Network) spans large geographic areas, often connecting multiple LANs."
  },
  {
    module: 1,
    q: "Which type of connection uses the telephone network to provide internet access to home users?",
    options: ["Cable","DSL","Fiber","Satellite"],
    answer: 1,
    explanation: "DSL (Digital Subscriber Line) uses existing telephone lines to deliver internet access. Cable uses cable TV infrastructure, fiber uses optical cables."
  },
  {
    module: 2,
    q: "Which IOS command mode provides access to all device commands including configuration, management, and troubleshooting?",
    options: ["User EXEC mode","Interface configuration mode","Global configuration mode","Privileged EXEC mode"],
    answer: 3,
    explanation: "Privileged EXEC mode (prompt: #) provides full access to all IOS commands. User EXEC mode (prompt: >) only allows limited monitoring commands."
  },
  {
    module: 2,
    q: "What command saves the running configuration to NVRAM so it persists after a reload?",
    options: [
      "copy startup-config running-config",
      "copy running-config startup-config",
      "write erase",
      "copy running-config flash"
    ],
    answer: 1,
    explanation: "The 'copy running-config startup-config' command saves the current running configuration (in RAM) to NVRAM so it survives a reboot."
  },
  {
    module: 3,
    q: "Which OSI layer is responsible for end-to-end communication and segmentation of data?",
    options: ["Network layer (Layer 3)","Data Link layer (Layer 2)","Transport layer (Layer 4)","Session layer (Layer 5)"],
    answer: 2,
    explanation: "The Transport layer (Layer 4) handles end-to-end communication, segmentation, flow control, and error recovery between hosts."
  },
  {
    module: 3,
    q: "In the TCP/IP model, which layer corresponds to BOTH the Physical and Data Link layers of the OSI model?",
    options: ["Internet layer","Transport layer","Application layer","Network Access layer"],
    answer: 3,
    explanation: "The Network Access (Link) layer in TCP/IP combines the functionality of OSI's Physical (Layer 1) and Data Link (Layer 2) layers."
  },
  {
    module: 4,
    q: "Which type of UTP cable is used to connect a PC to a switch port?",
    options: ["Crossover cable","Rollover cable","Straight-through cable","Coaxial cable"],
    answer: 2,
    explanation: "Straight-through cables connect unlike devices (PC to switch, switch to router). Crossover cables connect like devices (PC to PC, switch to switch — although auto-MDIX makes this less critical)."
  },
  {
    module: 4,
    q: "What is the maximum distance for a standard Cat5e UTP cable segment without a repeater?",
    options: ["50 meters","100 meters","200 meters","500 meters"],
    answer: 1,
    explanation: "The IEEE standard for UTP Ethernet specifies a maximum segment length of 100 meters (328 feet) before signal attenuation becomes problematic."
  },
  {
    module: 6,
    q: "At which OSI layer does a switch make forwarding decisions?",
    options: ["Layer 1 – Physical","Layer 2 – Data Link","Layer 3 – Network","Layer 4 – Transport"],
    answer: 1,
    explanation: "Switches are Layer 2 devices that make forwarding decisions based on MAC addresses contained in the data link frame header."
  },
  {
    module: 6,
    q: "A switch receives a frame with a destination MAC address not found in its MAC table. What does the switch do?",
    options: [
      "Drops the frame silently",
      "Sends an error message to the source",
      "Floods the frame out all ports except the ingress port",
      "Forwards it to the default gateway"
    ],
    answer: 2,
    explanation: "When a switch does not know the destination MAC address (unknown unicast), it floods the frame out all ports except the one on which it was received."
  },
  {
    module: 8,
    q: "Which field in the IPv4 packet header is decremented by each router that processes the packet?",
    options: ["Version","Protocol","Time-to-Live (TTL)","Header Checksum"],
    answer: 2,
    explanation: "The TTL field is decremented by 1 at each router hop. When TTL reaches 0, the packet is discarded to prevent infinite routing loops."
  },
  {
    module: 8,
    q: "What happens when a host needs to communicate with another host on a remote network?",
    options: [
      "It sends the packet directly to the destination host",
      "It sends the packet to the default gateway with the destination IP address",
      "It broadcasts to find the destination MAC address across the internet",
      "It uses ARP to find the remote host's MAC address"
    ],
    answer: 1,
    explanation: "For remote network communication, a host sends the packet to its default gateway (router). The destination IP stays the remote host, but the frame has the router's MAC as destination."
  },
  {
    module: 16,
    q: "Which type of network attack sends an extremely large number of requests to an internet server to make it unavailable to normal users?",
    options: ["Reconnaissance attack","Access attack","Denial of Service (DoS) attack","Man-in-the-middle attack"],
    answer: 2,
    explanation: "A DoS attack overwhelms a target system with traffic to make it unavailable to legitimate users. A DDoS attack uses multiple compromised systems to amplify this effect."
  },
  {
    module: 16,
    q: "What is the purpose of configuring 'login block-for 60 attempts 5 within 30' on a Cisco router?",
    options: [
      "Block login for 5 seconds after 60 failed attempts within 30 seconds",
      "Block login for 30 seconds after 5 failed attempts within 60 seconds",
      "Block login for 60 seconds after 5 failed attempts within 30 seconds",
      "Block login for 30 seconds after 60 failed attempts within 5 seconds"
    ],
    answer: 2,
    explanation: "Syntax: login block-for [seconds] attempts [number] within [seconds]. So 'block-for 60 attempts 5 within 30' blocks for 60 seconds after 5 failed attempts within 30 seconds."
  }
];
