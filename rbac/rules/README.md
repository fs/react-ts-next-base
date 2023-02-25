# RBAC naming

### Use the following methodology for RBAC naming:

- `[entity or global-component]:[action]`
- `[page-name or modal-name or other-place]:[component]:...:[component]:[action]`

### The variable naming approach:

- `[action (what to do?)] + [subject (what?)] + [place (where?)] + Rule`

### Actions:

- create/edit/delete
- show
- archive
- book
- visit

### Places:

- `In[EntityName]Modal` — viewCompanyRule
- `On[EntityName(plural)]Page` — viewOwnerColumnOnEngagementsPageRule

### Note:

- Don't create new rules that repeat already defined ones. For example if you want render some element depend on user's ability to visit some page you should use `VISIT_[some]_PAGE` rule but don't create new `show[some-element]Rule`

## Examples:

- `showNavigationRule = ‘navigation:show’`
- `showCoachProfileInEngagementModalRule = ‘engagement-modal:coach-profile:show’`
- `deleteReportRule = ‘report:delete’`
- `showCompanyColumnOnProgramsPageRule = 'programs-page:company-column:show`
