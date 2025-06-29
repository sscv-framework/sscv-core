# SSCV Example Calculations

This document provides detailed examples of SSCV calculations for different system configurations, including the latest SSCV v1.0 components and calculation methods.

## Example 1: Internet-Facing Web Server

**Scenario**: Apache Struts vulnerability (CVE-2017-5638) with CVSS 10.0 on a production web server.

**System Profile**:
- Current OS with regular patches
- Externally accessible
- Full access controls in place
- Advanced endpoint protection
- Processes mixed sensitive data
- High business criticality
- Current patch status
- Automatic updates enabled
- Managed supply chain
- No safety requirements
- High physical security
- High availability requirements

**SSCV String**:
```
SSCV:1.0/OS:C/NE:E/AC:F/EP:A/DL:M/BC:H/PS:C/UM:A/SC:M/ST:N/PH:H/AV:H
```

**Calculation Steps**:

1. **Security Average**:
   - Components: OS(1.0) + AC(1.0) + EP(1.0) + PS(1.0) + UM(1.0) + SC(1.5)
   - Average: (1.0 + 1.0 + 1.0 + 1.0 + 1.0 + 1.5) / 6 = 1.08

2. **Exposure Factor**:
   - NE(3.0) × DL(2.5) × BC(2.5) = 18.75
   - Normalized: 18.75 / 27.0 = 0.694

3. **Operational Average**:
   - Components: ST(1.0) + PH(1.0) + AV(1.5)
   - Average: (1.0 + 1.0 + 1.5) / 3 = 1.17

4. **Combined Factor**:
   - 1.08 × 0.694 × 1.17 = 0.877 (≤ 1, use minimum threshold formula)

5. **Contextual Risk Score**:
   - Adjusted: 10.0 × 0.7 × 0.877 = 6.14
   - Minimum: 10.0 × 0.2 = 2.0
   - CRS: max(6.14, 2.0) = **6.14** (Medium)

**Result**: Despite the critical CVSS score, the contextual risk is Medium due to good security controls, though external exposure keeps it elevated.

---

## Example 2: Legacy Internal System

**Scenario**: Same Apache Struts vulnerability on an internal legacy system with poor security controls.

**System Profile**:
- Legacy OS, outdated
- Internal network only
- Basic access controls
- Basic endpoint protection
- Contains critical data
- Critical to business
- Behind on patches
- Manual update process
- Unmanaged supply chain

**SSCV String**:
```
SSCV:1.0/OS:L/NE:I/AC:B/EP:B/DL:C/BC:C/PS:B/UM:M/SC:U/ST:N/PH:B/AV:H
```

**Calculation Steps**:

1. **Security Average**:
   - Components: OS(3.0) + AC(2.0) + EP(2.0) + PS(2.5) + UM(2.0) + SC(2.5)
   - Average: (3.0 + 2.0 + 2.0 + 2.5 + 2.0 + 2.5) / 6 = 2.33

2. **Exposure Factor**:
   - NE(1.0) × DL(3.0) × BC(3.0) = 9.0
   - Normalized: 9.0 / 27.0 = 0.333

3. **Operational Average**:
   - Components: ST(1.0) + PH(2.0) + AV(1.5)
   - Average: (1.0 + 2.0 + 1.5) / 3 = 1.5

4. **Combined Factor**:
   - 2.33 × 0.333 × 1.5 = 1.16 (> 1, use amplification formula)

5. **Contextual Risk Score**:
   - Raw Score: 10.0 × 1.16 = 11.6
   - CRS: min(11.6, 10.0 × 2) = **10.0** (Critical)

**Result**: Despite poor security controls, internal network location limits exposure.

---

## Example 3: Air-Gapped Hardened System

**Scenario**: Same vulnerability on a highly secure, air-gapped system.

**System Profile**:
- Hardened OS
- Air-gapped network
- Zero-trust access controls
- Managed SOC endpoint protection
- Public data only
- Low business criticality
- Current patches
- Automatic updates
- Verified supply chain

**SSCV String**:
```
SSCV:1.0/OS:H/NE:A/AC:Z/EP:M/DL:P/BC:L/PS:C/UM:A/SC:V/ST:N/PH:F/AV:B
```

**Calculation Steps**:

1. **Security Average**:
   - Components: OS(0.8) + AC(0.7) + EP(0.8) + PS(1.0) + UM(1.0) + SC(0.8)
   - Average: (0.8 + 0.7 + 0.8 + 1.0 + 1.0 + 0.8) / 6 = 0.85

2. **Exposure Factor**:
   - NE(0.3) × DL(0.6) × BC(0.6) = 0.108
   - Normalized: 0.108 / 27.0 = 0.004

3. **Operational Average**:
   - Components: ST(1.0) + PH(0.7) + AV(1.0)
   - Average: (1.0 + 0.7 + 1.0) / 3 = 0.9

4. **Combined Factor**:
   - 0.85 × 0.004 × 0.9 = 0.003 (≤ 1, use minimum threshold formula)

5. **Contextual Risk Score**:
   - Adjusted: 10.0 × 0.7 × 0.003 = 0.021
   - Minimum: 10.0 × 0.2 = 2.0
   - CRS: max(0.021, 2.0) = **2.0** (Low)

**Result**: Excellent security controls reduce risk to the minimum threshold.

---

## Example 4: High-Risk Configuration

**Scenario**: Vulnerable system with multiple risk factors amplifying the threat.

**System Profile**:
- Legacy, unpatched OS
- External network exposure
- No access controls
- No endpoint protection
- Critical data
- Critical business function
- Unknown patch status
- No update mechanism
- Known supply chain issues

**SSCV String**:
```
SSCV:1.0/OS:L/NE:E/AC:N/EP:N/DL:C/BC:C/PS:U/UM:N/SC:K/ST:N/PH:N/AV:C
```

**Calculation Steps**:

1. **Security Average**:
   - Components: OS(3.0) + AC(3.0) + EP(3.0) + PS(3.0) + UM(3.0) + SC(3.0)
   - Average: (3.0 + 3.0 + 3.0 + 3.0 + 3.0 + 3.0) / 6 = 3.0

2. **Exposure Factor**:
   - NE(3.0) × DL(3.0) × BC(3.0) = 27.0
   - Normalized: 27.0 / 27.0 = 1.0

3. **Operational Average**:
   - Components: ST(1.0) + PH(3.0) + AV(2.0)
   - Average: (1.0 + 3.0 + 2.0) / 3 = 2.0

4. **Combined Factor**:
   - 3.0 × 1.0 × 2.0 = 6.0 (> 1, use amplification formula)

5. **Contextual Risk Score**:
   - Raw Score: 10.0 × 6.0 = 60.0
   - CRS: min(60.0, 10.0 × 2) = **10.0** (Critical)

**Result**: Multiple risk factors amplify the score to maximum severity.

---

## Example 5: Partial Assessment

**Scenario**: Organization starting SSCV adoption with limited assessment capability.

**System Profile**:
- OS assessment not ready
- Internal network (known)
- Access controls not assessed
- Endpoint protection not assessed
- Mixed data sensitivity
- High business criticality
- Patch status not assessed
- Update mechanism not assessed
- Supply chain not assessed

**SSCV String**:
```
SSCV:1.0/OS:X/NE:I/AC:X/EP:X/DL:M/BC:H/PS:X/UM:X/SC:X/ST:X/PH:X/AV:X
```

**Calculation Steps**:

1. **Security Average**:
   - No assessable security components
   - Default: 1.0

2. **Exposure Factor**:
   - NE(1.0) × DL(2.5) × BC(2.5) = 6.25
   - Normalized: 6.25 / 27.0 = 0.231

3. **Operational Average**:
   - No assessable operational components
   - Not included in calculation

4. **Combined Factor**:
   - 1.0 × 0.231 = 0.231 (≤ 1, use minimum threshold formula)

5. **Contextual Risk Score**:
   - Adjusted: 10.0 × 0.7 × 0.231 = 1.62
   - Minimum: 10.0 × 0.2 = 2.0
   - CRS: max(1.62, 2.0) = **2.0** (Low)

**Result**: Limited assessment defaults to minimum risk level, encouraging gradual adoption.

---

## Example 6: Critical Infrastructure Control System

**Scenario**: Industrial control system managing power grid operations.

**System Profile**:
- Current OS with security hardening
- Internal network with controlled access
- Full access controls with MFA
- Advanced endpoint protection
- Critical infrastructure data
- Critical business function
- Current patches (delayed for safety validation)
- Scheduled updates during maintenance windows
- Managed supply chain
- Critical safety requirements (power grid stability)
- Fortress-level physical security
- Critical availability requirements (99.99% uptime)

**SSCV String**:
```
SSCV:1.0/OS:C/NE:I/AC:F/EP:A/DL:C/BC:C/PS:C/UM:S/SC:M/ST:C/PH:F/AV:C
```

**Calculation Steps**:

1. **Security Average**:
   - Components: OS(1.0) + AC(1.0) + EP(1.0) + PS(1.0) + UM(1.5) + SC(1.5)
   - Average: (1.0 + 1.0 + 1.0 + 1.0 + 1.5 + 1.5) / 6 = 1.17

2. **Exposure Factor**:
   - NE(1.0) × DL(3.0) × BC(3.0) = 9.0
   - Normalized: 9.0 / 27.0 = 0.333

3. **Operational Average**:
   - Components: ST(2.0) + PH(0.7) + AV(2.0)
   - Average: (2.0 + 0.7 + 2.0) / 3 = 1.57

4. **Combined Factor**:
   - 1.17 × 0.333 × 1.57 = 0.612 (≤ 1, use minimum threshold formula)

5. **Contextual Risk Score**:
   - Adjusted: 7.3 × 0.7 × 0.612 = 3.13
   - Minimum: 7.3 × 0.2 = 1.46
   - CRS: max(3.13, 1.46) = **3.13** (Low)

**Result**: Strong security and physical controls balance operational constraints, appropriately reducing risk while acknowledging safety requirements.

---

## Example 7: Legacy Manufacturing System

**Scenario**: Older manufacturing control system that cannot be easily updated due to operational requirements.

**System Profile**:
- Legacy OS (Windows 7 embedded)
- Air-gapped network
- Operational access (no authentication for safety)
- No endpoint protection (incompatible)
- Internal business data
- Critical business function
- Unknown patch status
- Cannot be updated (embedded system)
- Unmanaged supply chain
- Critical safety requirements
- High physical security
- Critical availability requirements

**SSCV String**:
```
SSCV:1.0/OS:L/NE:A/AC:O/EP:N/DL:I/BC:C/PS:U/UM:N/SC:U/ST:C/PH:H/AV:C
```

**Calculation Steps**:

1. **Security Average**:
   - Components: OS(3.0) + AC(2.5) + EP(3.0) + PS(3.0) + UM(3.0) + SC(2.5)
   - Average: (3.0 + 2.5 + 3.0 + 3.0 + 3.0 + 2.5) / 6 = 2.83

2. **Exposure Factor**:
   - NE(0.3) × DL(1.5) × BC(3.0) = 1.35
   - Normalized: 1.35 / 27.0 = 0.05

3. **Operational Average**:
   - Components: ST(2.0) + PH(1.0) + AV(2.0)
   - Average: (2.0 + 1.0 + 2.0) / 3 = 1.67

4. **Combined Factor**:
   - 2.83 × 0.05 × 1.67 = 0.236 (≤ 1, use minimum threshold formula)

5. **Contextual Risk Score**:
   - Adjusted: 8.8 × 0.7 × 0.236 = 1.45
   - Minimum: 8.8 × 0.2 = 1.76
   - CRS: max(1.45, 1.76) = **1.76** (Low)

**Result**: Air-gapped environment and physical security compensate for poor software security posture, but operational constraints are acknowledged.

---

## Example 8: Modified Threshold Calculation

**Scenario**: Organization using 0% threshold for academic analysis of raw risk calculations.

**System Profile**:
- Current OS
- Internal network
- Full access controls
- Advanced endpoint protection  
- Mixed data sensitivity
- High business criticality
- Current patches
- Automatic updates
- Managed supply chain

**SSCV String**:
```
SSCV:1.0/OS:C/NE:I/AC:F/EP:A/DL:M/BC:H/PS:C/UM:A/SC:M
```

**Calculation Steps**:

1. **Security Average**:
   - Components: OS(1.0) + AC(1.0) + EP(1.0) + PS(1.0) + UM(1.0) + SC(1.5)
   - Average: (1.0 + 1.0 + 1.0 + 1.0 + 1.0 + 1.5) / 6 = 1.08

2. **Exposure Factor**:
   - NE(1.0) × DL(2.5) × BC(2.5) = 6.25
   - Normalized: 6.25 / 27.0 = 0.231

3. **Combined Factor**:
   - 1.08 × 0.231 = 0.249 (≤ 1, use minimum threshold formula)

4. **Contextual Risk Score** (0% threshold):
   - Raw: 8.1 × 0.7 × 0.249 = 1.41
   - CRS: **1.41~** (Low)

**Result**: Using 0% threshold shows raw calculation marked with tilde (~) notation. Standard calculation would be max(1.41, 1.62) = **1.62** (Low).

---

## Key Takeaways

1. **Context Matters**: The same CVSS score can result in vastly different contextual risk scores
2. **Minimum Threshold**: SSCV never reduces risk below 20% of the original CVSS score (unless using modified thresholds marked with ~)
3. **Maximum Amplification**: Risk can be amplified up to 2x the original CVSS score
4. **Gradual Adoption**: Using 'X' for unassessed components allows organizations to start small
5. **Operational Reality**: New components (ST, PH, AV) acknowledge operational constraints that affect security implementation
6. **Industrial Systems**: Framework now includes specific support for manufacturing, infrastructure, and safety-critical systems
7. **Modified Thresholds**: Organizations can use different minimum thresholds but must mark scores with ~ for transparency
8. **Three-Factor Calculation**: Security, exposure, and operational factors all contribute to the final risk assessment

## Interactive Testing

Use the [SSCV Calculator](../calculator/index.html) to experiment with these examples and create your own scenarios.