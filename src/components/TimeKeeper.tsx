import React, { useState, useCallback, useEffect } from 'react'
import { Global, css, jsx } from '@emotion/core'

import globalStyle from './styles/global'
import style from './styles/main'
import useConfig from '../hooks/config'
import ClockWrapper from './ClockWrapper'
import { TimeInput } from '../helpers/types'
import { MODE, CLOCK_VALUES, HOURS_12 } from '../helpers/constants'

export interface Props {
	onChange: (t: TimeInput) => void
	// TODO - check out props from previous implementation
	useCoarseMinutes?: boolean
}

export default function TimeKeeper({ useCoarseMinutes }: Props) {
	const [time, setTime] = useState({ hour: 5, minute: 55 })
	const [mode, setMode] = useState(MODE.HOURS_12)

	const config = useConfig()

	const handleTimeChange = useCallback(
		(val: number, canChangeUnit: boolean) => {
			// const unit = mode;

			// TODO - is this necessary
			val = parseInt(val, 10)
			if (isNaN(val)) {
				console.error('DEBUG :: NOT A NUMBER!')
				return
			}

			// const increments = CLOCK_VALUES[mode].increments
			let unit
			switch (mode) {
				case MODE.HOURS_12:
					unit = 'hour'
					if (val === 0) {
						val = 12
					}
					break
				case MODE.MINUTES:
					unit = 'minute'
					if (val === 60) {
						val = 0
					}
					break
				// TODO - add support for 24 hrs
			}

			const newTime = { ...time, [unit]: val }
			setTime(newTime)

			// TODO - call props function to update time on parent (with formatted time)
			// if (mode === MODE.HOURS_12) {

			// } else if (mode === MODE){

			// }
			// if (mode === HOUR)
			// console.log('WOULD CHANGE', unit, val, canChangeUnit)
			return
			// val = parseInt(val, 10)
			// if (isNaN(val)) {
			// 	return
			// }
			// if (unit === 'hour' && val === 0) {
			// 	val = 12
			// } else if (unit === 'minute' && val === 60) {
			// 	val = 0
			// }

			// this.setState(
			// 	{
			// 		[unit]: val,
			// 	},
			// 	this.timeChangeHandler,
			// ) // update time on parent

			// const props = this.props

			// if (canChangeUnit && unit === 'hour' && props.switchToMinuteOnHourSelect) {
			// 	this.changeUnit('minute')
			// } else if (canChangeUnit && unit === 'minute' && props.closeOnMinuteSelect) {
			// 	props.onDoneClick && props.onDoneClick(this.getTime(), null)
			// }
		},
		[mode, time],
	)

	const handleChange = useCallback(
		(delta, forceCoarse, canChangeUnit = false) => {
			const isCoarse = useCoarseMinutes || forceCoarse // TODO - change naming between forced and props

			/*
				LEFT OFF HERE
				- check out prop/argument signature to timepicker component
				- add handleChange function
				- add time helpers and update parent component value
				- on parent change time, have effect that changes state here
			*/

			// calculate value based on current clock increments
			const increments = CLOCK_VALUES[mode].increments
			let selected = Math.round((delta / 360) * increments)

			if (isCoarse) {
				// TODO
				// if coarse, round up/down
				// const multiplier = CLOCK_DATA[unit].coarseMultiplier;
				// selected = Math.round(selected / multiplier) * multiplier;
			}

			// return console.log('selected is', selected, check, mode)
			handleTimeChange(selected, canChangeUnit)
		},
		[handleTimeChange, mode, useCoarseMinutes],
	)

	function updateTime() {
		console.log('would update time...')
	}

	return (
		<>
			<Global styles={css(globalStyle)} />

			<div className="react-timekeeper" css={[style, config.styles.main]}>
				{time.hour}:{time.minute}
				<button
					onClick={() => {
						setMode(mode === MODE.HOURS_12 ? MODE.MINUTES : MODE.HOURS_12)
					}}
				>
					change type - {mode}
				</button>
				<br />
				<br />
				<br />
				<br />
				{/* TODO - top bar */}
				<ClockWrapper time={time} mode={mode} handleChange={handleChange} />
				{/* TODO - done button */}
			</div>
		</>
	)
}