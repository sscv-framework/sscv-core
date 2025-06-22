# Pull Request

## Description

Please provide a clear and concise description of what this PR accomplishes.

### Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Style/UI improvement
- [ ] Code refactoring
- [ ] Test improvements
- [ ] Configuration changes

## Related Issues

Closes #(issue number)
Fixes #(issue number)
Relates to #(issue number)

## Testing

### Manual Testing
- [ ] Calculator functionality tested
- [ ] All component dropdowns work correctly
- [ ] SSCV string generation verified
- [ ] CRS calculations match expected results
- [ ] UI responsive on mobile devices
- [ ] Tested in Chrome, Firefox, Safari, Edge

### Test Cases
Please describe the test cases you've run and their results:

**Test Case 1**: [Description]
- CVSS Score: [X.X]
- SSCV String: `SSCV:1.0/OS:X/NE:X/AC:X/EP:X/DL:X/BC:X/PS:X/UM:X/SC:X`
- Expected CRS: [X.X]
- Actual CRS: [X.X]
- Pass / Fail

**Test Case 2**: [Description]
- [Same format as above]

### Edge Cases Tested
- [ ] All components set to 'X' (not assessed)
- [ ] Maximum risk configuration
- [ ] Minimum risk configuration  
- [ ] Invalid CVSS values (handled gracefully)
- [ ] Empty/null inputs (handled gracefully)

## Checklist

### Code Quality
- [ ] Code follows existing style guidelines
- [ ] Self-review of code completed
- [ ] Code is commented where necessary
- [ ] No console errors or warnings
- [ ] Functions have clear names and purposes

### Documentation
- [ ] Documentation updated (if applicable)
- [ ] Examples updated (if applicable)
- [ ] README updated (if applicable)
- [ ] CHANGELOG updated (if applicable)

### SSCV Specific
- [ ] Calculation logic follows SSCV specification
- [ ] Component weights are correct
- [ ] Formula implementation is accurate
- [ ] Severity mapping is correct (Low/Medium/High/Critical)
- [ ] SSCV string format is valid

## Screenshots (if applicable)

Please add screenshots to help explain your changes, especially for UI improvements.

**Before:**
[Screenshot or description]

**After:**
[Screenshot or description]

## Additional Context

Add any other context about the pull request here. This might include:
- Performance considerations
- Security implications  
- Backward compatibility notes
- Future improvement suggestions

## Impact Assessment

### Files Changed
- [ ] Core calculation logic (`calculator.js`)
- [ ] UI components (`index.html`)
- [ ] Styling (`style.css`)
- [ ] Documentation (`.md` files)
- [ ] Configuration files
- [ ] Other: [specify]

### Potential Impact
- [ ] Low impact (documentation, minor UI changes)
- [ ] Medium impact (new features, significant UI changes)
- [ ] High impact (calculation logic, breaking changes)

### Backward Compatibility
- [ ] Fully backward compatible
- [ ] Requires minor updates for users
- [ ] Contains breaking changes (explain below)

**Breaking Changes Explanation:**
[If applicable, explain what breaks and how users should adapt]

---

## Security Considerations

- [ ] No sensitive data exposed
- [ ] Input validation implemented
- [ ] No security vulnerabilities introduced
- [ ] External dependencies reviewed (if any)

## Performance Considerations

- [ ] No performance regressions
- [ ] Tested with large datasets (if applicable)
- [ ] Memory usage considered
- [ ] Loading time impact minimal

---

**Note for Reviewers:**
[Any specific areas you'd like reviewers to focus on]

**Thank you for contributing to SSCV!**