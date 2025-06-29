# System Security Context Vector (SSCV) Framework
## Version 1.0 Specification

### Executive Summary

The System Security Context Vector (SSCV) is a standardized method for describing the security posture and context of computing systems. When combined with CVSS (Common Vulnerability Scoring System) scores, SSCV enables organizations to calculate contextual risk scores that reflect the actual risk a vulnerability poses to a specific system, while ensuring that no vulnerability is ever reduced to zero risk.

SSCV is designed to be flexible and grow with your organization. All components support an 'X' (Not Evaluated) option, allowing you to start with components you can readily assess and add others as your security maturity evolves.

## 1. Introduction

### 1.1 Purpose

While CVSS provides a standardized way to assess vulnerability severity in isolation, it lacks context about the target system. A CVSS 10.0 vulnerability may pose reduced risk to an air-gapped, fully patched system with no sensitive data, while a CVSS 6.0 vulnerability could be critical on an internet-facing, legacy system processing payment data.

SSCV bridges this gap by providing a compact, standardized notation for system security context while maintaining the principle that no system is ever completely risk-free.

### 1.2 Vector Format

SSCV uses a format similar to CVSS for familiarity and ease of parsing:

```
SSCV:1.0/OS:C/NE:I/AC:F/EP:A/DL:M/BC:H/PS:C/UM:A/SC:M/ST:N/PH:H/AV:H
```

### 1.3 Flexible Adoption

Organizations can begin using SSCV with only the components they can assess today. Any component marked as 'X' is automatically excluded from risk calculations, allowing incremental adoption as security programs mature.

## 2. SSCV Components

### 2.1 OS - Operating System Currency

Measures how current and supported the operating system is.

| Value | Name | Description | Risk Weight |
|-------|------|-------------|-------------|
| L | Legacy | EOL/Unsupported OS (e.g., Windows XP, CentOS 6) | 3.0 |
| O | Old | Supported but 2+ major versions behind | 2.0 |
| C | Current | Latest stable version or one version behind | 1.0 |
| H | Hardened | Security-focused variant (e.g., SELinux enforcing, Windows Server Core) | 0.8 |
| X | Not Evaluated | This component was not included in the assessment | N/A |

Note: Even hardened systems retain 0.8 weight as hardening reduces but cannot eliminate all OS-level vulnerabilities.

### 2.2 NE - Network Exposure

Describes the system's network accessibility.

| Value | Name | Description | Risk Weight |
|-------|------|-------------|-------------|
| A | Air-gapped | No network connectivity | 0.3 |
| I | Internal | Internal network only, no direct internet routes | 1.0 |
| P | Perimeter | DMZ or controlled external access (behind WAF/proxy) | 2.0 |
| E | External | Direct internet exposure | 3.0 |
| X | Not Evaluated | This component was not included in the assessment | N/A |

Note: Air-gapped systems retain 0.3 weight because air gaps can be bridged through physical access, supply chain attacks, or insider threats.

### 2.3 AC - Access Control

Indicates the authentication and authorization mechanisms.

| Value | Name | Description | Risk Weight |
|-------|------|-------------|-------------|
| N | None | No authentication required | 3.0 |
| O | Operational | No auth by design for safety/operational requirements | 2.5 |
| B | Basic | Single-factor authentication | 2.0 |
| F | Full | MFA + role-based access control | 1.0 |
| Z | Zero-trust | Continuous verification, micro-segmentation | 0.7 |
| X | Not Evaluated | This component was not included in the assessment | N/A |

Note: "Operational" (O) recognizes systems where authentication could compromise safety (e.g., emergency stops) but distinguishes from poor security practices. Zero-trust architectures retain 0.7 weight as they reduce but cannot eliminate risks from sophisticated attacks or insider threats.

### 2.4 EP - Endpoint Protection

Describes the level of endpoint security tooling.

| Value | Name | Description | Risk Weight |
|-------|------|-------------|-------------|
| N | None | No AV/EDR solution | 3.0 |
| B | Basic | Traditional signature-based AV | 2.0 |
| A | Advanced | Modern EDR/XDR with behavioral analysis | 1.0 |
| M | Managed | 24/7 SOC monitoring with active threat hunting | 0.8 |
| X | Not Evaluated | This component was not included in the assessment | N/A |

Note: Even 24/7 managed protection retains 0.8 weight due to dwell time and zero-day vulnerabilities.

### 2.5 DL - Data Sensitivity Level

Classifies the sensitivity of data processed/stored.

| Value | Name | Description | Risk Weight |
|-------|------|-------------|-------------|
| P | Public | No sensitive data | 0.6 |
| I | Internal | Business confidential | 1.5 |
| M | Mixed | Contains PII/PHI/PCI data | 2.5 |
| C | Critical | State secrets, critical infrastructure, financial systems | 3.0 |
| X | Not Evaluated | This component was not included in the assessment | N/A |

Note: Public data retains 0.6 weight because integrity and availability concerns still apply.

### 2.6 BC - Business Criticality

Indicates the business impact if the system is compromised.

| Value | Name | Description | Risk Weight |
|-------|------|-------------|-------------|
| L | Low | Minimal business impact | 0.6 |
| M | Medium | Department or team-level impact | 1.5 |
| H | High | Organization-wide impact | 2.5 |
| C | Critical | Business survival/regulatory compliance depends on it | 3.0 |
| X | Not Evaluated | This component was not included in the assessment | N/A |

Note: Even "low" criticality systems retain 0.6 weight as they can be pivots for lateral movement.

### 2.7 PS - Patch Status

Reflects how current the system's patches are.

| Value | Name | Description | Risk Weight |
|-------|------|-------------|-------------|
| C | Current | Fully patched (< 30 days) | 1.0 |
| D | Delayed | 30-90 days behind | 1.5 |
| B | Behind | > 90 days behind | 2.5 |
| U | Unknown | Patch status unclear | 3.0 |
| X | Not Evaluated | This component was not included in the assessment | N/A |

### 2.8 UM - Update Mechanism

Describes how the system receives updates.

| Value | Name | Description | Risk Weight |
|-------|------|-------------|-------------|
| A | Automatic | Auto-updates enabled | 1.0 |
| S | Scheduled | Regular maintenance windows | 1.5 |
| M | Manual | Ad-hoc updates only | 2.0 |
| N | None | Cannot be updated (embedded/legacy) | 3.0 |
| X | Not Evaluated | This component was not included in the assessment | N/A |

### 2.9 SC - Supply Chain Security

Measures the integrity and security of the system's software and hardware supply chain.

| Value | Name | Description | Risk Weight |
|-------|------|-------------|-------------|
| V | Verified | Uses signed, verifiable SBOM; all components from trusted vendors; secure build pipeline | 0.8 |
| M | Managed | SBOM maintained; components from reputable sources; standard CI/CD security | 1.5 |
| U | Unmanaged | No SBOM; dependencies not tracked; component origins unknown | 2.5 |
| K | Known Issues | Known to use vulnerable dependencies or malicious sources | 3.0 |
| X | Not Evaluated | Supply chain security was not included in the assessment | N/A |

**Note: Supply chain assessment can be complex and requires mature tooling. Organizations should use 'X' (Not Evaluated) for this component if they're not ready to assess supply chain security. The framework will automatically exclude it from calculations, allowing you to benefit from SSCV while building supply chain visibility over time.**

Even verified supply chains retain 0.8 weight due to the possibility of sophisticated supply chain compromises.

### 2.10 ST - Safety Requirements

Measures the impact of security controls on operational safety.

| Value | Name | Description | Risk Weight |
|-------|------|-------------|-------------|
| N | None | No safety implications | 1.0 |
| L | Low | Minor safety considerations | 1.2 |
| M | Moderate | Some safety-security trade-offs required | 1.5 |
| C | Critical | Security controls could compromise life safety | 2.0 |
| X | Not Evaluated | Safety requirements were not assessed | N/A |

Note: Higher weights reflect that safety-critical systems may require accepting higher cyber risk to maintain physical safety.

### 2.11 PH - Physical Security

Describes the physical access controls protecting the system.

| Value | Name | Description | Risk Weight |
|-------|------|-------------|-------------|
| N | None | No physical security controls | 3.0 |
| B | Basic | Locked doors, basic access control | 2.0 |
| H | High | Multi-factor physical access, monitored facilities | 1.0 |
| F | Fortress | Secured facility with armed guards, extensive monitoring | 0.7 |
| X | Not Evaluated | Physical security was not assessed | N/A |

### 2.12 AV - Availability Requirements

Indicates the system's uptime requirements and tolerance for downtime.

| Value | Name | Description | Risk Weight |
|-------|------|-------------|-------------|
| B | Basic | Standard business hours, planned downtime acceptable | 1.0 |
| S | Standard | 99%+ uptime, scheduled maintenance windows available | 1.2 |
| H | High | 99.9%+ uptime, limited maintenance windows | 1.5 |
| C | Critical | 99.99%+ uptime, mission-critical, minimal downtime tolerance | 2.0 |
| X | Not Evaluated | Availability requirements were not assessed | N/A |

Note: Higher weights reflect that strict availability requirements limit patching windows and may require accepting security risks to maintain uptime commitments.

## 3. Calculating Contextual Risk Score

### 3.1 Core Formula

The Contextual Risk Score (CRS) uses a hybrid approach that ensures meaningful minimum risk levels:

**Important Notes:**
- Components marked as 'X' (Not Evaluated) are excluded from calculations
- This allows organizations to start with partial assessments and improve over time

```
Step 1: Calculate component groups
- Security_Average = Average of evaluated: OS, AC, EP, PS, UM, SC
- Exposure_Factor = (NE × DL × BC) / 27
- Operational_Average = Average of evaluated: ST, PH, AV

Step 2: Apply reality adjustment
- If operational components (ST, PH, AV) are evaluated:
    Adjusted_Score = CVSS_Base × 0.7 × Security_Average × Exposure_Factor × Operational_Average
- Else:
    Adjusted_Score = CVSS_Base × 0.7 × Security_Average × Exposure_Factor

Step 3: Apply minimum threshold
- Minimum_Score = CVSS_Base × 0.2

Step 4: Calculate final CRS
- Combined_Factor = Security_Average × Exposure_Factor × Operational_Average (if applicable)
- If Combined_Factor ≤ 1:
    CRS = max(Adjusted_Score, Minimum_Score)
- If Combined_Factor > 1:
    CRS = min(Raw_Score, CVSS_Base × 2)
```

- The 0.7 factor represents that best-case security can reduce risk by maximum 70%
- The 0.2 minimum ensures no vulnerability drops below 20% of its CVSS score
- Maximum amplification is capped at 2× the original CVSS score

### 3.2 Rationale for Minimum Thresholds

The framework enforces minimum risk scores because:

1. **No Perfect Security**: Even the most secure systems can be compromised through zero-days, supply chain attacks, or insider threats
2. **Defense in Depth**: Security measures reduce but never eliminate risk
3. **Unknown Unknowns**: New attack vectors constantly emerge
4. **Practical Experience**: Historical data shows that "secure" systems still get breached

### 3.3 Modified Threshold Notation

When organizations choose to use a minimum threshold other than the standard 20%, the resulting CRS must be marked with a tilde (~) suffix:

- **Standard calculation (20% minimum)**: `5.2`
- **Modified threshold**: `5.2~`

This notation ensures transparency when scores are shared. The SSCV vector string remains unchanged - only the final CRS score receives the tilde suffix. Organizations using modified thresholds should document their chosen percentage for audit and compliance purposes.

Examples:

- `CRS: 3.4` - Standard SSCV calculation with 20% minimum
- `CRS: 3.4~` - Modified calculation (could be 0%, 30%, or any non-standard threshold)
- `CRS: 0.8~` - Likely using 0% threshold (raw calculation)

### 3.4 Severity Mapping

| CRS Range | Severity | Action Required |
|-----------|----------|-----------------|
| 0.0 - 3.9 | Low | Patch during normal maintenance |
| 4.0 - 6.9 | Medium | Patch within 30 days |
| 7.0 - 8.9 | High | Patch within 7 days |
| 9.0 - 10.0 | Critical | Immediate action required |

## 4. Examples

### Example 1: Internet-Facing Web Server

**System**: Public e-commerce web server  
**SSCV**: `SSCV:1.0/OS:C/NE:E/AC:F/EP:A/DL:M/BC:H/PS:C/UM:A/SC:M`  
**Vulnerability**: Apache Struts RCE (CVE-2017-5638)  
**CVSS**: 10.0

**Calculation**:
- Security_Average = (1.0 + 1.0 + 1.0 + 1.0 + 1.0 + 1.5) / 6 = 1.08
- Exposure_Factor = (3.0 × 2.5 × 2.5) / 27 = 0.694
- Combined Factor = 1.08 × 0.694 = 0.75
- Since combined factor ≤ 1:
  - Adjusted_Score = 10.0 × 0.7 × 0.75 = 5.25
  - Minimum_Score = 10.0 × 0.2 = 2.0
  - CRS = max(5.25, 2.0) = **5.25 (Medium)**

Note: In this case, the adjusted score exceeds the 20% minimum threshold, so the final score would be the same whether using standard or modified thresholds.

### Example 2: Healthcare Database Server

**System**: Hospital patient records database  
**SSCV**: `SSCV:1.0/OS:H/NE:I/AC:Z/EP:M/DL:C/BC:C/PS:C/UM:A/SC:V/ST:N/PH:H/AV:H`  
**Vulnerability**: Privilege escalation vulnerability  
**CVSS**: 7.8

**Calculation**:
- Security_Average = (0.8 + 0.7 + 0.8 + 1.0 + 1.0 + 0.8) / 6 = 0.85
- Exposure_Factor = (1.0 × 3.0 × 3.0) / 27 = 0.333
- Operational_Average = (1.0 + 1.0 + 1.5) / 3 = 1.17
- Combined_Factor = 0.85 × 0.333 × 1.17 = 0.331
- Since combined factor ≤ 1:
  - Adjusted_Score = 7.8 × 0.7 × 0.331 = 1.81
  - Minimum_Score = 7.8 × 0.2 = 1.56
  - CRS = max(1.81, 1.56) = **1.81 (Low)**

Note: Excellent security posture significantly reduces risk, but minimum threshold ensures continued vigilance. If an organization used 0% threshold, the score would be **1.81~** indicating raw calculation.

### Example 3: Legacy Financial System

**System**: Core banking transaction processor  
**SSCV**: `SSCV:1.0/OS:L/NE:I/AC:B/EP:B/DL:C/BC:C/PS:B/UM:M/SC:U/ST:N/PH:H/AV:C`  
**Vulnerability**: Remote code execution  
**CVSS**: 8.8

**Calculation**:
- Security_Average = (3.0 + 2.0 + 2.0 + 2.5 + 2.0 + 2.5) / 6 = 2.33
- Exposure_Factor = (1.0 × 3.0 × 3.0) / 27 = 0.333
- Operational_Average = (1.0 + 1.0 + 2.0) / 3 = 1.33
- Combined_Factor = 2.33 × 0.333 × 1.33 = 1.03
- Since combined factor > 1:
  - Raw_Score = 8.8 × 1.03 = 9.06
  - CRS = min(9.06, 8.8 × 2) = **9.06 (Critical)**

Note: Poor security combined with critical data amplifies risk above original CVSS score.

### Example 4: Getting Started Without Complete Assessment

**System**: Internal database server (some components not yet assessed)  
**SSCV**: `SSCV:1.0/OS:C/NE:I/AC:F/EP:A/DL:M/BC:H/PS:C/UM:A/SC:X/ST:X/PH:X/AV:X`  
**Vulnerability**: SQL injection vulnerability  
**CVSS**: 8.1

**Calculation**:
- Security_Average = (1.0 + 1.0 + 1.0 + 1.0 + 1.0) / 5 = 1.0 (SC excluded)
- Exposure_Factor = (1.0 × 2.5 × 2.5) / 27 = 0.231
- Combined Factor = 1.0 × 0.231 = 0.231 (Operational components excluded)
- Since combined factor ≤ 1:
  - Adjusted_Score = 8.1 × 0.7 × 0.231 = 1.31
  - Minimum_Score = 8.1 × 0.2 = 1.62
  - CRS = max(1.31, 1.62) = **1.62 (Low)**

This example shows how organizations can use SSCV effectively even without assessing all components. The score would be **1.31~** if using 0% threshold instead of the standard 20%.

### Example 5: Critical Infrastructure Control System

**System**: Power grid monitoring system  
**SSCV**: `SSCV:1.0/OS:C/NE:I/AC:F/EP:A/DL:C/BC:C/PS:C/UM:S/SC:M/ST:C/PH:F/AV:C`  
**Vulnerability**: Buffer overflow in monitoring service  
**CVSS**: 7.3

**Calculation**:
- Security_Average = (1.0 + 1.0 + 1.0 + 1.0 + 1.5 + 1.5) / 6 = 1.17
- Exposure_Factor = (1.0 × 3.0 × 3.0) / 27 = 0.333
- Operational_Average = (2.0 + 0.7 + 2.0) / 3 = 1.57
- Combined_Factor = 1.17 × 0.333 × 1.57 = 0.612
- Since combined factor ≤ 1:
  - Adjusted_Score = 7.3 × 0.7 × 0.612 = 3.13
  - Minimum_Score = 7.3 × 0.2 = 1.46
  - CRS = max(3.13, 1.46) = **3.13 (Low)**

Note: Strong security controls and physical protection appropriately reduce risk while safety requirements are acknowledged.

## 5. Implementation Guidelines

### 5.1 Getting Started

1. **Start Simple**: Begin with components you can easily assess (OS, NE, PS)
2. **Use 'X' Liberally**: Mark components as 'X' if you lack data or tooling
3. **Iterate**: Add more components as your security program matures
4. **Document**: Record which components are evaluated and why others aren't

Example minimal viable SSCV:
```
SSCV:1.0/OS:C/NE:I/AC:F/EP:X/DL:M/BC:H/PS:C/UM:A/SC:X/ST:X/PH:X/AV:X
```

### 5.2 When to Override CRS

- If CRS differs from CVSS severity by 2+ levels, use CRS
- If CRS and CVSS differ by 1 level, consider additional factors:
  - Active exploitation in the wild
  - Availability of exploit code
  - Specific threat intelligence
  - Compensating controls not captured in SSCV
  - Safety requirements that conflict with security recommendations

#### Modified Threshold Guidelines

Organizations may adjust the 20% minimum threshold in specific circumstances:

- **0% threshold** (marked with ~): For academic analysis or understanding raw risk calculations
- **Higher thresholds** (25-50%, marked with ~): For highly regulated industries or conservative risk appetites
- **Always document**: Record the threshold used and business justification

Remember: The standard 20% threshold reflects security industry consensus that no system is ever completely secure. Deviations should be intentional and documented.

### 5.3 Key Principles

1. **No Zero Risk**: Even the best security configuration maintains minimum 20% risk
2. **Modified Thresholds**: Organizations may adjust the minimum threshold but must mark scores with ~ suffix
3. **Proportional Response**: CRS guides but doesn't replace security judgment
4. **Regular Updates**: Reassess SSCV vectors quarterly
5. **Progressive Enhancement**: Add components as capabilities grow

### 5.4 Integration Points

1. **Vulnerability Scanning**: Enrich scan results with SSCV data
2. **Patch Management**: Sort patches by CRS instead of raw CVSS
3. **Risk Assessments**: Include SSCV in system risk profiles
4. **Compliance**: Document SSCV as part of risk-based patching justification
5. **Asset Management**: Store SSCV vectors with system inventory

## 6. Quick Reference

### 6.1 Component Summary

| Component | Values | Best → Worst | Min Weight |
|-----------|--------|--------------|------------|
| OS | H C O L | 0.8 → 3.0 | 0.8 |
| NE | A I P E | 0.3 → 3.0 | 0.3 |
| AC | Z F B O N | 0.7 → 3.0 | 0.7 |
| EP | M A B N | 0.8 → 3.0 | 0.8 |
| DL | P I M C | 0.6 → 3.0 | 0.6 |
| BC | L M H C | 0.6 → 3.0 | 0.6 |
| PS | C D B U | 1.0 → 3.0 | 1.0 |
| UM | A S M N | 1.0 → 3.0 | 1.0 |
| SC | V M U K | 0.8 → 3.0 | 0.8 |
| ST | N L M C | 1.0 → 2.0 | 1.0 |
| PH | F H B N | 0.7 → 3.0 | 0.7 |
| AV | B S H C | 1.0 → 2.0 | 1.0 |

### 6.2 Score Notation

- **Standard CRS**: `5.2` (using 20% minimum threshold)
- **Modified CRS**: `5.2~` (using non-standard threshold)

### 6.3 Common System Profiles

**Standard IT Systems:**

- **Secure Cloud Workload**: `OS:C/NE:P/AC:F/EP:A/DL:I/BC:M/PS:C/UM:A/SC:V`
- **Legacy Database**: `OS:O/NE:I/AC:B/EP:B/DL:C/BC:C/PS:D/UM:S/SC:U`
- **DMZ Web Server**: `OS:H/NE:P/AC:F/EP:M/DL:M/BC:H/PS:C/UM:A/SC:M`
- **Developer Workstation**: `OS:C/NE:E/AC:F/EP:A/DL:I/BC:L/PS:D/UM:A/SC:X`

**Industrial & Mission-Critical Systems:**

- **Legacy Manufacturing**: `OS:L/NE:A/AC:O/EP:N/DL:I/BC:C/PS:U/UM:N/SC:U/ST:C/PH:H/AV:C`
- **Modern Water Treatment**: `OS:C/NE:I/AC:F/EP:A/DL:C/BC:C/PS:C/UM:S/SC:M/ST:M/PH:H/AV:H`
- **Financial Trading System**: `OS:C/NE:E/AC:Z/EP:M/DL:C/BC:C/PS:C/UM:A/SC:V/ST:N/PH:H/AV:C`
- **Air Traffic Control**: `OS:H/NE:I/AC:F/EP:A/DL:C/BC:C/PS:C/UM:S/SC:V/ST:C/PH:F/AV:C`
- **Medical Device**: `OS:L/NE:I/AC:N/EP:N/DL:C/BC:C/PS:U/UM:N/SC:U/ST:C/PH:H/AV:C`

## 7. Conclusion

SSCV provides a practical framework for contextualizing vulnerability risk while maintaining the fundamental security principle that no system is ever completely secure. By enforcing minimum risk thresholds and realistic weight ranges, SSCV helps organizations make better patching decisions without creating a false sense of security.

The framework acknowledges that:

- Security measures reduce but never eliminate risk
- Context matters enormously in real-world risk
- Perfect security is an impossible goal
- Risk-based prioritization must be both practical and defensible
- Security maturity is a journey, not a destination

Organizations implementing SSCV should remember it's a tool for prioritization, not a replacement for comprehensive security practices and defense-in-depth strategies. Start with what you can assess today, and expand your use of SSCV as your security program matures.

## License

This project is licensed under the Apache License 2.0.

Copyright 2025 Invenity Labs, LLC.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at:

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

## Contributing

We welcome contributions to the SSCV framework! Whether you're interested in:

- Reporting bugs or requesting features
- Improving documentation or translations
- Enhancing the web calculator
- Sharing implementation use cases
- Contributing code improvements

Please see our [CONTRIBUTING.md](CONTRIBUTING.md) file for detailed guidelines on how to contribute, including:

- Development setup instructions
- Code style guidelines
- Testing requirements
- Submission process
- Recognition for contributors

For questions or discussions, please open an issue or use GitHub discussions. We're here to help you contribute successfully to SSCV!

## Version History

- v1.0 - Initial release