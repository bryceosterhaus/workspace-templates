const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const Handlebars = require("handlebars");
const {glob} = require('glob')
const {spawn} = require('child_process');


const TEMPLATE_TYPE = process.argv[2];

const TEMPLATE_TYPES_DIRECTORY = path.join(__dirname, '..', 'templates');

const TEMPLATES_AVAILABLE = fs.readdirSync(TEMPLATE_TYPES_DIRECTORY);
const TEMPLATE_DIRECTORY = path.join(TEMPLATE_TYPES_DIRECTORY, TEMPLATE_TYPE);

const kebabCase = val => val
	.replace(/([a-z])([A-Z])/g, "$1-$2")
	.replace(/[\s_]+/g, '-')
	.toLowerCase();

const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`).toUpperCase();

async function main() {
	if (!TEMPLATES_AVAILABLE.includes(TEMPLATE_TYPE)) {
		console.error('Template Doesn\'t exist.');
	}

	const prompts = require(path.join(TEMPLATE_DIRECTORY, 'prompts.json'));

	const answers = await inquirer.prompt(prompts);

	answers.name = kebabCase(answers.name)

	const hbsFiles = await glob(TEMPLATE_DIRECTORY + '/**/*.hbs', { ignore: 'node_modules/**' })

	const preScriptPath = path.join(TEMPLATE_DIRECTORY, 'pre.sh');
	const postScriptPath = path.join(TEMPLATE_DIRECTORY, 'post.sh');

	const NEW_PROJECT_PATH = path.join(process.cwd(), answers.name);

	if (fs.existsSync(NEW_PROJECT_PATH)) {
		console.error('Project directory already exists');

		return;
	}

	const envVariables = Object.keys(answers).reduce((acc, key) => ({
		...acc,
		['PROMPTS_' + camelToSnakeCase(key)]: answers[key]
	}), {...process.env})

	if (fs.existsSync(preScriptPath)) {
		console.log("Running 'pre.sh' script...");

		await run_script(preScriptPath, {env: envVariables})
	}

	if (hbsFiles.length) {
		console.log("Writing files...");

		for (const hbsFile of hbsFiles) {
			const template = Handlebars.compile(fs.readFileSync(hbsFile, 'utf8'));

			const relativePath = hbsFile.replace(TEMPLATE_DIRECTORY, '');

			const newFilePath = path.join(NEW_PROJECT_PATH, relativePath).replace('.hbs', '');

			fs.mkdirSync(path.dirname(newFilePath), {recursive: true})

			fs.writeFileSync(newFilePath, template(answers));
		}
	}

	if (fs.existsSync(postScriptPath)) {
		console.log("Running 'post.sh' script...");
		
		await run_script(postScriptPath, {env: envVariables});
	}
}

function run_script(command, options = {}, callback = () => {}) {
	return new Promise(resolve => {
		const child = spawn(command, [], options);

		let allOutput = '';

		child.stdout.setEncoding('utf8');
		child.stdout.on('data', function (data) {
			console.log(data);

			allOutput += data;
		});

		child.stderr.setEncoding('utf8');
		child.stderr.on('data', function (data) {
			console.log(data);

			allOutput += data;
		});

		child.on('close', function (data) {
			console.log('Exit Code: ' + data);

			resolve();
		});
	})
}


main();