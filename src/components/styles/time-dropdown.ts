import { css, jsx, keyframes } from '@emotion/core'

const DROPDOWN_BORDER = '#f4f4f4'
const DROPDOWN_COLOR = '#8c8c8c'
const DROPDOWN_SELECTED_COLOR = '#EAF8FF'

const hour = `right: -22px;`
const minute = `right: -10px;`

const fadeIn = keyframes`
	0% { opacity: 0; }
	100% { opacity: 1; }
`

export const wrapper = (type: string) => css`
	position: absolute;
	display: inline-block;
	background: white;
	border: 1px solid ${DROPDOWN_BORDER};
	border-radius: 2px;
	padding: 6px 0;
	z-index: 20;
	top: 62px;
	height: 250px;
	overflow-y: auto;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
	opacity: 0;
	animation: ${fadeIn} 0.2s ease-out both;
	${type === 'minute' ? minute : hour}
`

export const options = css`
	position: relative;
	list-style: none;
	padding: 0;
	margin: 0;
`

const selected = `background: ${DROPDOWN_SELECTED_COLOR};`
export const option = (active: boolean) => css`
	background: transparent;
	padding: 7px 30px;
	font-size: 16px;
	color: ${DROPDOWN_COLOR};
	cursor: pointer;
	&:hover {
		background: ${DROPDOWN_SELECTED_COLOR};
	}
	${active && selected}
`