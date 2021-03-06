import _ from 'lodash';
import React from 'react';
import Portal from '../Portal/Portal';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import random from '../../util/random';
import { lucidClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition }  from '../../util/component-definition';

const boundClassNames = lucidClassNames.bind('&-Overlay');

const {
	string,
	bool,
	func,
	node,
} = React.PropTypes;

/**
 * {"categories": ["utility"], "madeFrom": ["Portal"]}
 *
 * Overlay is used to block user interaction with the rest of the app until they
 * have completed something.
 */
const Overlay = React.createClass(createLucidComponentDefinition({
	displayName: 'Overlay',

	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root element.
		 */
		className: string,

		/**
		 * Generally you should only have a single child element so the centering
		 * works correctly.
		 */
		children: node,

		/**
		 * Controls visibility.
		 */
		isShown: bool,

		/**
		 * Determines if it shows with a gray background. If `false`, the
		 * background will be rendered but will be invisible, except for the
		 * contents, and it won't capture any of the user click events.
		 */
		isModal: bool,

		/**
		 * Set your own id for the `Portal` is that is opened up to contain the
		 * contents. In practice you should never need to set this manually.
		 */
		portalId: string,

		/**
		 * Fired when the user hits escape.
		 *
		 * Signature: `({ event, props }) => {}`
		 */
		onEscape: func,

		/**
		 * Fired when the user clicks on the background, this may or may not be
		 * visible depending on `isModal`.
		 *
		 * Signature: `({ event, props }) => {}`
		 */
		onBackgroundClick: func,
	},

	getDefaultProps() {
		return {
			isShown: false,
			isModal: true,
			onEscape: _.noop,
			onBackgroundClick: _.noop,
		};
	},

	getInitialState() {
		return {
			// This must be in state because getDefaultProps only runs once per
			// component import which causes collisions
			portalId: this.props.portalId || `Overlay-Portal-${random()}`
		}
	},

	componentDidMount() {
		if (window && window.document) {
			window.document.addEventListener('keydown', this.handleDocumentKeyDown);
		}
	},

	componentWillUnmount() {
		if (window && window.document) {
			window.document.removeEventListener('keydown', this.handleDocumentKeyDown);
		}
	},

	handleDocumentKeyDown(event) {
		// If the user hits the "escape" key, then fire an `onEscape`
		// TODO: use key helpers
		if (event.keyCode === 27) {
			this.props.onEscape({event, props: this.props });
		}
	},

	handleDivRef(divDOMNode) {
		// Store the dom node so we can check if it's clicked on later
		this._divDOMNode = divDOMNode;
	},

	handleBackgroundClick(event) {
		// Use the reference we previously stored from the `ref` to check what
		// element was clicked on.
		if (this._divDOMNode && event.target === this._divDOMNode) {
			this.props.onBackgroundClick({event, props: this.props });
		}
	},

	render() {
		const {
			className,
			isShown,
			isModal,
			children,
			...passThroughs
		} = this.props;

		const {
			portalId
		} = this.state;

		return (
			<Portal portalId={portalId}>
				<ReactCSSTransitionGroup
					transitionName={boundClassNames('&')}
					transitionEnterTimeout={300}
					transitionLeaveTimeout={300}
				>
					{isShown ?
						<div
							{...passThroughs}
							className={boundClassNames(className, '&', {
								'&-is-not-modal': !isModal
							})}
							onClick={this.handleBackgroundClick}
							ref={this.handleDivRef}
						>
							{children}
						</div>
					: null}
				</ReactCSSTransitionGroup>
			</Portal>
		);
	},
}));

export default Overlay;

