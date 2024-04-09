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
import { useBlockProps, RichText, InspectorControls } from "@wordpress/block-editor";
import { TextControl, RangeControl, PanelBody } from "@wordpress/components";

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
	const { columnCount, columnGap } = attributes;	//destructuring custom attributes
	const columnStyles = { columnCount: columnCount, columnGap: columnGap };  //passing custom attributes with useBlockProps hook
	const onChangeContent = ( val ) => {
		setAttributes( { content: val } );
	};
	const onChangeColumnCount = ( value ) => {
		setAttributes( { columnCount: value } );
	};
	const onChangeColumnGap = ( value ) => {
		if (parseInt(value.split('')[0]) >= 0 && parseInt(value.split('')[0]) <= 3){
			const columnGapValue = `${parseInt(value)}rem`
			setAttributes( { columnGap: columnGapValue } );
		}
	};
	return (
		<>
			<InspectorControls>
				<PanelBody>
					<RangeControl
						label="Number of Columns"
						value={ columnCount }
						onChange={ onChangeColumnCount }
						min={ 2 }
						max={ 6 }
					/>
					<TextControl
						label="Column Gap(1 - 3rem)"
						value={ columnGap }
						onChange={ onChangeColumnGap }
					/>
				</PanelBody>
			</InspectorControls>
			<RichText
				{ ...useBlockProps( { style: columnStyles } ) }
				tagName="div"
				onChange={ onChangeContent }
				value={ attributes.content }
				placeholder="Enter some text here..."
			/>
		</>
	);
}
