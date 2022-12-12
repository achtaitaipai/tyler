import { z } from 'zod'

export const fileSchema = z.object({
	grid: z.array(z.string()),
	backgroundColor: z.string(),
	tileset: z.object({
		img: z.string(),
		groups: z.array(z.number()),
		values: z.array(z.number()),
		columns: z.number(),
		rows: z.number(),
		charsMap: z.array(z.string()),
	}),
})

export type FileType = z.infer<typeof fileSchema>
