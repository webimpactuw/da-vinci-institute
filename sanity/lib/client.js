import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}