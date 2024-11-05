/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useMemo } from 'react';

import { type Action, Container } from '@zextras/carbonio-design-system';
import { Grid, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';

interface ActionsHeaderProps {
	actions: Action[];
}

const Task01Icon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width={16}
		height={16}
		fill={'none'}
		{...props}
	>
		<path
			d="M7.99805 16H11.998M7.99805 11H15.998"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
		/>
		<path
			d="M7.5 3.5C5.9442 3.54667 5.01661 3.71984 4.37477 4.36227C3.49609 5.24177 3.49609 6.6573 3.49609 9.48836L3.49609 15.9944C3.49609 18.8255 3.49609 20.241 4.37477 21.1205C5.25345 22 6.66767 22 9.49609 22L14.4961 22C17.3245 22 18.7387 22 19.6174 21.1205C20.4961 20.241 20.4961 18.8255 20.4961 15.9944V9.48836C20.4961 6.6573 20.4961 5.24177 19.6174 4.36228C18.9756 3.71984 18.048 3.54667 16.4922 3.5"
			stroke="currentColor"
			strokeWidth="1.5"
		/>
		<path
			d="M7.49609 3.75C7.49609 2.7835 8.2796 2 9.24609 2H14.7461C15.7126 2 16.4961 2.7835 16.4961 3.75C16.4961 4.7165 15.7126 5.5 14.7461 5.5H9.24609C8.2796 5.5 7.49609 4.7165 7.49609 3.75Z"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinejoin="round"
		/>
	</svg>
);

const TaskDone01Icon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width={16}
		height={16}
		fill={'none'}
		{...props}
	>
		<path
			d="M13.5 20C13.5 20 14.5 20 15.5 22C15.5 22 18.6765 17 21.5 16"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path d="M7 16H11M7 11H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
		<path
			d="M6.5 3.5C4.9442 3.54667 4.01661 3.71984 3.37477 4.36227C2.49609 5.24177 2.49609 6.6573 2.49609 9.48836L2.49609 15.9944C2.49609 18.8255 2.49609 20.241 3.37477 21.1205C4.25345 22 5.66767 22 8.49609 22L10.9961 22M15.4922 3.5C17.048 3.54667 17.9756 3.71984 18.6174 4.36228C19.4961 5.24177 19.4961 6.6573 19.4961 9.48836V13.5"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
		/>
		<path
			d="M6.49609 3.75C6.49609 2.7835 7.2796 2 8.24609 2H13.7461C14.7126 2 15.4961 2.7835 15.4961 3.75C15.4961 4.7165 14.7126 5.5 13.7461 5.5H8.24609C7.2796 5.5 6.49609 4.7165 6.49609 3.75Z"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinejoin="round"
		/>
	</svg>
);

export const ActionsHeader = ({ actions }: ActionsHeaderProps): React.JSX.Element => {
	const actionButtons = useMemo<React.JSX.Element[]>(
		() =>
			actions.map((action) => (
				// <Button
				// 	key={action.id}
				// 	label={action.label}
				// 	type={'outlined'}
				// 	onClick={action.onClick}
				// 	size={'medium'}
				// 	backgroundColor={'transparent'}
				// 	disabled={action.disabled}
				// 	color={action.color}
				// ></Button>

				<Button
					variant="outlined"
					key={action.id}
					onClick={action.onClick}
					fullWidth
					disabled={action.disabled}
					style={{
						color: action.color,
						borderColor: action.label === 'Delete' ? 'white' : 'transparent',
						backgroundColor: action.label === 'Delete' ? 'transparent' : 'transparent'
					}}
					startIcon={
						action.label === 'Delete' ? (
							<Delete />
						) : action.label === 'Complete' ? (
							<TaskDone01Icon />
						) : action.label === 'Edit' ? (
							<ModeEditOutlineRoundedIcon />
						) : action.label === 'Uncomplete' ? (
							<Task01Icon />
						) : null
					}
				>
					{action.label}
				</Button>
			)),
		[actions]
	);

	return (
		// <Container
		// 	orientation={'horizontal'}
		// 	height={'auto'}
		// 	padding={{ vertical: '0.5rem' }}
		// 	gap={'0.25rem'}
		// 	mainAlignment={'flex-end'}
		// >
		// 	{actionButtons}
		// </Container>

		<div style={{ display: 'flex', width: '100%', height: 'auto' }}>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					width: '100%',
					margin: '16px',
					marginTop: '0px',
					justifyContent: 'space-around',
					alignItems: 'start'
				}}
			>
				{actionButtons}
			</div>
		</div>
	);
};
