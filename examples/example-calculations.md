# SSCV Example Calculations

This document provides detailed examples of SSCV calculations for different system configurations.

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
- Supply chain not assessed

**SSCV String**:
```
SSCV:1.0/OS:C/NE:E/AC:F/EP:A/DL:M/BC:H/PS:C/UM:A/SC:X
```

**Calculation Steps**:

1. **Context Multiplier**:
   - Components: OS(1.0) + AC(1.0) + EP(1.0) + PS(1.0) + UM(1.0) + SC(not assessed)
   - Average: (1.0 + 1.0 + 1.0 + 1.0 + 1.0) / 5 = 1.0

2. **Exposure Factor**:
   - NE(3.0) × DL(2.5) × BC(2.5) = 18.75
   - Normalized: 18.75 / 27.0 = 0.694

3. **Combined Factor**:
   - 1.0 × 0.694 = 0.694 (≤ 1, use minimum threshold formula)

4. **Contextual Risk Score**:
   - Adjusted: 10.0 × 0.7 × 0.694 = 4.86
   - Minimum: 10.0 × 0.2 = 2.0
   - CRS: max(4.86, 2.0) = **4.9** (Medium)

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
SSCV:1.0/OS:L/NE:I/AC:B/EP:B/DL:C/BC:C/PS:B/UM:M/SC:U
```

**Calculation Steps**:

1. **Context Multiplier**:
   - Components: OS(3.0) + AC(2.0) + EP(2.0) + PS(2.5) + UM(2.0) + SC(2.5)
   - Average: (3.0 + 2.0 + 2.0 + 2.5 + 2.0 + 2.5) / 6 = 2.33

2. **Exposure Factor**:
   - NE(1.0) × DL(3.0) × BC(3.0) = 9.0
   - Normalized: 9.0 / 27.0 = 0.333

3. **Combined Factor**:
   - 2.33 × 0.333 = 0.777 (≤ 1, use minimum threshold formula)

4. **Contextual Risk Score**:
   - Adjusted: 10.0 × 0.7 × 0.777 = 5.44
   - Minimum: 10.0 × 0.2 = 2.0
   - CRS: max(5.44, 2.0) = **5.4** (Medium)

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
SSCV:1.0/OS:H/NE:A/AC:Z/EP:M/DL:P/BC:L/PS:C/UM:A/SC:V
```

**Calculation Steps**:

1. **Context Multiplier**:
   - Components: OS(0.8) + AC(0.7) + EP(0.8) + PS(1.0) + UM(1.0) + SC(0.8)
   - Average: (0.8 + 0.7 + 0.8 + 1.0 + 1.0 + 0.8) / 6 = 0.85

2. **Exposure Factor**:
   - NE(0.3) × DL(0.6) × BC(0.6) = 0.108
   - Normalized: 0.108 / 27.0 = 0.004

3. **Combined Factor**:
   - 0.85 × 0.004 = 0.0034 (≤ 1, use minimum threshold formula)

4. **Contextual Risk Score**:
   - Adjusted: 10.0 × 0.7 × 0.0034 = 0.024
   - Minimum: 10.0 × 0.2 = 2.0
   - CRS: max(0.024, 2.0) = **2.0** (Low)

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
SSCV:1.0/OS:L/NE:E/AC:N/EP:N/DL:C/BC:C/PS:U/UM:N/SC:K
```

**Calculation Steps**:

1. **Context Multiplier**:
   - Components: OS(3.0) + AC(3.0) + EP(3.0) + PS(3.0) + UM(3.0) + SC(3.0)
   - Average: (3.0 + 3.0 + 3.0 + 3.0 + 3.0 + 3.0) / 6 = 3.0

2. **Exposure Factor**:
   - NE(3.0) × DL(3.0) × BC(3.0) = 27.0
   - Normalized: 27.0 / 27.0 = 1.0

3. **Combined Factor**:
   - 3.0 × 1.0 = 3.0 (> 1, use amplification formula)

4. **Contextual Risk Score**:
   - Amplified: min(10.0 × 3.0, 10.0 × 2) = 20.0
   - Capped: min(20.0, 10.0) = **10.0** (Critical)

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
SSCV:1.0/OS:X/NE:I/AC:X/EP:X/DL:M/BC:H/PS:X/UM:X/SC:X
```

**Calculation Steps**:

1. **Context Multiplier**:
   - No assessable context components
   - Default: 1.0

2. **Exposure Factor**:
   - NE(1.0) × DL(2.5) × BC(2.5) = 6.25
   - Normalized: 6.25 / 27.0 = 0.231

3. **Combined Factor**:
   - 1.0 × 0.231 = 0.231 (≤ 1, use minimum threshold formula)

4. **Contextual Risk Score**:
   - Adjusted: 10.0 × 0.7 × 0.231 = 1.62
   - Minimum: 10.0 × 0.2 = 2.0
   - CRS: max(1.62, 2.0) = **2.0** (Low)

**Result**: Limited assessment defaults to minimum risk level, encouraging gradual adoption.

---

## Key Takeaways

1. **Context Matters**: The same CVSS score can result in vastly different contextual risk scores
2. **Minimum Threshold**: SSCV never reduces risk below 20% of the original CVSS score
3. **Maximum Amplification**: Risk can be amplified up to 2x the original CVSS score
4. **Gradual Adoption**: Using 'X' for unassessed components allows organizations to start small
5. **Multiple Factors**: Both security controls and exposure factors contribute to the final score

## Interactive Testing

Use the [SSCV Calculator](../calculator/index.html) to experiment with these examples and create your own scenarios.