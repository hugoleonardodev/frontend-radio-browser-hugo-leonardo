import { z } from 'zod'

export const EditRadioSchema = z.object({
  radioName: z.string().min(0).max(64),
  userNotes: z.string().min(0).max(64).optional(),
})

export type EditRadioSchemaData = z.infer<typeof EditRadioSchema>
