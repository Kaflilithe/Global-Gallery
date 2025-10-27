import { z } from 'zod';

export const GalleryQuerySchema = z.object({
  page: z.coerce.number().optional().default(1),
  q: z.string().optional().default(''),
});

export type GalleryQuery = z.infer<typeof GalleryQuerySchema>;
