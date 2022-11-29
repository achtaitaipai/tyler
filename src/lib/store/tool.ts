import { atom } from 'jotai'
import { Tool } from '../types/tools'

export const toolAtom = atom<Tool>('bucket')
