# System Security Context Vector (SSCV)

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Version](https://img.shields.io/badge/version-1.0-blue.svg)](https://github.com/yourusername/sscv/releases)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)

## Transform CVSS scores into real-world risk

SSCV is an open framework that adds critical context to vulnerability scoring. While CVSS tells you how bad a vulnerability *could* be, SSCV tells you how bad it *actually is* for your specific systems.

### 🎯 Why SSCV?

A CVSS 10.0 on an air-gapped, fully-patched system with no sensitive data is very different from a CVSS 6.0 on an internet-facing, unpatched server processing credit cards. SSCV captures this context.

**Key Features:**
- 📊 Contextual risk scoring that reflects your actual security posture
- 🔧 Flexible adoption - start with what you can assess today
- 🛡️ Never reduces risk to zero (because perfect security doesn't exist)
- 📈 Grows with your security maturity
- 🧮 Simple, transparent calculations

### 🚀 Quick Start

```
SSCV:1.0/OS:C/NE:I/AC:F/EP:A/DL:M/BC:H/PS:C/UM:A/SC:X
```

This vector describes a current OS, internal network system with full access controls, advanced endpoint protection, containing mixed sensitive data, high business criticality, current patches, automatic updates, and unevaluated supply chain.

**Calculate contextual risk:**
```
Contextual Risk Score = CVSS Score × SSCV Context
```

### 🛠️ Interactive Calculator

Try the [interactive calculator](./calculator/index.html) to experiment with SSCV scores and see real-time contextual risk calculations.

### 📊 Component Overview

SSCV evaluates 9 security dimensions:

| Component | Description | Range |
|-----------|-------------|-------|
| **OS** | Operating System Currency | Legacy → Hardened |
| **NE** | Network Exposure | External → Air-gapped |
| **AC** | Access Control | None → Zero-trust |
| **EP** | Endpoint Protection | None → Managed SOC |
| **DL** | Data Sensitivity | Public → Critical |
| **BC** | Business Criticality | Low → Critical |
| **PS** | Patch Status | Unknown → Current |
| **UM** | Update Mechanism | None → Automatic |
| **SC** | Supply Chain Security | Known Issues → Verified |

Use 'X' for any component you're not ready to assess - SSCV automatically adjusts calculations.

### 🎓 Example

**Scenario**: Apache Struts vulnerability (CVSS 10.0) on two different systems

**System A - Internet-facing web server:**
```
SSCV:1.0/OS:C/NE:E/AC:F/EP:A/DL:M/BC:H/PS:C/UM:A/SC:M
Contextual Risk Score: 5.25 (Medium)
```

**System B - Legacy internal system:**
```
SSCV:1.0/OS:L/NE:I/AC:B/EP:B/DL:C/BC:C/PS:B/UM:M/SC:U
Contextual Risk Score: 9.2 (Critical)
```

Same vulnerability, different real-world risk.

### 🤝 Use Cases

- **Vulnerability Prioritization**: Sort by actual risk, not theoretical severity
- **Compliance Reporting**: Document risk-based patching decisions
- **Security Metrics**: Track security posture improvements over time
- **Cyber Insurance**: Potential premium adjustments based on SSCV scores
- **M&A Due Diligence**: Assess security debt in acquisitions

See [examples/](./examples/) for detailed use cases and integration patterns.

### 🙋 FAQ

**Q: Do I need to assess all components?**  
A: No! Start with what you know. Use 'X' for components you can't assess yet.

**Q: Why can't I get to zero risk?**  
A: Because perfect security doesn't exist. Even the best defenses can be bypassed.

**Q: How often should I update SSCV scores?**  
A: Quarterly for most systems, or after significant changes.

### 🤗 Contributing

We welcome contributions! Whether it's:
- 🐛 Bug reports
- 💡 Feature ideas  
- 📝 Documentation improvements
- 🔧 Code contributions
- 🌍 Translations

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### 📜 License

SSCV is released under the [Apache License 2.0](LICENSE). Use it freely in commercial and open source projects.

---

**Remember**: Security is a journey, not a destination. SSCV helps you prioritize that journey based on your actual risk, not theoretical vulnerabilities.

Start small, iterate often, and improve continuously. 🚀