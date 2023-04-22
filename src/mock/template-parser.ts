import hbs from 'hbs'

const replaceTemplateValues = (template: string, replaces: { [key: string]: unknown }) => {
  const compiledTemplate = hbs.handlebars.compile(template)
  return compiledTemplate(replaces)
}

export { replaceTemplateValues }
