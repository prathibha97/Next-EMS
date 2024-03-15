import { unsplash } from '@/lib/unsplash';

export async function getRandomImage() {
  try {
    const result = await unsplash.photos.getRandom({
      collectionIds: ['317099'],
      count: 1,
    });

    if (result && result.response && result.response.length > 0) {
      const image = result.response[0];
      return {
        imageId: image.id,
        imageThumbUrl: image.urls.thumb,
        imageFullUrl: image.urls.full,
        imageUserName: image.user.name,
        imageLinkHTML: image.links.html,
      };
    } else {
      throw new Error('Failed to get random image from Unsplash');
    }
  } catch (error) {
    console.error(error);
    // Return default image data or handle error as per your requirement
    return {
      imageId: 'default_image_id',
      imageThumbUrl: 'default_thumb_url',
      imageFullUrl: 'default_full_url',
      imageUserName: 'Default User',
      imageLinkHTML: 'https://example.com',
    };
  }
}
