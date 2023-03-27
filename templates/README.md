# Contributing Templates

Templates have a basic anatomy with four parts.
1. `prompts.json`: questions that are asked when project is generated
2. `pre.sh`: script that is run after prompts but before template files
3. `*.hbs` files: these are templates that take values from your prompts and copy to new project.
4. `post.sh`: script that is run after template files are generated.

Every template project must have a `prompts.json` with at least one question `name`. Everything else is optional.

```json
[
	{
		"name": "name",
		"message":"What is the name of your Client Extension?",
		"type": "string"
	}
]
```

## Variables.

- For `*.hbs` files, see handlebars documentation
- For scripts, use env variables `PROMPTS_*`, for example `PROMPTS_NAME`.