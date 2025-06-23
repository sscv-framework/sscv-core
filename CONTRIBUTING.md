# Contributing to SSCV

Thank you for your interest in contributing to the System Security Context Vector (SSCV) framework! This document outlines how you can help improve SSCV.

## How to Contribute

We welcome contributions in many forms:

- **Bug Reports**: Found an issue? Let us know!
- **Feature Requests**: Have an idea for improvement?
- **Documentation**: Help improve our docs
- **Code Contributions**: Submit bug fixes or new features
- **Translations**: Help make SSCV accessible globally
- **Use Cases**: Share your SSCV implementation stories
- **Calculator Improvements**: Enhance the web calculator

## Getting Started

### Prerequisites

- Basic understanding of vulnerability management
- Familiarity with CVSS scoring (helpful but not required)
- For code contributions: Knowledge of HTML, CSS, and JavaScript

### Development Setup

1. **Fork the Repository**
   ```bash
   git clone https://github.com/sscv-framework/sscv-core.git
   cd sscv-core
   ```

2. **Test the Calculator**
   - Open `calculator/index.html` in your browser
   - Verify calculations work correctly
   - Test with different SSCV configurations

3. **Review the Specification**
   - Read `SPECIFICATION.md` to understand the framework
   - Check `examples/` for implementation patterns

## Contribution Guidelines

### Bug Reports

When reporting bugs, please include:

- **Description**: Clear description of the issue
- **Steps to Reproduce**: Exact steps to recreate the problem
- **Expected vs Actual**: What should happen vs what actually happens
- **SSCV String**: The specific SSCV configuration that caused the issue
- **Browser/Environment**: Where you encountered the issue

**Example Bug Report:**
```
**Bug**: Calculator shows wrong CRS for high-risk configuration

**Steps to Reproduce**:
1. Set CVSS score to 8.0
2. Configure SSCV: SSCV:1.0/OS:L/NE:E/AC:N/EP:N/DL:C/BC:C/PS:U/UM:N/SC:K
3. Observe calculated CRS

**Expected**: CRS should be 10.0 (Critical)
**Actual**: CRS shows 8.5 (High)
**Browser**: Chrome 118.0.5993.70
```

### Feature Requests

For new features, please provide:

- **Use Case**: Why is this feature needed?
- **Proposed Solution**: How should it work?
- **Alternatives**: Other approaches you considered
- **Impact**: Who would benefit from this feature?

### Code Contributions

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Follow existing code style
   - Add comments for complex logic
   - Test your changes thoroughly

3. **Test the Calculator**
   - Verify all existing functionality still works
   - Test your new feature with various inputs
   - Check edge cases and error handling

4. **Submit a Pull Request**
   - Clear title and description
   - Reference any related issues
   - Include test cases or examples

### Documentation Improvements

- Fix typos, grammar, or unclear explanations
- Add missing examples or clarifications
- Improve formatting and structure
- Translate content to other languages

### Calculator Enhancements

Ideas for calculator improvements:

- **UI/UX**: Better mobile responsiveness, accessibility features
- **Features**: Save/load configurations, batch calculations, API integration
- **Validation**: Better error messages, input validation
- **Export**: PDF reports, CSV exports, integration options

## Code Style Guidelines

### HTML
- Use semantic HTML elements
- Include proper ARIA labels for accessibility
- Keep markup clean and well-structured

### CSS
- Use consistent naming conventions
- Organize styles logically
- Ensure responsive design
- Test across different browsers

### JavaScript
- Use ES6+ features appropriately
- Add clear function documentation
- Handle errors gracefully
- Validate user inputs

**Example Code Style:**
```javascript
/**
 * Calculate Contextual Risk Score from CVSS and SSCV components
 * @param {number} cvssBase - CVSS base score (0-10)
 * @param {Object} components - SSCV component values
 * @returns {Object} Calculation results including CRS and factors
 */
function calculateCRS(cvssBase, components) {
    // Validate inputs
    if (cvssBase < 0 || cvssBase > 10) {
        throw new Error('CVSS score must be between 0 and 10');
    }
    
    // Implementation...
}
```

## Testing

### Manual Testing

Before submitting changes:

1. **Basic Functionality**
   - All component dropdowns work
   - CVSS input accepts valid values
   - CRS calculation updates in real-time
   - SSCV string generates correctly

2. **Edge Cases**
   - All components set to 'X' (not assessed)
   - Maximum risk configuration
   - Minimum risk configuration
   - Invalid CVSS values

3. **Browser Compatibility**
   - Test in Chrome, Firefox, Safari, Edge
   - Verify mobile responsiveness
   - Check accessibility features

### Automated Testing

For future development, we plan to add:
- Unit tests for calculation functions
- Integration tests for the calculator UI
- Accessibility testing
- Performance benchmarks

## Specification Changes

Changes to the SSCV specification require special consideration:

### Minor Changes
- Clarifications or examples
- Documentation improvements
- Non-breaking calculator updates

### Major Changes
- New component values
- Modified calculation formulas
- Breaking changes to SSCV format

For major changes:
1. Open an issue for discussion first
2. Provide detailed rationale
3. Consider backward compatibility
4. Update all related documentation

## Recognition

Contributors will be recognized in:
- README.md acknowledgments
- Release notes for significant contributions
- Special contributor badges (future)

## Getting Help

Need help contributing?

- **Issues**: Ask questions in GitHub issues
- **Discussions**: Use GitHub discussions for general questions
- **Email**: Contact maintainers directly for private concerns

## Contribution Ideas

Looking for ways to contribute? Here are some ideas:

### Easy (Good First Issues)
- Fix typos in documentation
- Add new example calculations
- Improve error messages in calculator
- Add more use case scenarios

### Medium
- Enhance calculator UI/UX
- Add new calculator features
- Improve mobile responsiveness
- Add input validation improvements

### Advanced
- Create API specification
- Build integration examples
- Add automated testing
- Performance optimizations

### Research & Analysis
- Industry-specific SSCV profiles
- Statistical analysis of SSCV effectiveness
- Comparison studies with other frameworks
- User experience research

## Review Process

1. **Initial Review**: Maintainers review for basic requirements
2. **Technical Review**: Detailed code/content review
3. **Testing**: Verify functionality and compatibility
4. **Documentation**: Ensure adequate documentation
5. **Merge**: Approved contributions are merged

Typical review time: 3-7 days for small changes, 1-2 weeks for larger contributions.

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please:

- Be respectful and constructive in discussions
- Focus on what is best for the community
- Show empathy towards other community members
- Accept constructive criticism gracefully

## Thank You

Every contribution, no matter how small, helps make SSCV better for everyone. We appreciate your time and effort in improving this framework!

---

**Questions?** Don't hesitate to ask! We're here to help you contribute successfully to SSCV.