import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';

const boundClassNames = lucidClassNames.bind('&-CrossIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A cross icon.
 */
const CrossIcon = React.createClass({
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const {
			className,
			...passThroughs
		} = this.props;

		return (
			<Icon
				{...passThroughs}
				className={boundClassNames('&', className)}
			>
				<path d='M6.837,7.999 L4.388,5.536 L5.558,4.365 L8.007,6.83 L10.472,4.365 L11.642,5.536 L9.163,7.999 L11.642,10.464 L10.475,11.634 L8.008,9.155 L5.528,11.635 L4.358,10.464 L6.837,7.999 z'/>
			</Icon>
		);
	}
});

export default CrossIcon;
