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
import { useBlockProps, InnerBlocks, InspectorControls, PanelColorSettings } from "@wordpress/block-editor";
import { TextControl, RangeControl, PanelBody, SelectControl } from "@wordpress/components";
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
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	console.log("From Edit", attributes);
	const { columnCount, columnGap, columnWidth, columnRuleWidth, columnRuleStyle, columnRuleColor } = attributes;	//destructuring custom attributes
	const columnStyles = { 
		columnCount: columnCount,
		columnGap: columnGap,
		columnWidth: columnWidth,
		columnRuleWidth: columnRuleWidth,
		columnRuleStyle: columnRuleStyle,
		columnRuleColor: columnRuleColor
 	};  //passing custom attributes with useBlockProps hook
	const ALLOWED_BLOCKS = ['core/heading', 'core/paragraph', 'core/image', 'core/pullquote', 'core/spacer'];
	const TEMPLATE_PARAGRAPHS = 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.';
	const MC_TEMPLATE = [
		['core/heading', { level: 2, placeholder: 'Heading...' }],
		['core/image', { placeholder: 'Image...' }],
		['core/heading', { level: 4, placeholder: 'Sub Heading...' }],
		['core/paragraph', { placeholder: TEMPLATE_PARAGRAPHS }],
		['core/spacer', { height: '100px' }],
		['core/pullquote'],
		
	];

	const onChangeColumnWidth = ( val ) => {
		setAttributes( { columnWidth: Number(val) })
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title="Multi column setting">
					<RangeControl
						label="Number of Columns"
						value={ columnCount }
						onChange={ ( val ) => setAttributes( { columnCount: val } ) }
						min={ 2 }
						max={ 6 }
					/>
					<SelectControl
						label="Column Gap"
						value={ columnGap }
						onChange={ ( val ) => setAttributes( { columnGap: val } ) }
						options={[
							{ label: '1rem', value: '1rem' },
							{ label: '2rem', value: '2rem' },
							{ label: '3rem', value: '3rem' },
							{ label: '10px', value: '10px' },
							{ label: '20px', value: '20px' },
							{ label: '30px', value: '30px' }
						]}	
					/>
					<NumberControl
						label="Column Width"
						value={ columnWidth }
						onChange={ onChangeColumnWidth }
						min={ 100 }
						max={ 500 }
						step={ 10 }
					/>
				</PanelBody>
				<PanelBody title="Column Separator" initialOpen={false}>
					<NumberControl
						label="Separator Width"
						value={ columnRuleWidth }
						onChange={ ( val ) => setAttributes( { columnRuleWidth: Number( val ) } ) }
						min={ 1 }
						max={ 5 }
						step={ 1 }
					/>
					<SelectControl
						label="Separator Style"
						value={ columnRuleStyle }
						onChange={ ( val ) => setAttributes( { columnRuleStyle: val } ) }
						options={[
							{ label: 'None', value: 'none' },
							{ label: 'Double', value: 'double' },
							{ label: 'Groove', value: 'groove' },
							{ label: 'Ridge', value: 'ridge' },
							{ label: 'Solid', value: 'solid' },
							{ label: 'Dashed', value: 'dashed' },
							{ label: 'Dotted', value: 'dotted' }
						]}	
					/>
					<PanelColorSettings
					title="Separator Color Settings"
					colorSettings={[
						{
							label:"Separator Color",
							value: columnRuleColor,
							onChange: (val) => { setAttributes( { columnRuleColor: val } ) },
						}
					]}
				></PanelColorSettings>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps( { style: columnStyles } ) }>
				<InnerBlocks allowedBlocks = { ALLOWED_BLOCKS } template = { MC_TEMPLATE }/>	
			</div>
		</>
	);
}
