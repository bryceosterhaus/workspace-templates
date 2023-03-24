# Templates

**Workflow:**
Ideally the user could run something like

```sh
gw createClientExtension // pulls from "templates" directory

gw createClientExtension theme-spritemap
```

**Default Prompt:**
"Should this client extension in a shared container or it own?"

>A default prompt for all client extensions asking if the client extension is going to be in its own container or a shared container. If it is a shared container, we would move it's client-extension.yaml to an existing one. If it is it's own container, we create a new yaml file.

**Template Structure:**
- Uses the "prompts.json" to get user inputted values
- Runs pre.sh script
- Copies .hbs templating files to project
- Runs post.sh script

`prompts.json`
Runs from top -> down

```json
[
	{
		"id": "name",
		"prompt": "[question to ask the user]",
		"type": "[string | boolean | options]",
		"options": [] // used for selecting from a list of options,
		"dependsOn": [] // Conditionally asks this question based on value of another question
	}
]
```

`pre.sh / post.sh`
- User values provided as environment variables. `name` -> `PROMPTS_NAME`

`*.hbs`
- Variables available as `name` -> `{{ name }}`

Workflow for adding a new Template:
- User could copy/paste existing template and then modify for their specific need. For example, copy/paste react template and then add jest config.
- User could add an entirely new Template structure with their own prompts.