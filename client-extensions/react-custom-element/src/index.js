import React from 'react';
import {createRoot} from 'react-dom/client';

import HelloBar from './routes/hello-bar/pages/HelloBar';
import HelloFoo from './routes/hello-foo/pages/HelloFoo';
import HelloWorld from './routes/hello-world/pages/HelloWorld';

import './styles/index.scss';

const App = ({route}) => {
	if (route === 'hello-bar') {
		return <HelloBar />;
	}

	if (route === 'hello-foo') {
		return <HelloFoo />;
	}

	return (
		<div>
			<HelloWorld />
		</div>
	);
};

class WebComponent extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		createRoot(this).render(
			<App
				route={this.getAttribute('route')}
			/>,
			this
		);
	}
}

const ELEMENT_ID = '';

if (!customElements.get(ELEMENT_ID)) {
	customElements.define(ELEMENT_ID, WebComponent);
}