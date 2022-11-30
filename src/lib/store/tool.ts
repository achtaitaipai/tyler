import { atom } from 'jotai'
import type { Tool } from '../types/tools'

export const toolAtom = atom<Tool>('bucket')
