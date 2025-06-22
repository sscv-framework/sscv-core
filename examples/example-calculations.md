# SSCV Example Calculations

This document provides detailed examples of SSCV calculations for different system configurations using SSCV v1.0.

## Example 1: Internet-Facing Web Server

**Scenario**: Public e-commerce web server with Apache Struts RCE (CVE-2017-5638), CVSS 10.0.

**System Profile**:
- Current OS with regular patches
- Externally accessible
- Full access controls in place
- Advanced endpoint protection
- Processes mixed sensitive data
- Current patch status

**SSCV String**:
```
SSCV:1.0/OS:C/NE:E/AC:F/EP:A/DL:M/PS:C
```

**Calculation Steps**:

1. **Context Multiplier**:
   - Components: OS(1.0) + AC(1.0) + EP(1.0) + PS(1.0)
   - Average: (1.0 + 1.0 + 1.0 + 1.0) / 4 = 1.0

2. **Exposure Factor**:
   - NE(3.0) × DL(2.5) / 8 = 7.5 / 8 = 0.9375

3. **Combined Factor**:
   - 1.0 × 0.9375 = 0.9375 (≤ 1, use minimum threshold formula)

4. **Contextual Risk Score**:
   - Adjusted: 10.0 × 0.9375 = 9.375
   - Minimum: 10.0 × 0.2 = 2.0
   - CRS: max(9.375, 2.0) = **9.38** (Critical)

**Result**: Despite good security controls, the high exposure keeps this as a critical priority.

---

## Example 2: Air-Gapped Industrial System

**Scenario**: Air-gapped industrial control system with buffer overflow requiring local access, CVSS 7.0.

**System Profile**:
- Legacy OS
- Air-gapped network
- No access controls
- No endpoint protection
- Internal data
- Unknown patch status

**SSCV String**:
```
SSCV:1.0/OS:L/NE:A/AC:N/EP:N/DL:I/PS:U
```

**Calculation Steps**:

1. **Context Multiplier**:
   - Components: OS(3.0) + AC(3.0) + EP(3.0) + PS(3.0)
   - Average: (3.0 + 3.0 + 3.0 + 3.0) / 4 = 3.0

2. **Exposure Factor**:
   - NE(0.3) × DL(1.5) / 8 = 0.45 / 8 = 0.05625

3. **Combined Factor**:
   - 3.0 × 0.05625 = 0.169 (≤ 1, use minimum threshold formula)

4. **Contextual Risk Score**:
   - Adjusted: 7.0 × 0.169 = 1.183
   - Minimum: 7.0 × 0.2 = 1.4
   - CRS: max(1.183, 1.4) = **1.4** (Low)

**Result**: Even with poor security controls, air-gapping significantly reduces risk, but the minimum threshold ensures risk isn't dismissed.

---

## Example 3: Well-Secured Database Server

**Scenario**: Internal database with strong security, privilege escalation vulnerability (CVE-2024-xxxxx), CVSS 7.8.

**System Profile**:
- Hardened OS
- Internal network
- Zero-trust access controls
- Managed SOC endpoint protection
- Critical data
- Current patches

**SSCV String**:
```
SSCV:1.0/OS:H/NE:I/AC:Z/EP:M/DL:C/PS:C
```

**Calculation Steps**:

1. **Context Multiplier**:
   - Components: OS(0.8) + AC(0.7) + EP(0.8) + PS(1.0)
   - Average: (0.8 + 0.7 + 0.8 + 1.0) / 4 = 0.825

2. **Exposure Factor**:
   - NE(1.0) × DL(3.0) / 8 = 3.0 / 8 = 0.375

3. **Combined Factor**:
   - 0.825 × 0.375 = 0.309 (≤ 1, use minimum threshold formula)

4. **Contextual Risk Score**:
   - Adjusted: 7.8 × 0.309 = 2.41
   - Minimum: 7.8 × 0.2 = 1.56
   - CRS: max(2.41, 1.56) = **2.41** (Low)

**Result**: Strong security controls effectively reduce risk while maintaining minimum threshold.

---

## Example 4: Poorly Secured Public Server

**Scenario**: Legacy public-facing server with remote code execution vulnerability, CVSS 8.8.

**System Profile**:
- Legacy OS
- External network exposure
- Basic access controls
- Basic endpoint protection
- Mixed sensitive data
- Behind on patches

**SSCV String**:
```
SSCV:1.0/OS:L/NE:E/AC:B/EP:B/DL:M/PS:B
```

**Calculation Steps**:

1. **Context Multiplier**:
   - Components: OS(3.0) + AC(2.0) + EP(2.0) + PS(2.5)
   - Average: (3.0 + 2.0 + 2.0 + 2.5) / 4 = 2.375

2. **Exposure Factor**:
   - NE(3.0) × DL(2.5) / 8 = 7.5 / 8 = 0.9375

3. **Combined Factor**:
   - 2.375 × 0.9375 = 2.227 (> 1, use amplification formula)

4. **Contextual Risk Score**:
   - Raw Score: 8.8 × 2.227 = 19.6
   - CRS: min(19.6, 8.8 × 2) = min(19.6, 17.6) = **17.6**
   - Capped at **10.0** (Critical)

**Result**: Poor security posture amplifies risk to maximum severity.

---

## Example 5: Typical Corporate Workstation

**Scenario**: Developer workstation with browser vulnerability, CVSS 6.5.

**System Profile**:
- Current OS
- External network (internet access)
- Full access controls
- Advanced endpoint protection
- Internal data
- Delayed patches (30-90 days)

**SSCV String**:
```
SSCV:1.0/OS:C/NE:E/AC:F/EP:A/DL:I/PS:D
```

**Calculation Steps**:

1. **Context Multiplier**:
   - Components: OS(1.0) + AC(1.0) + EP(1.0) + PS(1.5)
   - Average: (1.0 + 1.0 + 1.0 + 1.5) / 4 = 1.125

2. **Exposure Factor**:
   - NE(3.0) × DL(1.5) / 8 = 4.5 / 8 = 0.5625

3. **Combined Factor**:
   - 1.125 × 0.5625 = 0.633 (≤ 1, use minimum threshold formula)

4. **Contextual Risk Score**:
   - Adjusted: 6.5 × 0.633 = 4.11
   - Minimum: 6.5 × 0.2 = 1.3
   - CRS: max(4.11, 1.3) = **4.11** (Medium)

**Result**: Good security controls reduce developer workstation risk to Low.

---

## Example 6: Partial Assessment

**Scenario**: Organization starting SSCV adoption with limited assessment capability, CVSS 9.0 vulnerability.

**System Profile**:
- OS not assessed
- Internal network (known)
- Access controls not assessed
- Endpoint protection not assessed
- Mixed data sensitivity (known)
- Patch status not assessed

**SSCV String**:
```
SSCV:1.0/OS:X/NE:I/AC:X/EP:X/DL:M/PS:X
```

**Calculation Steps**:

1. **Context Multiplier**:
   - No assessable components (all marked X)
   - Default: 1.0

2. **Exposure Factor**:
   - NE(1.0) × DL(2.5) / 8 = 2.5 / 8 = 0.3125

3. **Combined Factor**:
   - 1.0 × 0.3125 = 0.3125 (≤ 1, use minimum threshold formula)

4. **Contextual Risk Score**:
   - Adjusted: 9.0 × 0.3125 = 2.81
   - Minimum: 9.0 × 0.2 = 1.8
   - CRS: max(2.81, 1.8) = **2.81** (Low)

**Result**: Limited assessment capability still provides meaningful risk reduction, encouraging gradual adoption.

---

## Key Takeaways

1. **Context Matters**: The same CVSS score can result in vastly different contextual risk scores
2. **Minimum Threshold**: SSCV never reduces risk below 20% of the original CVSS score
3. **Maximum Amplification**: Risk can be amplified up to 2x the original CVSS score
4. **Gradual Adoption**: Using 'X' for unassessed components allows organizations to start small
5. **Simple Formula**: Context Multiplier (average of OS, AC, EP, PS) × Exposure Factor (NE × DL / 8)
6. **Direct Calculation**: No artificial reduction - contextual factors directly modify CVSS scores

## Interactive Testing

Use the [SSCV Calculator](../calculator/index.html) to experiment with these examples and create your own scenarios.