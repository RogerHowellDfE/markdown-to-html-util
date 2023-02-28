// If JavaScript is running, remove the alert message about it needing to be enabled.
document.getElementById('alert_javascript_must_be_enabled').remove();


const markdownInputElem = document.getElementById('markdown_input')
const outputHtmlElem = document.getElementById('html_output')
const previewOutputContainerElem = document.getElementById('preview_output_container')

markdownInputElem.addEventListener('input', function (e) {

    const inputMarkdown = e.target.value;
    updateHtml(inputMarkdown);
})

function updateHtml(inputMarkdown) {
    const html = DOMPurify.sanitize(marked.parse(inputMarkdown));

    let govStyledHtml = applyGovStyles(html);
    outputHtmlElem.textContent = govStyledHtml;
    previewOutputContainerElem.innerHTML = govStyledHtml;
}


function applyGovStyles(inputHtml) {
    const parser = new DOMParser();
    // HTMLDocument(<html><body>...parsed nodes</body></html>)
    const doc = parser.parseFromString(inputHtml, 'text/html');
    // Parsed nodes
    const nodes = doc.body;

    nodes.querySelectorAll('ul')
        .forEach(elem => {
            elem.classList.add('govuk-list');
            elem.classList.add('govuk-list--bullet');
        })
    nodes.querySelectorAll('ol')
        .forEach(elem => {
            elem.classList.add('govuk-list');
            elem.classList.add('govuk-list--number');
        })
    nodes.querySelectorAll('h1')
        .forEach(elem => {
            elem.classList.add('govuk-heading-xl');
        })
    nodes.querySelectorAll('h2')
        .forEach(elem => {
            elem.classList.add('govuk-heading-l');
        })
    nodes.querySelectorAll('h3')
        .forEach(elem => {
            elem.classList.add('govuk-heading-m');
        })
    nodes.querySelectorAll('h4')
        .forEach(elem => {
            elem.classList.add('govuk-heading-s');
        })
    nodes.querySelectorAll('h5')
        .forEach(elem => {
            elem.classList.add('govuk-heading-xs');
        })
    nodes.querySelectorAll('table')
        .forEach(elem => {
            elem.classList.add('govuk-table');
            elem.classList.add('gias-table');
        })
    nodes.querySelectorAll('thead')
        .forEach(elem => {
            elem.classList.add('govuk-table__head');
        })
    nodes.querySelectorAll('tbody')
        .forEach(elem => {
            elem.classList.add('govuk-table__body');
        })
    nodes.querySelectorAll('tr')
        .forEach(elem => {
            elem.classList.add('govuk-govuk-table__row');
        })
    nodes.querySelectorAll('th')
        .forEach(elem => {
            elem.classList.add('govuk-table__header');
        })
    nodes.querySelectorAll('td')
        .forEach(elem => {
            elem.classList.add('govuk-table__cell');
        })

    return nodes.innerHTML;
}


const exampleMd = `## Sample input markdown.

This page is a _very_ quickly thrown-together proof-of-concept/demo utility.

- Note that the input should be _valid_ **markdown** ~files~ content.
- Some invalid HTML gets rectified/fixed 
  * e.g., missing \`th\` tag
  * this can be seen [](#example-showing-inline-html-table)

Some GovUK style classes get automatically applied.
For example, but not limited to:

1. Headings
   - \`h1\` 
   - \`h2\` 
   - \`h3\` 
   - \`h4\` 
   - \`h5\` 
2. Lists
   - \`ul\` 
   - \`ol\` 
2. Table elements
   - \`table\` 
   - \`thead\` 
   - \`tr\` 
   - \`th\` 
   - \`td\` 


### Example showing markdown table

| Col 1 | Col 2 |
|-------|-------|
| A     | B     |
| A     | B     |
| A     | B     |
| A     | B     |

### Example showing inline HTML table

**NOTE: There is a missing \`th\` tag - output HTML attempts to rectify this.**


<table>
<thead>
<tr>
<th>Col 1</th>
<th>Col 2
</tr>
</thead>
<tbody>
<tr>
<td>A</td>
<td>B</td>
</tr>
<tr><td>A</td><td>B</td></tr>
<tr><td>A</td><td>B</td></tr>
<tr><td>A</td><td>B</td></tr>
</tbody>
</table>

`;

markdownInputElem.value = exampleMd;
updateHtml(exampleMd);





