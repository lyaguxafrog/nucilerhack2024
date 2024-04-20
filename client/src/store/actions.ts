import { createAction } from '@reduxjs/toolkit';

export const setTimerSeconds = createAction<number>('setTimerSeconds');
