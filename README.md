# Create Client Extension POC

Project Structure:
- Basic liferay workspace intialized with `blade`
- `./generate-cli`: POC for template management, this will eventually be merged into the workspace tools.
- Added `./templates` directory to store client extension templates. (Necessary for `createClientExtension`)
- Added `./client-extensions` directory to store actively developed extensions. (Can be anything)

Setup:
1. Clone this repo
2. `./gradlew yarnInstall`


Creating a new Client Extension:
1. `cd ./client-extensions`
2. `yarn exec createClientExtension` (POC way to call our tool)
3. Choose your project and follow the prompts


## Template Directory Structure

Templates have a basic anatomy with four parts.
1. `prompts.json`: questions that are asked when project is generated
2. `before-templating-process`: executable that is run after prompts but before template files
3. `*.mustache` files: these are templates that take values from your prompts and copy to new project.
	- **Note:** One of these `*.mustache` files must be a `client-extension.yaml.mustache` with a supported `type`. See existing templates for examples.
4. `after-templating-process`: executable that is run after template files are generated.

Every template project may have a `prompts.json` for setting up yoru template and providing variables for template creation. See [inquirer API](https://www.npmjs.com/package/inquirer#questions) for specific details.

Example:
```json
[
	{
		"name": "name",
		"message":"What is the name of your Client Extension?",
		"type": "string"
	}
]
```

### Variables.

- For `*.mustache` files, see mustache templating documentation. Prompt answers will be available like `{{ name }}` in your template.
- For executables, use env variables `PROMPTS_*`, for example `PROMPTS_NAME`.


### Creating New Templates

If you would like to create your own template, you can do so and the CLI tool will pick up that template as an option.

--------------------------------------------------------------------
> Generated README from workspace init

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

see "shared component" for reference [ce-cli](https://www.npmjs.com/package/ce-cli)

**Template Structure:**
- Uses the "prompts.json" to get user inputted values
- Runs before-templating-process executable
- Copies .hbs templating files to project
- Runs after-templating-process executable

`prompts.json`
Runs from top -> down

See [inquirer](https://www.npmjs.com/package/inquirer#questions) for prompt options for each question.


`before-templating-process / after-templating-process`
- User values provided as environment variables. `name` -> `PROMPTS_NAME`

`*.mustache`
- Variables available as `name` -> `{{ name }}`

Workflow for adding a new Template:
- User could copy/paste existing template and then modify for their specific need. For example, copy/paste react template and then add jest config.
- User could add an entirely new Template structure with their own prompts.

# Running Generator

Install Node dependencies
```sh
cd ./generate-cli && npm i && cd ..
```

Running CLI

```sh
cd ./client-extensions

node ../generate-cli/index.js [TEMPLATE_NAME] [DIRECTORY_NAME(optional)]
```
