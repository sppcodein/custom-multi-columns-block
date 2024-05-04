/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */

import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param {Object} param0
 * @param {*} param0.attributes
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save( { attributes } ) {
	const {
		columnCount,
		columnGap,
		columnWidth,
		columnRuleColor,
		columnRuleWidth,
		columnRuleStyle,
		dropCapColor,
		dropCapSize,
		boxShadowType,
	} = attributes; //destructuring custom attributes
	const columnStyles = {
		columnCount,
		columnGap,
		columnWidth,
		columnRuleColor,
		columnRuleWidth,
		columnRuleStyle,
		'--drop-cap-color': dropCapColor,
		'--drop-cap-font-size': dropCapSize.fontSize,
		'--drop-cap-line-height': dropCapSize.lineHeight,
		'--box-shadow-type': boxShadowType.Values,
	};
	return (
		<div { ...useBlockProps.save( { style: columnStyles } ) }>
			<InnerBlocks.Content />
		</div>
	);
}
