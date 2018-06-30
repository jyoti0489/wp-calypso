/** @format */

/**
 * External dependencies
 */
import React, { Component } from 'react';
import { bindAll } from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { localize } from 'i18n-calypso';
/**
 * Internal dependencies
 */
import SelectDropdown from 'components/select-dropdown';

export class MediaFolderDropdown extends Component {
	static propTypes = {
		initialSelected: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ),
		folders: PropTypes.arrayOf(
			PropTypes.shape( {
				ID: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ).isRequired,
				title: PropTypes.string.isRequired,
				summary: PropTypes.string,
				thumbnail: PropTypes.string,
				numphotos: PropTypes.number,
				date: PropTypes.string,
			} )
		),
		onFolderChange: PropTypes.func,
		disabled: PropTypes.bool,
		compact: PropTypes.bool,
		defaultOption: PropTypes.object,
	};

	static defaultProps = {
		initialSelected: 'all',
		folders: [],
		compact: true,
	};

	constructor( props ) {
		super( props );

		bindAll( this, [ 'handleOnSelect' ] );
	}

	handleOnSelect( option ) {
		if ( this.props.disabled ) return;

		const folder = option.value;

		this.props.onFolderChange( folder );
	}

	getDropDownOptions( folderData ) {
		const separator = null;

		return [
			{
				value: 'all',
				label: this.props.translate( 'All Photos' ),
			},
			separator,
		].concat(
			folderData.map( folder => {
				return {
					value: '' + folder.ID, // convert to string if number
					label: folder.title,
				};
			} )
		);
	}

	render() {
		const rootClassNames = classNames( this.props.className, {
			'media-library__folder-dropdown': true,
		} );

		const folderOptions = this.getDropDownOptions( this.props.folders );

		// No need to show folders if we only have the default option + seperator
		if ( folderOptions.length <= 2 ) return;

		return (
			<div className={ rootClassNames }>
				<SelectDropdown
					initialSelected={ '' + this.props.initialSelected } // convert to string if number
					disabled={ this.props.disabled }
					compact={ this.props.compact }
					onSelect={ this.handleOnSelect }
					options={ folderOptions }
				/>
			</div>
		);
	}
}

export default localize( MediaFolderDropdown );