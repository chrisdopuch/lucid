import React from 'react';
import ReactDOM from 'react-dom';
import { createLucidComponentDefinition } from '../../util/component-definition';
import { lucidClassNames } from '../../util/style-helpers';

const boundClassNames = lucidClassNames.bind('&-Portal');

const {
	PropTypes: {
		string
	}
} = React;

/**
 *
 * {"categories": ["utility"]}
 *
 * A Portal component is used to render content in a container that is appended
 * to `document.body`.
 */
const Portal = React.createClass(createLucidComponentDefinition({
	propTypes: {
		/**
		 * The `id` of the portal element that is appended to `document.body`.
		 */
		portalId: string.isRequired
	},
	render: () => null,
	componentDidMount() {
		const {
			portalId
		} = this.props;

		let portalElement = window.document.getElementById(portalId);
		if (!portalElement) {
			portalElement = window.document.createElement('div');
			portalElement.id = portalId;
			window.document.body.appendChild(portalElement);
		}
		this.portalElement = portalElement;
		this.componentDidUpdate();
	},
	componentWillUnmount() {
		window.document.body.removeChild(this.portalElement);
	},
	componentDidUpdate() {
		ReactDOM.render((
			<div {...this.props} className={boundClassNames('&', this.props.className)}>
				{this.props.children}
			</div>
		), this.portalElement);
	}
}));

export default Portal;
