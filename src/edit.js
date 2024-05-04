/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import { RangeControl, PanelBody, SelectControl } from '@wordpress/components';
import NumberControl from './components/number-control';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object} param0
 * @param {*} param0.attributes
 * @param {*} param0.setAttributes
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		columnCount,
		columnGap,
		columnWidth,
		columnRuleWidth,
		columnRuleStyle,
		columnRuleColor,
		dropCapColor,
		dropCapSize,
		boxShadowType,
	} = attributes; //destructuring custom attributes
	const columnStyles = {
		columnCount,
		columnGap,
		columnWidth,
		columnRuleWidth,
		columnRuleStyle,
		columnRuleColor,
		'--drop-cap-color': dropCapColor,
		'--drop-cap-font-size': dropCapSize.fontSize,
		'--drop-cap-line-height': dropCapSize.lineHeight,
		'--box-shadow-type': boxShadowType.Values,
	}; //passing custom attributes with useBlockProps hook
	const ALLOWED_BLOCKS = [
		'core/heading',
		'core/paragraph',
		'core/image',
		'core/pullquote',
		'core/spacer',
	];
	const TEMPLATE_PARAGRAPHS =
		'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.';
	const MC_TEMPLATE = [
		[
			'core/heading',
			{ level: 2, placeholder: __( 'Heading..', 'multi-columns' ) },
		],
		[ 'core/image', { placeholder: __( 'Image..', 'multi-columns' ) } ],
		[
			'core/heading',
			{ level: 4, placeholder: __( 'Sub Heading..', 'multi-columns' ) },
		],
		[ 'core/paragraph', { placeholder: TEMPLATE_PARAGRAPHS } ],
		[ 'core/spacer', { height: '100px' } ],
		[ 'core/pullquote' ],
	];

	const onChangeColumnWidth = ( val ) => {
		setAttributes( { columnWidth: Number( val ) } );
	};

	const onChangeDropCapSize = ( val ) => {
		switch ( val ) {
			case 'small':
				setAttributes( {
					dropCapSize: {
						size: 'small',
						fontSize: '3.8rem',
						lineHeight: '3.5rem',
					},
				} );
				break;
			case 'large':
				setAttributes( {
					dropCapSize: {
						size: 'large',
						fontSize: '6.2rem',
						lineHeight: '5.2rem',
					},
				} );
				break;
			default:
				setAttributes( {
					dropCapSize: {
						size: 'small',
						fontSize: '3.8rem',
						lineHeight: '3.5rem',
					},
				} );
		}
	};

	const onChangeBoxShadowType = ( val ) => {
		switch ( val ) {
			case 'light':
				setAttributes( {
					boxShadowType: {
						effect: 'light',
						Values: '12px 12px 2px 1px rgba(0, 0, 255, .2)',
					},
				} );
				break;
			case 'dark':
				setAttributes( {
					boxShadowType: {
						effect: 'dark',
						Values: '12px 12px 2px 1px black',
					},
				} );
				break;
			default:
				setAttributes( {
					boxShadowType: {
						effect: 'light',
						Values: '12px 12px 2px 1px rgba(0, 0, 255, .2)',
					},
				} );
		}
	};

	const colorSettingsDropDown =
		attributes.className === 'is-style-drop-cap'
			? [
					{
						label: __( 'Separator Color', 'multi-columns' ),
						value: columnRuleColor,
						onChange: ( val ) => {
							setAttributes( { columnRuleColor: val } );
						},
					},
					{
						label: __( 'Drop-cap Color', 'multi-columns' ),
						value: dropCapColor,
						onChange: ( val ) => {
							setAttributes( { dropCapColor: val } );
						},
					},
			  ]
			: [
					{
						label: __( 'Separator Color', 'multi-columns' ),
						value: columnRuleColor,
						onChange: ( val ) => {
							setAttributes( { columnRuleColor: val } );
						},
					},
			  ];

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Multi column setting', 'multi-columns' ) }
				>
					<RangeControl
						label={ __( 'Number of Columns', 'multi-columns' ) }
						value={ columnCount }
						onChange={ ( val ) =>
							setAttributes( { columnCount: val } )
						}
						min={ 2 }
						max={ 6 }
					/>
					<SelectControl
						label={ __( 'Column Gap', 'multi-columns' ) }
						value={ columnGap }
						onChange={ ( val ) =>
							setAttributes( { columnGap: val } )
						}
						options={ [
							{
								label: __( '1rem', 'multi-columns' ),
								value: '1rem',
							},
							{
								label: __( '2rem', 'multi-columns' ),
								value: '2rem',
							},
							{
								label: __( '3rem', 'multi-columns' ),
								value: '3rem',
							},
							{
								label: __( '10px', 'multi-columns' ),
								value: '10px',
							},
							{
								label: __( '20px', 'multi-columns' ),
								value: '20px',
							},
							{
								label: __( '30px', 'multi-columns' ),
								value: '30px',
							},
						] }
					/>
					<NumberControl
						label={ __( 'Column Width', 'multi-columns' ) }
						value={ columnWidth }
						onChange={ onChangeColumnWidth }
						min={ 100 }
						max={ 500 }
						step={ 10 }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Column Separator', 'multi-columns' ) }
					initialOpen={ false }
				>
					<NumberControl
						label={ __( 'Separator Width', 'multi-columns' ) }
						value={ columnRuleWidth }
						onChange={ ( val ) =>
							setAttributes( { columnRuleWidth: Number( val ) } )
						}
						min={ 1 }
						max={ 5 }
						step={ 1 }
					/>
					<SelectControl
						label={ __( 'Separator Style', 'multi-columns' ) }
						value={ columnRuleStyle }
						onChange={ ( val ) =>
							setAttributes( { columnRuleStyle: val } )
						}
						options={ [
							{
								label: __( 'None', 'multi-columns' ),
								value: 'none',
							},
							{
								label: __( 'Double', 'multi-columns' ),
								value: 'double',
							},
							{
								label: __( 'Groove', 'multi-columns' ),
								value: 'groove',
							},
							{
								label: __( 'Ridge', 'multi-columns' ),
								value: 'ridge',
							},
							{
								label: __( 'Solid', 'multi-columns' ),
								value: 'solid',
							},
							{
								label: __( 'Dashed', 'multi-columns' ),
								value: 'dashed',
							},
							{
								label: __( 'Dotted', 'multi-columns' ),
								value: 'dotted',
							},
						] }
					/>
					<PanelColorSettings
						title={ __(
							'Separator Color Settings',
							'multi-columns'
						) }
						colorSettings={ colorSettingsDropDown }
					></PanelColorSettings>
				</PanelBody>
				{ attributes.className === 'is-style-drop-cap' && (
					<PanelBody
						title={ __( 'Drop-cap Settings', 'multi-columns' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Size', 'multi-columns' ) }
							value={ dropCapSize.size }
							onChange={ onChangeDropCapSize }
							options={ [
								{
									label: __( 'Small', 'multi-columns' ),
									value: 'small',
								},
								{
									label: __( 'Large', 'multi-columns' ),
									value: 'large',
								},
							] }
							npm
						/>
					</PanelBody>
				) }
				{ attributes.className === 'is-style-box-shadow' && (
					<PanelBody
						title={ __( 'Box shadow Settings', 'multi-columns' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Type', 'multi-columns' ) }
							value={ boxShadowType.effect }
							onChange={ onChangeBoxShadowType }
							options={ [
								{
									label: __( 'Light', 'multi-columns' ),
									value: 'light',
								},
								{
									label: __( 'dark', 'multi-columns' ),
									value: 'dark',
								},
							] }
						/>
					</PanelBody>
				) }
			</InspectorControls>
			<div { ...useBlockProps( { style: columnStyles } ) }>
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ MC_TEMPLATE }
				/>
			</div>
		</>
	);
}
