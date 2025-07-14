import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

// הגדרת הוק מותאם לשימוש ב-dispatch של Redux
export const useAppDispatch: () => AppDispatch = useDispatch;

// הגדרת הוק מותאם לבחירת מצב מהסטור של Redux עם טיפוס מוגדר
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
